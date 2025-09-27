// Front-End/components/views/MapPage.tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import MapHeader from "./MapHeader";
import { AddLocationForm } from "./AddLocationForm";
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import { getLocationTypeName } from "@/lib/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
});

export default function MapPage({ onNavigate, userName }: { onNavigate: (view: "login" | "profile") => void, userName: string }) {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFilterListModalOpen, setIsFilterListModalOpen] = useState(false);
  const [findMyLocation, setFindMyLocation] = useState(false);
  
  const [locations, setLocations] = useState<any[]>([
     {
      id: 1,
      name: "Shopping Center Acessível",
      address: "Rua das Flores, 123, São Paulo",
      typeValues: ["rampa", "banheiro", "elevador"],
      description: "Shopping com excelente acessibilidade.",
      rating: 5,
      lat: -23.5505,
      lng: -46.6333,
    },
    {
      id: 2,
      name: "Praça da Paz",
      address: "Avenida da Liberdade, 456, São Paulo",
      typeValues: ["circulacao", "piso"],
      description: "Praça com amplos espaços para circulação e piso tátil.",
      rating: 4,
      lat: -23.54,
      lng: -46.65,
    },
  ]);

  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [addressFromClick, setAddressFromClick] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<any | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng);
    setIsAddModalOpen(true);
    
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`);
      const data = await response.json();
      
      if (data && data.address) {
        const { road, house_number, suburb, city, town, village } = data.address;
        const addressParts = [
          road || '', house_number || '', suburb || '', city || town || village || ''
        ].filter(Boolean);
        const uniqueAddressParts = [...new Set(addressParts)];
        const cleanAddress = uniqueAddressParts.join(', ');
        setAddressFromClick(cleanAddress);
        toast({
          title: "Localização selecionada!",
          description: `Endereço: ${cleanAddress}`,
          duration: 4000,
        });
      } else { throw new Error("Endereço não encontrado"); }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      setAddressFromClick("Não foi possível encontrar o endereço.");
      toast({
        title: "Erro",
        description: "Não foi possível obter o endereço para essa localização.",
        variant: "destructive",
      });
    }
  };

  const handleSaveLocation = (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    if (!formData.name.trim() || !formData.address.trim() || !clickedPosition || selectedTypes.length === 0) {
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
    setAddressFromClick("");
    setIsAddModalOpen(false);
    toast({
      title: "Local adicionado com sucesso!",
      description: `${newLocation.name} foi adicionado ao mapa.`,
    });
  };
  
  const handleLocationClick = (location: any) => {
    setSearchLocation(location);
    setSelectedLocationId(location.id);
    setIsFilterListModalOpen(false);
  };
  
  // Esta função agora é usada APENAS para a lista dentro do modal
  const filteredLocationsForList = useMemo(() => {
    let result = locations;
    if (searchTerm.trim()) {
        const normalizedQuery = searchTerm.toLowerCase().trim();
        result = result.filter((location) =>
            location.name.toLowerCase().includes(normalizedQuery) ||
            location.address.toLowerCase().includes(normalizedQuery) ||
            location.typeValues.some((type: string) => getLocationTypeName(type).toLowerCase().includes(normalizedQuery))
        );
    }
    if (activeFilters.length > 0) {
        result = result.filter(location => 
            activeFilters.some(filter => location.typeValues.includes(filter))
        );
    }
    return result;
  }, [locations, searchTerm, activeFilters]);

  // NOVA FUNÇÃO: Busca na lista completa, ignorando os filtros
  const performGlobalSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Busca vazia",
        description: "Digite algo para pesquisar.",
      });
      return;
    }
    const normalizedQuery = searchTerm.toLowerCase().trim();
    const searchResults = locations.filter((location) =>
      location.name.toLowerCase().includes(normalizedQuery) ||
      location.address.toLowerCase().includes(normalizedQuery) ||
      location.typeValues.some((type: string) => getLocationTypeName(type).toLowerCase().includes(normalizedQuery))
    );

    if (searchResults.length > 0) {
      handleLocationClick(searchResults[0]);
    } else {
      toast({ title: "Nenhum resultado encontrado", variant: "destructive" });
    }
  };


  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MapHeader
        userName={userName}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onGlobalSearch={performGlobalSearch} // Usando a nova função de busca
        onNavigate={onNavigate}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <MapContainerComponent
            locations={filteredLocationsForList} // O mapa mostra os locais filtrados
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
            onMapClick={handleMapClick}
            onMarkerClick={handleLocationClick}
            findMyLocation={findMyLocation}
            onMyLocationFound={() => setFindMyLocation(false)}
          />
        </div>

        <FloatingMenu
          onAddClick={() => {
            setClickedPosition(null);
            setAddressFromClick("");
            setIsAddModalOpen(true);
          }}
          onFilterAndListClick={() => setIsFilterListModalOpen(true)}
          onMyLocationClick={() => setFindMyLocation(true)}
        />
      </div>
      
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[600px] z-50">
            <DialogHeader>
                <DialogTitle>Adicionar Novo Local Acessível</DialogTitle>
                <DialogDescription>
                    Clique no mapa para definir a localização ou preencha o endereço manualmente.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[70vh] overflow-y-auto px-2">
                <AddLocationForm
                    onSaveLocation={handleSaveLocation}
                    clickedPosition={clickedPosition}
                    initialAddress={addressFromClick}
                />
            </div>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isFilterListModalOpen} onOpenChange={setIsFilterListModalOpen}>
        <DialogContent className="sm:max-w-[425px] md:max-w-[700px] z-50">
            <DialogHeader>
                <DialogTitle>Buscar e Filtrar Locais</DialogTitle>
                <DialogDescription>
                    Use os filtros para encontrar locais e veja os resultados atualizados na lista abaixo.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 max-h-[70vh] overflow-y-auto px-1">
                <FilterAndListComponent
                  onFilterChange={setActiveFilters}
                  locations={filteredLocationsForList}
                  totalLocations={locations.length}
                  onLocationClick={handleLocationClick}
                  selectedLocationId={selectedLocationId}
                />
            </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}