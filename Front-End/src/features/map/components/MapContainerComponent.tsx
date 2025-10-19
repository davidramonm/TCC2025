// src/features/map/components/MapContainerComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Navigation } from "lucide-react";
import { tiposAcessibilidade, getLocationTypeName } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { Establishment, Location } from "@/types";
import { set } from "zod";
import { on } from "events";
import { fetchEstablishmentById } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface MapProps {
  locations: Location[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: any | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  findMyLocation: boolean;
  onMyLocationFound: () => void;
  onRateClick: (establishment: Establishment) => void;
  onEditReviewClick: (establishment: Establishment) => void; // Nova prop para edição
}

const MapContent = ({ locations, searchLocation, onMapClick, findMyLocation, onMyLocationFound, onRateClick, onEditReviewClick }: MapProps) => {
  const map = useMapEvents({
    click: (e) => onMapClick(e.latlng),
  });
  const markersRef = useRef<L.Marker[]>([]);
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const { toast } = useToast();
  const detailsCache = useRef<Map<number, Establishment>>(new Map());
  const userId = useAuth().userId;

  useEffect(() => {
    if (findMyLocation) {
      map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
      onMyLocationFound();
    }
  }, [findMyLocation, map, onMyLocationFound]);

  useEffect(() => {
    const handleLocationFound = (e: L.LocationEvent) => {
      const radius = e.accuracy;
      if (locationMarkerRef.current) {
        map.removeLayer(locationMarkerRef.current);
      }
      const iconString = renderToStaticMarkup(<Navigation color="white" size={16} />);
      const iconHtml = `<div style="background: #2563eb; color: white; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;
      const myLocationIcon = L.divIcon({
        className: "my-location-marker",
        html: iconHtml,
        iconSize: [32, 32],
      });
      locationMarkerRef.current = L.marker(e.latlng, { icon: myLocationIcon }).addTo(map)
        .bindPopup(`Você está aqui (margem de ${radius.toFixed(0)} metros de erro)`).openPopup();
    };

    const handleLocationError = (e: L.ErrorEvent) => {
      toast({ title: "Erro de Localização", description: e.message, variant: "destructive" });
    };

    map.on('locationfound', handleLocationFound);
    map.on('locationerror', handleLocationError);

    return () => {
      map.off('locationfound', handleLocationFound);
      map.off('locationerror', handleLocationError);
    };
  }, [map, toast]);

  useEffect(() => {
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];


    locations.forEach((location) => {

      //const tipo = tiposAcessibilidade.find((t) => t.necessityId === location.[0]);
      //const IconComponent = tipo?.icon || MapPin;
      const IconComponent = MapPin;
      const iconString = renderToStaticMarkup(<IconComponent color="white" size={20} />);
      //const iconHtml = `<div style="background: ${tipo?.color || '#e5e7eb'}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;
      const iconHtml = `<div style="background: '#e5e7eb'; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;

      const icon = L.divIcon({
        className: "location-marker",
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker([location.xCoords, location.yCoords], { icon }).addTo(map);

      //const typesList = location.typeValues.map((type: string) => `<li>${getLocationTypeName(type)}</li>`).join('');



      const popupContentBasic = `
        <div style="font-family: inherit; line-height: 1.5;">
          <h4 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h4>
          <div class="popup-details"><p>Carregando...</p></div>
          <div class="popup-actions" style="margin-top:8px;"></div>
        </div>
      `;


      marker.bindPopup(popupContentBasic);

      marker.on('popupopen', async (e) => {
        const popup = e.popup;
        const id = location.establishmentId;

        const cachedDetails = detailsCache.current.get(id);
        if (cachedDetails) {
          fillPopupWithDetails(popup, cachedDetails)
          return;
        }

        try {
          const response = await fetchEstablishmentById(id);
          console.log('Detalhes do estabelecimento:', response);
          detailsCache.current.set(id, response);
          fillPopupWithDetails(popup, response);
        } catch (error) {
          popup.setContent(`<div style="font-family: inherit; line-height: 1.5;">
            <h4 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h4>
            <p style="color: red;">Erro ao carregar detalhes.</p>
          </div>`);
        }
      });

    });

    function fillPopupWithDetails(popup: L.Popup, details: Establishment) {
      const typesList = (details.reviewList || [])
        .map(review => `<li>
          <p>${review.username}: ${review.rating}★ - ${review.comment ?? ''} </p>
          </li>`).join('');
      const html = `
        <div style="font-family: inherit; line-height: 1.5;">
          <h4 style="margin: 0 0 8px 0; font-size: 16px;">${details.name}</h4>
          <p style="margin: 4px 0; font-size: 14px;">Endereço: ${details.address}</p>
          <div style="margin: 4px 0; font-size: 14px;">
            <strong>Avaliações:</strong>
            <ul style="margin-top: 4px; padding-left: 18px;">${typesList}</ul>
          </div>
          
          <div class="popup-actions" style="margin-top:8px;"></div>
        </div>
      `;
      popup.setContent(html);

      setTimeout(() => {
        const popupElement = popup.getElement();
        if (!popupElement) return;

        const actions = popupElement.querySelector('.popup-actions');
        if (!actions) return;

        const userHasReviewed = details.reviewList.find(review => review.userId === userId);
        actions.innerHTML = userHasReviewed
            ? `<button class="edit-review-button" data-location-id="${details.establishmentId}" style="padding:6px 12px;background:#f59e0b;color:white;border:none;border-radius:4px;cursor:pointer">Editar Avaliação</button>`
            : `<button class="rate-button" data-location-id="${details.establishmentId}" style="padding:6px 12px;background:#333;color:white;border:none;border-radius:4px;cursor:pointer">Avaliar</button>`;


        const rateButton = popupElement.querySelector('.rate-button') as HTMLElement;
        const editButton = popupElement.querySelector('.edit-review-button') as HTMLElement;
        if (rateButton) rateButton.onclick = () => onRateClick(details);
        if (editButton) editButton.onclick = () => onEditReviewClick(details);
      }, 50);

    }

  }, [map, locations, onRateClick, onEditReviewClick]);

  useEffect(() => {
    if (searchLocation) {
      map.flyTo([searchLocation.lat, searchLocation.lng], 18);
    }
  }, [map, searchLocation]);

  return null;
};

export default function MapContainerComponent(props: MapProps) {
  return (
    <MapContainer
      center={[-23.52437655664778, -47.46314621710714]}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapContent {...props} />
    </MapContainer>
  );
}


