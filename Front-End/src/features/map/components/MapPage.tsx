// src/features/map/components/MapPage.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocations } from "../hooks/useLocations";

import { getAddressFromCoordinates } from "@/lib/api";

import MapHeader from "@/components/layouts/MapHeader";
import { AddLocationForm } from "./AddLocationForm";
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import LoginPage from "@/features/authentication/components/LoginPage";
import RegisterPage from "@/features/authentication/components/RegisterPage";
import RecoveryPage from "@/features/authentication/components/RecoveryPage";
import UserProfilePage from "@/features/authentication/components/UserProfilePage";
import MapPageSkeleton from "./MapPageSkeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { getLocationTypeName } from "@/lib/constants";
import { Location } from "@/types";

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), { 
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-200 animate-pulse" />,
});

export default function MapPage() {
  const { toast } = useToast();
  const { isLoggedIn, login, register } = useAuth();
  
  const [activeModal, setActiveModal] = useState<"login" | "register" | "recovery" | "add" | "filter" | "profile" | null>(null);
  
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const { filteredLocations } = useLocations(allLocations, activeFilters);
  
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [addressFromClick, setAddressFromClick] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [findMyLocation, setFindMyLocation] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setAllLocations([
        { id: 1, name: "Shopping Center Acessível", address: "Rua das Flores, 123, São Paulo", typeValues: ["rampa", "banheiro"], rating: 5, lat: -23.5505, lng: -46.6333, description: "Ótimo shopping." },
        { id: 2, name: "Praça da Paz", address: "Avenida da Liberdade, 456, São Paulo", typeValues: ["circulacao", "piso"], rating: 4, lat: -23.54, lng: -46.65, description: "Praça ampla." },
      ]);
      setIsLoading(false);
    };
    fetchInitialData();
  }, []);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    if (!isLoggedIn) {
      toast({ title: "Ação restrita", description: "Faça login para adicionar novos locais.", variant: "destructive"});
      setActiveModal("login");
      return;
    }
    setClickedPosition(latlng);
    setActiveModal("add");
    const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
    setAddressFromClick(address);
  };

  const handleSaveLocation = (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    const newLocation: Location = {
      id: Date.now(),
      name: formData.name.trim(),
      address: formData.address.trim(),
      typeValues: selectedTypes,
      description: formData.description.trim(),
      rating: rating,
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    };
    setAllLocations((prevLocations) => [...prevLocations, newLocation]);
    toast({ title: "Local salvo com sucesso!" });
    setActiveModal(null);
  };
  
  const handleLocationClick = (location: Location) => {
    setSearchLocation(location);
    setSelectedLocationId(location.id);
    setActiveModal(null);
  };

  const performGlobalSearch = () => {
    const normalizedQuery = searchTerm.toLowerCase().trim();
    if (!normalizedQuery) return;
    const searchResults = allLocations.filter((location) =>
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
  
  if (isLoading) return <MapPageSkeleton />;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MapHeader
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onGlobalSearch={performGlobalSearch}
        onNavigate={(view) => setActiveModal(view)}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <MapContainerComponent
            locations={filteredLocations}
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
            onMapClick={handleMapClick}
            onMarkerClick={handleLocationClick}
            findMyLocation={findMyLocation}
            onMyLocationFound={() => setFindMyLocation(false)}
          />
        </div>
        <FloatingMenu
          onAddClick={() => isLoggedIn ? setActiveModal("add") : setActiveModal("login")}
          onFilterAndListClick={() => setActiveModal("filter")}
          onMyLocationClick={() => setFindMyLocation(true)}
        />
      </div>

      <Dialog open={activeModal === 'login'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Login</DialogTitle>
          <LoginPage onNavigate={(view) => setActiveModal(view)} onLogin={(name) => { login(name); setActiveModal(null); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'register'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">Criar Conta</DialogTitle>
          <RegisterPage onNavigate={(view) => setActiveModal(view)} onRegister={(name, needs) => { register(name, needs); setActiveModal(null); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'recovery'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Recuperar Senha</DialogTitle>
          <RecoveryPage onNavigate={(view) => setActiveModal(view)} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'add'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 sm:max-w-[425px] md:max-w-[600px]"><DialogHeader><DialogTitle>Adicionar Local</DialogTitle><DialogDescription>Preencha as informações do novo local.</DialogDescription></DialogHeader><div className="py-4 max-h-[70vh] overflow-y-auto px-2"><AddLocationForm onSaveLocation={handleSaveLocation} clickedPosition={clickedPosition} initialAddress={addressFromClick} /></div></DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'filter'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 max-w-[700px]"><DialogHeader><DialogTitle>Filtrar & Listar Locais</DialogTitle><DialogDescription>Selecione filtros para refinar a busca.</DialogDescription></DialogHeader><div className="py-4 max-h-[70vh] overflow-y-auto px-1"><FilterAndListComponent onFilterChange={setActiveFilters} activeFilters={activeFilters} locations={filteredLocations} totalLocations={allLocations.length} onLocationClick={handleLocationClick} selectedLocationId={selectedLocationId} /></div></DialogContent>
      </Dialog>
      
      {}
      {isLoggedIn && activeModal === 'profile' && (
         <UserProfilePage onClose={() => setActiveModal(null)} />
      )}
    </div>
  );
}