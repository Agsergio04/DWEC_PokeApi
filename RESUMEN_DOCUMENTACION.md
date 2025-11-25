# 📋 Resumen del Backend - Archivos JavaScript

## 🚀 Archivo Principal

### **server.js**
Punto de entrada del backend. Configura Express, conecta a MongoDB, aplica middleware (CORS, helmet, rate limiting), y registra todas las rutas de la API.

---

## 🎮 Controllers (Controladores)

### **authController.js**
- **register**: Registra nuevos usuarios, crea hash de contraseña, genera suscripción gratuita inicial
- **login**: Autentica usuarios, verifica contraseñas, genera JWT tokens
- **getMe**: Obtiene perfil del usuario autenticado
- **updateProfile**: Actualiza datos del perfil
- **changePassword**: Cambia la contraseña del usuario

### **interviewController.js**
- **generateAIQuestions**: Usa Gemini AI para generar preguntas técnicas según profesión y dificultad
- **createInterview**: Crea una nueva entrevista con preguntas
- **getInterviews**: Lista todas las entrevistas del usuario
- **getInterview**: Obtiene detalles de una entrevista específica
- **updateInterviewStatus**: Actualiza el estado (en progreso, pausada, completada)
- **deleteInterview**: Elimina una entrevista

### **responseController.js**
- **submitResponse**: Guarda respuesta del usuario a una pregunta
- **Evalúa respuestas**: Usa Gemini AI para puntuar y dar feedback automático
- **getResponses**: Obtiene todas las respuestas de una entrevista
- **getResponse**: Obtiene una respuesta específica
- **updateResponse**: Actualiza una respuesta existente

### **statsController.js**
- **getUserStats**: Calcula estadísticas generales del usuario (entrevistas totales, promedio de puntaje, duración)
- **getInterviewStats**: Estadísticas detalladas de una entrevista específica
- **getPerformanceTrends**: Analiza tendencias de rendimiento del usuario

### **subscriptionController.js**
- **createPayment**: Crea pago en PayPal para suscripción premium
- **executePayment**: Ejecuta el pago después de aprobación de PayPal
- **getSubscription**: Obtiene detalles de suscripción del usuario
- **checkPremiumAccess**: Verifica si el usuario tiene acceso premium
- **cancelSubscription**: Cancela la suscripción premium

---

## 🛡️ Middleware (Intermediarios)

### **auth.js**
Verifica JWT tokens en las peticiones, extrae el userId y lo agrega a `req.userId`. Protege rutas que requieren autenticación.

### **subscription.js**
Verifica el estado de suscripción del usuario (free, premium, expired), comprueba fechas de expiración y agrega información de suscripción a la petición.

---

## 📊 Models (Modelos de datos)

### **User.js**
Define esquema de usuario con: email, contraseña (hasheada con bcrypt), nombre, profesión, idioma, suscripción, fecha de prueba gratuita. Incluye métodos para comparar contraseñas.

### **Interview.js**
Define esquema de entrevista con: título, profesión, tipo (AI/custom), dificultad, idioma, estado, duración, preguntas, puntuación total, feedback, estadísticas.

### **Question.js**
Define esquema de pregunta con: texto, audio, orden, categoría, dificultad, límite de tiempo, respuestas asociadas.

### **Response.js**
Define esquema de respuesta con: texto, audio, duración, puntuación (0-100), feedback, confianza, análisis (fortalezas, áreas de mejora, palabras clave).

### **Subscription.js**
Define esquema de suscripción con: plan (free/premium), estado, IDs de PayPal, fechas, precio, características habilitadas (reportes, estadísticas, IA, etc.).

---

## 🛣️ Routes (Rutas)

### **auth.js**
- `POST /register` - Registrar usuario
- `POST /login` - Iniciar sesión
- `GET /me` - Obtener perfil
- `PUT /profile` - Actualizar perfil
- `PUT /change-password` - Cambiar contraseña

### **interviews.js**
- `POST /generate-questions` - Generar preguntas con IA
- `POST /` - Crear entrevista
- `GET /` - Listar entrevistas
- `GET /:id` - Obtener entrevista
- `PUT /:id/status` - Actualizar estado
- `DELETE /:id` - Eliminar entrevista

### **responses.js**
- `POST /` - Enviar respuesta
- `GET /interview/:id` - Obtener respuestas de entrevista
- `GET /:id` - Obtener respuesta específica
- `PUT /:id` - Actualizar respuesta

### **stats.js**
- `GET /` - Estadísticas del usuario
- `GET /interview/:id` - Estadísticas de entrevista
- `GET /trends` - Tendencias de rendimiento

### **subscriptions.js**
- `POST /create-payment` - Crear pago PayPal
- `POST /execute-payment` - Ejecutar pago
- `GET /` - Obtener suscripción
- `GET /premium/check` - Verificar acceso premium
- `DELETE /` - Cancelar suscripción

### **ai.js**
- `POST /transcribe` - Transcribe audio a texto usando Gemini AI

### **users.js**
Ruta adicional para obtener información del usuario (duplica funcionalidad de auth.js)

---

## 🔧 Scripts

### **seedData.js**
Script para poblar la base de datos con usuarios de prueba y sus suscripciones. Útil para desarrollo y testing.

---

## 🎯 Tecnologías Clave

- **Express**: Framework web
- **MongoDB + Mongoose**: Base de datos y ORM
- **JWT**: Autenticación con tokens
- **Bcrypt**: Hash de contraseñas
- **Gemini AI**: Generación de preguntas, evaluación de respuestas, transcripción de audio
- **PayPal API**: Procesamiento de pagos
- **Helmet**: Seguridad HTTP
- **Rate Limiting**: Protección contra abuso

# 📋 Resumen del Frontend - Archivos JavaScript/JSX

## 🚀 Archivos Principales

### **index.js**
Punto de entrada de React. Renderiza el componente `App` y configura i18n (internacionalización).

### **App.js**
Componente principal que:
- Configura **React Router** con rutas públicas y protegidas
- Inicializa autenticación, tema y lenguaje desde localStorage
- Define **ProtectedRoute** para rutas que requieren autenticación
- Configura **ToastContainer** para notificaciones
- Rutas públicas: `/`, `/login`, `/register`
- Rutas protegidas: `/dashboard`, `/interviews`, `/interview/:id`, `/subscription`, `/settings`

---

## 🎨 Pages (Páginas)

### **Home.jsx**
Página de inicio pública con:
- **Hero section**: Título llamativo y botón de registro
- **Features**: Muestra características (Voice Interviews, Analytics, Security)
- **Pricing**: Cards de planes Free y Premium
- **CTA**: Call-to-action final para registrarse
- **Footer**: Pie de página con copyright

### **Login.jsx**
Formulario de inicio de sesión con:
- Campos: email, password
- Validación de campos obligatorios
- Llama a `authService.login()`
- Guarda token y usuario en localStorage
- Redirecciona a `/dashboard` tras login exitoso
- Link a página de registro

### **Register.jsx**
Formulario de registro con:
- Campos: firstName, lastName, email, password, language
- Validación de campos obligatorios
- Llama a `authService.register()`
- Crea usuario con suscripción gratuita automática
- Guarda token y usuario en localStorage
- Redirecciona a `/dashboard` tras registro
- Link a página de login

### **Dashboard.jsx**
Panel principal del usuario autenticado con:
- **Estadísticas**: Total entrevistas, completadas, score promedio, duración total
- **Formulario de creación**: Para crear nueva entrevista con IA
- **Gráficos**: 
  - LineChart de tendencias de rendimiento
  - PieChart de entrevistas por profesión
- **Botones**: Crear entrevista, ver mis entrevistas, descargar reporte
- Usa hook `useDashboard()` para lógica compleja

### **Interviews.jsx**
Lista y gestión de entrevistas con:
- **Lista de entrevistas**: Muestra todas las entrevistas del usuario
- **Búsqueda**: Filtra por título o profesión
- **Formulario de creación**: Inline para crear nuevas entrevistas
- **Generación de IA**: Genera preguntas con Gemini AI
- **Acciones**: Ver, eliminar entrevistas
- **Navegación**: A dashboard o a sesión de entrevista específica

### **InterviewSession.jsx**
Sesión interactiva de entrevista con:
- **Navegación de preguntas**: Avanza/retrocede entre preguntas
- **Barra de progreso**: Visual del avance
- **Reconocimiento de voz**: 
  - Usa Web Speech API (SpeechRecognition)
  - Graba respuestas por voz en tiempo real
  - Confirmar o reintentar respuestas
- **Temporizadores**: Tiempo por pregunta y tiempo total
- **Guardado de respuestas**: Envía al backend para evaluación con IA
- **Completar entrevista**: Cambia estado a "completed"
- **Modo lectura**: Si está completada, solo muestra respuestas

### **Settings.jsx**
Configuración de usuario con:
- **Actualizar perfil**: firstName, lastName, profession
- **Cambiar contraseña**: currentPassword, newPassword, confirmPassword
- **Cambiar idioma**: EN, ES, FR, DE
- **Estado de suscripción**: Muestra plan actual (Free/Premium)
- **Planes disponibles**: Cards con features de cada plan
- **Botón upgrade**: Para cambiar a Premium
- GET inicial de usuario desde backend al cargar

### **Subscription.jsx**
Gestión de suscripciones con:
- **Muestra planes**: Free vs Premium con features
- **Comparación visual**: ✓ ✗ para features incluidas/no incluidas
- **Upgrade a Premium**: Crea pago con PayPal y redirecciona
- **Cancelar suscripción**: Cancela plan Premium
- **Estado actual**: Resalta plan activo
- **Fecha de expiración**: Si aplica

---

## 🧩 Components (Componentes)

### **Header.jsx**
Barra de navegación con:
- **Logo**: Clickeable para ir a home/dashboard
- **Menú autenticado**: 
  - Botones a Interviews, Settings
  - Selector de idioma
  - Toggle de tema (dark/light)
- **Menú no autenticado**: 
  - Selector de idioma
  - Toggle de tema
  - Botones Login y Register
- **Menú móvil**: Hamburger menu responsive
- Usa hook `useHeader()`

### **StatCard.jsx**
Tarjeta de estadística reutilizable:
- Props: title, value, icon, color, isDark
- Muestra un valor numérico con icono y color personalizado
- Soporta modo claro/oscuro

---

## 🪝 Hooks (Custom Hooks)

### **useDashboard.jsx**
Lógica del Dashboard:
- `fetchStats()`: Obtiene estadísticas del usuario
- `fetchTrends()`: Obtiene tendencias de rendimiento
- `handleCreateInterview()`: 
  - Genera preguntas con IA si es tipo "ai_generated"
  - Crea entrevista en backend
  - Redirecciona a sesión de entrevista
- `downloadReport()`: (Premium) Descarga reporte
- `toggleCreateForm()`: Muestra/oculta formulario
- Estados: stats, trends, loading, formData, showCreateForm

### **useHeader.jsx**
Lógica del Header:
- `handleLanguageChange()`: Cambia idioma y actualiza i18n
- `handleThemeToggle()`: Toggle entre dark/light mode
- `toggleMobileMenu()`: Abre/cierra menú móvil
- `navigateTo()`: Navega a ruta y cierra menú
- Estados: mobileMenuOpen, isAuthenticated, isDark, language

### **useHome.jsx**
Lógica de la página Home:
- Define features del producto
- Define planes Free y Premium
- `navigateToRegister()`: Navega a registro
- Detecta si usuario está autenticado

---

## 🔌 API (Servicios)

### **api.js**
Cliente Axios configurado:
- BaseURL desde env var o localhost:5001
- **Request interceptor**: Añade token JWT automáticamente
- **Response interceptor**: Maneja errores globalmente
- Logs de peticiones y respuestas

### **index.js (api)**
Servicios exportados organizados:

#### **authService**
- `register()` - POST /auth/register
- `login()` - POST /auth/login
- `getMe()` - GET /auth/me
- `updateProfile()` - PUT /auth/profile
- `changePassword()` - PUT /auth/change-password
- `logout()` - Limpia localStorage

#### **interviewService**
- `generateQuestions()` - POST /interviews/generate-questions (con IA)
- `createInterview()` - POST /interviews
- `getInterviews()` - GET /interviews
- `getInterview(id)` - GET /interviews/:id
- `updateInterviewStatus(id)` - PUT /interviews/:id/status
- `deleteInterview(id)` - DELETE /interviews/:id

#### **responseService**
- `submitResponse()` - POST /responses
- `getResponses(interviewId)` - GET /responses/interview/:id
- `getResponse(id)` - GET /responses/:id
- `updateResponse(id)` - PUT /responses/:id

#### **statsService**
- `getUserStats()` - GET /stats
- `getInterviewStats(id)` - GET /stats/interview/:id
- `getPerformanceTrends()` - GET /stats/trends

#### **subscriptionService**
- `createPayment()` - POST /subscriptions/create-payment
- `executePayment()` - POST /subscriptions/execute-payment
- `getSubscription()` - GET /subscriptions
- `checkPremiumAccess()` - GET /subscriptions/premium/check
- `cancelSubscription()` - DELETE /subscriptions

#### **aiService**
- `transcribeAudio()` - POST /ai/transcribe (audio a texto)
- `getNextQuestion()` - POST /ai/next-question
- `evaluateResponse()` - POST /ai/evaluate-response

---

## 🗂️ Store (Estado Global con Zustand)

### **index.js (store)**
Stores de Zustand para estado global:

#### **useAuthStore**
- Estados: user, token, isLoading, error
- Acciones: setUser, setToken, login, logout, initializeAuth
- Persiste token y user en localStorage

#### **useInterviewStore**
- Estados: interviews, currentInterview, isLoading, error
- Acciones: setInterviews, addInterview, updateInterview, removeInterview
- Gestión de lista de entrevistas

#### **useThemeStore**
- Estados: isDark
- Acciones: toggleTheme, initializeTheme
- Persiste tema en localStorage
- Aplica clase 'dark' al html

#### **useLanguageStore**
- Estados: language
- Acciones: setLanguage, initializeLanguage
- Persiste idioma en localStorage

#### **useSubscriptionStore**
- Estados: subscription, isPremium, isLoading, error
- Acciones: setSubscription, setIsPremium
- Gestión de estado de suscripción

### **Header.js (store)** ⚠️
Archivo legacy/duplicado que parece ser un componente Header alternativo con lógica mezclada. Probablemente no se usa actualmente ya que existe `Header.jsx` en components.

---

## 🌐 i18n (Internacionalización)

### **config.js**
Configuración de i18next:
- Soporta 4 idiomas: EN, ES, FR, DE
- Archivos de traducción: `en.json`, `es.json`, `fr.json`, `de.json`
- Idioma por defecto: inglés
- Fallback: inglés
- Carga idioma guardado en localStorage

---

## 🎯 Flujo Principal de Usuario

### 1️⃣ **Registro/Login**
```
Home → Register → Backend crea usuario + suscripción free → Dashboard
```

### 2️⃣ **Crear Entrevista**
```
Dashboard → Formulario crear entrevista → 
  Si AI: genera preguntas con Gemini → 
  Backend crea entrevista → 
  Redirecciona a InterviewSession
```

### 3️⃣ **Realizar Entrevista**
```
InterviewSession → 
  Por cada pregunta:
    - Responder por texto o voz (Speech Recognition)
    - Guardar respuesta → Backend evalúa con IA
  → Completar entrevista → 
  Backend calcula score final
```

### 4️⃣ **Ver Estadísticas**
```
Dashboard → Muestra:
  - Total entrevistas
  - Score promedio
  - Gráficos de tendencias
  - Distribución por profesión
```

### 5️⃣ **Upgrade Premium**
```
Settings/Subscription → 
  Crear pago PayPal → 
  Redirección a PayPal → 
  Usuario aprueba → 
  Backend ejecuta pago → 
  Usuario Premium
```

---

## 🎨 Características Destacadas

### 🎤 **Reconocimiento de Voz**
- Usa **Web Speech API** (Chrome/Edge)
- Transcripción en tiempo real
- Idioma configurable (español por defecto en código)
- Botón micrófono para iniciar/detener
- Confirmar o reintentar respuesta

### 🌙 **Dark Mode**
- Toggle en Header
- Persiste en localStorage
- Aplica a todos los componentes
- Clases CSS condicionales

### 🌍 **Multi-idioma**
- 4 idiomas soportados
- Cambio dinámico sin recargar
- Persiste selección
- Traducciones con i18next

### 📊 **Gráficos Interactivos**
- Usa **Recharts**
- LineChart para tendencias
- PieChart para distribución
- Responsive y con tooltips

### 🔐 **Autenticación**
- JWT tokens
- Protected routes
- Auto-inicialización desde localStorage
- Refresh de token (si aplica)

### 💳 **Pagos con PayPal**
- Integración PayPal API
- Flujo: Create Payment → Redirect → Execute Payment
- Sandbox/Production configurable

---

## 📦 Tecnologías Clave

- **React 18**: Framework principal
- **React Router DOM**: Navegación SPA
- **Zustand**: Estado global ligero
- **Axios**: Cliente HTTP
- **i18next**: Internacionalización
- **Recharts**: Gráficos
- **React Toastify**: Notificaciones
- **React Icons**: Iconografía
- **Web Speech API**: Reconocimiento de voz
- **Tailwind CSS** + **CSS Modules**: Estilos

---

## 🔧 Mejoras Sugeridas

1. **Unificar Header**: Eliminar `Header.js` duplicado en store
2. **Error Boundary**: Añadir para capturar errores de React
3. **Loading States**: Unificar spinners con componente reutilizable
4. **Validación Forms**: Usar librería como Formik o React Hook Form
5. **Tests**: Añadir tests unitarios con Jest/RTL
6. **PWA**: Configurar Service Worker para uso offline
7. **Optimización**: Lazy loading de rutas con React.lazy()
8. **Accesibilidad**: Mejorar ARIA labels y navegación por teclado
