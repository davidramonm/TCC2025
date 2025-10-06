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

interface MapProps {
  locations: any[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: any | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  onMarkerClick: (location: any) => void;
  findMyLocation: boolean;
  onMyLocationFound: () => void;
}

const MapContent = ({ locations, searchLocation, onMarkerClick, onMapClick, findMyLocation, onMyLocationFound }: MapProps) => {
  const map = useMapEvents({
    click: (e) => onMapClick(e.latlng),
  });
  const markersRef = useRef<L.Marker[]>([]);
  const locationMarkerRef = useRef<L.Marker | null>(null);
  const { toast } = useToast();

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
      const tipo = tiposAcessibilidade.find((t) => t.value === location.typeValues[0]);
      const IconComponent = tipo?.icon || MapPin;
      const iconString = renderToStaticMarkup(<IconComponent color="white" size={20} />);
      const iconHtml = `<div style="background: ${tipo?.color || '#e5e7eb'}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;
      
      const icon = L.divIcon({
        className: "location-marker",
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker([location.lat, location.lng], { icon }).addTo(map);
      
      const typesList = location.typeValues.map((type: string) => `<li>${getLocationTypeName(type)}</li>`).join('');
      
      const popupContent = `
        <div style="font-family: inherit; line-height: 1.5;">
          <h4 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h4>
          <p style="margin: 4px 0; font-size: 14px;">Endereço: ${location.address}</p>
          <div style="margin: 4px 0; font-size: 14px;">
            <strong>Acessibilidades:</strong>
            <ul style="margin-top: 4px; padding-left: 18px;">${typesList}</ul>
          </div>
          ${location.rating ? `<p style="margin: 4px 0; font-size: 14px;">Avaliação: ${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}</p>` : ""}
          ${location.description ? `<p style="margin: 4px 0; font-size: 14px;">Descrição: ${location.description}</p>` : ""}
        </div>
      `;
      marker.bindPopup(popupContent);
      marker.on("click", () => onMarkerClick(location));
      markersRef.current.push(marker);
    });

  }, [map, locations, onMarkerClick]);

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