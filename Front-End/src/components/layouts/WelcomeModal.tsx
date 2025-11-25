// Front-End/src/components/layouts/WelcomeModal.tsx
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MapPin, Search, List, Plus, Navigation, UserPlus } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * @component FeatureItem
 * @description Subcomponente para renderizar cada item da lista de funcionalidades.
 * Mantém o código do modal limpo e organizado.
 */
const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            {icon}
        </div>
        <div>
            <h3 className="font-semibold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
        </div>
    </div>
);

/**
 * @component WelcomeModal
 * @description Modal de Boas-Vindas (Onboarding).
 * Apresentado ao usuário para explicar as principais funcionalidades da plataforma:
 * Exploração, Pesquisa, Cadastro, Filtros e Geolocalização.
 * Essencial para reduzir a curva de aprendizado do usuário.
 * @param {WelcomeModalProps} props - Propriedades do componente.
 */
export default function WelcomeModal({ isOpen, onClose }: WelcomeModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Bem-vindo ao Mapa Acessível!</DialogTitle>
          <DialogDescription className="text-center">
            Sua plataforma para encontrar e compartilhar locais com acessibilidade.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            <FeatureItem
                icon={<MapPin className="w-6 h-6 text-gray-600" />}
                title="Explore o Mapa"
                description="Navegue pelo mapa para descobrir locais. Clique em um marcador para ver detalhes como endereço e os tipos de acessibilidade disponíveis."
            />
            <FeatureItem
                icon={<Search className="w-6 h-6 text-gray-600" />}
                title="Pesquisa Rápida"
                description="Use a barra de pesquisa no topo para encontrar locais por nome, endereço ou tipo de acessibilidade."
            />
            <FeatureItem
                icon={<UserPlus className="w-6 h-6 text-gray-600" />}
                title="Crie sua Conta"
                description="Cadastre-se para poder adicionar novos locais, avaliar os existentes e salvar suas preferências de acessibilidade."
            />
            <h3 className="font-bold text-center text-lg pt-4">Navegue pelo Menu</h3>
            <FeatureItem
                icon={<Plus className="w-6 h-6 text-gray-600" />}
                title="Adicionar Local"
                description="Encontrou um lugar acessível que não está no mapa? Faça login e clique aqui para adicioná-lo e ajudar a comunidade."
            />
            <FeatureItem
                icon={<List className="w-6 h-6 text-gray-600" />}
                title="Filtrar e Listar"
                description="Filtre os locais por tipos específicos de acessibilidade (rampas, banheiros, etc.) e veja os resultados em uma lista organizada."
            />
            <FeatureItem
                icon={<Navigation className="w-6 h-6 text-gray-600" />}
                title="Minha Localização"
                description="Clique para centralizar o mapa na sua posição atual e encontrar locais acessíveis perto de você."
            />
        </div>
      </DialogContent>
    </Dialog>
  );
}