import {
  Armchair as Wheelchair,
  Eye,
  EyeOff,
  EarOff,
  Volume2,
  Church as Crutches,
  Brain,
  Users,
  Navigation,
  Scale,
  Baby,
  Clock,
} from "lucide-react"

export const necessidades = [
  { value: "cadeirante", label: "Cadeirante", icon: Wheelchair },
  { value: "baixa-visao", label: "Baixa visão", icon: Eye },
  { value: "cegueira", label: "Cegueira", icon: EyeOff },
  { value: "surdez", label: "Surdez", icon: EarOff },
  { value: "deficiencia-auditiva", label: "Deficiência auditiva", icon: Volume2 },
  { value: "deficiencia-motora", label: "Deficiência motora", icon: Crutches },
  { value: "deficiencia-intelectual", label: "Deficiência intelectual", icon: Brain },
  { value: "autismo", label: "Autismo", icon: Users },
  { value: "mobilidade-reduzida", label: "Mobilidade reduzida", icon: Navigation },
  { value: "obesidade", label: "Obesidade", icon: Scale },
  { value: "gestante", label: "Gestante", icon: Baby },
  { value: "idoso", label: "Idoso", icon: Clock },
]

export const getPasswordStrength = (password: string) => {
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25
  return strength
}