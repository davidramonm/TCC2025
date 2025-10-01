// Front-End/components/views/MapPage.tsx
"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import MapHeader from "./MapHeader";
import { AddLocationForm } from "./AddLocationForm";
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import RecoveryPage from "./RecoveryPage";
import UserProfilePage from "./UserProfilePage";
import { getLocationTypeName } from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
});

// Props que a MapPage recebe do componente pai (page.tsx)
interface MapPageProps {
  isLoggedIn: boolean;
  userName: string;
  userNeeds: string[];
  onLogin: (name: string) => void;
  onRegister: (name: string, needs: string[]) => void;
  onLogout: () => void;
  onUpdateUser: (name: string) => void;
  onUpdateNeeds: (needs: string[]) => void;
}

export default function MapPage({
  isLoggedIn, userName, userNeeds, onLogin, onRegister, onLogout, onUpdateUser, onUpdateNeeds
}: MapPageProps) {
  const { toast } = useToast();
  
  const [activeModal, setActiveModal] = useState<"login" | "register" | "recovery" | "add" | "filter" | "profile" | null>(null);

  const [locations, setLocations] = useState<any[]>([]);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [addressFromClick, setAddressFromClick] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<any | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [findMyLocation, setFindMyLocation] = useState(false);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    if (!isLoggedIn) {
      toast({ title: "Ação restrita", description: "Faça login para adicionar novos locais.", variant: "destructive"});
      setActiveModal("login");
      return;
    }
    setClickedPosition(latlng);
    setActiveModal("add");
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng.lat}&lon=${latlng.lng}`);
      const data = await response.json();
      if (data && data.address) {
        const { road, house_number, suburb, city, town, village } = data.address;
        const addressParts = [road || '', house_number || '', suburb || '', city || town || village || ''].filter(Boolean);
        const uniqueAddressParts = [...new Set(addressParts)];
        setAddressFromClick(uniqueAddressParts.join(', '));
      } else { throw new Error("Endereço não encontrado"); }
    } catch (error) { setAddressFromClick("Não foi possível encontrar o endereço."); }
  };

  const handleSaveLocation = (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    // ... lógica de salvar
    setActiveModal(null);
  };
  
  const handleLocationClick = (location: any) => {
    setSearchLocation(location);
    setSelectedLocationId(location.id);
    setActiveModal(null);
  };
  
  const filteredLocations = useMemo(() => {
    let result = locations;
    if (activeFilters.length > 0) {
        result = result.filter(location => 
            activeFilters.some(filter => location.typeValues.includes(filter))
        );
    }
    return result;
  }, [locations, activeFilters]);

  const performGlobalSearch = () => {
    // ...
  };

  const handleLoginSuccess = (name: string) => {
    onLogin(name);
    setActiveModal(null);
  };

  const handleRegisterSuccess = (name: string, needs: string[]) => {
    onRegister(name, needs);
    setActiveModal(null);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <MapHeader
        userName={userName}
        isLoggedIn={isLoggedIn}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        onGlobalSearch={performGlobalSearch}
        onNavigate={(view) => setActiveModal(view)}
        onLogout={onLogout}
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
          isLoggedIn={isLoggedIn}
          onAddClick={() => isLoggedIn ? setActiveModal("add") : setActiveModal("login")}
          onFilterAndListClick={() => setActiveModal("filter")}
          onMyLocationClick={() => setFindMyLocation(true)}
          onLoginClick={() => setActiveModal("login")}
        />
      </div>

      {/* --- Painel de Modais Corrigido --- */}
      <Dialog open={activeModal === 'login'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none w-full max-w-md">
          <DialogTitle className="sr-only">Login</DialogTitle>
          <LoginPage onNavigate={(view) => setActiveModal(view)} onLogin={handleLoginSuccess} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'register'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none w-full max-w-3xl">
          <DialogTitle className="sr-only">Criar Conta</DialogTitle>
          <RegisterPage onNavigate={(view) => setActiveModal(view)} onRegister={handleRegisterSuccess} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'recovery'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none w-full max-w-md">
          <DialogTitle className="sr-only">Recuperar Senha</DialogTitle>
          <RecoveryPage onNavigate={(view) => setActiveModal(view)} />
        </DialogContent>
      </Dialog>

      {/* Modal Adicionar Local - CORRIGIDO */}
      <Dialog open={activeModal === 'add'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 sm:max-w-[425px] md:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Local Acessível</DialogTitle>
            <DialogDescription>Clique no mapa para definir a localização ou preencha o endereço manualmente.</DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto px-2">
            <AddLocationForm onSaveLocation={handleSaveLocation} clickedPosition={clickedPosition} initialAddress={addressFromClick} />
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Filtrar & Listar - CORRIGIDO */}
      <Dialog open={activeModal === 'filter'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Buscar e Filtrar Locais</DialogTitle>
            <DialogDescription>Use os filtros e veja os resultados atualizados na lista abaixo.</DialogDescription>
          </DialogHeader>
          <div className="py-4 max-h-[70vh] overflow-y-auto px-1">
            <FilterAndListComponent onFilterChange={setActiveFilters} locations={filteredLocations} totalLocations={locations.length} onLocationClick={handleLocationClick} selectedLocationId={selectedLocationId} />
          </div>
        </DialogContent>
      </Dialog>
      
      {isLoggedIn && activeModal === 'profile' && (
         <UserProfilePage onClose={() => setActiveModal(null)} userName={userName} userNeeds={userNeeds} onUpdateUser={onUpdateUser} onUpdateNeeds={onUpdateNeeds} />
      )}
    </div>
  );
}