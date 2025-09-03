"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
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
  Filter,
  X,
  Accessibility,
  Save,
} from "lucide-react"

interface MapPageProps {
  onNavigate: (view: "login") => void
}

const AccessibilityIcons = {
  rampa: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 18L21 6M21 6V14M21 6H13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M3 18H8L12 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  banheiro: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="8" cy="8" r="2" fill={color} />
      <path d="M8 12v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 15h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="16" cy="8" r="2" fill={color} />
      <path d="M16 12v6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 15h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M14 12h4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  elevador: ({ className = "w-6 h-6", color = "#374151" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 6L12 2L16 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 18L12 22L16 18" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="7" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1" />
      <line x1="7" y1="14" x2="17" y2="14" stroke={color} strokeWidth="1" />
    </svg>
  ),
  piso: ({ className = "w-6 h-6", color = "#9ca3af" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill={color} />
      <path
        d="M21 9V7L15 7.5L13.5 7L11 7.5C9.84 7.89 9 8.94 9 10.2V11H11V10.5C11 10.22 11.22 10 11.5 10L12 9.5L13 10L15 9.5L19 9.5V11H21V9Z"
        fill={color}
      />
      <path d="M13 12H11V22H13V12Z" fill={color} />
      <path d="M15 12H17V22H15V12Z" fill={color} />
      <circle cx="4" cy="4" r="1" fill={color} />
      <circle cx="8" cy="4" r="1" fill={color} />
      <circle cx="4" cy="8" r="1" fill={color} />
      <circle cx="8" cy="8" r="1" fill={color} />
      <circle cx="4" cy="12" r="1" fill={color} />
      <circle cx="8" cy="12" r="1" fill={color} />
    </svg>
  ),
  sinalizacao: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 12h8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <path d="M16.24 7.76L18.36 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7.76 16.24L5.64 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16.24 16.24L18.36 18.36" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7.76 7.76L5.64 5.64" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  corrimao: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12h18" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <path d="M6 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 8v8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="8" r="2" fill={color} />
      <circle cx="12" cy="8" r="2" fill={color} />
      <circle cx="18" cy="8" r="2" fill={color} />
    </svg>
  ),
  vagas: ({ className = "w-6 h-6", color = "#374151" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
      <path d="M7 10V14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10H10C10.55 10 11 10.45 11 11V13C11 13.55 10.55 14 10 14H7" stroke={color} strokeWidth="2" />
      <circle cx="16" cy="9" r="1.5" fill={color} />
      <path d="M14.5 11.5C14.5 11.5 15 12 16 12C17 12 17.5 11.5 17.5 11.5V14.5H14.5V11.5Z" fill={color} />
      <path d="M6 18V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M18 18V20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  audio: ({ className = "w-6 h-6", color = "#6b7280" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 5L6 9H2V15H6L11 19V5Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={color}
      />
      <path
        d="M19.07 4.93C20.9 6.76 20.9 9.24 19.07 11.07"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.54 8.46C16.15 9.07 16.15 10.93 15.54 11.54"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  braille: ({ className = "w-6 h-6", color = "#4b5563" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="2" fill={color} />
      <circle cx="6" cy="12" r="2" fill={color} />
      <circle cx="6" cy="18" r="2" fill={color} />
      <circle cx="12" cy="6" r="2" fill={color} />
      <circle cx="12" cy="18" r="2" fill={color} />
      <circle cx="18" cy="6" r="2" fill={color} />
      <circle cx="18" cy="12" r="2" fill={color} />
      <circle cx="18" cy="18" r="2" fill={color} />
    </svg>
  ),
  circulacao: ({ className = "w-6 h-6", color = "#9ca3af" }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 17L17 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7H17V17" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12H7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 12H21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 3V7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 17V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const tiposAcessibilidade = [
  { value: "rampa", label: "🛤️ Rampa de acesso", color: "#4b5563" },
  { value: "banheiro", label: "🚻 Banheiro adaptado", color: "#6b7280" },
  { value: "elevador", label: "🛗 Elevador acessível", color: "#374151" },
  { value: "piso", label: "👣 Piso tátil", color: "#9ca3af" },
  { value: "sinalizacao", label: "🔍 Sinalização tátil", color: "#6b7280" },
  { value: "corrimao", label: "🤚 Corrimão", color: "#4b5563" },
  { value: "vagas", label: "🅿️ Vagas especiais", color: "#374151" },
  { value: "audio", label: "🔊 Sinalização sonora", color: "#6b7280" },
  { value: "braille", label: "⠃ Sinalização em Braille", color: "#4b5563" },
  { value: "circulacao", label: "↔️ Espaço para circulação", color: "#9ca3af" },
]

const LeafletMap = ({ onMapClick, locations, clickedPosition, searchLocation }: any) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const clickMarkerRef = useRef<any>(null)

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      rampa: "#4b5563",
      banheiro: "#6b7280",
      elevador: "#374151",
      piso: "#9ca3af",
      sinalizacao: "#6b7280",
      corrimao: "#4b5563",
      vagas: "#374151",
      audio: "#6b7280",
      braille: "#4b5563",
      circulacao: "#9ca3af",
    }
    return colors[type] || "#6b7280"
  }

  const adjustColor = (color: string, amount: number) => {
    const num = Number.parseInt(color.replace("#", ""), 16)
    const amt = Math.round(2.55 * amount)
    const R = (num >> 16) + amt
    const G = ((num >> 8) & 0x00ff) + amt
    const B = (num & 0x0000ff) + amt
    return `#${(
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)}`
  }

  const getIconPath = (type: string, color = "white", strokeWidth = "1.5") => {
    const paths: { [key: string]: string } = {
      rampa: `<path d="M3 18L21 6M21 6V14M21 6H13" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 18H8L12 14" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
      banheiro: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><circle cx="8" cy="8" r="1.5" fill="${color}"/><path d="M8 11v5" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M6.5 13.5h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="16" cy="8" r="1.5" fill="${color}"/><path d="M16 11v5" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M14.5 13.5h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M14.5 11h3" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/>`,
      elevador: `<rect x="4" y="2" width="16" height="20" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M8 6L12 2L16 6" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 18L12 22L16 18" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="10" x2="17" y2="10" stroke="${color}" strokeWidth="1"/><line x1="7" y1="14" x2="17" y2="14" stroke="${color}" strokeWidth="1"/>`,
      piso: `<circle cx="4" cy="4" r="1" fill="${color}"/><circle cx="8" cy="4" r="1" fill="${color}"/><circle cx="4" cy="8" r="1" fill="${color}"/><circle cx="8" cy="8" r="1" fill="${color}"/><circle cx="4" cy="12" r="1" fill="${color}"/><circle cx="8" cy="12" r="1" fill="${color}"/><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="${color}"/><path d="M13 12H11V22H13V12Z" fill="${color}"/><path d="M15 12H17V22H15V12Z" fill="${color}"/>`,
      sinalizacao: `<circle cx="12" cy="12" r="8" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M8 12h8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M12 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="12" cy="12" r="2" fill="${color}"/>`,
      corrimao: `<path d="M3 12h18" stroke="${color}" strokeWidth="2" strokeLinecap="round"/><path d="M6 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M12 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M18 8v8" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><circle cx="6" cy="8" r="1.5" fill="${color}"/><circle cx="12" cy="8" r="1.5" fill="${color}"/><circle cx="18" cy="8" r="1.5" fill="${color}"/>`,
      vagas: `<rect x="2" y="6" width="20" height="12" rx="2" stroke="${color}" strokeWidth="${strokeWidth}" fill="none"/><path d="M7 10V14" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round"/><path d="M7 10H10C10.55 10 11 10.45 11 11V13C11 13.55 10.55 14 10 14H7" stroke="${color}" strokeWidth="${strokeWidth}"/><circle cx="16" cy="9" r="1" fill="${color}"/><path d="M14.5 11.5C14.5 11.5 15 12 16 12C17 12 17.5 11.5 17.5 11.5V14.5H14.5V11.5Z" fill="${color}"/>`,
      audio: `<path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round" fill="${color}"/><path d="M19.07 4.93C20.9 6.76 20.9 9.24 19.07 11.07" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.54 8.46C16.15 9.07 16.15 10.93 15.54 11.54" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
      braille: `<circle cx="6" cy="6" r="1.5" fill="${color}"/><circle cx="6" cy="12" r="1.5" fill="${color}"/><circle cx="6" cy="18" r="1.5" fill="${color}"/><circle cx="12" cy="6" r="1.5" fill="${color}"/><circle cx="12" cy="18" r="1.5" fill="${color}"/><circle cx="18" cy="6" r="1.5" fill="${color}"/><circle cx="18" cy="12" r="1.5" fill="${color}"/><circle cx="18" cy="18" r="1.5" fill="${color}"/>`,
      circulacao: `<path d="M7 17L17 7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 7H17V17" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 12H7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 12H21" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 3V7" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 17V21" stroke="${color}" strokeWidth="${strokeWidth}" strokeLinecap="round" strokeLinejoin="round"/>`,
    }
    return paths[type] || `<circle cx="12" cy="12" r="6" fill="${color}"/>`
  }

  useEffect(() => {
    if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
      // Import Leaflet CSS
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      link.crossOrigin = ""
      document.head.appendChild(link)

      import("leaflet").then((L) => {
        // Initialize map with proper error handling
        const defaultCoords = [-23.52437655664778, -47.46314621710714]
        const map = L.map(mapRef.current!, {
          center: defaultCoords,
          zoom: 16,
          zoomControl: true,
          attributionControl: true,
          preferCanvas: false,
        })

        // Add tile layer with error handling
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          tileSize: 256,
          zoomOffset: 0,
        }).addTo(map)

        // Force map to invalidate size after a short delay
        setTimeout(() => {
          map.invalidateSize()
        }, 100)

        // Add click event listener
        map.on("click", (e: any) => {
          // Remove previous click marker
          if (clickMarkerRef.current) {
            map.removeLayer(clickMarkerRef.current)
          }

          // Create new click marker
          clickMarkerRef.current = L.marker(e.latlng, {
            icon: L.divIcon({
              className: "click-marker",
              html: '<div style="background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            }),
          }).addTo(map)

          onMapClick(e.latlng)
        })

        mapInstanceRef.current = map
      })
    }
  }, [onMapClick])

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      import("leaflet").then((L) => {
        const map = mapInstanceRef.current

        // Remove existing location markers
        markersRef.current.forEach((marker) => {
          map.removeLayer(marker)
        })
        markersRef.current = []

        // Add markers for each location
        locations.forEach((location: any) => {
          const iconPath = getIconPath(location.typeValue || location.type, "white", "2")
          const color = getTypeColor(location.typeValue || location.type)

          const marker = L.marker([location.lat, location.lng], {
            icon: L.divIcon({
              className: "location-marker",
              html: `<div style="background: ${color}; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none">${iconPath}</svg></div>`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            }),
          }).addTo(map)

          // Create popup content
          let popupContent = `
            <div style="font-family: inherit; line-height: 1.5;">
              <h4 style="margin: 0 0 8px 0; font-size: 16px;">${location.name}</h4>
              <p style="margin: 4px 0; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                ${location.address}
              </p>
              <p style="margin: 4px 0; display: flex; align-items: center; gap: 8px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">${iconPath}</svg>
                ${location.type || tiposAcessibilidade.find((t) => t.value === location.typeValue)?.label}
              </p>
          `

          if (location.rating) {
            popupContent += `<p style="margin: 4px 0; display: flex; align-items: center; gap: 8px; font-size: 14px; color: #ffd700;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}
            </p>`
          }

          if (location.description) {
            popupContent += `<p style="margin: 4px 0; display: flex; align-items: flex-start; gap: 8px; font-size: 14px;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-top: 2px; flex-shrink: 0;"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h11c.55 0 1-.45 1-1z"/></svg>
              ${location.description}
            </p>`
          }

          if (location.accessibilityTypes && location.accessibilityTypes.length > 1) {
            popupContent += `<div style="margin: 8px 0;">
              <p style="margin: 4px 0; font-size: 12px; font-weight: bold;">Outras acessibilidades:</p>
              <div style="display: flex; flex-wrap: wrap; gap: 4px;">
            `
            location.accessibilityTypes.slice(1).forEach((type: string) => {
              const tipoInfo = tiposAcessibilidade.find((t) => t.value === type)
              if (tipoInfo) {
                popupContent += `<span style="background: ${tipoInfo.color}20; color: ${tipoInfo.color}; padding: 2px 6px; border-radius: 12px; font-size: 11px; border: 1px solid ${tipoInfo.color}40;">${tipoInfo.label.replace(/^.+?\s/, "")}</span>`
              }
            })
            popupContent += `</div></div>`
          }

          popupContent += `</div>`

          marker.bindPopup(popupContent)
          markersRef.current.push(marker)
        })
      })
    }
  }, [locations])

  useEffect(() => {
    if (mapInstanceRef.current && searchLocation) {
      mapInstanceRef.current.flyTo([searchLocation.lat, searchLocation.lng], 18)

      // Find and open popup for the search location
      markersRef.current.forEach((marker) => {
        const markerLatLng = marker.getLatLng()
        if (markerLatLng.lat === searchLocation.lat && markerLatLng.lng === searchLocation.lng) {
          setTimeout(() => marker.openPopup(), 500)
        }
      })
    }
  }, [searchLocation])

  useEffect(() => {
    if (mapInstanceRef.current && typeof window !== "undefined") {
      import("leaflet").then((L) => {
        const map = mapInstanceRef.current

        // Remove previous click marker
        if (clickMarkerRef.current) {
          map.removeLayer(clickMarkerRef.current)
        }

        // Add new click marker if position exists
        if (clickedPosition) {
          clickMarkerRef.current = L.marker(clickedPosition, {
            icon: L.divIcon({
              className: "click-marker",
              html: '<div style="background: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>',
              iconSize: [30, 30],
              iconAnchor: [15, 30],
            }),
          }).addTo(map)
        }
      })
    }
  }, [clickedPosition])

  return <div ref={mapRef} className="w-full h-full min-h-[400px]" style={{ height: "100%", minHeight: "400px" }} />
}

export default function MapPage({ onNavigate }: MapPageProps) {
  const { toast } = useToast()

  const [selectedRating, setSelectedRating] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [clickedPosition, setClickedPosition] = useState<{ lat: number; lng: number } | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTerm, setFilterTerm] = useState("")
  const [searchLocation, setSearchLocation] = useState<any>(null)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
  const [advancedSearchFilters, setAdvancedSearchFilters] = useState({
    minRating: 0,
    maxDistance: 10,
    hasDescription: false,
    accessibilityCount: 0,
  })
  const [selectedAccessibilityTypes, setSelectedAccessibilityTypes] = useState<string[]>([])
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    type: "",
    description: "",
  })

  const [locations, setLocations] = useState([
    {
      id: 1,
      name: "Shopping Center Acessível",
      address: "Rua das Flores, 123",
      type: "🛤️ Rampa de acesso",
      typeValue: "rampa",
      accessibilityTypes: ["rampa", "banheiro", "elevador"],
      description: "Shopping com excelente acessibilidade, incluindo rampas, banheiros adaptados e elevadores.",
      rating: 5,
      lat: -23.5505,
      lng: -46.6333,
    },
  ])

  const toggleAccessibilityType = (typeValue: string) => {
    setSelectedAccessibilityTypes((prev) =>
      prev.includes(typeValue) ? prev.filter((t) => t !== typeValue) : [...prev, typeValue],
    )
  }

  const handleMapClick = (latlng: { lat: number; lng: number }) => {
    setClickedPosition(latlng)
    setFormData((prev) => ({
      ...prev,
      address: `Lat: ${latlng.lat.toFixed(6)}, Lng: ${latlng.lng.toFixed(6)}`,
    }))

    toast({
      title: "Localização selecionada!",
      description: "Agora preencha o formulário para adicionar o local.",
      duration: 3000,
    })
  }

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Nome obrigatório",
        description: "Por favor, informe o nome do local.",
        variant: "destructive",
      })
      return
    }

    if (!clickedPosition) {
      toast({
        title: "Selecione uma localização",
        description: "Clique no mapa para selecionar onde adicionar o local.",
        variant: "destructive",
      })
      return
    }

    if (selectedAccessibilityTypes.length === 0) {
      toast({
        title: "Selecione pelo menos um tipo de acessibilidade",
        description: "É necessário informar quais tipos de acessibilidade estão disponíveis.",
        variant: "destructive",
      })
      return
    }

    const newLocation = {
      id: Date.now(), // Use timestamp for unique ID
      name: formData.name.trim(),
      address:
        formData.address.trim() || `Lat: ${clickedPosition.lat.toFixed(6)}, Lng: ${clickedPosition.lng.toFixed(6)}`,
      type: tiposAcessibilidade.find((t) => t.value === selectedAccessibilityTypes[0])?.label || "",
      typeValue: selectedAccessibilityTypes[0],
      accessibilityTypes: [...selectedAccessibilityTypes], // Create a copy
      description: formData.description.trim(),
      rating: selectedRating || 0,
      lat: clickedPosition.lat,
      lng: clickedPosition.lng,
    }

    setLocations((prev) => {
      const updated = [...prev, newLocation]
      console.log("[v0] New location added:", newLocation)
      console.log("[v0] Total locations:", updated.length)
      return updated
    })

    setFormData({ name: "", address: "", type: "", description: "" })
    setSelectedAccessibilityTypes([])
    setSelectedRating(0)
    setClickedPosition(null)

    toast({
      title: "Local adicionado com sucesso!",
      description: `${newLocation.name} foi adicionado ao mapa.`,
    })

    if (window.mapInstance) {
      console.log("[v0] Refreshing map markers")
      // The map will automatically update through the locations state change
    }
  }

  const performIntelligentSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return []

    return locations.filter((location) => {
      const nameMatch = location.name.toLowerCase().includes(normalizedQuery)
      const addressMatch = location.address.toLowerCase().includes(normalizedQuery)
      const descriptionMatch = location.description?.toLowerCase().includes(normalizedQuery)
      const accessibilityMatch = (location.accessibilityTypes || [location.typeValue]).some((type) => {
        const tipoInfo = tiposAcessibilidade.find((t) => t.value === type)
        return tipoInfo?.label.toLowerCase().includes(normalizedQuery) || type.toLowerCase().includes(normalizedQuery)
      })

      return nameMatch || addressMatch || descriptionMatch || accessibilityMatch
    })
  }

  const generateSearchSuggestions = (query: string) => {
    if (!query || query.length < 2) return []

    const suggestions = []
    const normalizedQuery = query.toLowerCase()

    locations.forEach((location) => {
      if (location.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.push({
          type: "location",
          text: location.name,
          subtitle: location.address,
          data: location,
        })
      }
    })

    tiposAcessibilidade.forEach((tipo) => {
      if (tipo.label.toLowerCase().includes(normalizedQuery)) {
        const count = locations.filter((loc) => (loc.accessibilityTypes || [loc.typeValue]).includes(tipo.value)).length
        suggestions.push({
          type: "accessibility",
          text: tipo.label.replace(/^.+?\s/, ""),
          subtitle: `${count} local(is) disponível(is)`,
          data: tipo,
        })
      }
    })

    return suggestions
      .filter((suggestion, index, self) => index === self.findIndex((s) => s.text === suggestion.text))
      .slice(0, 8)
  }

  const handleGlobalSearch = async () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Aviso",
        description: "Digite algo para pesquisar.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    await new Promise((resolve) => setTimeout(resolve, 300))

    const results = performIntelligentSearch(searchTerm)
    setSearchResults(results)

    if (!searchHistory.includes(searchTerm)) {
      const newHistory = [searchTerm, ...searchHistory.slice(0, 9)]
      setSearchHistory(newHistory)
      localStorage.setItem("searchHistory", JSON.stringify(newHistory))
    }

    if (results.length > 0) {
      const firstResult = results[0]
      setSearchLocation(firstResult)
      setFilterTerm(searchTerm)

      toast({
        title: "Pesquisa realizada!",
        description: `${results.length} local(is) encontrado(s). Focalizando no primeiro resultado.`,
      })
    } else {
      toast({
        title: "Nenhum resultado",
        description: "Nenhum local encontrado. Tente termos diferentes ou use filtros.",
        variant: "destructive",
      })
    }

    setIsSearching(false)
    setShowSuggestions(false)
  }

  const getFilteredLocations = () => {
    let filtered = locations

    if (activeFilters.length > 0) {
      filtered = filtered.filter((location) =>
        activeFilters.some((filter) => (location.accessibilityTypes || [location.typeValue]).includes(filter)),
      )
    }

    if (filterTerm) {
      filtered = performIntelligentSearch(filterTerm)
    }

    if (showAdvancedSearch) {
      filtered = filtered.filter((location) => {
        if (advancedSearchFilters.minRating > 0 && location.rating < advancedSearchFilters.minRating) {
          return false
        }
        if (advancedSearchFilters.hasDescription && !location.description?.trim()) {
          return false
        }
        const accessibilityCount = location.accessibilityTypes?.length || 1
        if (
          advancedSearchFilters.accessibilityCount > 0 &&
          accessibilityCount < advancedSearchFilters.accessibilityCount
        ) {
          return false
        }
        return true
      })
    }

    filtered.sort((a, b) => {
      const aCount = a.accessibilityTypes?.length || 1
      const bCount = b.accessibilityTypes?.length || 1
      if (aCount !== bCount) return bCount - aCount
      return (b.rating || 0) - (a.rating || 0)
    })

    return filtered
  }

  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value)

    if (value.length >= 2) {
      const suggestions = generateSearchSuggestions(value)
      setSearchSuggestions(suggestions)
      setShowSuggestions(suggestions.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSuggestionSelect = (suggestion: any) => {
    setSearchTerm(suggestion.text)
    setShowSuggestions(false)

    if (suggestion.type === "location") {
      setSearchLocation(suggestion.data)
      setFilterTerm(suggestion.text)
    } else if (suggestion.type === "accessibility") {
      handleFilterToggle(suggestion.data.value)
    }
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory")
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  const handleLocationClick = (location: any) => {
    setSearchLocation(location)
    toast({
      title: "Navegando para local",
      description: `Focalizando em: ${location.name}`,
    })
  }

  const renderStars = (rating: number, interactive = false) => {
    return (
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
    )
  }

  const handleFilterToggle = (type: string) => {
    setActiveFilters((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const clearAllFilters = () => {
    setActiveFilters([])
  }

  const handleKeyPress = (e: any, callback: () => void) => {
    if (e.key === "Enter") {
      callback()
    }
  }

  const filteredLocations = getFilteredLocations()

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
              className="pl-12 pr-32 border-0 bg-transparent focus:ring-0 h-10"
              value={searchTerm}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, handleGlobalSearch)}
              onFocus={() => {
                if (searchTerm.length >= 2) {
                  setShowSuggestions(true)
                }
              }}
            />

            <div className="absolute right-1 flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                className={`rounded-full h-8 w-8 p-0 ${showAdvancedSearch ? "bg-gray-200 text-gray-700" : ""}`}
                title="Pesquisa avançada"
              >
                <Filter className="w-3 h-3" />
              </Button>

              <Button
                size="sm"
                className="rounded-full bg-gray-600 hover:bg-gray-700 h-8 px-3"
                onClick={handleGlobalSearch}
                disabled={isSearching}
              >
                {isSearching ? <Loader2 className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
              </Button>
            </div>
          </div>

          {/* ... existing code for suggestions and search history ... */}
        </div>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-gradient-to-br from-gray-600 to-gray-800 text-white">U</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline font-medium">Usuário</span>
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

      {/* ... existing code for advanced search filters ... */}

      <div className={`flex-1 flex overflow-hidden ${showAdvancedSearch ? "h-[calc(100vh-16rem)]" : ""}`}>
        <div
          className={`w-96 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${sidebarOpen ? "" : "lg:w-0 lg:border-r-0"}`}
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
                    Tipos de Acessibilidade *
                  </Label>
                  <p className="text-sm text-gray-600 mb-3">
                    Selecione todos os tipos de acessibilidade disponíveis neste local
                  </p>

                  <div className="grid grid-cols-1 gap-2 max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
                    {tiposAcessibilidade.map((tipo) => {
                      const IconComponent = AccessibilityIcons[tipo.value as keyof typeof AccessibilityIcons]
                      const isSelected = selectedAccessibilityTypes.includes(tipo.value)

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
                            <IconComponent className="w-4 h-4" color={tipo.color} />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-800">
                              {tipo.label.replace(/^.+?\s/, "")}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {selectedAccessibilityTypes.length > 0 && (
                    <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium mb-2">
                        Selecionados ({selectedAccessibilityTypes.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedAccessibilityTypes.map((typeValue) => {
                          const tipo = tiposAcessibilidade.find((t) => t.value === typeValue)
                          const IconComponent = AccessibilityIcons[typeValue as keyof typeof AccessibilityIcons]
                          return (
                            <Badge
                              key={typeValue}
                              variant="secondary"
                              className="flex items-center gap-1 bg-white border"
                              style={{ borderColor: tipo?.color, color: tipo?.color }}
                            >
                              <IconComponent className="w-3 h-3" color={tipo?.color} />
                              {tipo?.label.replace(/^.+?\s/, "")}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleAccessibilityType(typeValue)
                                }}
                                className="ml-1 hover:text-red-600"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          )
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
                  disabled={selectedAccessibilityTypes.length === 0}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Local
                </Button>
              </form>
            </div>

            {/* ... existing code for locations list ... */}
          </div>
        </div>

        <div className="flex-1 relative bg-gray-100">
          {clickedPosition && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white px-4 py-2 rounded-lg z-[1000] flex items-center gap-2 shadow-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Localização selecionada! Preencha o formulário.</span>
            </div>
          )}

          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 z-[1000] max-w-xs">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-gray-600" />
              Tipos de Acessibilidade
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {tiposAcessibilidade.slice(0, 6).map((tipo) => {
                const IconComponent = AccessibilityIcons[tipo.value as keyof typeof AccessibilityIcons]
                return (
                  <div key={tipo.value} className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: tipo.color }}
                    >
                      <IconComponent className="w-3 h-3" color="white" />
                    </div>
                    <span className="truncate">{tipo.label.replace(/^.+?\s/, "")}</span>
                  </div>
                )
              })}
            </div>
            {tiposAcessibilidade.length > 6 && (
              <p className="text-xs text-gray-500 mt-2">+{tiposAcessibilidade.length - 6} outros tipos</p>
            )}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                <span className="font-medium">Múltiplas acessibilidades:</span> Locais podem ter vários tipos
              </p>
            </div>
          </div>

          <LeafletMap
            onMapClick={handleMapClick}
            locations={filteredLocations}
            clickedPosition={clickedPosition}
            searchLocation={searchLocation}
          />
        </div>
      </div>
    </div>
  )
}
