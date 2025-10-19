// src/features/map/components/MapContainerComponent.tsx

"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import { Location } from "@/types";

// Props do componente
interface MapContainerComponentProps {
  locations: Location[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: Location | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  findMyLocation: boolean;
  onMyLocationFound: () => void;
  onLocationSelect: (location: Location) => void;
  onRateClick: (locationId: number) => void;
  onEditReviewClick: (locationId: number) => void;
}

// Ícone customizado
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Componente para lidar com eventos do mapa
function MapEvents({ onMapClick }: { onMapClick: (latlng: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

// Componente para centralizar o mapa na localização do usuário
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

// ===== NOVO COMPONENTE INTERNO PARA CONTROLAR O MAPA =====
// A lógica que estava causando o erro foi movida para cá.
function MapController({ searchLocation }: { searchLocation: Location | null }) {
    const map = useMap(); // Agora esta chamada é válida, pois está dentro de um componente que é filho do MapContainer
    useEffect(() => {
        if (searchLocation) {
            map.flyTo([searchLocation.lat, searchLocation.lng], 16);
        }
    }, [searchLocation, map]);

    return null; // Este componente não renderiza nada visualmente
}

// Componente principal do mapa
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
      center={[-23.55052, -46.633308]}
      zoom={13}
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

      {/* Marcador para a posição clicada */}
      {clickedPosition && (
        <Marker position={clickedPosition} icon={customIcon} />
      )}

      {/* Marcadores para as localizações */}
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
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