"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { StarRating } from "@/components/ui/star-rating";
import { Save, Heart } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { tiposAcessibilidade } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";
import { Necessity } from "@/types";

interface ReviewLocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reviewData: { rating: number; selectedTypes: Necessity[]; description: string }) => void;
  locationName: string | null;
  initialData?: { // Prop para receber dados existentes
    rating: number;
    description: string;
    types: Necessity[];
  };
}

export default function ReviewLocationModal({ isOpen, onClose, onSubmit, locationName, initialData }: ReviewLocationModalProps) {
  const [rating, setRating] = useState(0);
  const [description, setDescription] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<Necessity[]>([]);

  useEffect(() => {
    // Preenche o formulário com os dados iniciais quando o modal é aberto
    if (isOpen) {
      setRating(initialData?.rating || 0);
      setDescription(initialData?.description || "");
      setSelectedTypes(initialData?.types || []);
    }
  }, [isOpen, initialData]);

  const toggleAccessibilityType = (necessityId: string) => {
    setSelectedTypes((prev) => {
      const exists = prev.some(n => n.necessityId === necessityId);
      if (exists) {
        return prev.filter(n => n.necessityId !== necessityId);
      }

      const newNeed: Necessity = {
            necessityId: necessityId,
            name: "",
            description: "",
            ngroup: ""
          };
      return [...prev, newNeed];
    });
  };

  const handleSubmit = () => {
    onSubmit({ rating, selectedTypes, description });
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Limpa o estado ao fechar para a próxima utilização
      setRating(0);
      setDescription("");
      setSelectedTypes([]);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Avaliação' : 'Avaliar Local'}: {locationName}</DialogTitle>
          <DialogDescription>
            Sua contribuição ajuda a comunidade. Adicione ou confirme as características de acessibilidade, deixe uma avaliação e um comentário.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {/* Seção de Acessibilidades */}
          <div>
            <Label className="text-base font-semibold mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-600" />
              Confirmar Acessibilidades
            </Label>
            <div className="grid grid-cols-2 gap-3 p-3 border rounded-lg bg-gray-50/50">
              {tiposAcessibilidade.map((tipo) => (
                <div key={tipo.value} className="flex items-center gap-3">
                  <Checkbox
                    id={`review-${tipo.value}`}
                    checked={selectedTypes.some(nr => nr.necessityId === tipo.necessityId)}
                    onCheckedChange={() => toggleAccessibilityType(tipo.necessityId)}
                  />
                  <Label htmlFor={`review-${tipo.value}`} className="flex items-center gap-2 cursor-pointer font-normal">
                    <tipo.icon className="w-5 h-5" style={{ color: tipo.color }} />
                    {tipo.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Avaliação */}
          <div className="text-center space-y-2">
            <Label className="text-base font-semibold">Sua Avaliação Geral *</Label>
            <div className="flex justify-center">
              <StarRating rating={rating} onRatingChange={setRating} interactive size={8} />
            </div>
          </div>

          {/* Seção de Descrição */}
          <div>
            <Label htmlFor="review-description" className="text-base font-semibold">Comentário (Opcional)</Label>
            <Textarea
              id="review-description"
              placeholder="Descreva sua experiência neste local, como os recursos de acessibilidade funcionam, etc."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-2"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={rating === 0}>
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}