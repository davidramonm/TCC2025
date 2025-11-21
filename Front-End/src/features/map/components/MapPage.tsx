// src/features/map/components/MapPage.tsx

"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLocations } from "../hooks/useLocations";
import { getAddressFromCoordinates, fetchLocations, getEstablishmentFromCoordinates, saveEstablishment, saveReview, getEstablishmentById } from "@/lib/api";
import MapHeader from "@/components/layouts/MapHeader";
import FilterAndListComponent from "./FilterAndListComponent";
import FloatingMenu from "./FloatingMenu";
import LoginPage from "@/features/authentication/components/LoginPage";
import RegisterPage from "@/features/authentication/components/RegisterPage";
import RecoveryPage from "@/features/authentication/components/RecoveryPage";
import UserSettingsPage from "@/features/authentication/components/UserSettingsPage";
import MapPageSkeleton from "./MapPageSkeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Establishment, Location, Necessity } from "@/types";
import ReviewLocationModal from "./ReviewLocationModal";
import FloatingHelpButton from "@/components/layouts/FloatingHelpButton";
import WelcomeModal from "@/components/layouts/WelcomeModal";
import LocationDetailCard from "./LocationDetailCard";

// Importação dinâmica do mapa para evitar erros de SSR (Server Side Rendering) com o Leaflet
const MapContainerComponent = dynamic(() => import("./MapContainerComponent"), {
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-200 animate-pulse" />,
});

/**
 * @component MapPage
 * @description Página principal da aplicação. Atua como o "Controller" ou "Orquestrador".
 * Responsabilidades:
 * 1. Gerenciar estado global da tela (modais, usuário logado, loading).
 * 2. Buscar dados iniciais (locais).
 * 3. Integrar o mapa interativo com a lista lateral e os detalhes.
 * 4. Gerenciar o fluxo de criação/edição de avaliações.
 * @returns {JSX.Element} A página completa do mapa.
 */
export default function MapPage() {
  const { toast } = useToast();

  // Integração com Contexto de Autenticação
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

  // Estados de UI e Controle
  const [activeModal, setActiveModal] = useState<"login" | "register" | "recovery" | "filter" | null>(null);
  const [allLocations, setAllLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Hook customizado para filtrar locais
  const { filteredLocations } = useLocations(allLocations, activeFilters);

  // Estados do Mapa
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [establishmentFromClick, setEstablishmentFromClick] = useState<Establishment | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [findMyLocation, setFindMyLocation] = useState(false);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  // Estado para o Modal de Avaliação
  const [reviewModalState, setReviewModalState] = useState<{
    isOpen: boolean;
    establishment: Establishment | null;
    isEditing: boolean;
    createNew?: boolean;
    newName?: string;
    initialData?: {
      rating: number;
      description: string;
      types: Necessity[];
    }
  }>({ isOpen: false, establishment: null, isEditing: false });

  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Effect: Carregamento inicial dos dados
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
  }, [toast, userId, firstName]);

  /**
   * @function handleMapClick
   * @description Lida com cliques no mapa.
   * - Se o usuário não estiver logado, solicita login.
   * - Verifica se clicou em um estabelecimento existente.
   * - Se clicou em um espaço vazio, faz geocodificação reversa para sugerir um endereço para um novo local.
   */
  const handleMapClick = async (latlng: { lat: number; lng: number }) => {
    if (!isLoggedIn) {
      toast({ title: "Ação restrita", description: "Faça login para adicionar novos locais.", variant: "destructive" });
      setActiveModal("login");
      return;
    }
    setSelectedEstablishment(null);
    const establishment = await getEstablishmentFromCoordinates(latlng.lat, latlng.lng);

    if (establishment) {
      handleLocationClick(establishment as Location, establishment);
      setEstablishmentFromClick(establishment);
    } else {
      try {
        const address = await getAddressFromCoordinates(latlng.lat, latlng.lng);
        const newEstablishmentStub: Establishment = {
          establishmentId: "",
          name: "Novo Local",
          address: address,
          xCoords: latlng.lat,
          yCoords: latlng.lng,
          rating: 0,
          topNecessities: [],
          reviewList: []
        };
        setEstablishmentFromClick(newEstablishmentStub);
        setSelectedEstablishment({ ...newEstablishmentStub });
        setActiveModal(null);
      } catch (error) {
        toast({ title: "Erro ao buscar endereço", description: "Não foi possível obter o endereço para este local.", variant: "destructive" });
      }
    }
  };

  /**
   * @function handleLocationClick
   * @description Seleciona um local, centraliza o mapa nele e abre o card de detalhes.
   */
  const handleLocationClick = async (location: Location, hEstablishment?: Establishment) => {
    setSearchLocation({ ...location });
    if (!location.establishmentId && hEstablishment) {
      setSelectedEstablishment(hEstablishment);
      return;
    }

    setSelectedLocationId(location.establishmentId);
    const establishment = await getEstablishmentById(location.establishmentId);
    
    setSelectedEstablishment(establishment ?? null);
    setActiveModal(null);
  };

  /**
   * @function handleReviewClick
   * @description Prepara e abre o modal de avaliação.
   * Verifica se é uma nova avaliação ou edição de uma existente.
   */
  const handleReviewClick = (establishment: Establishment, newName?: string) => {
    if (!isLoggedIn) {
      setActiveModal("login");
    } else {
      const userReview = establishment.reviewList?.find(review => review.userId === userId) ?? undefined;
      setReviewModalState({
        isOpen: true,
        establishment: establishment,
        isEditing: !!userReview,
        createNew: establishment.establishmentId === null,
        newName: newName,
        initialData: userReview ? {
          rating: userReview.rating,
          description: userReview.comment,
          types: userReview.necessities,
        } : undefined,
      });
    }
  };

  /**
   * @function handleSaveReview
   * @description Salva a avaliação (e o estabelecimento, se for novo).
   * Atualiza o estado local para refletir a mudança sem precisar recarregar a página.
   */
  const handleSaveReview = async (reviewData: { rating: number; selectedTypes: Necessity[]; description: string }) => {
    let establishment = reviewModalState.establishment!;
    console.log(reviewModalState.createNew)
    
    // Se for um local novo, cria o estabelecimento primeiro
    if (reviewModalState.createNew) {
      console.log('Criando novo estabelecimento antes de salvar a avaliação...');
      const newEstablishment = await saveEstablishment(
        {
          establishmentId: "",
          name: reviewModalState.newName || "",
          address: reviewModalState.establishment?.address || "",
          xCoords: reviewModalState.establishment?.xCoords || 0,
          yCoords: reviewModalState.establishment?.yCoords || 0,
          topNecessities: [],
        }
      );
      // Atualiza o objeto local com o ID retornado
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

      setSelectedEstablishment({ ...establishment });
      setAllLocations((prevLocations) =>
        prevLocations.map((loc) =>
          loc.establishmentId === establishment.establishmentId
            ? { ...loc, name: newEstablishment.name }
            : loc
        ));
    }

    const review = await saveReview({
      establishmentId: establishment.establishmentId,
      userId: userId,
      rating: reviewData.rating,
      comment: reviewData.description,
      necessities: reviewData.selectedTypes,
    });

    if (establishment.establishmentId && review) {
        // Atualização otimista da UI
        setAllLocations((prev) => {
          const exists = prev.some((loc) => loc.establishmentId === establishment.establishmentId);

          if (exists) {
            return prev.map((loc) =>
              loc.establishmentId === establishment.establishmentId
                ? { ...loc, ...establishment }
                : loc
            );
          } else {
            return [...prev, establishment];
          }
        });

        handleLocationClick(establishment as Location);

        toast({
          title: reviewModalState.isEditing ? "Avaliação Atualizada!" : "Avaliação Salva!",
          description: `Obrigado por contribuir com informações sobre ${establishment.name}.`,
        });
        setReviewModalState({ isOpen: false, establishment: null, isEditing: false });
    }
  };

  const performGlobalSearch = (location: Location) => {
    console.log("Performing global search for location:", location);
    handleMapClick({ lat: location.xCoords, lng: location.yCoords });
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
        onGlobalSearch = {(location) => performGlobalSearch(location)}
        onNavigate={(view) => setActiveModal(view)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mapa ocupa toda a área, com margem condicional quando o card de detalhes abre */}
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
            createNew={selectedEstablishment.establishmentId === null}
            onClose={() => setSelectedEstablishment(null)}
            onAddReview={(establishment, newName) => handleReviewClick(establishment, newName)}
            onEditReview={(establishment) => handleReviewClick(establishment)}
          />
        )}

        <FloatingMenu
          onFilterAndListClick={() => setActiveModal("filter")}
          onMyLocationClick={() => setFindMyLocation(true)}
        />
        <FloatingHelpButton onClick={() => setIsHelpModalOpen(true)} />
      </div>

      {/* --- Modais --- */}
      <Dialog open={activeModal === 'login'} onOpenChange={(isOpen) => !isOpen && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="sr-only">Login</DialogTitle>
          <LoginPage onNavigate={(view) => setActiveModal(view)} onLoginSuccess={() => { setActiveModal(null); }} />
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
          profileImage={profileImage || ""}
          onUpdateNeeds={updateNeeds}
          onUpdateUser={updateUser}
        />
      )}

      <ReviewLocationModal
        isOpen={reviewModalState.isOpen}
        onClose={() => setReviewModalState({ isOpen: false, establishment: null, isEditing: false })}
        onSubmit={handleSaveReview}
        locationName={reviewModalState.establishment?.name || ""}
        initialData={reviewModalState.initialData}
      />

      <WelcomeModal isOpen={isHelpModalOpen} onClose={() => setIsHelpModalOpen(false)} />
    </div>
  );
}