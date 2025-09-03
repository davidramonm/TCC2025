// Variáveis globais
let map
let usuarioLogado
let locations = []
let clickedPosition = null
let clickMarker = null
let selectedRating = 0

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Verificar se estamos na página de login ou mapa
  if (window.location.pathname.includes("mapa.html")) {
    initMapPage()
  } else {
    initAuthPage()
  }
})

// Inicialização da página de autenticação
function initAuthPage() {
  setupAuthEventListeners()

  // Verificar se já está logado
  usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
  if (usuarioLogado) {
    window.location.href = "mapa.html"
  }
}

// Inicialização da página do mapa
function initMapPage() {
  // Verificar autenticação
  usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"))
  if (!usuarioLogado) {
    window.location.href = "index.html"
    return
  }

  // Mostrar informações do usuário
  displayUserInfo()

  // Inicializar mapa
  initMap()

  // Carregar locais
  loadLocations()

  // Configurar eventos
  setupMapEventListeners()
}

// Configurar eventos da página de autenticação
function setupAuthEventListeners() {
  // Navegação entre formulários
  document.getElementById("show-register")?.addEventListener("click", (e) => {
    e.preventDefault()
    showForm("register-box")
  })

  document.getElementById("show-login")?.addEventListener("click", (e) => {
    e.preventDefault()
    showForm("login-box")
  })

  document.getElementById("show-recovery")?.addEventListener("click", (e) => {
    e.preventDefault()
    showForm("recovery-box")
  })

  document.getElementById("back-to-login")?.addEventListener("click", (e) => {
    e.preventDefault()
    showForm("login-box")
  })

  // Formulários
  document.getElementById("login-form")?.addEventListener("submit", handleLogin)
  document.getElementById("register-form")?.addEventListener("submit", handleRegister)
  document.getElementById("recovery-form")?.addEventListener("submit", handleRecovery)

  // Toggle de senha
  document.querySelectorAll(".toggle-password").forEach((btn) => {
    btn.addEventListener("click", togglePasswordVisibility)
  })

  // Força da senha
  document.getElementById("register-senha")?.addEventListener("input", updatePasswordStrength)
}

// Mostrar formulário específico
function showForm(formId) {
  document.querySelectorAll(".auth-box").forEach((box) => {
    box.style.display = "none"
  })
  document.getElementById(formId).style.display = "block"
}

// Toggle visibilidade da senha
function togglePasswordVisibility(e) {
  const input = e.target.closest(".input-wrapper").querySelector("input")
  const icon = e.target.closest(".toggle-password").querySelector("i")

  if (input.type === "password") {
    input.type = "text"
    icon.className = "fas fa-eye-slash"
  } else {
    input.type = "password"
    icon.className = "fas fa-eye"
  }
}

// Atualizar força da senha
function updatePasswordStrength(e) {
  const password = e.target.value
  const strengthBar = document.getElementById("password-strength-bar")

  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/[0-9]/.test(password)) strength += 25
  if (/[^A-Za-z0-9]/.test(password)) strength += 25

  strengthBar.style.width = strength + "%"
}

// Manipular login
async function handleLogin(e) {
  e.preventDefault()
  showLoading(true)

  const email = document.getElementById("login-email").value
  const senha = document.getElementById("login-senha").value

  // Simular delay de autenticação
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Verificar credenciais (simulado)
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
  const usuario = usuarios.find((u) => u.email === email && u.senha === senha)

  if (usuario) {
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario))
    showToast("Login realizado com sucesso!", "success")
    setTimeout(() => {
      window.location.href = "mapa.html"
    }, 1000)
  } else {
    showToast("E-mail ou senha incorretos", "error")
  }

  showLoading(false)
}

// Manipular cadastro
async function handleRegister(e) {
  e.preventDefault()
  showLoading(true)

  const nome = document.getElementById("register-nome").value
  const email = document.getElementById("register-email").value
  const senha = document.getElementById("register-senha").value
  const necessidades = Array.from(document.querySelectorAll('input[name="necessidades"]:checked')).map((cb) => cb.value)

  // Simular delay de cadastro
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Verificar se e-mail já existe
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]")
  if (usuarios.find((u) => u.email === email)) {
    showToast("E-mail já cadastrado", "error")
    showLoading(false)
    return
  }

  // Criar novo usuário
  const novoUsuario = {
    id: Date.now().toString(),
    nome,
    email,
    senha,
    necessidades,
    dataCadastro: new Date().toISOString(),
  }

  usuarios.push(novoUsuario)
  localStorage.setItem("usuarios", JSON.stringify(usuarios))
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario))

  showToast("Cadastro realizado com sucesso!", "success")
  setTimeout(() => {
    window.location.href = "mapa.html"
  }, 1000)

  showLoading(false)
}

// Manipular recuperação de senha
async function handleRecovery(e) {
  e.preventDefault()
  showLoading(true)

  const email = document.getElementById("recovery-email").value

  // Simular envio de e-mail
  await new Promise((resolve) => setTimeout(resolve, 2000))

  showToast("Link de recuperação enviado para seu e-mail!", "success")
  setTimeout(() => {
    showForm("login-box")
  }, 2000)

  showLoading(false)
}

// Mostrar informações do usuário
function displayUserInfo() {
  const userAvatar = document.getElementById("user-avatar")
  const userName = document.getElementById("user-name")

  if (usuarioLogado) {
    // Usar primeira letra do nome como avatar
    userAvatar.textContent = usuarioLogado.nome.charAt(0).toUpperCase()
    userName.textContent = usuarioLogado.nome.split(" ")[0]
  }
}

// Inicializar mapa
function initMap() {
  const defaultCoords = [-23.52437655664778, -47.46314621710714]

  map = L.map("map").setView(defaultCoords, 16)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  map.on("click", onMapClick)

  // Mostrar instruções iniciais
  setTimeout(() => {
    const instructions = document.getElementById("map-instructions")
    if (instructions) {
      instructions.style.display = "block"
    }
  }, 1000)
}

// Carregar locais salvos
function loadLocations() {
  const savedLocations = localStorage.getItem("locations")
  if (savedLocations) {
    locations = JSON.parse(savedLocations)
    updateMapMarkers()
    updateLocationsList()
  }
}

// Configurar eventos da página do mapa
function setupMapEventListeners() {
  // Toggle sidebar
  document.getElementById("sidebar-toggle")?.addEventListener("click", toggleSidebar)

  // Formulário de local
  document.getElementById("location-form")?.addEventListener("submit", saveLocation)

  // Estrelas de avaliação
  document.querySelectorAll(".star").forEach((star) => {
    star.addEventListener("click", function () {
      selectedRating = Number.parseInt(this.getAttribute("data-value"))
      updateStars()
    })

    star.addEventListener("mouseenter", function () {
      const value = Number.parseInt(this.getAttribute("data-value"))
      highlightStars(value)
    })
  })

  document.querySelector(".rating")?.addEventListener("mouseleave", () => {
    highlightStars(selectedRating)
  })

  // Filtro de locais
  document.getElementById("location-filter")?.addEventListener("input", filterLocations)

  // Pesquisa global
  document.getElementById("global-search")?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performGlobalSearch()
    }
  })

  document.getElementById("search-btn")?.addEventListener("click", performGlobalSearch)

  // Logout
  document.getElementById("logout-btn")?.addEventListener("click", logout)
}

// Evento de clique no mapa
function onMapClick(e) {
  if (clickMarker) {
    map.removeLayer(clickMarker)
  }

  clickedPosition = e.latlng

  clickMarker = L.marker(clickedPosition, {
    icon: L.divIcon({
      className: "click-marker",
      html: '<i class="fas fa-map-marker-alt"></i>',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    }),
  }).addTo(map)

  document.getElementById("location-address").value =
    `Lat: ${clickedPosition.lat.toFixed(6)}, Lng: ${clickedPosition.lng.toFixed(6)}`

  // Esconder instruções
  const instructions = document.getElementById("map-instructions")
  if (instructions) {
    instructions.style.display = "none"
  }
}

// Salvar novo local
async function saveLocation(e) {
  e.preventDefault()

  if (!clickedPosition) {
    showToast("Por favor, selecione uma localização no mapa", "error")
    return
  }

  const name = document.getElementById("location-name").value.trim()
  const type = document.getElementById("location-type").value

  if (!name || !type) {
    showToast("Por favor, preencha todos os campos obrigatórios", "error")
    return
  }

  showLoading(true)

  // Simular salvamento
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const newLocation = {
    id: Date.now().toString(),
    name,
    address: document.getElementById("location-address").value,
    type,
    description: document.getElementById("location-description").value,
    rating: selectedRating,
    lat: clickedPosition.lat,
    lng: clickedPosition.lng,
    user: {
      id: usuarioLogado.id,
      name: usuarioLogado.nome,
    },
    date: new Date().toISOString(),
  }

  // Processar foto se houver
  const photoInput = document.getElementById("location-photo")
  if (photoInput.files.length > 0) {
    try {
      newLocation.photo = await readFileAsBase64(photoInput.files[0])
    } catch (error) {
      console.error("Erro ao processar foto:", error)
    }
  }

  locations.push(newLocation)
  localStorage.setItem("locations", JSON.stringify(locations))

  updateMapMarkers()
  updateLocationsList()

  // Limpar formulário
  document.getElementById("location-form").reset()
  selectedRating = 0
  updateStars()

  if (clickMarker) {
    map.removeLayer(clickMarker)
    clickMarker = null
  }
  clickedPosition = null

  showToast("Local adicionado com sucesso!", "success")
  showLoading(false)
}

// Atualizar marcadores no mapa
function updateMapMarkers() {
  // Remover marcadores existentes (exceto o de clique)
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker && layer !== clickMarker) {
      map.removeLayer(layer)
    }
  })

  // Adicionar marcadores dos locais
  locations.forEach((location) => {
    const icon = getLocationIcon(location.type)
    const marker = L.marker([location.lat, location.lng], {
      icon: L.divIcon({
        className: "location-marker",
        html: `<div class="marker-icon" style="background: linear-gradient(135deg, var(--primary-color), var(--accent-color));">${icon}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      }),
    }).addTo(map)

    let popupContent = `
      <div class="popup-content">
        <h4>${location.name}</h4>
        <p><i class="fas fa-map-marker-alt"></i> ${location.address}</p>
        <p><i class="fas fa-tag"></i> ${getLocationTypeName(location.type)}</p>
    `

    if (location.rating) {
      popupContent += `<p><i class="fas fa-star"></i> ${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}</p>`
    }

    if (location.description) {
      popupContent += `<p><i class="fas fa-comment"></i> ${location.description}</p>`
    }

    if (location.photo) {
      popupContent += `<img src="${location.photo}" style="max-width:100%;max-height:150px;margin-top:10px;border-radius:8px;">`
    }

    popupContent += `<small><i class="fas fa-user"></i> Por ${location.user.name}</small></div>`

    marker.bindPopup(popupContent)
  })
}

// Obter ícone para tipo de local
function getLocationIcon(type) {
  const icons = {
    rampa: "🛤️",
    banheiro: "🚻",
    elevador: "🛗",
    piso: "👣",
    sinalizacao: "🔍",
    corrimao: "🤚",
    vagas: "🅿️",
    audio: "🔊",
    braille: "⠃",
    circulacao: "↔️",
  }
  return icons[type] || "📍"
}

// Atualizar lista de locais
function updateLocationsList() {
  const filterText = document.getElementById("location-filter")?.value.toLowerCase() || ""
  const filteredLocations = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(filterText) ||
      location.address.toLowerCase().includes(filterText) ||
      getLocationTypeName(location.type).toLowerCase().includes(filterText),
  )

  const container = document.getElementById("locations-container")
  if (!container) return

  container.innerHTML = ""

  if (filteredLocations.length === 0) {
    container.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>Nenhum local encontrado</p></div>'
    return
  }

  filteredLocations.forEach((location) => {
    const item = document.createElement("div")
    item.className = "location-item"
    item.innerHTML = `
      <div class="location-header">
        <div class="location-icon">${getLocationIcon(location.type)}</div>
        <div class="location-info">
          <div class="location-name">${location.name}</div>
          <div class="location-address">${location.address}</div>
          <div class="location-type">${getLocationTypeName(location.type)}</div>
          ${location.rating ? `<div class="location-rating">${"★".repeat(location.rating)}${"☆".repeat(5 - location.rating)}</div>` : ""}
        </div>
      </div>
    `

    item.addEventListener("click", () => {
      map.flyTo([location.lat, location.lng], 18)
      // Abrir popup do marcador
      map.eachLayer((layer) => {
        if (
          layer instanceof L.Marker &&
          layer.getLatLng().lat === location.lat &&
          layer.getLatLng().lng === location.lng
        ) {
          layer.openPopup()
        }
      })
    })

    container.appendChild(item)
  })
}

// Filtrar locais
function filterLocations() {
  updateLocationsList()
}

// Atualizar estrelas
function updateStars() {
  highlightStars(selectedRating)
}

// Destacar estrelas
function highlightStars(rating) {
  document.querySelectorAll(".star").forEach((star, index) => {
    star.textContent = index < rating ? "★" : "☆"
    star.className = `star ${index < rating ? "active" : ""}`
  })
}

// Toggle sidebar
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  if (sidebar) {
    sidebar.classList.toggle("collapsed")

    // No mobile, usar classe 'open' em vez de 'collapsed'
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("open")
    }
  }
}

// Pesquisa global
function performGlobalSearch() {
  const searchTerm = document.getElementById("global-search")?.value.toLowerCase()
  if (!searchTerm) return

  const results = locations.filter(
    (location) =>
      location.name.toLowerCase().includes(searchTerm) ||
      location.description.toLowerCase().includes(searchTerm) ||
      location.address.toLowerCase().includes(searchTerm) ||
      getLocationTypeName(location.type).toLowerCase().includes(searchTerm),
  )

  if (results.length > 0) {
    // Focar no primeiro resultado
    const firstResult = results[0]
    map.flyTo([firstResult.lat, firstResult.lng], 18)

    // Atualizar filtro da sidebar
    document.getElementById("location-filter").value = searchTerm
    updateLocationsList()

    showToast(`${results.length} local(is) encontrado(s)`, "success")
  } else {
    showToast("Nenhum local encontrado", "warning")
  }
}

// Converter tipo para nome amigável
function getLocationTypeName(type) {
  const types = {
    rampa: "Rampa de acesso",
    banheiro: "Banheiro adaptado",
    elevador: "Elevador acessível",
    piso: "Piso tátil",
    sinalizacao: "Sinalização tátil",
    corrimao: "Corrimão",
    vagas: "Vagas especiais",
    audio: "Sinalização sonora",
    braille: "Sinalização em Braille",
    circulacao: "Espaço para circulação",
  }
  return types[type] || type
}

// Ler arquivo como base64
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Mostrar toast notification
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container") || createToastContainer()

  const toast = document.createElement("div")
  toast.className = `toast ${type}`

  const icon = getToastIcon(type)
  toast.innerHTML = `
    <i class="${icon}"></i>
    <span>${message}</span>
  `

  container.appendChild(toast)

  // Remover após 4 segundos
  setTimeout(() => {
    toast.style.animation = "slideOutRight 0.3s ease-out forwards"
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, 4000)
}

// Criar container de toast se não existir
function createToastContainer() {
  const container = document.createElement("div")
  container.id = "toast-container"
  container.className = "toast-container"
  document.body.appendChild(container)
  return container
}

// Obter ícone para toast
function getToastIcon(type) {
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  }
  return icons[type] || icons.info
}

// Mostrar/esconder loading
function showLoading(show) {
  const overlay = document.getElementById("loading-overlay")
  if (overlay) {
    overlay.style.display = show ? "flex" : "none"
  }
}

// Logout
function logout() {
  if (confirm("Tem certeza que deseja sair?")) {
    localStorage.removeItem("usuarioLogado")
    showToast("Logout realizado com sucesso!", "success")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 1000)
  }
}

// Adicionar animação de saída para slideOutRight
const style = document.createElement("style")
style.textContent = `
  @keyframes slideOutRight {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  
  .popup-content {
    font-family: inherit;
    line-height: 1.5;
  }
  
  .popup-content h4 {
    margin: 0 0 8px 0;
    color: var(--text-color);
    font-size: 16px;
  }
  
  .popup-content p {
    margin: 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .popup-content i {
    color: var(--primary-color);
    width: 16px;
  }
  
  .popup-content small {
    color: var(--text-light);
    font-size: 12px;
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  
  .location-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .location-icon {
    font-size: 24px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .location-info {
    flex: 1;
  }
  
  .location-type {
    font-size: 12px;
    color: var(--text-light);
    margin-bottom: 4px;
  }
  
  .location-rating {
    color: #ffd700;
    font-size: 14px;
  }
  
  .empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--text-light);
  }
  
  .empty-state i {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  .marker-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: white;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    border: 3px solid white;
  }
`
document.head.appendChild(style)

// Fechar sidebar ao clicar fora (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById("sidebar")
    const toggleBtn = document.getElementById("sidebar-toggle")

    if (sidebar && sidebar.classList.contains("open") && !sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("open")
    }
  }
})

// Redimensionamento da janela
window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    const sidebar = document.getElementById("sidebar")
    if (sidebar) {
      sidebar.classList.remove("open")
    }
  }
})
