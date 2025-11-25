# 🔧 GUÍA DE REFACTORIZACIÓN - Mapa Visual

## 🎯 Vista General de Cambios

Este documento muestra visualmente qué archivos cambiar y cómo.

---

## 📊 MAPA DE ARCHIVOS

```
proyecto/
├── backend/
│   ├── models/
│   │   ├── User.js                    ⚠️  MODIFICAR (añadir campos)
│   │   ├── Interview.js               ✅ MANTENER (sin cambios)
│   │   ├── Question.js                ⚠️  MODIFICAR (añadir campos + dual ref)
│   │   ├── Response.js                ⚠️  MODIFICAR (añadir campos + dual ref)
│   │   ├── Subscription.js            ✅ MANTENER
│   │   └── RepositoryAnalysis.js      ➕ CREAR NUEVO
│   │
│   ├── controllers/
│   │   ├── authController.js          ✅ MANTENER
│   │   ├── interviewController.js     ✅ MANTENER (dual functionality)
│   │   ├── responseController.js      ✅ MANTENER (dual functionality)
│   │   ├── subscriptionController.js  ✅ MANTENER
│   │   ├── statsController.js         ✅ MANTENER
│   │   └── repositoryAnalysisController.js  ➕ CREAR NUEVO
│   │
│   ├── services/
│   │   ├── gitingestService.js        ➕ CREAR NUEVO
│   │   ├── questionGeneratorService.js ➕ CREAR NUEVO
│   │   └── responseEvaluatorService.js ➕ CREAR NUEVO
│   │
│   ├── routes/
│   │   ├── auth.js                    ✅ MANTENER
│   │   ├── interviews.js              ✅ MANTENER (endpoint /api/interviews)
│   │   ├── responses.js               ✅ MANTENER
│   │   ├── subscriptions.js           ✅ MANTENER
│   │   ├── stats.js                   ✅ MANTENER
│   │   └── repositoryAnalysis.js      ➕ CREAR NUEVO (endpoint /api/repository-analysis)
│   │
│   ├── middleware/
│   │   ├── auth.js                    ✅ MANTENER
│   │   └── subscription.js            ✅ MANTENER
│   │
│   └── server.js                      ⚠️  MODIFICAR (añadir 1 línea)
│
└── frontend/
    └── src/
        ├── api/
        │   ├── api.js                 ✅ MANTENER
        │   └── index.js               ⚠️  MODIFICAR (añadir servicio)
        │
        ├── pages/
        │   ├── Home.jsx               🔵 MODIFICAR (opcional - textos)
        │   ├── Dashboard.jsx          🔵 MODIFICAR (opcional - métricas)
        │   ├── Login.jsx              ✅ MANTENER
        │   ├── Register.jsx           ✅ MANTENER
        │   ├── Settings.jsx           ✅ MANTENER
        │   ├── Subscription.jsx       ✅ MANTENER
        │   ├── Interviews.jsx         ✅ MANTENER (dual functionality)
        │   ├── InterviewSession.jsx   ✅ MANTENER (dual functionality)
        │   ├── RepositoryAnalysis.jsx ➕ CREAR NUEVO
        │   └── AnalysisSession.jsx    ➕ CREAR NUEVO
        │
        ├── components/
        │   ├── Header.jsx             ⚠️  MODIFICAR (añadir link menú)
        │   └── StatCard.jsx           ✅ MANTENER
        │
        ├── hooks/
        │   └── useRepositoryAnalysis.js ➕ CREAR NUEVO
        │
        └── App.js                     ⚠️  MODIFICAR (añadir rutas)

Leyenda:
✅ MANTENER - Sin cambios
⚠️  MODIFICAR - Pequeños cambios (añadir, no eliminar)
➕ CREAR NUEVO - Archivo completamente nuevo
🔵 MODIFICAR - Opcional (mejoras visuales/textos)
```

---

## 🔄 FLUJO DE REFACTORIZACIÓN

### Fase 1: Backend - Modelos (Sprint 1)

```
1. User.js
   └─> AÑADIR 3 campos opcionales
       ├─> repositories: []
       ├─> githubUsername: null
       └─> analyzedRepositories: 0

2. RepositoryAnalysis.js
   └─> CREAR nuevo modelo (similar a Interview.js)

3. Question.js
   └─> MODIFICAR referencias
       ├─> interviewId: required false (era true)
       ├─> AÑADIR repositoryAnalysisId: required false
       └─> AÑADIR 6 campos de código

4. Response.js
   └─> MODIFICAR referencias
       ├─> interviewId: required false (era true)
       ├─> AÑADIR repositoryAnalysisId: required false
       ├─> EXPANDIR analysis con 5 nuevos campos
       └─> AÑADIR codeImprovement
```

### Fase 2: Backend - Servicios (Sprint 1)

```
CREAR 3 servicios nuevos:
├─> gitingestService.js
│   └─> Integración con GitIngest API
│
├─> questionGeneratorService.js
│   └─> Generación de preguntas con Gemini AI
│
└─> responseEvaluatorService.js
    └─> Evaluación de respuestas con contexto de código
```

### Fase 3: Backend - Controladores y Rutas (Sprint 2)

```
1. repositoryAnalysisController.js
   └─> CREAR controlador completo (CRUD)

2. repositoryAnalysis.js (routes)
   └─> CREAR archivo de rutas

3. server.js
   └─> AÑADIR 2 líneas:
       const repositoryAnalysisRoutes = require('./routes/repositoryAnalysis');
       app.use('/api/repository-analysis', repositoryAnalysisRoutes);
```

### Fase 4: Frontend - API (Sprint 3)

```
1. index.js (api)
   └─> AÑADIR al final:
       export const repositoryAnalysisService = {
         analyzeRepository: (data) => api.post(...),
         getAnalyses: () => api.get(...),
         getAnalysis: (id) => api.get(...),
         updateStatus: (id, data) => api.put(...),
         deleteAnalysis: (id) => api.delete(...)
       };
```

### Fase 5: Frontend - Páginas (Sprint 3)

```
CREAR 3 archivos nuevos:
├─> pages/RepositoryAnalysis.jsx
│   └─> Formulario + lista de análisis
│
├─> pages/AnalysisSession.jsx
│   └─> Sesión interactiva con código
│
└─> hooks/useRepositoryAnalysis.js
    └─> Lógica de análisis
```

### Fase 6: Frontend - Navegación (Sprint 3)

```
1. App.js
   └─> AÑADIR imports y rutas:
       import RepositoryAnalysis from './pages/RepositoryAnalysis';
       import AnalysisSession from './pages/AnalysisSession';
       
       <Route path="/repository-analysis" element={<RepositoryAnalysis />} />
       <Route path="/analysis/:analysisId" element={<AnalysisSession />} />

2. Header.jsx
   └─> AÑADIR link en menú:
       <Nav.Link to="/repository-analysis">
         <FiGithub /> Code Analysis
       </Nav.Link>
```

---

## 📝 CHECKLIST POR ARCHIVO

### ✅ Backend Models

#### `/backend/models/User.js`
```javascript
- [ ] Línea 40: Añadir array repositories
- [ ] Línea 42: Añadir githubUsername
- [ ] Línea 46: Añadir analyzedRepositories
- [ ] Mantener: interviews, profession
- [ ] Test: Crear usuario sin nuevos campos (retrocompat)
- [ ] Test: Crear usuario con nuevos campos
```

#### `/backend/models/RepositoryAnalysis.js`
```javascript
- [ ] Crear archivo completo
- [ ] Copiar estructura base de Interview.js
- [ ] Adaptar campos para repositorios
- [ ] Configurar referencias a User y Question
- [ ] Test: Crear análisis de prueba
```

#### `/backend/models/Question.js`
```javascript
- [ ] Línea 5: Cambiar required: true → false en interviewId
- [ ] Línea 10: Añadir repositoryAnalysisId (required: false)
- [ ] Línea 30: Añadir codeSnippet, filePath, etc.
- [ ] Final: Añadir validación pre-save
- [ ] Test: Crear pregunta con interviewId
- [ ] Test: Crear pregunta con repositoryAnalysisId
- [ ] Test: Falla sin ningún ID
```

#### `/backend/models/Response.js`
```javascript
- [ ] Línea 10: Cambiar required: true → false en interviewId
- [ ] Línea 15: Añadir repositoryAnalysisId (required: false)
- [ ] Línea 30: Expandir analysis con 5 nuevos campos
- [ ] Línea 50: Añadir codeImprovement
- [ ] Final: Añadir validación pre-save
- [ ] Test: Crear response con interviewId
- [ ] Test: Crear response con repositoryAnalysisId
```

### ➕ Backend Services

#### `/backend/services/gitingestService.js`
```javascript
- [ ] Copiar código de GUIA_IMPLEMENTACION_GITINGEST.md
- [ ] Configurar variables de entorno
- [ ] Método: analyzeRepository()
- [ ] Método: parseGitHubUrl()
- [ ] Método: extractLanguages()
- [ ] Método: detectTechnologies()
- [ ] Test: Analizar repo público pequeño
- [ ] Test: Manejar URL inválida
- [ ] Test: Manejar timeout
```

#### `/backend/services/questionGeneratorService.js`
```javascript
- [ ] Copiar código de GUIA_IMPLEMENTACION_GITINGEST.md
- [ ] Método: generateQuestionsFromRepository()
- [ ] Método: buildPrompt()
- [ ] Método: selectRelevantFiles()
- [ ] Test: Generar preguntas de repo real
- [ ] Test: Diferentes tipos de análisis
- [ ] Test: Diferentes lenguajes
```

#### `/backend/services/responseEvaluatorService.js`
```javascript
- [ ] Crear clase ResponseEvaluatorService
- [ ] Método: evaluateResponse()
- [ ] Método: buildEvaluationPrompt()
- [ ] Test: Evaluar respuesta correcta
- [ ] Test: Evaluar respuesta incorrecta
- [ ] Test: Generar sugerencias de mejora
```

### 🔧 Backend Controllers & Routes

#### `/backend/controllers/repositoryAnalysisController.js`
```javascript
- [ ] Copiar código de GUIA_IMPLEMENTACION_GITINGEST.md
- [ ] analyzeRepository() - Flujo completo
- [ ] getAnalyses() - Listar análisis
- [ ] getAnalysis() - Obtener uno
- [ ] updateAnalysisStatus() - Actualizar estado
- [ ] deleteAnalysis() - Eliminar
- [ ] Test: Analizar repositorio end-to-end
```

#### `/backend/routes/repositoryAnalysis.js`
```javascript
- [ ] POST /analyze
- [ ] GET /
- [ ] GET /:id
- [ ] PUT /:id/status
- [ ] DELETE /:id
- [ ] Aplicar middleware auth
- [ ] Test: Todos los endpoints con Postman
```

#### `/backend/server.js`
```javascript
- [ ] Línea 78: Importar rutas
      const repositoryAnalysisRoutes = require('./routes/repositoryAnalysis');
      
- [ ] Línea 80: Registrar rutas
      app.use('/api/repository-analysis', repositoryAnalysisRoutes);
      
- [ ] Test: Verificar endpoint responde
- [ ] Test: No rompe rutas existentes
```

### 🎨 Frontend API

#### `/frontend/src/api/index.js`
```javascript
- [ ] Línea 50: Exportar repositoryAnalysisService
- [ ] Mantener: interviewService
- [ ] 5 métodos en repositoryAnalysisService
- [ ] Test: Llamar analyzeRepository desde componente
- [ ] Test: No rompe importaciones existentes
```

### 🎨 Frontend Pages

#### `/frontend/src/pages/RepositoryAnalysis.jsx`
```javascript
- [ ] Crear componente completo
- [ ] Formulario de análisis
- [ ] Input URL GitHub (validación)
- [ ] Select tipo de análisis
- [ ] Select dificultad
- [ ] Lista de análisis previos
- [ ] Integrar useRepositoryAnalysis hook
- [ ] Test: Submit formulario
- [ ] Test: Validación URL
- [ ] Test: Navegación a sesión
```

#### `/frontend/src/pages/AnalysisSession.jsx`
```javascript
- [ ] Crear componente completo
- [ ] Instalar react-syntax-highlighter
- [ ] Header con info del repo
- [ ] Barra de progreso
- [ ] Mostrar pregunta
- [ ] Syntax highlighting de código
- [ ] Textarea respuesta
- [ ] Mostrar feedback IA
- [ ] Navegación entre preguntas
- [ ] Test: Cargar análisis
- [ ] Test: Guardar respuesta
- [ ] Test: Completar análisis
```

#### `/frontend/src/hooks/useRepositoryAnalysis.js`
```javascript
- [ ] Hook personalizado
- [ ] Estado loading
- [ ] Método analyzeRepository
- [ ] Validación URL GitHub
- [ ] Notificaciones toast
- [ ] Test: Analizar repositorio
- [ ] Test: Manejar errores
```

### 🎨 Frontend Navigation

#### `/frontend/src/App.js`
```javascript
- [ ] Importar RepositoryAnalysis
- [ ] Importar AnalysisSession
- [ ] Ruta /repository-analysis
- [ ] Ruta /analysis/:analysisId
- [ ] Test: Navegación funciona
- [ ] Test: No rompe rutas existentes
```

#### `/frontend/src/components/Header.jsx`
```javascript
- [ ] Añadir link "Code Analysis"
- [ ] Importar FiGithub icon
- [ ] Estado activo del link
- [ ] Test: Click navega correctamente
- [ ] Test: Estado activo se marca
```

---

## 🧪 PLAN DE TESTING

### Test Backend (Por Orden)

1. **Modelos**
   ```bash
   # Test User
   - Crear usuario sin campos nuevos ✅
   - Crear usuario con campos nuevos ✅
   
   # Test Question
   - Crear pregunta con interviewId ✅
   - Crear pregunta con repositoryAnalysisId ✅
   - Error sin ningún ID ✅
   
   # Test Response
   - Crear respuesta con interviewId ✅
   - Crear respuesta con repositoryAnalysisId ✅
   - Análisis de código incluido ✅
   ```

2. **Servicios**
   ```bash
   # Test GitIngest
   node -e "const g = require('./backend/services/gitingestService'); g.analyzeRepository('https://github.com/expressjs/express').then(console.log)"
   
   # Test Question Generator
   # (requiere GitIngest data primero)
   
   # Test Response Evaluator
   # (requiere question y response primero)
   ```

3. **Endpoints (Postman/curl)**
   ```bash
   # POST /api/repository-analysis/analyze
   curl -X POST http://localhost:5001/api/repository-analysis/analyze \
     -H "Authorization: Bearer TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"repositoryUrl":"https://github.com/user/repo","analysisType":"code_quality"}'
   
   # GET /api/repository-analysis
   curl http://localhost:5001/api/repository-analysis \
     -H "Authorization: Bearer TOKEN"
   ```

### Test Frontend (Por Orden)

1. **Servicios API**
   ```javascript
   // En consola del navegador:
   import { repositoryAnalysisService } from './api';
   repositoryAnalysisService.getAnalyses().then(console.log);
   ```

2. **Componentes**
   ```bash
   # Navegar a /repository-analysis
   - Formulario se muestra ✅
   - Input URL valida ✅
   - Submit funciona ✅
   
   # Navegar a /analysis/:id
   - Código se muestra con highlighting ✅
   - Respuestas se guardan ✅
   - Navegación funciona ✅
   ```

3. **Integración**
   ```bash
   # Flujo completo:
   1. Login ✅
   2. Ir a Repository Analysis ✅
   3. Ingresar URL de GitHub ✅
   4. Esperar análisis (loading) ✅
   5. Ver preguntas generadas ✅
   6. Responder pregunta ✅
   7. Ver feedback IA ✅
   8. Completar análisis ✅
   9. Ver en lista de análisis ✅
   ```

---

## ⚠️ ERRORES COMUNES A EVITAR

### ❌ NO HACER

1. **NO eliminar campos existentes**
   ```javascript
   // ❌ MAL
   const questionSchema = {
     repositoryAnalysisId: ObjectId  // Eliminó interviewId
   };
   
   // ✅ BIEN
   const questionSchema = {
     interviewId: ObjectId,           // Mantener
     repositoryAnalysisId: ObjectId   // Añadir
   };
   ```

2. **NO hacer required: true en nuevos campos**
   ```javascript
   // ❌ MAL
   githubUsername: {
     type: String,
     required: true  // Rompe usuarios existentes
   }
   
   // ✅ BIEN
   githubUsername: {
     type: String,
     default: null  // Opcional
   }
   ```

3. **NO sobrescribir archivos**
   ```javascript
   // ❌ MAL
   mv interviews.js repositoryAnalysis.js  // Elimina funcionalidad
   
   // ✅ BIEN
   cp interviews.js repositoryAnalysis.js  // Crea copia
   # Luego adaptar repositoryAnalysis.js
   ```

4. **NO olvidar exportar servicios**
   ```javascript
   // ❌ MAL
   // Crear servicio pero no exportarlo en index.js
   
   // ✅ BIEN
   export const repositoryAnalysisService = { ... };
   ```

### ✅ BUENAS PRÁCTICAS

1. **Crear branch antes de cambios**
   ```bash
   git checkout -b feature/repository-analysis
   ```

2. **Commit por archivo modificado**
   ```bash
   git add backend/models/User.js
   git commit -m "feat: Add GitHub fields to User model"
   ```

3. **Test después de cada cambio**
   ```bash
   npm test  # Backend
   npm start # Verificar frontend
   ```

4. **Mantener dual functionality**
   ```javascript
   // Siempre verificar que esto siga funcionando:
   - /api/interviews
   - Página Interviews.jsx
   - Funcionalidad de entrevistas original
   ```

---

## 🎯 MILESTONE POR SPRINT

### Sprint 1: Backend Core (Semana 1-2)
```
Issue #0  - Refactorización preparatoria
Issue #1  - GitIngest Service
Issue #2  - Question Generator Service
Issue #3  - RepositoryAnalysis Model
Issue #3.5- User Model (añadir campos)
Issue #4  - Question Model (modificar)
Issue #5  - Response Model (modificar)

✅ Resultado: Backend puede analizar repos y generar preguntas
```

### Sprint 2: Backend Completo (Semana 3-4)
```
Issue #6 - Repository Analysis Controller
Issue #7 - Response Evaluator Service
Issue #8 - Response Controller (adaptar)
Issue #9 - Repository Analysis Routes

✅ Resultado: API completa funcionando
```

### Sprint 3: Frontend Core (Semana 5-7)
```
Issue #10 - API Service Frontend
Issue #11 - useRepositoryAnalysis Hook
Issue #12 - RepositoryAnalysis Page
Issue #13 - AnalysisSession Page
Issue #14 - Navegación y Rutas

✅ Resultado: Frontend funcional end-to-end
```

### Sprint 4: Frontend Polish (Semana 8)
```
Issue #15 - Actualizar Home
Issue #16 - Actualizar Dashboard

✅ Resultado: UX pulida y coherente
```

---

## 📞 NECESITAS AYUDA?

Si te atascas, verifica:

1. ✅ Variables de entorno configuradas
2. ✅ Dependencias instaladas (`npm install`)
3. ✅ Servidor corriendo sin errores
4. ✅ MongoDB conectado
5. ✅ Token de autenticación válido
6. ✅ Rutas registradas en server.js
7. ✅ Importaciones correctas
8. ✅ Nombres de archivos coinciden

---

Esta guía visual te ayuda a entender exactamente qué tocar y qué no tocar en tu código. ¡Buena suerte con la migración! 🚀

