// src/features/map/components/MapContainerComponent.tsx

"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { Establishment, Location } from "@/types";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

interface MapContainerComponentProps {
  locations: Location[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: Location | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  findMyLocation: boolean;
  onMyLocationFound: () => void;
  onRateClick: (establishment: Establishment) => void;
  onEditReviewClick: (establishment: Establishment) => void;
  onLocationSelect: (location: Location) => void;
}

const IconComponent = MapPin;
const iconString = renderToStaticMarkup(<IconComponent color="white" size={20} />);
const iconHtml = `<div style="background: linear-gradient( to bottom right, #4b5563,#1f2937); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;

const customIcon = L.divIcon({
  className: "location-marker",
  html: iconHtml,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

/**
 * @component MapEvents
 * @description Componente auxiliar para capturar eventos do mapa (cliques).
 * Utiliza o hook useMapEvents do react-leaflet.
 */
function MapEvents({ onMapClick }: { onMapClick: (latlng: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

/**
 * @component LocateUser
 * @description Componente auxiliar para geolocalização do usuário.
 * Acessa a API de geolocalização do navegador via Leaflet map.locate().
 */
function LocateUser({ findMyLocation, onMyLocationFound }: { findMyLocation: boolean, onMyLocationFound: () => void }) {
  const map = useMap();
  useEffect(() => {
    if (findMyLocation) {
      map.locate().on("locationfound", function (e) {
        map.flyTo(e.latlng, 16);
      });
      onMyLocationFound();
    }
  }, [findMyLocation, map, onMyLocationFound]);
  return null;
}

/**
 * @component MapController
 * @description Componente auxiliar para controlar programaticamente a visão do mapa.
 * Responsável por mover (flyTo) o mapa quando uma busca é realizada.
 */
function MapController({ searchLocation }: { searchLocation: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (searchLocation) {
      map.flyTo([searchLocation.xCoords, searchLocation.yCoords], 18);
    }
  }, [searchLocation, map]);

  return null;
}

/**
 * @component MapContainerComponent
 * @description Container principal do mapa Leaflet.
 * Gerencia camadas (Tiles), marcadores e interações.
 * Renderiza os componentes auxiliares de controle como filhos.
 * * @param {MapContainerComponentProps} props - Propriedades do mapa.
 * @returns {JSX.Element} O mapa interativo.
 */
export default function MapContainerComponent({
  locations,
  clickedPosition,
  searchLocation,
  onMapClick,
  findMyLocation,
  onMyLocationFound,
  onLocationSelect,
}: MapContainerComponentProps) {
  return (
    <MapContainer
      center={[-23.529327428797327, -47.47122840255941]} // Centro inicial (Sorocaba/Votorantim região)
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Renderiza os componentes de controle DENTRO do MapContainer */}
      <MapEvents onMapClick={onMapClick} />
      <LocateUser findMyLocation={findMyLocation} onMyLocationFound={onMyLocationFound} />
      <MapController searchLocation={searchLocation} />

      {/* Marcador temporário para a posição clicada (novo local em potencial) */}
      {clickedPosition && (
        <Marker position={clickedPosition} icon={customIcon} />
      )}

      {/* Marcadores para as localizações existentes */}
      {locations.map((location) => (
        <Marker
          key={location.establishmentId}
          position={[location.xCoords, location.yCoords]}
          icon={customIcon}
          eventHandlers={{
            click: () => {
              onLocationSelect(location);
            },
          }}
        />
      ))}
    </MapContainer>
  );
}