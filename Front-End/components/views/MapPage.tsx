"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { renderToStaticMarkup } from "react-dom/server";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Plus,
  Search,
  Menu,
  LogOut,
  Star,
  Camera,
  Navigation,
  MessageCircle,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Accessibility,
  Save,
  User,
  Bath,
  ChevronsUp,
  Footprints,
  Eye,
  Grip,
  ParkingSquare,
  Volume2,
  BookOpenText,
  MoveHorizontal,
} from "lucide-react";

const tiposAcessibilidade = [
  { value: "rampa", label: "Rampa de acesso", icon: Accessibility, color: "#4b5563" },
  { value: "banheiro", label: "Banheiro adaptado", icon: Bath, color: "#6b7280" },
  { value: "elevador", label: "Elevador acessível", icon: ChevronsUp, color: "#374151" },
  { value: "piso", label: "Piso tátil", icon: Footprints, color: "#9ca3af" },
  { value: "sinalizacao", label: "Sinalização tátil", icon: Eye, color: "#6b7280" },
  { value: "corrimao", label: "Corrimão", icon: Grip, color: "#4b5563" },
  { value: "vagas", label: "Vagas especiais", icon: ParkingSquare, color: "#374151" },
  { value: "audio", label: "Sinalização sonora", icon: Volume2, color: "#6b7280" },
  { value: "braille", label: "Sinalização em Braille", icon: BookOpenText, color: "#4b5563" },
  { value: "circulacao", label: "Espaço para circulação", icon: MoveHorizontal, color: "#9ca3af" },
];

const getLocationIcon = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.icon : null;
};


const getLocationTypeName = (type: string) => {
  const item = tiposAcessibilidade.find((t) => t.value === type);
  return item ? item.label : type;
};

interface Location {
  id: number;
  name: string;
  address: string;
  typeValue: string;
  description: string;
  rating: number;
  lat: number;
  lng: number;
}

interface MapProps {
  locations: Location[];
  clickedPosition: { lat: number; lng: number } | null;
  searchLocation: Location | null;
  onMapClick: (latlng: { lat: number; lng: number }) => void;
  onMarkerClick: (location: Location) => void;
}

const MapContainerComponent = dynamic(
  async () => {
    const React = await import("react");
    const { MapContainer, TileLayer, useMapEvents } = await import("react-leaflet");
    const L = await import("leaflet");
    import("leaflet/dist/leaflet.css");

    const MapContent = (props: MapProps) => {
      const { locations, clickedPosition, searchLocation, onMarkerClick, onMapClick } = props;
      const markersRef = React.useRef<L.Marker[]>([]);
      const clickPopupRef = React.useRef<L.Popup | null>(null);

      const map = useMapEvents({
        click: (e: L.LeafletMouseEvent) => onMapClick(e.latlng),
      });

      React.useEffect(() => {
        markersRef.current.forEach((marker) => map.removeLayer(marker));
        markersRef.current = [];

        locations.forEach((location) => {
          const tipo = tiposAcessibilidade.find((t) => t.value === location.typeValue);
          const IconComponent = tipo?.icon || MapPin;

          // Renderiza o ícone React para uma string HTML para ser usada no mapa
          const iconString = renderToStaticMarkup(<IconComponent color="white" size={20} />);
          const iconHtml = `<div style="background: ${tipo?.color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">${iconString}</div>`;
          
          const icon = L.divIcon({
            className: "location-marker",
            html: iconHtml,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          });
          const marker = L.marker([location.lat, location.lng], { icon }).addTo(map);

          let popupContent = `
            <div style="font-family: inherit; line-height: 1.5;">
              <h4 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h4>
              <p style="margin: 4px 0; font-size: 14px;">Endereço: ${location.address}</p>
              <p style="margin: 4px 0; font-size: 14px;">Tipo: ${getLocationTypeName(location.typeValue)}</p>
              ${location.rating ? `<p style="margin: 4px 0; font-size: 14px;">Avaliação: ${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}</p>` : ""}
              ${location.description ? `<p style="margin: 4px 0; font-size: 14px;">Descrição: ${location.description}</p>` : ""}
            </div>
          `;
          marker.bindPopup(popupContent);
          marker.on("click", () => onMarkerClick(location));
          markersRef.current.push(marker);
        });

        if (clickPopupRef.current) {
          map.removeLayer(clickPopupRef.current);
          clickPopupRef.current = null;
        }
        if (clickedPosition) {
           clickPopupRef.current = L.popup()
            .setLatLng(clickedPosition)
            .setContent("Local selecionado para adicionar ponto de acessibilidade.")
            .openOn(map);
        }
      }, [map, locations, clickedPosition, onMarkerClick]);

      React.useEffect(() => {
        if (searchLocation) {
          map.flyTo([searchLocation.lat, searchLocation.lng], 18);
          const marker = markersRef.current.find(m => m.getLatLng().lat === searchLocation.lat && m.getLatLng().lng === searchLocation.lng);
          if (marker) {
            setTimeout(() => marker.openPopup(), 500);
          }
        }
      }, [map, searchLocation]);

      return null;
    };

    return (props: MapProps) => (
      <MapContainer
        center={[-23.52437655664778, -47.46314621710714]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapContent {...props} />
      </MapContainer>
    );
  },
  { ssr: false }
);

export default function MapPage({ onNavigate, userName }: { onNavigate: (view: "login" | "profile") => void, userName: string }) {
  const { toast } = useToast();
  const [selectedRating, setSelectedRating] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchLocation, setSearchLocation] = useState<Location | null>(null);

  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
  });

  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: "Shopping Center Acessível",
      address: "Rua das Flores, 123",
      typeValue: "rampa",
      description: "Shopping com excelente acessibilidade, incluindo rampas, banheiros adaptados e elevadores.",
      rating: 5,
      lat: -23.5505,
      lng: -46.6333,
    },
    {
      id: 2,
      name: "Praça da Paz",
      address: "Avenida da Liberdade, 456",
      typeValue: "circulacao",
      description: "Praça com amplos espaços para circulação e piso tátil.",
      rating: 4,
      lat: -23.54,
      lng: -46.65,
    },
  ]);

  const toggleAccessibilityType = (typeValue: string) => {
    setSelectedAccessibilityTypes((prev) =>
      prev.includes(typeValue) ? prev.filter((t) => t !== typeValue) : [typeValue],
    );
  };

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng);
    setFormData((prev) => ({
      ...prev,
      address: `Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`,
    }));
    toast({
      title: "Localização selecionada!",
      description: "Agora preencha o formulário para adicionar o local.",
      duration: 3000,
    });
  };

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !clickedPosition || selectedAccessibilityTypes.length === 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    const newLocation: Location = {
      id: Date.now(),
      name: formData.name.trim(),
      address: formData.address.trim(),
      typeValue: selectedAccessibilityTypes[0],
      description: formData.description.trim(),
      rating: selectedRating,
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    };
    setLocations((prev) => [...prev, newLocation]);
    setFormData({ name: "", address: "", description: "" });
    setSelectedAccessibilityTypes([]);
    setSelectedRating(0);
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
      getLocationTypeName(location.typeValue).toLowerCase().includes(normalizedQuery)
    );
  };

  const handleGlobalSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Aviso",
        description: "Digite algo para pesquisar.",
        variant: "destructive",
      });
      return;
    }
    const results = performSearch(searchTerm);
    if (results.length > 0) {
      setSearchLocation(results[0]);
      toast({
        title: "Pesquisa realizada!",
        description: `${results.length} local(is) encontrado(s).`,
      });
    } else {
      toast({
        title: "Nenhum resultado",
        description: "Nenhum local encontrado.",
        variant: "destructive",
      });
    }
  };

  const handleLocationClick = (location: Location) => {
    setSearchLocation(location);
    toast({
      title: "Navegando para local",
      description: `Focalizando em: ${location.name}`,
    });
  };

  const renderStars = (rating: number, interactive = false) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => interactive && setSelectedRating(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          disabled={!interactive}
        >
          <Star
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );

  const filteredLocations = useMemo(() => {
    if (!searchTerm) {
      return locations;
    }
    return performSearch(searchTerm);
  }, [locations, searchTerm]);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
            <Menu className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Mapa Acessível
            </h1>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8 relative">
          <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
            <Search className="absolute left-4 w-4 h-4 text-gray-400 z-10" />
            <Input
              placeholder="Pesquisar locais, tipos de acessibilidade, endereços..."
              className="pl-12 pr-12 border-0 bg-transparent focus:ring-0 h-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleGlobalSearch()}
            />
            <Button
              size="sm"
              className="rounded-full bg-gray-600 hover:bg-gray-700 h-8 px-3 absolute right-1"
              onClick={handleGlobalSearch}
            >
              <Search className="w-3 h-3" />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" className="flex items-center gap-2" onClick={() => onNavigate("profile")}>
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">
                {userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline font-medium">{userName}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate("login")}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <div className={`flex-1 flex overflow-hidden`}>
        <div
          className={`w-96 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:w-96 `}
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                <Plus className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold">Adicionar Local</h2>
              </div>

              <form onSubmit={handleSaveLocation} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location-name">Nome do Local *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location-name"
                      placeholder="Nome do local"
                      className="pl-10"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location-address">Endereço *</Label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location-address"
                      placeholder="Clique no mapa para selecionar"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                      required
                    />
                  </div>
                  {!clickedPosition && (
                    <p className="text-sm text-amber-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Clique no mapa para selecionar a localização
                    </p>
                  )}
                  {clickedPosition && (
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Localização selecionada!
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Accessibility className="w-4 h-4 text-gray-600" />
                    Tipo de Acessibilidade *
                  </Label>
                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {tiposAcessibilidade.map((tipo) => {
                      const isSelected = selectedAccessibilityTypes.includes(tipo.value);
                      const Icon = tipo.icon;
                      return (
                        <div
                          key={tipo.value}
                          className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSelected
                              ? "bg-white border-2 border-gray-400 shadow-sm"
                              : "bg-transparent border-2 border-transparent hover:bg-white hover:shadow-sm"
                          }`}
                          onClick={() => toggleAccessibilityType(tipo.value)}
                        >
                          <div
                            className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                              isSelected ? "border-gray-600 bg-gray-600" : "border-gray-300"
                            }`}
                          >
                            {isSelected && <CheckCircle className="w-3 h-3 text-white" />}
                          </div>
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${tipo.color}20` }}
                          >
                            {Icon && <Icon className="w-5 h-5" style={{ color: tipo.color }}/>}
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-800">{tipo.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {selectedAccessibilityTypes.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium mb-2">
                        Selecionados ({selectedAccessibilityTypes.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAccessibilityTypes.map((typeValue) => {
                          const tipo = tiposAcessibilidade.find((t) => t.value === typeValue);
                          if (!tipo) return null;
                          const Icon = tipo.icon;
                          return (
                            <Badge
                              key={typeValue}
                              variant="secondary"
                              className="flex items-center gap-1 bg-white border"
                              style={{ borderColor: tipo.color, color: tipo.color }}
                            >
                              <Icon className="w-4 h-4"/>
                              {tipo.label}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleAccessibilityType(typeValue);
                                }}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  {selectedAccessibilityTypes.length === 0 && (
                    <p className="text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Selecione pelo menos um tipo de acessibilidade
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Textarea
                      id="description"
                      placeholder="Descreva os recursos de acessibilidade disponíveis..."
                      className="pl-10 min-h-[80px]"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Avaliação
                  </Label>
                  {renderStars(selectedRating, true)}
                </div>

                <div className="space-y-2">
                  <Label>Foto (opcional)</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Clique para adicionar uma foto</p>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900"
                  disabled={!clickedPosition || selectedAccessibilityTypes.length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Local
                </Button>
              </form>
            </div>

            <div className="locations-list">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-semibold">Locais Encontrados</h3>
              </div>
              <div className="space-y-3">
                {filteredLocations.length > 0 ? (
                  filteredLocations.map((location) => {
                    const Icon = getLocationIcon(location.typeValue);
                    return (
                    <div
                      key={location.id}
                      className="p-4 border rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer transition-colors"
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: tiposAcessibilidade.find((t) => t.value === location.typeValue)?.color + '20'
                          }}
                        >
                          {Icon && <Icon className="w-5 h-5" style={{ color: tiposAcessibilidade.find((t) => t.value === location.typeValue)?.color}}/>}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-base">{location.name}</h4>
                          <p className="text-sm text-gray-500">{location.address}</p>
                          <div className="mt-1">
                            <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                              {getLocationTypeName(location.typeValue)}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-yellow-400">{renderStars(location.rating)}</div>
                      </div>
                    </div>
                  )})
                ) : (
                  <div className="text-center text-gray-500 py-8">
                    <p>Nenhum local encontrado.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

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