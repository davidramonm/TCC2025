// Front-End/components/views/MapPage.tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import MapHeader from "./MapHeader";
import { Sidebar } from "./Sidebar";
import { getLocationTypeName } from "@/lib/constants";

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
});

export default function MapPage({ onNavigate, userName }: { onNavigate: (view: "login" | "profile") => void, userName: string }) {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [locations, setLocations] = useState<any[]>([
     {
      id: 1,
      name: "Shopping Center Acessível",
      address: "Rua das Flores, 123",
      typeValues: ["rampa", "banheiro", "elevador"],
      description: "Shopping com excelente acessibilidade.",
      rating: 5,
      lat: -23.5505,
      lng: -46.6333,
    },
    {
      id: 2,
      name: "Praça da Paz",
      address: "Avenida da Liberdade, 456",
      typeValues: ["circulacao", "piso"],
      description: "Praça com amplos espaços para circulação e piso tátil.",
      rating: 4,
      lat: -23.54,
      lng: -46.65,
    },
  ]);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<any | null>(null);

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng);
    toast({
      title: "Localização selecionada!",
      description: "Agora preencha o formulário para adicionar o local.",
      duration: 3000,
    });
  };

  const handleSaveLocation = (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    if (!formData.name.trim() || !clickedPosition || selectedTypes.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    const newLocation = {
      id: Date.now(),
      name: formData.name.trim(),
      address: formData.address.trim(),
      typeValues: selectedTypes,
      description: formData.description.trim(),
      rating: rating,
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    };
    setLocations((prev) => [...prev, newLocation]);
    setClickedPosition(null);
    toast({
      title: "Local adicionado com sucesso!",
      description: `${newLocation.name} foi adicionado ao mapa.`,
    });
  };

  const performSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    return locations.filter((location) =>
      location.name.toLowerCase().includes(normalizedQuery) ||
      location.address.toLowerCase().includes(normalizedQuery) ||
      location.typeValues.some((type: string) => getLocationTypeName(type).toLowerCase().includes(normalizedQuery))
    );
  };
  
  const handleGlobalSearch = () => {
    if (!searchTerm.trim()) return;
    const results = performSearch(searchTerm);
    if (results.length > 0) {
      setSearchLocation(results[0]);
    } else {
      toast({ title: "Nenhum resultado", variant: "destructive" });
    }
  };

  const handleLocationClick = (location: any) => {
    setSearchLocation(location);
  };

  const filteredLocations = useMemo(() => {
    if (!searchTerm) return locations;
    return performSearch(searchTerm);
  }, [locations, searchTerm]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MapHeader
        userName={userName}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onGlobalSearch={handleGlobalSearch}
        onNavigate={onNavigate}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          locations={filteredLocations}
          onSaveLocation={handleSaveLocation}
          onLocationClick={handleLocationClick}
          clickedPosition={clickedPosition}
        />
        <div className="flex-1 relative">
          <MapContainerComponent
            locations={locations}
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
            onMapClick={handleMapClick}
            onMarkerClick={handleLocationClick}
          />
        </div>
      </div>
    </div>
  );
}