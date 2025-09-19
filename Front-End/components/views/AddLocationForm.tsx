// Front-End/components/views/AddLocationForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Plus,
  Star,
  Camera,
  Navigation,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  X,
  Accessibility,
  Save,
} from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";

interface AddLocationFormProps {
  onSaveLocation: (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => void;
  clickedPosition: { lat: number; lng: number } | null;
}

export function AddLocationForm({ onSaveLocation, clickedPosition }: AddLocationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", address: "", description: "" });
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const toggleAccessibilityType = (typeValue: string) => {
    setSelectedAccessibilityTypes((prev) =>
      prev.includes(typeValue)
        ? prev.filter((t) => t !== typeValue)
        : [...prev, typeValue] // <-- CORREÇÃO APLICADA AQUI
    );
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLocation(formData, clickedPosition, selectedAccessibilityTypes, selectedRating);
    // Reset form state after saving
    setFormData({ name: "", address: "", description: "" });
    setSelectedAccessibilityTypes([]);
    setSelectedRating(0);
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

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 pb-2 border-b">
        <Plus className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold">Adicionar Local</h2>
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Fields for the form */}
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
                    Tipos de Acessibilidade *
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
  );
}