// Front-End/src/components/layouts/SearchBar.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import apiClient from "@/lib/api";
import { Location } from "@/types";

interface SearchBarProps {
    /** Callback executado ao clicar em um resultado da lista */
    onSelectResult: (location: Location) => void;
}

/**
 * @component SearchBar
 * @description Componente de busca com auto-complete (typeahead).
 * Implementa técnica de **Debounce** para otimizar requisições à API e
 * melhorar a performance, evitando buscas a cada tecla digitada.
 * @param {SearchBarProps} props - Propriedades do componente.
 */
export default function SearchBar({ onSelectResult }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Location[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    
    // Ref para armazenar o timer do debounce e cancelá-lo se necessário
    const timeoutRef = useRef<number | null>(null);
    // Ref para detectar cliques fora do componente
    const dropdownRef = useRef<HTMLDivElement>(null);

    /**
     * @effect ClickOutside
     * Fecha a lista de resultados se o usuário clicar fora do componente.
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * @effect DebouncedSearch
     * Monitora mudanças no input 'query'.
     * Aguarda 400ms após a última digitação antes de disparar a requisição ao backend.
     */
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        // Limpa o timer anterior se o usuário digitar novamente antes dos 400ms
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Inicia novo timer
        timeoutRef.current = window.setTimeout(async () => {
            try {
                const res = await apiClient.get(`/establishments/search?query=${encodeURIComponent(query)}`);
                const data = await res.data as Location[];
                // Limita a 5 resultados para não poluir a UI
                setResults(data.slice(0, 5));
                setIsOpen(true);
            } catch (err) {
                console.error("Search error:", err);
            }
        }, 400); // Delay de 400ms
    }, [query]);

    const handleSelect = (result: Location) => {
        setQuery(result.name);
        setIsOpen(false);
        onSelectResult(result);
    };

    /**
     * @function highlightMatch
     * Destaca em negrito a parte do texto que corresponde ao termo pesquisado.
     */
    const highlightMatch = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "ig");
        const parts = text.split(regex);
        return parts.map((part, index) =>
            regex.test(part) ? (
                <strong key={index} className="font-semibold text-gray-900">{part}</strong>
            ) : (
                <span key={index}>{part}</span>
            )
        );
    };

    return (
        <div className="relative w-full max-w-lg" ref={dropdownRef}>
            <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-sm">
                <Search className="absolute left-4 w-4 h-4 text-gray-400 z-10" />
                <Input
                    type="text"
                    placeholder="Pesquisar por nome, endereço ou tipo de acessibilidade..."
                    className="pl-12 pr-12 border-0 bg-transparent focus:ring-0 h-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                />
            </div>

            {isOpen && results.length > 0 && (
                <Card className="absolute w-full mt-2 shadow-lg border z-50">
                    <ul className="divide-y divide-gray-200">
                        {results.map((res) => (
                            <li
                                key={res.establishmentId}
                                className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                                onClick={() => handleSelect(res)}
                            >
                                <p className="font-medium text-gray-800">
                                    {highlightMatch(res.name, query)}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                    {highlightMatch(res.address, query)}
                                </p>
                            </li>
                        ))}
                    </ul>
                </Card>
            )}
        </div>
    );
}