// src/features/map/components/MapPage.tsx
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocations } from "../hooks/useLocations";
import { getAddressFromCoordinates, fetchLocations, getEstablishmentFromCoordinates } from "@/lib/api";
import MapHeader from "@/components/layouts/MapHeader";
import { AddLocationForm } from "./AddLocationForm";
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import LoginPage from "@/features/authentication/components/LoginPage";
import RegisterPage from "@/features/authentication/components/RegisterPage";
import RecoveryPage from "@/features/authentication/components/RecoveryPage";
import UserSettingsPage from "@/features/authentication/components/UserSettingsPage";
import MapPageSkeleton from "./MapPageSkeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getLocationTypeName } from "@/lib/constants";
import { Establishment, Location, NecessityReview } from "@/types";
import ReviewLocationModal from "./ReviewLocationModal";
import FloatingHelpButton from "@/components/layouts/FloatingHelpButton";
import WelcomeModal from "@/components/layouts/WelcomeModal";

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-200 animate-pulse" />,
});

export default function MapPage() {
  const { toast } = useToast();
  const { isLoggedIn, login, register, firstName, lastName, email, userNeeds, updateUserName, updateNeeds } = useAuth();

  const [activeModal, setActiveModal] = useState<"login" | "register" | "recovery" | "add" | "filter" | null>(null);

  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { filteredLocations } = useLocations(allLocations, activeFilters);

  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [establishmentFromClick, setEstablishmentFromClick] = useState<Establishment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [findMyLocation, setFindMyLocation] = useState(false);

  const [reviewModalState, setReviewModalState] = useState<{
    isOpen: boolean;
    locationId: number | null;
    locationName: string | null;
    isEditing: boolean;
    initialData?: {
      rating: number;
      description: string;
      types: NecessityReview[];
    }
  }>({ isOpen: false, locationId: null, locationName: null, isEditing: false });

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const locations = await fetchLocations();
        console.log(locations);
        setAllLocations(locations);
      } catch (error) {
        toast({
          title: "Erro ao carregar locais",
          description: "Não foi possível buscar os dados. Tente novamente mais tarde.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [toast]);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    if (!isLoggedIn) {
      toast({ title: "Ação restrita", description: "Faça login para adicionar novos locais.", variant: "destructive" });
      setActiveModal("login");
      return;
    }
    setClickedPosition(latlng);
    setActiveModal("add");
    const establishment = await getEstablishmentFromCoordinates(latlng.lat, latlng.lng);
    setEstablishmentFromClick(establishment);
  };

  const handleSaveLocation = (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    const newLocation: Location = {
      establishmentId: Date.now(), // Gera um ID temporário
      name: formData.name.trim(),
      xCoords: clickedPosition.lat,
      yCoords: clickedPosition.lng,
    };
    setAllLocations((prevLocations) => [...prevLocations, newLocation]);
    toast({ title: "Local salvo com sucesso!" });
    setActiveModal(null);
  };

  const handleLocationClick = (location: Location) => {
    setSearchLocation({ ...location });
    setSelectedLocationId(location.establishmentId);
    setActiveModal(null);
  };

  const handleReviewClick = (establishment: Establishment, isEditing = false) => {
    if (!isLoggedIn) {
      setActiveModal("login");
    } else {
      setReviewModalState({
        isOpen: true,
        locationId: establishment.establishmentId,
        locationName: establishment.name,
        isEditing,
        initialData: isEditing ? {
          rating: establishment.reviewList[0]?.rating || 0,
          description: establishment.reviewList[0]?.comment || "",
          types: establishment.reviewList[1]?.necessityReviewList || [],
        } : undefined,
      });

    }
  };

  const handleSaveReview = (reviewData: { rating: number; selectedTypes: NecessityReview[]; description: string }) => {
    if (reviewModalState.locationId) {
      setAllLocations(prevLocations =>
        prevLocations.map(loc =>
          loc.establishmentId === reviewModalState.locationId ? {
            ...loc,
            rating: reviewData.rating,
            typeValues: reviewData.selectedTypes,
            description: reviewData.description || "",
          } : loc
        )
      );

      toast({
        title: reviewModalState.isEditing ? "Avaliação Atualizada!" : "Avaliação Salva!",
        description: `Obrigado por contribuir com informações sobre ${reviewModalState.locationName}.`,
      });
      setReviewModalState({ isOpen: false, locationId: null, locationName: null, isEditing: false });
    }
  };

  const performGlobalSearch = () => {
    const normalizedQuery = searchTerm.toLowerCase().trim();
    if (!normalizedQuery) return;
    const searchResults = allLocations.filter((location) =>
      location.name.toLowerCase().includes(normalizedQuery)  //||
      // location.address.toLowerCase().includes(normalizedQuery) ||
      // location.typeValues.some((type: string) => getLocationTypeName(type).toLowerCase().includes(normalizedQuery))
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
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <MapContainerComponent
            locations={filteredLocations}
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
            onMapClick={handleMapClick}
            findMyLocation={findMyLocation}
            onMyLocationFound={() => setFindMyLocation(false)}
            onRateClick={(establishment) => handleReviewClick(establishment)}
            onEditReviewClick={(establishment) => handleReviewClick(establishment, true)}
          />
        </div>
        <FloatingMenu
          onAddClick={() => isLoggedIn ? setActiveModal("add") : setActiveModal("login")}
          onFilterAndListClick={() => setActiveModal("filter")}
          onMyLocationClick={() => setFindMyLocation(true)}
        />
        <FloatingHelpButton onClick={() => setIsHelpModalOpen(true)} />
      </div>

      {/* --- Modais --- */}
      <Dialog open={activeModal === 'login'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Login</DialogTitle>
          <LoginPage onNavigate={(view) => setActiveModal(view)} onLogin={(email, password) => { login(email, password); setActiveModal(null); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'register'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogTitle className="sr-only">Criar Conta</DialogTitle>
          <RegisterPage onNavigate={(view) => setActiveModal(view)} onRegister={(fName, lName, email, password, needs) => { register(fName, lName, email, password, needs); setActiveModal(null); }} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'recovery'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Recuperar Senha</DialogTitle>
          <RecoveryPage onNavigate={(view) => setActiveModal(view)} />
        </DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'add'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 sm:max-w-[425px] md:max-w-[600px]"><DialogHeader><DialogTitle>Adicionar Local</DialogTitle><DialogDescription>Preencha as informações do novo local.</DialogDescription></DialogHeader><div className="py-4 max-h-[70vh] overflow-y-auto px-2"><AddLocationForm onSaveLocation={handleSaveLocation} clickedPosition={clickedPosition} initialData={establishmentFromClick} /></div></DialogContent>
      </Dialog>
      <Dialog open={activeModal === 'filter'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 max-w-[700px]"><DialogHeader><DialogTitle>Filtrar & Listar Locais</DialogTitle><DialogDescription>Selecione filtros para refinar a busca.</DialogDescription></DialogHeader><div className="py-4 max-h-[70vh] overflow-y-auto px-1"><FilterAndListComponent onFilterChange={setActiveFilters} activeFilters={activeFilters} locations={filteredLocations} totalLocations={allLocations.length} onLocationClick={handleLocationClick} selectedLocationId={selectedLocationId} /></div></DialogContent>
      </Dialog>

      {isLoggedIn && isSettingsOpen && (
        <UserSettingsPage
          onClose={() => setIsSettingsOpen(false)}
          firstName={firstName}
          lastName={lastName}
          email={email}
          userNeeds={userNeeds}
          onUpdateNeeds={updateNeeds}
          onUpdateUser={updateUserName}
        />
      )}

      <ReviewLocationModal
        isOpen={reviewModalState.isOpen}
        onClose={() => setReviewModalState({ isOpen: false, locationId: null, locationName: null, isEditing: false })}
        onSubmit={handleSaveReview}
        locationName={reviewModalState.locationName}
        initialData={reviewModalState.initialData}
      />

      <WelcomeModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
}