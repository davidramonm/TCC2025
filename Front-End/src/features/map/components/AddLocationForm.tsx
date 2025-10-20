// src/features/map/components/AddLocationForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Navigation, CheckCircle, AlertCircle, Save } from "lucide-react";
import { tiposAcessibilidade } from "@/lib/constants";
import { StarRating } from "@/components/ui/star-rating";
import { Establishment } from "@/types";

interface AddLocationFormProps {
  onSaveLocation: (formData: any, clickedPosition: any, selectedTypes: any, rating: number) => void;
  clickedPosition: { lat: number; lng: number } | null;
  initialData: Establishment | null;
}

export function AddLocationForm({ onSaveLocation, clickedPosition, initialData }: AddLocationFormProps) {
  const [formData, setFormData] = useState({ name: "", address: "", description: "" });
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);


  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, name: initialData.name, address: initialData.address || "" }));
    }
  }, [initialData]);

  const toggleAccessibilityType = (typeValue: string) => {
    setSelectedAccessibilityTypes((prev) =>
      prev.includes(typeValue) ? prev.filter((t) => t !== typeValue) : [...prev, typeValue]
    );
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLocation(formData, clickedPosition, selectedAccessibilityTypes, selectedRating);
  };


  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location-name">Nome do Local *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input id="location-name" placeholder="Ex: Shopping Acessível" className="pl-10" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="location-address">Endereço *</Label>
        <div className="relative">
          <Navigation className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input id="location-address" placeholder="Clique no mapa para preencher" className="pl-10" value={formData.address} onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))} required />
        </div>
        {clickedPosition ? <p className="text-xs text-green-600 flex items-center gap-1"><CheckCircle className="w-4 h-4" /> Localização selecionada no mapa!</p> : <p className="text-xs text-amber-600 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> Clique no mapa para selecionar</p>}
      </div>
      <div className="space-y-2">
        <Label>Tipos de Acessibilidade *</Label>
        <div className="grid grid-cols-2 gap-2 border rounded-lg p-3 bg-gray-50 max-h-48 overflow-y-auto">
          {tiposAcessibilidade.map((tipo) => (
            <div key={tipo.value} className="flex items-center gap-3 p-2 rounded-lg">
              <Checkbox 
                id={`check-${tipo.value}`}
                checked={selectedAccessibilityTypes.includes(tipo.value)}
                onCheckedChange={() => toggleAccessibilityType(tipo.value)}
              />
              <Label htmlFor={`check-${tipo.value}`} className="flex items-center gap-3 cursor-pointer">
                <tipo.icon className="w-5 h-5" style={{ color: tipo.color }} />
                <span className="text-sm font-medium text-gray-800">{tipo.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" placeholder="Descreva os recursos de acessibilidade disponíveis..." value={formData.description} onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))} />
      </div>
      <div className="space-y-2">
        <Label>Avaliação</Label>
        <StarRating 
          rating={selectedRating} 
          interactive={true} 
          onRatingChange={setSelectedRating} 
          size={5}
        />
      </div>
      <Button type="submit" className="w-full" disabled={!clickedPosition || selectedAccessibilityTypes.length === 0}>
        <Save className="w-4 h-4 mr-2" /> Salvar Local
      </Button>
    </form>
  );
}