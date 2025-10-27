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

// Props do componente
interface MapContainerComponentProps {
  locations: Location[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: Location | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  findMyLocation: boolean;
  onMyLocationFound: () => void;
  onRateClick: (establishment: Establishment) => void;
  onEditReviewClick: (establishment: Establishment) => void; // Nova prop para edição
  onLocationSelect: (location: Location) => void;
}

// Ícone customizado
const IconComponent = MapPin;

const iconString = renderToStaticMarkup(<IconComponent color="white" size={20} />);

const iconHtml = `<div style="background: linear-gradient( to bottom right, #4b5563,#1f2937); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;


const customIcon = L.divIcon({

  className: "location-marker",
  html: iconHtml,
  iconSize: [40, 40],
  iconAnchor: [20, 40],

});

// Ícone customizado
// const customIcon = new L.Icon({
//   iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

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

function MapController({ searchLocation }: { searchLocation: Location | null }) {
  const map = useMap();
  useEffect(() => {
    if (searchLocation) {
      map.flyTo([searchLocation.xCoords, searchLocation.yCoords], 18);
    }
  }, [searchLocation, map]);

  return null;
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


