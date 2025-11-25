# 📝 PLANTILLAS DE ISSUES PARA GITHUB

---

## ⚠️ IMPORTANTE: REFACTORIZACIÓN DEL CÓDIGO EXISTENTE

Antes de comenzar con los nuevos issues, es importante entender qué código existente necesita ser refactorizado o adaptado:

### 🔍 Análisis de Código Actual

Tu proyecto actual está diseñado para **entrevistas de trabajo**. La migración a **análisis de repositorios de GitHub** requiere:

#### ✅ **Código que SE MANTIENE (sin cambios)**
- `/backend/models/User.js` - Solo añadir campos opcionales
- `/backend/models/Subscription.js` - Misma lógica de planes
- `/backend/controllers/authController.js` - Sin cambios
- `/backend/controllers/subscriptionController.js` - Sin cambios
- `/backend/middleware/auth.js` - Sin cambios
- `/backend/middleware/subscription.js` - Sin cambios
- `/backend/routes/auth.js` - Sin cambios
- `/backend/routes/subscriptions.js` - Sin cambios
- `/frontend/src/api/api.js` - Sin cambios (configuración axios)
- `/frontend/src/pages/Login.jsx` - Sin cambios
- `/frontend/src/pages/Register.jsx` - Sin cambios
- `/frontend/src/pages/Settings.jsx` - Sin cambios
- `/frontend/src/pages/Subscription.jsx` - Sin cambios

#### 🔄 **Código que SE PUEDE MANTENER Y COEXISTIR**
- `/backend/models/Interview.js` - Mantener si quieres dual functionality
- `/backend/models/Question.js` - Mantener si quieres dual functionality
- `/backend/models/Response.js` - Mantener si quieres dual functionality
- `/backend/controllers/interviewController.js` - Mantener para retrocompatibilidad
- `/backend/controllers/responseController.js` - Mantener para retrocompatibilidad
- `/backend/routes/interviews.js` - Mantener endpoint `/api/interviews`
- `/backend/routes/responses.js` - Mantener endpoint `/api/responses`
- `/frontend/src/pages/Interviews.jsx` - Mantener para dual functionality
- `/frontend/src/pages/InterviewSession.jsx` - Mantener para dual functionality

#### ➕ **Código NUEVO a CREAR**
- `/backend/services/gitingestService.js` - **NUEVO**
- `/backend/services/questionGeneratorService.js` - **NUEVO**
- `/backend/services/responseEvaluatorService.js` - **NUEVO**
- `/backend/models/RepositoryAnalysis.js` - **NUEVO**
- `/backend/controllers/repositoryAnalysisController.js` - **NUEVO**
- `/backend/routes/repositoryAnalysis.js` - **NUEVO**
- `/frontend/src/pages/RepositoryAnalysis.jsx` - **NUEVO**
- `/frontend/src/pages/AnalysisSession.jsx` - **NUEVO**
- `/frontend/src/hooks/useRepositoryAnalysis.js` - **NUEVO**

#### 🔧 **Código que REQUIERE REFACTORIZACIÓN MENOR**
- `/backend/server.js` - **Añadir** nueva ruta (línea ~78)
- `/frontend/src/api/index.js` - **Añadir** repositoryAnalysisService (mantener interviewService)
- `/frontend/src/App.js` - **Añadir** nuevas rutas (mantener existentes)
- `/frontend/src/components/Header.jsx` - **Añadir** nuevo link en menú
- `/frontend/src/pages/Home.jsx` - **Actualizar** textos de marketing (opcional)
- `/frontend/src/pages/Dashboard.jsx` - **Actualizar** métricas mostradas (opcional)

### 📊 Estrategia Recomendada

**OPCIÓN 1: Migración Completa (Reemplazar)**
- Renombrar archivos existentes
- Migrar datos de base de datos
- Actualizar todas las referencias
- ⚠️ Riesgo: Pierdes funcionalidad de entrevistas

**OPCIÓN 2: Dual Functionality (Mantener Ambas)** ⭐ RECOMENDADA
- Crear archivos nuevos sin tocar existentes
- Mantener endpoints `/api/interviews` Y `/api/repository-analysis`
- Usuarios pueden elegir entre "Interview Practice" o "Code Analysis"
- ✅ Ventaja: Sin pérdida de funcionalidad, más features

**OPCIÓN 3: Migración Gradual**
- Fase 1: Crear nuevo sistema en paralelo
- Fase 2: Probar extensivamente
- Fase 3: Deprecar sistema antiguo gradualmente
- Fase 4: Migrar datos y eliminar código viejo

### 🎯 Decisión para Issues

Los issues están diseñados para **OPCIÓN 2 (Dual Functionality)**, por eso:
- Todos los issues dicen "CREAR nuevo archivo" en vez de "MODIFICAR"
- Los issues de refactorización dicen "AÑADIR" en vez de "REEMPLAZAR"
- Se mantiene código existente funcionando

Si prefieres Opción 1 o 3, ajusta los issues en consecuencia.

---

## 🔴 ISSUE #0: [OPCIONAL] Refactorización Preparatoria

**Título:** `[Refactor] Preparar código para dual functionality`

**Labels:** `refactor`, `backend`, `frontend`, `medium-priority`

**Milestone:** `Sprint 0 - Preparación`

---

### 📋 Descripción

Refactorizar código existente para facilitar la coexistencia de "Interview Practice" y "Code Analysis".

### 🎯 Objetivos

- [ ] Documentar estructura actual
- [ ] Identificar dependencias
- [ ] Crear backup de código actual
- [ ] Preparar base de datos para nuevos modelos

### 📝 Tareas Específicas

#### 1. Documentación
```bash
# Crear documentación de estructura actual
- Listar todos los modelos y sus relaciones
- Documentar endpoints existentes
- Mapear componentes de frontend
```

#### 2. Backup
```bash
# Crear rama de backup
git checkout -b backup/pre-code-analysis
git push origin backup/pre-code-analysis
```

#### 3. Base de Datos
```bash
# Si usas migraciones, prepara una migración para nuevos modelos
# Si no, simplemente los modelos nuevos se crearán automáticamente con Mongoose
```

#### 4. Configuración de Entorno
```bash
# Añadir nuevas variables de entorno en .env
GITINGEST_API_URL=https://gitingest.com/api
GITINGEST_TIMEOUT=30000
GITHUB_TOKEN=  # Opcional, para repos privados
```

### 🧪 Criterios de Aceptación

- [ ] Código actual documentado
- [ ] Backup creado
- [ ] Variables de entorno configuradas
- [ ] Base de datos lista para nuevos modelos

---

**Título:** `[Backend] Implementar servicio de integración con GitIngest`

**Labels:** `backend`, `enhancement`, `high-priority`

**Milestone:** `Sprint 1 - Backend Core`

**Assignees:** `@tu-usuario`

---

### 📋 Descripción

Crear servicio backend para integración con GitIngest API que permita analizar repositorios de GitHub y extraer su estructura, archivos, código y metadatos.

### 🎯 Objetivos

- [ ] Crear archivo `/backend/services/gitingestService.js`
- [ ] Implementar parseador de URLs de GitHub
- [ ] Implementar llamada a GitIngest API
- [ ] Procesar datos del repositorio (estructura, archivos, dependencias)
- [ ] Detectar lenguajes de programación
- [ ] Identificar tecnologías/frameworks
- [ ] Extraer archivos clave (package.json, README, etc.)
- [ ] Manejar errores y timeouts

### 📝 Tareas Específicas

#### 1. Configuración Inicial
```bash
cd backend
npm install axios
```

#### 2. Variables de Entorno
Añadir a `/backend/.env`:
```env
GITINGEST_API_URL=https://gitingest.com/api
GITINGEST_TIMEOUT=30000
GITHUB_TOKEN=tu_token_opcional
```

#### 3. Métodos a Implementar
- `analyzeRepository(repoUrl)` - Método principal
- `callGitIngestAPI(owner, repo)` - Llamada HTTP
- `parseGitHubUrl(url)` - Parser de URLs
- `processRepositoryData(rawData)` - Procesador
- `extractLanguages(languagesData)` - Extractor de lenguajes
- `detectTechnologies(files)` - Detector de frameworks
- `extractDependencies(files)` - Extractor de dependencias

### 🧪 Criterios de Aceptación

- [ ] El servicio puede parsear URLs de GitHub correctamente
- [ ] Se conecta exitosamente a GitIngest API
- [ ] Extrae y procesa todos los metadatos del repositorio
- [ ] Detecta correctamente lenguajes y tecnologías
- [ ] Maneja errores de API (404, timeout, etc.)
- [ ] Incluye logs informativos en consola
- [ ] El código está documentado con JSDoc

### 🔗 Referencias

- Documentación GitIngest: [enlace]
- Guía de implementación: `GUIA_IMPLEMENTACION_GITINGEST.md` (Paso 2)

### 💡 Notas Técnicas

- Usar `axios` para llamadas HTTP
- Timeout de 30 segundos por defecto
- Excluir carpetas: `node_modules`, `.git`, `dist`, `build`
- Limitar tamaño de archivos a 100KB
- Procesar máximo 20 archivos por análisis

---

## 🔴 ISSUE #2: Crear Servicio de Generación de Preguntas con IA

**Título:** `[Backend] Implementar generación de preguntas contextuales con Gemini AI`

**Labels:** `backend`, `AI`, `enhancement`, `high-priority`

**Milestone:** `Sprint 1 - Backend Core`

---

### 📋 Descripción

Crear servicio que utilice Google Gemini AI para generar preguntas técnicas contextuales basadas en el análisis del código obtenido de GitIngest.

### 🎯 Objetivos

- [ ] Crear archivo `/backend/services/questionGeneratorService.js`
- [ ] Implementar generación de preguntas con Gemini
- [ ] Construir prompts contextuales ricos
- [ ] Seleccionar archivos relevantes según tipo de análisis
- [ ] Incluir snippets de código en las preguntas
- [ ] Generar puntos esperados para buenas respuestas

### 📝 Tareas Específicas

#### 1. Configuración
Asegurar que existe en `.env`:
```env
GEMINI_API_KEY=tu_clave_api
```

#### 2. Métodos a Implementar
- `generateQuestionsFromRepository(repositoryData, options)` - Principal
- `buildPrompt(repoData, analysisType, difficulty, language, count)` - Constructor de prompt
- `selectRelevantFiles(fileContents, analysisType)` - Selector de archivos

#### 3. Tipos de Análisis Soportados
- `code_quality` - Calidad de código
- `architecture` - Arquitectura
- `security` - Seguridad
- `best_practices` - Mejores prácticas
- `testing` - Testing
- `performance` - Rendimiento

### 🧪 Criterios de Aceptación

- [ ] Genera 10 preguntas por defecto (configurable)
- [ ] Las preguntas incluyen código real del repositorio
- [ ] Especifica ruta del archivo y líneas de código
- [ ] Categoriza preguntas correctamente
- [ ] Incluye contexto sobre por qué el código es importante
- [ ] Lista puntos esperados en respuestas correctas
- [ ] Soporta múltiples idiomas (ES, EN, FR, DE)
- [ ] Maneja errores de API de Gemini

### 📊 Estructura de Salida

```json
{
  "questions": [
    {
      "question": "¿Por qué se usa X patrón en este archivo?",
      "filePath": "src/services/UserService.js",
      "codeSnippet": "class UserService {...}",
      "category": "architecture",
      "difficulty": "medium",
      "context": "Demuestra patrón de inyección de dependencias",
      "expectedPoints": [
        "Testabilidad",
        "Bajo acoplamiento",
        "Flexibilidad"
      ]
    }
  ]
}
```

### 🔗 Referencias

- Guía de implementación: `GUIA_IMPLEMENTACION_GITINGEST.md` (Paso 3)
- Documentación Gemini: [enlace]

---

## 🔴 ISSUE #3: Crear Modelo RepositoryAnalysis

**Título:** `[Backend] Crear modelo de datos RepositoryAnalysis para MongoDB`

**Labels:** `backend`, `database`, `high-priority`

**Milestone:** `Sprint 1 - Backend Core`

---

### 📋 Descripción

Crear modelo Mongoose para almacenar análisis de repositorios de GitHub, similar al modelo Interview existente pero adaptado para código.

### 🎯 Objetivos

- [ ] Crear archivo `/backend/models/RepositoryAnalysis.js`
- [ ] Definir schema completo
- [ ] Configurar relaciones con User y Questions
- [ ] Añadir validaciones
- [ ] Crear índices para búsquedas eficientes

### 📝 Estructura del Modelo

```javascript
{
  userId: ObjectId (ref: User),
  repositoryUrl: String (required),
  repositoryName: String (required),
  repositoryOwner: String (required),
  repositoryLanguage: String,
  analysisType: String (enum: ['code_quality', 'architecture', 'security', ...]),
  difficulty: String (enum: ['beginner', 'intermediate', 'advanced']),
  language: String (enum: ['en', 'es', 'fr', 'de']),
  status: String (enum: ['analyzing', 'in_progress', 'completed', 'paused']),
  gitingestData: Object (datos completos de GitIngest),
  codeStructure: {
    files: Number,
    folders: Number,
    totalLines: Number,
    totalSize: Number
  },
  questions: [ObjectId (ref: Question)],
  currentQuestionIndex: Number,
  totalScore: Number (0-100),
  feedback: String,
  statistics: Object,
  createdAt: Date,
  updatedAt: Date,
  analyzedAt: Date,
  completedAt: Date
}
```

### 💡 Nota sobre Modelo Interview

Este modelo es **similar** a `/backend/models/Interview.js` pero:
- En lugar de `profession` → usa `repositoryUrl`
- En lugar de `title` → usa `repositoryName`
- Añade `gitingestData` para almacenar análisis completo
- Añade `codeStructure` para métricas del repositorio

Puedes usar Interview.js como **referencia base** y adaptar campos.

### 🧪 Criterios de Aceptación

- [ ] El modelo se crea correctamente
- [ ] Todas las validaciones funcionan
- [ ] Relaciones con otros modelos están configuradas
- [ ] Se pueden crear análisis de prueba
- [ ] Los índices mejoran performance de búsquedas

### 🔗 Referencias
**Labels:** `backend`, `database`, `medium-priority`, `refactor`
- Modelo Interview existente: `/backend/models/Interview.js`
- Guía de migración: `RESUMEN_FUNCIONALIDADES_Y_MIGRACION.md` (Issue #1)

---

## 🔴 ISSUE #3.5: Actualizar Modelo User

**Título:** `[Backend] Añadir campos de GitHub al modelo User`

**Labels:** `backend`, `database`, `medium-priority`, `refactor`

**Milestone:** `Sprint 1 - Backend Core`

- [ ] Mantener retrocompatibilidad

### 📋 Descripción
### 🔧 REFACTORIZACIÓN NECESARIA

#### Archivo a Refactorizar: `/backend/models/Question.js`

**Situación Actual:**
```javascript
const questionSchema = new mongoose.Schema({
  interviewId: {  // <- Referencia actual
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: true
  },
  questionText: String,
  questionAudio: String,
  order: Number,
  category: String,
  difficulty: String,
  responses: [ObjectId],
  timeLimit: Number,
  createdAt: Date
});
```

**Decisión: Mantener Dual Functionality**

Para que el modelo sirva tanto para Interview como para RepositoryAnalysis:

```javascript
**Labels:** `backend`, `database`, `medium-priority`, `refactor`
  // Mantener campo existente:
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: false  // Cambiar a false
  },
  
  // AÑADIR nuevo campo:
  repositoryAnalysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryAnalysis',
    required: false
  },
  
- [ ] Mantener retrocompatibilidad

### 🔧 REFACTORIZACIÓN NECESARIA

#### Archivo a Refactorizar: `/backend/models/Response.js`

**Situación Actual:**
```javascript
const responseSchema = new mongoose.Schema({
  questionId: ObjectId,
  interviewId: ObjectId,  // <- Referencia actual
  responseText: String,
  responseAudio: String,
  duration: Number,
  score: Number,
  feedback: String,
  confidence: Number,
  analysis: {
    strengths: [String],
    areasForImprovement: [String],
    keywords: [String]
  },
  createdAt: Date
});
```

**Acción Requerida - Añadir Campos:**

```javascript
const responseSchema = new mongoose.Schema({
  questionId: ObjectId,
  
  // Mantener campo existente:
  interviewId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Interview',
    required: false  // Cambiar a false
  },
  
  // AÑADIR nuevo campo:
  repositoryAnalysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryAnalysis',
    required: false
  },
  
  // Campos existentes (sin cambios):
  responseText: String,
  responseAudio: String,
  duration: Number,
  score: Number,
  feedback: String,
  confidence: Number,
  
  // ACTUALIZAR estructura de analysis:
  analysis: {
    // Mantener campos existentes:
    strengths: [String],
    areasForImprovement: [String],
    keywords: [String],
    
    // AÑADIR nuevos campos para análisis de código:
    correctness: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    completeness: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    codeQuality: {
      type: Number,
      min: 0,
      max: 100,
      default: null
    },
    bestPractices: {
      type: [String],
      default: []
    },
    issues: {
      type: [String],
      default: []
    }
  },
  
  // NUEVO CAMPO para sugerencias de código:
  codeImprovement: {
    type: String,
    default: null
  },
  
  createdAt: Date
});

// AÑADIR validación:
responseSchema.pre('save', function(next) {
  if (!this.interviewId && !this.repositoryAnalysisId) {
    next(new Error('Response must be associated with either an Interview or RepositoryAnalysis'));
  } else {
    next();
  }
});
```
  // Campos existentes (sin cambios):
  questionText: String,
  questionAudio: String,
#### 1. Añadir repositoryAnalysisId (línea ~10)
  order: Number,
repositoryAnalysisId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'RepositoryAnalysis',
  required: false
}
```

#### 2. Expandir objeto analysis (línea ~30)
```javascript
analysis: {
  // Existentes (mantener):
  strengths: [String],
  areasForImprovement: [String],
  keywords: [String],
  
  // Nuevos:
  correctness: Number (0-100),
  completeness: Number (0-100),
  codeQuality: Number (0-100),
  bestPractices: [String],
  issues: [String]
}
```

#### 3. Añadir campo codeImprovement (línea ~50)
```javascript
codeImprovement: {
  type: String,
  default: null
    type: String,
    default: null
  },
  lineStart: {
    type: Number,
    default: null
  },
- [ ] Retrocompatibilidad mantenida con responses existentes
- [ ] Validación asegura al menos un ID
- [ ] Defaults correctos (no rompen responses existentes)
- [ ] Tests pasan

### ⚠️ Importante

- **NO eliminar** campos existentes en `analysis`
- **Hacer opcional** tanto `interviewId` como `repositoryAnalysisId`
- **Todos los nuevos campos tienen defaults** (null o [])
    type: Number,
    default: null
  },
  context: {
    type: String,
    default: null
  },
  expectedPoints: {
    type: [String],
    default: []
  },
  
  createdAt: Date
});

// AÑADIR validación personalizada:
questionSchema.pre('save', function(next) {
  // Asegurar que al menos uno de los dos IDs existe
  if (!this.interviewId && !this.repositoryAnalysisId) {
    next(new Error('Question must be associated with either an Interview or RepositoryAnalysis'));
  } else {
    next();
  }
});
```

### 📝 Cambios Específicos

1. **Línea ~5** - Cambiar `required: true` a `required: false` en interviewId
2. **Después de interviewId** - Añadir repositoryAnalysisId
3. **Antes de createdAt** - Añadir nuevos campos de código
4. **Al final** - Añadir validación pre-save


Añadir campos opcionales al modelo User para soportar análisis de repositorios.

### 🎯 Objetivos
  repositoryAnalysisId: ObjectId (ref: RepositoryAnalysis),
- [ ] Modificar `/backend/models/User.js`
- [ ] Añadir campos opcionales sin romper usuarios existentes
- [ ] Mantener retrocompatibilidad

### 🔧 REFACTORIZACIÓN NECESARIA


**Situación Actual:**
```javascript
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
- [ ] Preguntas existentes de Interview siguen funcionando
- [ ] Se pueden crear preguntas con repositoryAnalysisId
- [ ] Validación asegura que existe al menos un ID
- [ ] Nuevos campos son opcionales y tienen defaults
- [ ] Tests pasan para ambos tipos de preguntas

### ⚠️ Importante

- **NO eliminar** `interviewId`
- **Hacer que ambos IDs sean opcionales** pero al menos uno requerido
- **Todos los nuevos campos tienen defaults** (no rompen preguntas existentes)
  language: String,
  subscription: ObjectId,
  subscriptionStatus: String,
  interviews: [ObjectId],  // <- Array actual
  // ...
});
```

**Acción Requerida - Añadir Campos:**
```javascript
const userSchema = new mongoose.Schema({
  // ...campos existentes sin cambios...
  
  // NUEVOS CAMPOS (todos opcionales):
  githubUsername: {
    type: String,
    default: null
  },
  repositories: [{  // Nuevo array para análisis de repos
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryAnalysis'
  }],
  analyzedRepositories: {  // Contador de análisis
    type: Number,
    default: 0
  },
  
  // Mantener campos existentes:
  interviews: [ObjectId],  // Para dual functionality
  profession: String        // Para dual functionality
});
```

### 📝 Cambios Específicos

1. **Añadir después de línea ~40** (después de `interviews`):
```javascript
  repositories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepositoryAnalysis'
  }],
  githubUsername: {
    type: String,
    default: null
  },
  analyzedRepositories: {
    type: Number,
    default: 0
  },
```

2. **Mantener todos los campos existentes** - No eliminar nada

3. **No modificar métodos existentes** (`matchPassword`, `isSubscriptionActive`)

### 🧪 Criterios de Aceptación

- [ ] Campos añadidos correctamente
- [ ] Usuarios existentes no se rompen (todos los campos son opcionales)
- [ ] Se puede crear usuario con nuevos campos
- [ ] Se puede crear usuario sin nuevos campos (retrocompatibilidad)
- [ ] Relación con RepositoryAnalysis funciona
- [ ] Tests pasan

### ⚠️ Importante

- **NO eliminar** campo `profession`
- **NO eliminar** array `interviews`
- **Todos los nuevos campos son opcionales** (default: null o [])
- **Migración automática** - Mongoose manejará usuarios existentes

---

## 🔴 ISSUE #4: Actualizar Modelo Question

**Título:** `[Backend] Adaptar modelo Question para análisis de código`

**Labels:** `backend`, `database`, `medium-priority`

**Milestone:** `Sprint 1 - Backend Core`

---

### 📋 Descripción

Actualizar modelo Question para incluir campos específicos de análisis de código (snippets, rutas de archivos, contexto).

### 🎯 Objetivos

- [ ] Modificar `/backend/models/Question.js`
- [ ] Añadir campos nuevos
- [ ] Mantener retrocompatibilidad si es necesario
- [ ] Actualizar validaciones

### 📝 Nuevos Campos a Añadir

```javascript
{
  repositoryAnalysisId: ObjectId (ref: RepositoryAnalysis), // Reemplaza interviewId
  codeSnippet: String, // Fragmento de código relevante
  filePath: String, // Ruta del archivo en el repo
  lineStart: Number, // Línea de inicio (opcional)
  lineEnd: Number, // Línea de fin (opcional)
  context: String, // Contexto sobre por qué este código importa
  expectedPoints: [String] // Puntos clave que debería cubrir una buena respuesta
  // ... mantener campos existentes
}
```

### 🧪 Criterios de Aceptación

- [ ] Modelo actualizado correctamente
- [ ] Migración de datos no rompe preguntas existentes
- [ ] Nuevos campos son opcionales
- [ ] Validaciones funcionan correctamente

---

## 🔴 ISSUE #5: Actualizar Modelo Response

**Título:** `[Backend] Adaptar modelo Response para evaluación de código`

**Labels:** `backend`, `database`, `medium-priority`

**Milestone:** `Sprint 1 - Backend Core`

---

### 📋 Descripción

Actualizar modelo Response para incluir evaluación específica de comprensión de código y sugerencias de mejora.

### 🎯 Objetivos

- [ ] Modificar `/backend/models/Response.js`
- [ ] Añadir nuevos campos de evaluación
- [ ] Actualizar estructura de análisis

### 📝 Campos a Modificar/Añadir

```javascript
{
  repositoryAnalysisId: ObjectId (ref: RepositoryAnalysis),
  codeImprovement: String, // Sugerencia de mejora del código
  analysis: {
    correctness: Number (0-100), // Nuevo
    completeness: Number (0-100), // Nuevo
    codeQuality: Number (0-100), // Nuevo
    bestPractices: [String],
    issues: [String] // Errores/misconceptions detectadas
  }
  // ... mantener campos existentes
}
```

### 🧪 Criterios de Aceptación

- [ ] Modelo actualizado
- [ ] Campos de análisis de código funcionan
- [ ] Retrocompatibilidad mantenida

---

## 🟡 ISSUE #6: Crear Controlador RepositoryAnalysis

**Título:** `[Backend] Implementar controlador de análisis de repositorios`

**Labels:** `backend`, `controller`, `high-priority`

**Milestone:** `Sprint 2 - Backend Completo`

---

### 📋 Descripción

Crear controlador que orqueste el análisis completo: GitIngest → IA → Base de datos.

### 🎯 Objetivos

- [ ] Crear `/backend/controllers/repositoryAnalysisController.js`
- [ ] Implementar endpoint de análisis
- [ ] Implementar CRUD completo
- [ ] Integrar servicios de GitIngest y IA
- [ ] Manejar errores correctamente

### 📝 Endpoints a Implementar

#### POST `/api/repository-analysis/analyze`
Analiza un repositorio completo
```javascript
Body: {
  repositoryUrl: String,
  analysisType: String,
  difficulty: String,
  language: String
}
```

#### GET `/api/repository-analysis`
Lista análisis del usuario

#### GET `/api/repository-analysis/:id`
Obtiene análisis específico con preguntas

#### PUT `/api/repository-analysis/:id/status`
Actualiza estado (in_progress → completed)

#### DELETE `/api/repository-analysis/:id`
Elimina análisis y datos relacionados

### 🧪 Criterios de Aceptación

- [ ] Todos los endpoints funcionan
- [ ] Integración con GitIngest exitosa
- [ ] Preguntas se generan correctamente
- [ ] Datos se guardan en BD
- [ ] Manejo de errores robusto
- [ ] Logs informativos en consola
- [ ] Respuestas HTTP apropiadas

### 🔗 Referencias

- Guía: `GUIA_IMPLEMENTACION_GITINGEST.md` (Paso 4)

---

## 🟡 ISSUE #7: Crear Servicio de Evaluación de Respuestas

**Título:** `[Backend] Implementar evaluación de respuestas con contexto de código`

**Labels:** `backend`, `AI`, `medium-priority`

**Milestone:** `Sprint 2 - Backend Completo`

---

### 📋 Descripción

Crear servicio que evalúe las respuestas del usuario considerando el código real del repositorio.

### 🎯 Objetivos

- [ ] Crear `/backend/services/responseEvaluatorService.js`
- [ ] Evaluar correctness, completeness, codeQuality
- [ ] Generar feedback educativo
- [ ] Sugerir mejoras de código específicas
- [ ] Identificar best practices

### 📝 Método Principal

```javascript
evaluateResponse(question, userResponse, repositoryContext)
```

### 📊 Estructura de Salida

```json
{
  "correctness": 85,
  "completeness": 75,
  "codeQuality": 80,
  "overallScore": 80,
  "feedback": "Excelente respuesta que demuestra...",
  "strengths": ["Identifica X", "Menciona Y"],
  "improvements": ["Podrías añadir Z"],
  "bestPractices": ["Práctica A", "Práctica B"],
  "codeImprovement": "// Ejemplo mejorado...",
  "issues": ["Error conceptual en X"]
}
```

### 🧪 Criterios de Aceptación

- [ ] Evaluación precisa y contextual
- [ ] Feedback constructivo y educativo
- [ ] Sugerencias de código específicas
- [ ] Manejo de errores de API

---

## 🟡 ISSUE #8: Actualizar Controlador de Respuestas

**Título:** `[Backend] Adaptar responseController para análisis de código`

**Labels:** `backend`, `controller`, `medium-priority`

**Milestone:** `Sprint 2 - Backend Completo`

---

### 📋 Descripción

Modificar submitResponse para incluir contexto de código en la evaluación.

### 🎯 Objetivos

- [ ] Modificar `/backend/controllers/responseController.js`
- [ ] Integrar servicio de evaluación
- [ ] Incluir contexto del repositorio
- [ ] Actualizar estructura de análisis

### 📝 Cambios en submitResponse

```javascript
// Añadir contexto
const repositoryContext = {
  repositoryName: analysis.repositoryName,
  repositoryLanguage: analysis.repositoryLanguage,
  codeSnippet: question.codeSnippet,
  filePath: question.filePath
};

// Evaluar con contexto
const evaluation = await responseEvaluatorService.evaluateResponse(
  question,
  userResponse,
  repositoryContext
);
```

### 🧪 Criterios de Aceptación

- [ ] Respuestas se evalúan con contexto de código
- [ ] Se guardan todas las métricas de evaluación
- [ ] Sugerencias de mejora se almacenan
- [ ] Funcionamiento correcto end-to-end

---

## 🟢 ISSUE #9: Crear Rutas API de Repository Analysis

**Título:** `[Backend] Configurar rutas para análisis de repositorios`

**Labels:** `backend`, `routes`, `high-priority`, `refactor`

**Milestone:** `Sprint 2 - Backend Completo`

---

### 📋 Descripción

Crear archivo de rutas y registrarlo en el servidor principal.

### 🎯 Objetivos

- [ ] Crear `/backend/routes/repositoryAnalysis.js`
- [ ] Registrar rutas en `/backend/server.js`
- [ ] Aplicar middleware de autenticación
- [ ] Configurar validaciones

### 🔧 REFACTORIZACIÓN NECESARIA

#### Archivo a Refactorizar: `/backend/routes/interviews.js`

**Situación Actual:**
```javascript
// Este archivo maneja entrevistas de trabajo
router.post('/generate-questions', authMiddleware, interviewController.generateAIQuestions);
router.post('/', authMiddleware, interviewController.createInterview);
router.get('/', authMiddleware, interviewController.getInterviews);
// ...
```

**Acción Requerida:**
1. **Mantener este archivo** si quieres conservar funcionalidad de entrevistas
2. **O renombrar** a `repositoryAnalysis.js` y cambiar referencias:
   ```javascript
   // Nuevo: /backend/routes/repositoryAnalysis.js
   router.post('/analyze', authMiddleware, repositoryAnalysisController.analyzeRepository);
   router.get('/', authMiddleware, repositoryAnalysisController.getAnalyses);
   // ...
   ```

**Decisión Recomendada:** Crear archivo nuevo y mantener `interviews.js` por si se necesita retrocompatibilidad.
**Labels:** `frontend`, `api`, `high-priority`, `refactor`
#### Archivo a Modificar: `/backend/server.js`

**Cambio en línea ~78:**
```javascript
// ANTES
const interviewRoutes = require('./routes/interviews');
app.use('/api/interviews', interviewRoutes);

// DESPUÉS (añadir)
const repositoryAnalysisRoutes = require('./routes/repositoryAnalysis');
app.use('/api/repository-analysis', repositoryAnalysisRoutes);
```

### 📝 Tareas

### 🔧 REFACTORIZACIÓN NECESARIA

#### Archivo a Refactorizar: `/frontend/src/api/index.js`

**Situación Actual:**
```javascript
// Ya existe estructura de servicios:
export const authService = { ... };
export const interviewService = { ... };  // Este maneja entrevistas
export const responseService = { ... };
export const statsService = { ... };
export const subscriptionService = { ... };
export const aiService = { ... };
```

**Acción Requerida:**

**Opción 1 - Mantener Ambos (Recomendado):**
```javascript
// Mantener interviewService para retrocompatibilidad
export const interviewService = {
  generateQuestions: (data) => api.post('/interviews/generate-questions', data),
  createInterview: (data) => api.post('/interviews', data),
  // ... mantener existentes
};

// AÑADIR nuevo servicio
export const repositoryAnalysisService = {
  analyzeRepository: (data) => api.post('/repository-analysis/analyze', data),
  getAnalyses: () => api.get('/repository-analysis'),
  getAnalysis: (id) => api.get(`/repository-analysis/${id}`),
  updateStatus: (id, data) => api.put(`/repository-analysis/${id}/status`, data),
  deleteAnalysis: (id) => api.delete(`/repository-analysis/${id}`)
};
```

**Opción 2 - Migración Completa:**
```javascript
// RENOMBRAR interviewService a repositoryAnalysisService
// y actualizar todos los componentes que lo usan
```

#### Componentes que Usan interviewService (a revisar):
- `/frontend/src/pages/Interviews.jsx` - línea 30
- `/frontend/src/pages/InterviewSession.jsx` - línea 15
- `/frontend/src/hooks/useDashboard.jsx` (si existe)

**Decisión Recomendada:** Mantener ambos servicios inicialmente para no romper funcionalidad existente.

1. ✅ Crear `/backend/routes/repositoryAnalysis.js`
2. ✅ Importar `repositoryAnalysisController`
3. ✅ Aplicar middleware `authMiddleware`
4. ⚠️ Modificar `/backend/server.js` (añadir nueva ruta)
5. 📝 Documentar ambos endpoints (interviews y repository-analysis)

### 🧪 Criterios de Aceptación

- [ ] Todas las rutas funcionan
- [ ] Autenticación requerida
- [ ] Validaciones aplicadas

### 📝 Cambios en `/frontend/src/api/index.js`

```javascript
// AÑADIR al final del archivo, antes de las exportaciones existentes
export const repositoryAnalysisService = {
  analyzeRepository: (data) => api.post('/repository-analysis/analyze', data),
  getAnalyses: () => api.get('/repository-analysis'),
  getAnalysis: (id) => api.get(`/repository-analysis/${id}`),
  updateStatus: (id, data) => api.put(`/repository-analysis/${id}/status`, data),
  deleteAnalysis: (id) => api.delete(`/repository-analysis/${id}`)
};
```
- [ ] Tests de endpoints pasan
- [ ] No rompe funcionalidad existente de interviews

---

- [ ] Tokens de autenticación incluidos (ya configurado en `/frontend/src/api/api.js`)

- [ ] No rompe importaciones existentes
**Título:** `[Frontend] Implementar servicio de comunicación con backend`

**Labels:** `frontend`, `api`, `high-priority`

**Milestone:** `Sprint 3 - Frontend Core`

---

### 📋 Descripción

Crear servicio frontend para comunicación con endpoints de análisis de repositorios.

### 🎯 Objetivos

- [ ] Crear `/frontend/src/api/repositoryAnalysisService.js`
- [ ] Exportar en `/frontend/src/api/index.js`
- [ ] Usar instancia axios existente

### 📝 Métodos a Implementar

```javascript
export const repositoryAnalysisService = {
  analyzeRepository: (data) => api.post('/repository-analysis/analyze', data),
  getAnalyses: () => api.get('/repository-analysis'),
  getAnalysis: (id) => api.get(`/repository-analysis/${id}`),
  updateStatus: (id, data) => api.put(`/repository-analysis/${id}/status`, data),
  deleteAnalysis: (id) => api.delete(`/repository-analysis/${id}`)
};
```

### 🧪 Criterios de Aceptación

- [ ] Todos los métodos funcionan
- [ ] Manejo de errores correcto
- [ ] Tokens de autenticación incluidos
- [ ] Exportado correctamente

---

## 🎨 ISSUE #11: Crear Hook useRepositoryAnalysis

**Título:** `[Frontend] Implementar hook personalizado para análisis`

**Labels:** `frontend`, `hooks`, `medium-priority`

**Milestone:** `Sprint 3 - Frontend Core`

---

### 📋 Descripción

Crear hook personalizado que maneje la lógica de análisis de repositorios.

### 🎯 Objetivos

- [ ] Crear `/frontend/src/hooks/useRepositoryAnalysis.js`
- [ ] Manejar estados de loading
- [ ] Integrar toasts de notificación
- [ ] Validar inputs

### 📝 Funcionalidad

```javascript
export const useRepositoryAnalysis = () => {
  const [loading, setLoading] = useState(false);
  
  const analyzeRepository = async (formData) => {
    // Validación
    // Llamada a API
    // Notificaciones
    // Retorno de datos
  };
  
  return { loading, analyzeRepository };
};
```

### 🧪 Criterios de Aceptación

- [ ] Hook funciona correctamente
- [ ] Validación de URLs de GitHub
- [ ] Notificaciones apropiadas
- [ ] Estado de loading manejado

---

## 🎨 ISSUE #12: Crear Página Repository Analysis

**Título:** `[Frontend] Implementar página de análisis de repositorios`

**Labels:** `frontend`, `UI`, `high-priority`

**Milestone:** `Sprint 3 - Frontend Core`

---

### 📋 Descripción

Crear página principal donde usuarios ingresan URL de GitHub y configuran análisis.

### 🎯 Objetivos

- [ ] Crear `/frontend/src/pages/RepositoryAnalysis.jsx`
- [ ] Formulario de análisis
- [ ] Lista de análisis previos
- [ ] Integrar con hook personalizado
- [ ] Estilos responsive

### 📝 Componentes del Formulario

- Input URL de GitHub (validación)
- Select tipo de análisis
- Select dificultad
- Select idioma
- Botón submit (con loading)

### 📝 Lista de Análisis
**Labels:** `frontend`, `routing`, `medium-priority`, `refactor`
- Cards con información del repo
- Nombre y owner
- Lenguaje principal
- Estado
- Acciones (ver, eliminar)

### 🧪 Criterios de Aceptación

- [ ] Formulario funcional
- [ ] Validación de URLs
- [ ] Lista de análisis previos
- [ ] Navegación a sesión de análisis
- [ ] Responsive design
- [ ] Actualizar menú de navegación (Header)

---
### 🔧 REFACTORIZACIÓN NECESARIA

#### Archivo a Refactorizar: `/frontend/src/App.js`

**Situación Actual:**
```javascript
import Interviews from './pages/Interviews';
import InterviewSession from './pages/InterviewSession';

// Rutas existentes:
<Route path="/interviews" element={<Interviews />} />
<Route path="/interview/:interviewId" element={<InterviewSession />} />
```

**Acción Requerida:**

**Opción 1 - Mantener Ambas Funcionalidades:**
```javascript
import Interviews from './pages/Interviews';
import InterviewSession from './pages/InterviewSession';
// AÑADIR:
import RepositoryAnalysis from './pages/RepositoryAnalysis';
import AnalysisSession from './pages/AnalysisSession';

// Rutas:
<Route path="/interviews" element={<Interviews />} />
<Route path="/interview/:interviewId" element={<InterviewSession />} />
// AÑADIR:
<Route path="/repository-analysis" element={<RepositoryAnalysis />} />
<Route path="/analysis/:analysisId" element={<AnalysisSession />} />
```

**Opción 2 - Reemplazar Completamente:**
```javascript
// REEMPLAZAR imports y rutas de interviews por repository-analysis
```

**Decisión Recomendada:** Opción 1 - Mantener ambas funcionalidades.

#### Componente a Refactorizar: `/frontend/src/components/Header.jsx`

**Situación Actual:**
```javascript
// Header tiene navegación a:
- Home
- Dashboard
- Interviews  // <- Este link
- Settings
- Subscription
```

**Acción Requerida:**
```javascript
// OPCIÓN 1: Añadir nuevo link (mantener ambos)
<Nav.Link href="/interviews">Interviews</Nav.Link>
<Nav.Link href="/repository-analysis">Code Analysis</Nav.Link>

// OPCIÓN 2: Reemplazar
<Nav.Link href="/repository-analysis">Repository Analysis</Nav.Link>
```

#### Store/Context a Revisar: `/frontend/src/store/Header.js`

Si existe un store de Zustand para Header, verificar si maneja navegación activa.

### 📝 Tareas Específicas

1. ✅ Importar nuevos componentes en `App.js`
2. ✅ Añadir rutas de repository-analysis
3. ⚠️ Modificar `Header.jsx` - añadir links de navegación
4. 📝 Decidir si mantener o reemplazar rutas de interviews
5. ✅ Aplicar autenticación a nuevas rutas (si usas PrivateRoute)
6. 🧪 Probar navegación entre páginas

### 📝 Nuevas Rutas a Añadir
## 🎨 ISSUE #13: Crear Página Analysis Session

// En App.js
import RepositoryAnalysis from './pages/RepositoryAnalysis';
import AnalysisSession from './pages/AnalysisSession';

// Dentro de <Routes>
**Título:** `[Frontend] Implementar sesión interactiva de análisis`

**Labels:** `frontend`, `UI`, `high-priority`

### 📝 Actualización de Header

```javascript
// En Header.jsx - añadir nuevo item de menú
<Nav.Link 
  as={Link} 
  to="/repository-analysis"
  className={location.pathname === '/repository-analysis' ? 'active' : ''}
>
  <FiGithub /> Repository Analysis
</Nav.Link>
```

**Milestone:** `Sprint 3 - Frontend Core`

---

### 📋 Descripción
- [ ] Links en Header actualizados
- [ ] Estado activo del menú funciona
- [ ] No rompe navegación existente

Crear página donde usuarios ven preguntas con código y responden.

### 🎯 Objetivos

- [ ] Crear `/frontend/src/pages/AnalysisSession.jsx`
- [ ] Instalar `react-syntax-highlighter`
- [ ] Mostrar código con syntax highlighting
- [ ] Formulario de respuesta
- [ ] Navegación entre preguntas
- [ ] Mostrar feedback de IA

### 📝 Componentes Principales

#### Header del Repositorio
- Nombre del repo
- Owner
- Lenguaje principal
- Tecnologías detectadas

#### Barra de Progreso
- Preguntas respondidas
- Progreso visual

#### Sección de Pregunta
- Texto de la pregunta
- Categoría y dificultad
- Ruta del archivo
- Código con syntax highlighting
- Contexto de la pregunta

#### Área de Respuesta
- Textarea para respuesta
- Botón guardar
- Estado de guardado

#### Feedback de IA (si respondió)
- Puntuación general
- Correctness, completeness, codeQuality
- Strengths y improvements
- Sugerencia de mejora de código
- Best practices relacionadas

#### Navegación
- Botón anterior
- Botón siguiente
- Botón completar análisis

### 🧪 Criterios de Aceptación

- [ ] Syntax highlighting funcional
- [ ] Navegación entre preguntas
- [ ] Guardado de respuestas
- [ ] Mostrar feedback correctamente
- [ ] Completar análisis actualiza estado
- [ ] Responsive design
- [ ] Loading states apropiados

### 🔗 Dependencias

```bash
npm install react-syntax-highlighter
```

---

## 🟢 ISSUE #14: Actualizar Navegación y Rutas

**Título:** `[Frontend] Configurar rutas para nuevas páginas`

**Labels:** `frontend`, `routing`, `medium-priority`

**Milestone:** `Sprint 3 - Frontend Core`

---

### 📋 Descripción

Actualizar React Router con nuevas rutas y navegación.

### 🎯 Objetivos

- [ ] Actualizar `/frontend/src/App.js`
- [ ] Añadir rutas de análisis
- [ ] Actualizar menú de navegación
- [ ] Proteger rutas con autenticación

### 📝 Nuevas Rutas

```javascript
<Route path="/repository-analysis" element={<RepositoryAnalysis />} />
<Route path="/analysis/:analysisId" element={<AnalysisSession />} />
```

### 🧪 Criterios de Aceptación

- [ ] Rutas funcionan correctamente
- [ ] Navegación intuitiva
- [ ] Rutas protegidas con auth

---

## 🟢 ISSUE #15: Actualizar Página Home

**Título:** `[Frontend] Adaptar landing page para nuevo concepto`

**Labels:** `frontend`, `UI`, `content`, `low-priority`

**Milestone:** `Sprint 4 - Frontend Completo`

---

### 📋 Descripción

Actualizar textos e imágenes de la página de inicio para reflejar análisis de código.

### 🎯 Objetivos

- [ ] Modificar `/frontend/src/pages/Home.jsx`
- [ ] Actualizar hero section
- [ ] Cambiar características mostradas
- [ ] Actualizar pricing
- [ ] Nuevos íconos/imágenes

### 📝 Nuevos Textos

**Hero:**
- "Mejora tus habilidades de Code Review con IA"
- "Analiza repositorios de GitHub y recibe preguntas inteligentes..."

**Features:**
- 🔍 Análisis Automático de Código
- 🤖 Preguntas Generadas por IA
- 📊 Reportes de Calidad
- 🚀 Recomendaciones de Best Practices

**Pricing:**
- Free: 5 análisis/mes, repos públicos
- Premium: Análisis ilimitados, repos privados, reportes

### 🧪 Criterios de Aceptación

- [ ] Textos actualizados
- [ ] Íconos apropiados
- [ ] Links funcionan
- [ ] Diseño consistente

---

## 🟢 ISSUE #16: Actualizar Dashboard

**Título:** `[Frontend] Adaptar dashboard para métricas de código`

**Labels:** `frontend`, `UI`, `medium-priority`

**Milestone:** `Sprint 4 - Frontend Completo`

---

### 📋 Descripción

Actualizar dashboard para mostrar estadísticas de análisis de repositorios.

### 🎯 Objetivos

- [ ] Modificar `/frontend/src/pages/Dashboard.jsx`
- [ ] Nuevas estadísticas
- [ ] Gráficos de lenguajes
- [ ] Repositorios recientes

### 📝 Nuevas Métricas

- Total de repositorios analizados
- Calidad de código promedio
- Análisis completados
- Lenguajes más analizados
- Áreas de mejora comunes

### 🧪 Criterios de Aceptación

- [ ] Métricas correctas
- [ ] Gráficos visuales
- [ ] Performance optimizado

---

## 📊 RESUMEN DE REFACTORIZACIÓN

### 📁 Archivos que REQUIEREN Modificación

| Archivo | Tipo de Cambio | Issue | Prioridad |
|---------|---------------|-------|-----------|
| `/backend/models/User.js` | Añadir campos opcionales | #3.5 | Media |
| `/backend/models/Question.js` | Añadir campos + dual ref | #4 | Alta |
| `/backend/models/Response.js` | Añadir campos + dual ref | #5 | Alta |
| `/backend/server.js` | Añadir nueva ruta (1 línea) | #9 | Alta |
| `/frontend/src/api/index.js` | Añadir nuevo servicio | #10 | Alta |
| `/frontend/src/App.js` | Añadir nuevas rutas | #14 | Alta |
| `/frontend/src/components/Header.jsx` | Añadir link menú | #14 | Media |
| `/frontend/src/pages/Home.jsx` | Actualizar textos (opcional) | #15 | Baja |
| `/frontend/src/pages/Dashboard.jsx` | Actualizar métricas (opcional) | #16 | Baja |

### 📁 Archivos que NO Requieren Modificación

✅ Estos archivos se mantienen sin cambios:

**Backend:**
- `/backend/models/Interview.js` - Mantener como está
- `/backend/models/Subscription.js` - Sin cambios
- `/backend/controllers/authController.js` - Sin cambios
- `/backend/controllers/interviewController.js` - Sin cambios (mantener)
- `/backend/controllers/responseController.js` - Sin cambios (mantener)
- `/backend/controllers/subscriptionController.js` - Sin cambios
- `/backend/controllers/statsController.js` - Sin cambios (o crear nuevo)
- `/backend/middleware/auth.js` - Sin cambios
- `/backend/middleware/subscription.js` - Sin cambios
- `/backend/routes/auth.js` - Sin cambios
- `/backend/routes/interviews.js` - Sin cambios (mantener endpoint)
- `/backend/routes/responses.js` - Sin cambios (mantener endpoint)
- `/backend/routes/subscriptions.js` - Sin cambios
- `/backend/routes/stats.js` - Sin cambios

**Frontend:**
- `/frontend/src/api/api.js` - Sin cambios (config axios)
- `/frontend/src/pages/Login.jsx` - Sin cambios
- `/frontend/src/pages/Register.jsx` - Sin cambios
- `/frontend/src/pages/Settings.jsx` - Sin cambios
- `/frontend/src/pages/Subscription.jsx` - Sin cambios
- `/frontend/src/pages/Interviews.jsx` - Sin cambios (mantener)
- `/frontend/src/pages/InterviewSession.jsx` - Sin cambios (mantener)
- `/frontend/src/components/StatCard.jsx` - Sin cambios

### 🆕 Archivos Nuevos a Crear

**Backend (8 archivos):**
1. `/backend/services/gitingestService.js` - Issue #1
2. `/backend/services/questionGeneratorService.js` - Issue #2
3. `/backend/services/responseEvaluatorService.js` - Issue #7
4. `/backend/models/RepositoryAnalysis.js` - Issue #3
5. `/backend/controllers/repositoryAnalysisController.js` - Issue #6
6. `/backend/routes/repositoryAnalysis.js` - Issue #9

**Frontend (3 archivos):**
1. `/frontend/src/pages/RepositoryAnalysis.jsx` - Issue #12
2. `/frontend/src/pages/AnalysisSession.jsx` - Issue #13
3. `/frontend/src/hooks/useRepositoryAnalysis.js` - Issue #11

### 🔧 Cambios Línea por Línea

#### `/backend/server.js`
```javascript
// Línea ~78 - AÑADIR después de las rutas existentes:
const repositoryAnalysisRoutes = require('./routes/repositoryAnalysis');
app.use('/api/repository-analysis', repositoryAnalysisRoutes);
```

#### `/backend/models/User.js`
```javascript
// Línea ~40 - AÑADIR después del array 'interviews':
repositories: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'RepositoryAnalysis'
}],
githubUsername: {
  type: String,
  default: null
},
analyzedRepositories: {
  type: Number,
  default: 0
},
```

#### `/backend/models/Question.js`
```javascript
// Línea ~5 - CAMBIAR:
interviewId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Interview',
  required: false  // Era true, cambiar a false
},

// AÑADIR después de interviewId:
repositoryAnalysisId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'RepositoryAnalysis',
  required: false
},

// Línea ~30 - AÑADIR antes de createdAt:
codeSnippet: { type: String, default: null },
filePath: { type: String, default: null },
lineStart: { type: Number, default: null },
lineEnd: { type: Number, default: null },
context: { type: String, default: null },
expectedPoints: { type: [String], default: [] },
```

#### `/backend/models/Response.js`
```javascript
// Línea ~10 - CAMBIAR:
interviewId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Interview',
  required: false  // Era true, cambiar a false
},

// AÑADIR después de interviewId:
repositoryAnalysisId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'RepositoryAnalysis',
  required: false
},

// Línea ~30 - EXPANDIR objeto analysis:
analysis: {
  strengths: [String],
  areasForImprovement: [String],
  keywords: [String],
  // AÑADIR:
  correctness: { type: Number, min: 0, max: 100, default: null },
  completeness: { type: Number, min: 0, max: 100, default: null },
  codeQuality: { type: Number, min: 0, max: 100, default: null },
  bestPractices: { type: [String], default: [] },
  issues: { type: [String], default: [] }
},

// AÑADIR después de analysis:
codeImprovement: {
  type: String,
  default: null
},
```

#### `/frontend/src/api/index.js`
```javascript
// Línea ~50 - AÑADIR al final, antes de las exportaciones:
export const repositoryAnalysisService = {
  analyzeRepository: (data) => api.post('/repository-analysis/analyze', data),
  getAnalyses: () => api.get('/repository-analysis'),
  getAnalysis: (id) => api.get(`/repository-analysis/${id}`),
  updateStatus: (id, data) => api.put(`/repository-analysis/${id}/status`, data),
  deleteAnalysis: (id) => api.delete(`/repository-analysis/${id}`)
};
```

#### `/frontend/src/App.js`
```javascript
// AÑADIR imports:
import RepositoryAnalysis from './pages/RepositoryAnalysis';
import AnalysisSession from './pages/AnalysisSession';

// AÑADIR rutas dentro de <Routes>:
<Route path="/repository-analysis" element={<RepositoryAnalysis />} />
<Route path="/analysis/:analysisId" element={<AnalysisSession />} />
```

#### `/frontend/src/components/Header.jsx`
```javascript
// AÑADIR en la sección de navegación:
<Nav.Link as={Link} to="/repository-analysis">
  <FiGithub /> Code Analysis
</Nav.Link>
```

### ⚠️ Reglas Importantes de Refactorización

1. **NUNCA eliminar campos existentes** - Solo añadir
2. **Hacer opcionales los nuevos campos** - Default null o []
3. **Mantener referencias duales** - interviewId Y repositoryAnalysisId
4. **No romper código existente** - Dual functionality
5. **Probar antes de commit** - Verificar que interviews siguen funcionando

### 🧪 Checklist de Testing Post-Refactorización

Después de cada refactorización, verificar:

**Backend:**
- [ ] Crear entrevista (antigua funcionalidad) funciona
- [ ] Crear análisis (nueva funcionalidad) funciona
- [ ] Modelos permiten ambos tipos de referencias
- [ ] No hay errores de validación con datos existentes
- [ ] API responde correctamente en ambos endpoints

**Frontend:**
- [ ] Página Interviews sigue funcionando
- [ ] Página RepositoryAnalysis funciona
- [ ] Navegación entre ambas páginas funciona
- [ ] No hay errores en consola
- [ ] Importaciones resuelven correctamente

### 📦 Script de Verificación

Puedes usar este script para verificar que los archivos existen:

```bash
# Verificar archivos que DEBEN modificarse
echo "Archivos a modificar:"
ls backend/models/User.js
ls backend/models/Question.js
ls backend/models/Response.js
ls backend/server.js
ls frontend/src/api/index.js
ls frontend/src/App.js

# Verificar que archivos NUEVOS no existen aún
echo "Archivos nuevos (no deberían existir):"
ls backend/services/gitingestService.js 2>/dev/null && echo "⚠️  Ya existe!" || echo "✅ OK"
ls backend/models/RepositoryAnalysis.js 2>/dev/null && echo "⚠️  Ya existe!" || echo "✅ OK"
```

---

## 📊 RESUMEN DE ISSUES

### Sprint 1 - Backend Core (Issues #1-5)
**Duración:** 2 semanas  
**Issues:** #1, #2, #3, #4, #5

### Sprint 2 - Backend Completo (Issues #6-9)
**Duración:** 2 semanas  
**Issues:** #6, #7, #8, #9

### Sprint 3 - Frontend Core (Issues #10-14)
**Duración:** 2-3 semanas  
**Issues:** #10, #11, #12, #13, #14

### Sprint 4 - Frontend Completo (Issues #15-16)
**Duración:** 1 semana  
**Issues:** #15, #16

---

## 🏷️ LABELS SUGERIDAS

Crear estas labels en tu repositorio:

- `backend` - Desarrollo backend
- `frontend` - Desarrollo frontend
- `database` - Modelos y BD
- `AI` - Integración con IA
- `API` - Endpoints y servicios
- `UI` - Interfaz de usuario
- `high-priority` - Prioridad alta
- `medium-priority` - Prioridad media
- `low-priority` - Prioridad baja
- `enhancement` - Nueva funcionalidad
- `bug` - Error a corregir
- `documentation` - Documentación

---

## 📝 PLANTILLA GENÉRICA DE ISSUE

```markdown
**Título:** [Área] Descripción breve

**Labels:** label1, label2, label3

**Milestone:** Sprint X

**Assignees:** @usuario

---

### 📋 Descripción
Descripción detallada de la tarea...

### 🎯 Objetivos
- [ ] Objetivo 1
- [ ] Objetivo 2
- [ ] Objetivo 3

### 📝 Tareas Específicas
1. Tarea 1
2. Tarea 2
3. Tarea 3

### 🧪 Criterios de Aceptación
- [ ] Criterio 1
- [ ] Criterio 2
- [ ] Criterio 3

### 🔗 Referencias
- Documento X
- Issue relacionado #Y
- Link Z

### 💡 Notas Técnicas
- Nota importante 1
- Nota importante 2
```

---

## 🚀 INSTRUCCIONES DE USO

1. **Copia cada issue** en tu repositorio de GitHub
2. **Asigna labels** apropiadas
3. **Crea milestones** por sprint
4. **Asigna responsables**
5. **Organiza en Projects** (opcional)
6. **Trackea progreso** con checkboxes

¡Listo para empezar a crear issues! 🎉

