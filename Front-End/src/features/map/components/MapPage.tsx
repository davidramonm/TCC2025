// src/features/map/components/MapPage.tsx

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocations } from "../hooks/useLocations";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import apiClient, { getAddressFromCoordinates, fetchLocations, getEstablishmentFromCoordinates, saveEstablishment, saveReview, getEstablishmentById} from "@/lib/api";
import MapHeader from "@/components/layouts/MapHeader";
import { AddLocationForm } from "./AddLocationForm";
=======
import { getAddressFromCoordinates, fetchLocations, getEstablishmentFromCoordinates, saveEstablishment, saveReview, getEstablishmentById } from "@/lib/api";
import MapHeader from "@/components/layouts/MapHeader";
>>>>>>> Stashed changes
=======
import { getAddressFromCoordinates, fetchLocations, getEstablishmentFromCoordinates, saveEstablishment, saveReview, getEstablishmentById } from "@/lib/api";
import MapHeader from "@/components/layouts/MapHeader";
>>>>>>> Stashed changes
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import LoginPage from "@/features/authentication/components/LoginPage";
import RegisterPage from "@/features/authentication/components/RegisterPage";
import RecoveryPage from "@/features/authentication/components/RecoveryPage";
import UserSettingsPage from "@/features/authentication/components/UserSettingsPage";
import MapPageSkeleton from "./MapPageSkeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { getLocationTypeName } from "@/lib/constants";
=======
import { tiposAcessibilidade } from "@/lib/constants";
>>>>>>> Stashed changes
=======
import { tiposAcessibilidade } from "@/lib/constants";
>>>>>>> Stashed changes
import { Establishment, Location, Necessity } from "@/types";
import ReviewLocationModal from "./ReviewLocationModal";
import FloatingHelpButton from "@/components/layouts/FloatingHelpButton";
import WelcomeModal from "@/components/layouts/WelcomeModal";
<<<<<<< Updated upstream
import LocationDetailCard from "./LocationDetailCard"; // Importando o novo card
=======
import LocationDetailCard from "./LocationDetailCard";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-200 animate-pulse" />,
});

const MOCK_REVIEWS = [
  { id: 1, user: { id: 2, name: "Maria Silva" }, rating: 5, description: "Excelente acesso com rampas bem construídas!" },
  { id: 2, user: { id: 3, name: "João Santos" }, rating: 4, description: "Banheiro adaptado muito bom, mas a entrada principal é um pouco estreita." },
];

const MOCK_USER_REVIEW = (userId: number, userName: string) => ({
    id: 99, user: { id: userId, name: `${userName} (Você)`}, rating: 3, description: "Faltou piso tátil na área externa."
});

export default function MapPage() {
  const { toast } = useToast();
<<<<<<< Updated upstream
  const { isLoggedIn, userId, login, register, firstName, lastName, email, userNeeds, updateUserName, updateNeeds } = useAuth();
=======
  
  const { 
    isLoggedIn, 
    userId, 
    register, 
    firstName, 
    lastName, 
    email, 
    userNeeds, 
    updateUser, 
    updateNeeds,
    profileImage 
  } = useAuth();
>>>>>>> Stashed changes

  const [activeModal, setActiveModal] = useState<"login" | "register" | "recovery" | "add" | "filter" | null>(null);

  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const { filteredLocations } = useLocations(allLocations, activeFilters);

  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [establishmentFromClick, setEstablishmentFromClick] = useState<Establishment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [findMyLocation, setFindMyLocation] = useState(false);
  
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const [reviewModalState, setReviewModalState] = useState<{
    isOpen: boolean;
    locationId: string | null;
    locationName: string | null;
    isEditing: boolean;
    initialData?: {
      rating: number;
      description: string;
      types: Necessity[];
    }
  }>({ isOpen: false, locationId: null, locationName: null, isEditing: false });

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const locations = await fetchLocations();
        console.log("Locais carregados:", locations);
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
  }, [toast, userId, firstName]);

  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    if (!isLoggedIn) {
      toast({ title: "Ação restrita", description: "Faça login para adicionar novos locais.", variant: "destructive" });
      setActiveModal("login");
      return;
    }
    setSelectedEstablishment(null);
    setClickedPosition(latlng);
    const establishment = await getEstablishmentFromCoordinates(latlng.lat, latlng.lng);


    setActiveModal("add");
    setEstablishmentFromClick(establishment);


  };

  const handleSaveEstablishment = async (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => {
    const newLocation: Location = {
      establishmentId: "", // Gera um ID temporário
      address: formData.address.trim(),
      name: formData.name.trim(),
      xCoords: clickedPosition.lat,
      yCoords: clickedPosition.lng,
    };
    const location = await saveEstablishment(newLocation);
    setAllLocations((prevLocations) => [...prevLocations,  location]);
    toast({ title: "Local salvo com sucesso!" });
    setActiveModal(null);
  };

  const handleLocationClick = async (location: Location) => {
    setSearchLocation({ ...location });
    setSelectedLocationId(location.establishmentId);
    const establishment = await getEstablishmentById(location.establishmentId);
    setSelectedEstablishment(establishment ?? null);
    setActiveModal(null);
  };

  const handleReviewClick = (establishment: Establishment) => {
    if (!isLoggedIn) {
      setActiveModal("login");
    } else {

      const userReview = establishment.reviewList.find(review => review.userId === userId);
      setReviewModalState({
        isOpen: true,
        locationId: establishment.establishmentId,
        locationName: establishment.name,
        isEditing: !!userReview,
        initialData: userReview ? {
          rating: userReview.rating,
          description: userReview.comment,
          types: userReview.necessities,
        } : undefined,
      });

    }
  };

  const handleSaveReview = async (reviewData: { rating: number; selectedTypes: Necessity[]; description: string }) => {

<<<<<<< Updated upstream
    console.log("aqui: " + reviewData.selectedTypes)
=======
    let establishment = reviewModalState.establishment!;
    console.log(reviewModalState.createNew)
    if (reviewModalState.createNew) {
      console.log('Criando novo estabelecimento antes de salvar a avaliação...');
      const newEstablishment = await saveEstablishment(
        {
          establishmentId: "",
          name: reviewModalState.newName || "",
          address: reviewModalState.establishment?.address || "",
          xCoords: reviewModalState.establishment?.xCoords || 0,
          yCoords: reviewModalState.establishment?.yCoords || 0
        }
      );
      establishment = {
        establishmentId: newEstablishment.establishmentId,
        name: newEstablishment.name,
        address: newEstablishment.address,
        rating: 0,
        xCoords: newEstablishment.xCoords,
        yCoords: newEstablishment.yCoords,
        topNecessities: [],
        reviewList: []
      };

      setSelectedEstablishment(establishment);
      const savedNecessityIds = reviewData.selectedTypes.map(t => t.necessityId);
      const topNecessitiesFromIds = savedNecessityIds.map(id => {
        const foundType = tiposAcessibilidade.find(t => t.necessityId === id);
        return foundType ? foundType.value : null;
      }).filter(v => v !== null) as string[];

      const locationToAdd: Location = {
        ...newEstablishment,
        establishmentId: newEstablishment.establishmentId,
        rating: reviewData.rating,
        topNecessities: topNecessitiesFromIds
      }
      
      setAllLocations((prevLocations) => [...prevLocations, locationToAdd]);
    }

>>>>>>> Stashed changes
    const review = await saveReview({
      establishmentId: reviewModalState.locationId,
      userId: userId,
      rating: reviewData.rating,
      comment: reviewData.description,
      necessities: reviewData.selectedTypes,
    });

    console.log('Estabelecimento salvo:', review);
    if (reviewModalState.locationId) {
      
      const updatedLocations = allLocations.map(loc =>
        loc.establishmentId === reviewModalState.locationId ? {
          ...loc,
          rating: reviewData.rating,
          typeValues: reviewData.selectedTypes,
          description: reviewData.description || "",
        } : loc
      );
      setAllLocations(updatedLocations);
      
      if (selectedEstablishment && selectedEstablishment.establishmentId === reviewModalState.locationId) {
          const updatedSelected = updatedLocations.find(loc => loc.establishmentId === reviewModalState.locationId);
          if (updatedSelected) {
            const establishment = await getEstablishmentById(updatedSelected.establishmentId);
              setSelectedEstablishment(establishment);
          }
      }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
      const savedNecessityIds = reviewData.selectedTypes.map(t => t.necessityId);
      const topNecessitiesFromIds = savedNecessityIds.map(id => {
        const foundType = tiposAcessibilidade.find(t => t.necessityId === id);
        return foundType ? foundType.value : null;
      }).filter(v => v !== null) as string[];

      setAllLocations((prev) =>
        prev.map((loc) =>
          loc.establishmentId === establishment.establishmentId
            ? {
              ...loc,
              rating: reviewData.rating,
              topNecessities: topNecessitiesFromIds,
            }
            : loc
        )
      );

      

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
      // location.topNecessities.some((type: string) => getLocationTypeName(type).toLowerCase().includes(normalizedQuery))
    );
    if (searchResults.length > 0) {
      handleLocationClick(searchResults[0]);
    } else {
      toast({ title: "Nenhum resultado encontrado", variant: "destructive" });
    }
  };
  
  const checkUserReview = (establishment: Establishment | null): boolean => {
      if (!establishment || !establishment.reviewList || !isLoggedIn || !userId) return false;
      return establishment.reviewList.some(review => review.userId === userId);
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
        <div className={`flex-1 relative z-10 transition-all duration-300 ease-in-out ${selectedEstablishment ? 'mr-0 md:mr-[28rem]' : 'mr-0'}`}>
          <MapContainerComponent
            locations={filteredLocations}
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
            onMapClick={handleMapClick}
            findMyLocation={findMyLocation}
            onMyLocationFound={() => setFindMyLocation(false)}
            onRateClick={(establishment) => handleReviewClick(establishment)}
            onEditReviewClick={(establishment) => handleReviewClick(establishment)}
            onLocationSelect={handleLocationClick}
          />
        </div>
        
        {selectedEstablishment && (
          <LocationDetailCard
            establishment={selectedEstablishment}
            isUserReview={checkUserReview(selectedEstablishment)}
            onClose={() => setSelectedEstablishment(null)}
            onAddReview={(establishment) => handleReviewClick(establishment)}
            onEditReview={(establishment) => handleReviewClick(establishment)}
          />
        )}
        
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      <Dialog open={activeModal === 'add'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="z-50 sm:max-w-[425px] md:max-w-[600px]"><DialogHeader><DialogTitle>Adicionar Local</DialogTitle><DialogDescription>Preencha as informações do novo local.</DialogDescription></DialogHeader><div className="py-4 max-h-[70vh] overflow-y-auto px-2"><AddLocationForm onSaveLocation={handleSaveEstablishment} clickedPosition={clickedPosition} initialData={establishmentFromClick} /></div></DialogContent>
      </Dialog>
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
          profileImage={profileImage || ""} 
>>>>>>> Stashed changes
=======
          profileImage={profileImage || ""} 
>>>>>>> Stashed changes
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