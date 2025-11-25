      analysis.completedAt = Date.now();
      // Calcular puntuación total
      const Response = require('../models/Response');
      const responses = await Response.find({ repositoryAnalysisId: analysis._id });
      const totalScore = responses.reduce((sum, r) => sum + r.score, 0) / responses.length;
      analysis.totalScore = totalScore;
    }
    
    await analysis.save();
    res.status(200).json({ analysis });
  } catch (error) {
    res.status(500).json({ message: 'Error updating analysis' });
  }
};

/**
 * Eliminar análisis
 */
exports.deleteAnalysis = async (req, res) => {
  try {
    const analysis = await RepositoryAnalysis.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    
    await Question.deleteMany({ repositoryAnalysisId: analysis._id });
    await Response.deleteMany({ repositoryAnalysisId: analysis._id });
    await analysis.deleteOne();
    
    res.status(200).json({ message: 'Analysis deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting analysis' });
  }
};

module.exports = exports;
```

---

## 📊 PASO 5: EJEMPLO DE FLUJO COMPLETO

### Escenario: Usuario analiza Express.js

#### 1. Input del usuario
```
URL: https://github.com/expressjs/express
Tipo: code_quality
Dificultad: intermediate
```

#### 2. GitIngest extrae datos
```json
{
  "name": "express",
  "owner": "expressjs",
  "languages": [{"name": "JavaScript", "percentage": 98.2}],
  "technologies": ["Express", "Node.js"],
  "statistics": {
    "totalFiles": 245,
    "totalLines": 15420
  },
  "keyFiles": [{
    "path": "lib/application.js",
    "content": "var finalhandler = require('finalhandler')..."
  }]
}
```

#### 3. IA genera pregunta contextual
```json
{
  "question": "En 'lib/application.js', ¿por qué Express usa el patrón de middleware en cadena? ¿Qué ventajas ofrece?",
  "filePath": "lib/application.js",
  "codeSnippet": "app.use = function use(fn) {\n  var offset = 0;\n  var path = '/';\n  ...\n}",
  "category": "architecture",
  "difficulty": "medium",
  "expectedPoints": [
    "Separación de responsabilidades",
    "Reutilización de código",
    "Flujo de control flexible",
    "Fácil testing"
  ]
}
```

#### 4. Usuario responde
```
"El patrón de middleware permite separar la lógica en funciones 
independientes que se ejecutan secuencialmente. Cada middleware 
puede procesar la petición y decidir si continúa la cadena."
```

#### 5. IA evalúa
```json
{
  "correctness": 85,
  "completeness": 75,
  "codeQuality": 80,
  "overallScore": 80,
  "feedback": "Excelente respuesta que demuestra comprensión...",
  "strengths": ["Identifica separación de responsabilidades"],
  "improvements": ["Podrías mencionar el uso de next()"],
  "codeImprovement": "// Ejemplo con manejo de errores..."
}
```

---

## 🎨 PASO 6: FRONTEND

### Hook personalizado

**Archivo:** `/frontend/src/hooks/useRepositoryAnalysis.js`

```javascript
import { useState } from 'react';
import { toast } from 'react-toastify';
import { repositoryAnalysisService } from '../api';

export const useRepositoryAnalysis = () => {
  const [loading, setLoading] = useState(false);

  const analyzeRepository = async (formData) => {
    try {
      setLoading(true);

      if (!formData.repositoryUrl.includes('github.com')) {
        toast.error('Invalid GitHub URL');
        return null;
      }

      toast.info('🔍 Analyzing repository...');
      
      const response = await repositoryAnalysisService.analyzeRepository(formData);
      
      toast.success(`✅ ${response.data.analysis.questionsCount} questions generated!`);
      
      return response.data.analysis;
      
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error analyzing repository');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, analyzeRepository };
};
```

### Componente de análisis

**Archivo:** `/frontend/src/pages/RepositoryAnalysis.jsx`

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiGithub } from 'react-icons/fi';
import { useRepositoryAnalysis } from '../hooks/useRepositoryAnalysis';

const RepositoryAnalysis = () => {
  const navigate = useNavigate();
  const { loading, analyzeRepository } = useRepositoryAnalysis();
  const [formData, setFormData] = useState({
    repositoryUrl: '',
    analysisType: 'code_quality',
    difficulty: 'intermediate',
    language: 'en'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const analysis = await analyzeRepository(formData);
    
    if (analysis) {
      navigate(`/analysis/${analysis._id}`);
    }
  };

  return (
    <div className="repository-analysis">
      <h1>Repository Code Analysis</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label><FiGithub /> GitHub Repository URL</label>
          <input
            type="url"
            placeholder="https://github.com/username/repository"
            value={formData.repositoryUrl}
            onChange={(e) => setFormData({...formData, repositoryUrl: e.target.value})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Analysis Type</label>
          <select
            value={formData.analysisType}
            onChange={(e) => setFormData({...formData, analysisType: e.target.value})}
          >
            <option value="code_quality">Code Quality</option>
            <option value="architecture">Architecture</option>
            <option value="security">Security</option>
            <option value="best_practices">Best Practices</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Repository'}
        </button>
      </form>
    </div>
  );
};

export default RepositoryAnalysis;
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### Backend
- [ ] Crear `gitingestService.js`
- [ ] Crear `questionGeneratorService.js`
- [ ] Crear `responseEvaluatorService.js`
- [ ] Crear `repositoryAnalysisController.js`
- [ ] Actualizar modelos (RepositoryAnalysis, Question, Response)
- [ ] Crear rutas `/api/repository-analysis`
- [ ] Configurar variables de entorno
- [ ] Instalar dependencias (`axios`)

### Frontend
- [ ] Crear `repositoryAnalysisService.js`
- [ ] Crear `useRepositoryAnalysis.js` hook
- [ ] Crear página `RepositoryAnalysis.jsx`
- [ ] Crear página `AnalysisSession.jsx`
- [ ] Actualizar navegación (Router)
- [ ] Instalar `react-syntax-highlighter`
- [ ] Crear estilos CSS

### Testing
- [ ] Probar análisis de repositorio público
- [ ] Probar generación de preguntas
- [ ] Probar evaluación de respuestas
- [ ] Probar límites de tamaño de repo
- [ ] Probar timeouts
- [ ] Probar errores de red

---

## 🚀 SIGUIENTES PASOS

1. **Comenzar con el backend**: Implementar servicios de GitIngest y generación de preguntas
2. **Probar con repositorios reales**: Usar repos pequeños primero
3. **Ajustar prompts de IA**: Iterar basándose en la calidad de preguntas generadas
4. **Implementar frontend**: Una vez que el backend funcione correctamente
5. **Optimizar rendimiento**: Caché, timeouts, límites de tamaño
6. **Agregar características premium**: Repos privados, análisis avanzados

---

Este documento proporciona una guía completa para implementar la integración de GitIngest en el proyecto. Sigue los pasos en orden y usa los ejemplos de código como base para tu implementación.
# 🔧 GUÍA DE IMPLEMENTACIÓN DETALLADA CON GITINEST

## 🎯 CONCEPTO DE LA INTEGRACIÓN

### ¿Qué hace GitIngest?
GitIngest es una herramienta que convierte repositorios de GitHub en documentación procesable por IA. Extrae la estructura, archivos, código y metadatos de un repositorio para análisis.

### Flujo Completo del Sistema

```
Usuario Ingresa URL GitHub
         ↓
FRONTEND: Valida y envía solicitud
         ↓
BACKEND GitIngest Service:
  - Parsea URL (owner/repo)
  - Llama a GitIngest API
  - Recibe estructura del repo
  - Procesa información clave
         ↓
BACKEND IA (Gemini):
  - Analiza código extraído
  - Genera preguntas contextuales
  - Incluye snippets relevantes
         ↓
BACKEND Base de Datos:
  - Guarda RepositoryAnalysis
  - Guarda Questions con código
  - Asocia al usuario
         ↓
FRONTEND Sesión de Análisis:
  - Muestra pregunta de IA
  - Muestra código (syntax highlight)
  - Usuario responde
  - Envía respuesta al backend
         ↓
BACKEND Evaluación IA:
  - Evalúa respuesta del usuario
  - Genera feedback
  - Sugiere mejoras de código
  - Guarda en BD
         ↓
FRONTEND Muestra Feedback:
  - Puntuación
  - Feedback detallado
  - Sugerencias de mejora
  - Siguiente pregunta
```

---

## 📦 PASO 1: CONFIGURACIÓN INICIAL

### 1.1 Instalación de Dependencias

**Backend:**
```bash
cd backend
npm install axios
```

**Frontend:**
```bash
cd frontend
npm install react-syntax-highlighter
```

### 1.2 Variables de Entorno

**Archivo:** `/backend/.env`
```env
# GitIngest Configuration
GITINGEST_API_URL=https://gitingest.com/api
GITINGEST_TIMEOUT=30000

# GitHub API (para repos privados - opcional)
GITHUB_TOKEN=tu_github_personal_access_token

# Gemini AI
GEMINI_API_KEY=tu_gemini_api_key
```

---

## 📝 PASO 2: CREAR SERVICIO GITINGEST

**Archivo:** `/backend/services/gitingestService.js`

```javascript
const axios = require('axios');

class GitIngestService {
  constructor() {
    this.apiUrl = process.env.GITINGEST_API_URL || 'https://gitingest.com/api';
    this.timeout = parseInt(process.env.GITINGEST_TIMEOUT) || 30000;
    this.githubToken = process.env.GITHUB_TOKEN;
  }

  /**
   * Analiza repositorio de GitHub usando GitIngest
   */
  async analyzeRepository(repoUrl) {
    try {
      console.log('🔍 Analyzing repository:', repoUrl);
      
      // 1. Parsear URL
      const { owner, repo } = this.parseGitHubUrl(repoUrl);
      
      if (!owner || !repo) {
        throw new Error('Invalid GitHub URL format');
      }
      
      // 2. Llamar a GitIngest API
      const gitingestData = await this.callGitIngestAPI(owner, repo);
      
      // 3. Procesar datos
      const processedData = this.processRepositoryData(gitingestData);
      
      console.log('✅ Repository analyzed successfully');
      return processedData;
      
    } catch (error) {
      console.error('❌ GitIngest error:', error.message);
      throw new Error(`Failed to analyze repository: ${error.message}`);
    }
  }

  /**
   * Llama a GitIngest API
   */
  async callGitIngestAPI(owner, repo) {
    try {
      const response = await axios({
        method: 'POST',
        url: `${this.apiUrl}/ingest`,
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...(this.githubToken && { 'Authorization': `Bearer ${this.githubToken}` })
        },
        data: {
          repository: `${owner}/${repo}`,
          include_content: true,
          max_file_size: 100000, // 100KB
          exclude_patterns: ['node_modules', '.git', 'dist', 'build', '*.min.js']
        }
      });
      
      return response.data;
      
    } catch (error) {
      if (error.response) {
        throw new Error(`GitIngest API error: ${error.response.data.message}`);
      } else if (error.code === 'ECONNABORTED') {
        throw new Error('Timeout - repository too large');
      }
      throw error;
    }
  }

  /**
   * Procesa datos crudos de GitIngest
   */
  processRepositoryData(rawData) {
    return {
      name: rawData.repository?.name || 'Unknown',
      owner: rawData.repository?.owner || 'Unknown',
      description: rawData.repository?.description || '',
      
      statistics: {
        totalFiles: rawData.stats?.total_files || 0,
        totalFolders: rawData.stats?.total_folders || 0,
        totalLines: rawData.stats?.total_lines || 0,
        totalSize: rawData.stats?.total_size || 0
      },
      
      languages: this.extractLanguages(rawData.languages || {}),
      structure: this.buildFileTree(rawData.structure || []),
      keyFiles: this.identifyKeyFiles(rawData.files || []),
      fileContents: this.extractFileContents(rawData.files || []),
      technologies: this.detectTechnologies(rawData.files || []),
      readme: this.extractReadme(rawData.files || []),
      dependencies: this.extractDependencies(rawData.files || [])
    };
  }

  /**
   * Parsea URL de GitHub
   */
  parseGitHubUrl(url) {
    const patterns = [
      /github\.com\/([^\/]+)\/([^\/\.]+)/,
      /github\.com\/([^\/]+)\/([^\/]+)\.git/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return { owner: match[1], repo: match[2] };
      }
    }
    
    throw new Error('Invalid GitHub URL');
  }

  /**
   * Extrae lenguajes de programación
   */
  extractLanguages(languagesData) {
    const languages = [];
    
    for (const [lang, percentage] of Object.entries(languagesData)) {
      languages.push({
        name: lang,
        percentage: parseFloat(percentage),
        isMain: false
      });
    }
    
    languages.sort((a, b) => b.percentage - a.percentage);
    if (languages.length > 0) languages[0].isMain = true;
    
    return languages;
  }

  /**
   * Construye árbol de archivos
   */
  buildFileTree(structure) {
    return structure.map(item => ({
      path: item.path,
      type: item.type,
      size: item.size,
      extension: item.extension
    }));
  }

  /**
   * Identifica archivos clave
   */
  identifyKeyFiles(files) {
    const keyPatterns = [
      'package.json', 'requirements.txt', 'composer.json',
      'README.md', 'index.js', 'main.js', 'app.js',
      'index.py', 'main.py', 'App.jsx', 'App.tsx'
    ];
    
    return files
      .filter(file => 
        keyPatterns.some(pattern => 
          file.path.toLowerCase().endsWith(pattern.toLowerCase())
        )
      )
      .map(file => ({
        path: file.path,
        name: file.name,
        type: this.categorizeFile(file.path),
        size: file.size,
        content: file.content
      }));
  }

  /**
   * Categoriza archivos
   */
  categorizeFile(path) {
    const lowerPath = path.toLowerCase();
    
    if (lowerPath.includes('package.json') || lowerPath.includes('requirements.txt')) {
      return 'dependencies';
    }
    if (lowerPath.includes('readme')) return 'documentation';
    if (lowerPath.includes('test')) return 'test';
    if (lowerPath.includes('config')) return 'configuration';
    
    return 'source';
  }

  /**
   * Extrae contenido de archivos importantes
   */
  extractFileContents(files) {
    const contents = {};
    
    const relevantFiles = files
      .filter(f => f.size < 50000) // < 50KB
      .slice(0, 20); // Max 20 archivos
    
    for (const file of relevantFiles) {
      if (file.content) {
        contents[file.path] = {
          content: file.content,
          language: this.detectLanguageFromExtension(file.path),
          lines: file.content.split('\n').length
        };
      }
    }
    
    return contents;
  }

  /**
   * Detecta lenguaje por extensión
   */
  detectLanguageFromExtension(path) {
    const ext = path.split('.').pop()?.toLowerCase();
    const langMap = {
      'js': 'javascript', 'jsx': 'javascript',
      'ts': 'typescript', 'tsx': 'typescript',
      'py': 'python', 'java': 'java', 'rb': 'ruby',
      'php': 'php', 'go': 'go', 'rs': 'rust',
      'c': 'c', 'cpp': 'cpp', 'cs': 'csharp',
      'html': 'html', 'css': 'css', 'md': 'markdown'
    };
    
    return langMap[ext] || 'text';
  }

  /**
   * Detecta tecnologías/frameworks
   */
  detectTechnologies(files) {
    const technologies = new Set();
    
    files.forEach(file => {
      const path = file.path.toLowerCase();
      
      if (path.includes('package.json') && file.content) {
        try {
          const pkg = JSON.parse(file.content);
          if (pkg.dependencies) {
            if (pkg.dependencies.react) technologies.add('React');
            if (pkg.dependencies.vue) technologies.add('Vue');
            if (pkg.dependencies.angular) technologies.add('Angular');
            if (pkg.dependencies.express) technologies.add('Express');
            if (pkg.dependencies.next) technologies.add('Next.js');
          }
        } catch (e) {}
      }
      
      if (path.includes('requirements.txt') && file.content) {
        if (file.content.includes('django')) technologies.add('Django');
        if (file.content.includes('flask')) technologies.add('Flask');
        if (file.content.includes('fastapi')) technologies.add('FastAPI');
      }
      
      if (path.includes('dockerfile')) technologies.add('Docker');
    });
    
    return Array.from(technologies);
  }

  /**
   * Extrae README
   */
  extractReadme(files) {
    const readme = files.find(f => f.path.toLowerCase().includes('readme'));
    return readme ? readme.content : '';
  }

  /**
   * Extrae dependencias
   */
  extractDependencies(files) {
    const dependencies = { production: [], development: [] };
    
    // package.json
    const packageJson = files.find(f => f.path.endsWith('package.json'));
    if (packageJson && packageJson.content) {
      try {
        const pkg = JSON.parse(packageJson.content);
        if (pkg.dependencies) {
          dependencies.production.push(...Object.keys(pkg.dependencies));
        }
        if (pkg.devDependencies) {
          dependencies.development.push(...Object.keys(pkg.devDependencies));
        }
      } catch (e) {}
    }
    
    // requirements.txt
    const requirements = files.find(f => f.path.endsWith('requirements.txt'));
    if (requirements && requirements.content) {
      const deps = requirements.content
        .split('\n')
        .filter(line => line.trim() && !line.startsWith('#'))
        .map(line => line.split('==')[0].trim());
      dependencies.production.push(...deps);
    }
    
    return dependencies;
  }
}

module.exports = new GitIngestService();
```

---

## 🤖 PASO 3: GENERAR PREGUNTAS CON IA

**Archivo:** `/backend/services/questionGeneratorService.js`

```javascript
const { GoogleGenAI } = require("@google/genai");

class QuestionGeneratorService {
  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  /**
   * Genera preguntas contextuales sobre el código
   */
  async generateQuestionsFromRepository(repositoryData, options = {}) {
    const {
      analysisType = 'code_quality',
      difficulty = 'intermediate',
      language = 'en',
      questionCount = 10
    } = options;

    try {
      const prompt = this.buildPrompt(repositoryData, analysisType, difficulty, language, questionCount);
      
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.0-flash-exp',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              questions: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    question: { type: 'STRING' },
                    filePath: { type: 'STRING' },
                    codeSnippet: { type: 'STRING' },
                    category: { type: 'STRING' },
                    difficulty: { type: 'STRING' },
                    context: { type: 'STRING' },
                    expectedPoints: { 
                      type: 'ARRAY',
                      items: { type: 'STRING' }
                    }
                  }
                }
              }
            }
          }
        }
      });

      return JSON.parse(response.text).questions;

    } catch (error) {
      console.error('Error generating questions:', error);
      throw new Error('Failed to generate questions');
    }
  }

  /**
   * Construye prompt contextual rico
   */
  buildPrompt(repoData, analysisType, difficulty, language, count) {
    const relevantFiles = this.selectRelevantFiles(repoData.fileContents, analysisType);

    return `You are an expert code reviewer. Analyze this GitHub repository and generate ${count} technical questions.

## Repository Information
- **Name**: ${repoData.name}
- **Main Language**: ${repoData.languages[0]?.name || 'Unknown'}
- **Technologies**: ${repoData.technologies.join(', ')}
- **Total Lines**: ${repoData.statistics.totalLines}

## Code Samples
${relevantFiles.map((file, idx) => `
### File ${idx + 1}: ${file.path}
\`\`\`${file.language}
${file.content.substring(0, 800)}
\`\`\`
`).join('\n')}

## Task
Generate ${count} questions focusing on **${analysisType}** at **${difficulty}** level in **${language}** language.

Requirements:
- Base questions on ACTUAL code from the repository
- Include relevant code snippets (10-30 lines)
- Specify exact file path
- Ask about architectural decisions, patterns, or implementations
- Provide context about why this code matters
- Include expectedPoints array with key points for good answers

Example:
{
  "question": "In UserService, why is dependency injection used? What benefits does it provide?",
  "filePath": "src/services/UserService.js",
  "codeSnippet": "class UserService {\\n  constructor(db, logger) {...}\\n}",
  "category": "architecture",
  "difficulty": "medium",
  "context": "Demonstrates dependency injection pattern, key to SOLID design",
  "expectedPoints": [
    "Testability - easier to mock",
    "Loose coupling",
    "Flexibility in implementations"
  ]
}`;
  }

  /**
   * Selecciona archivos relevantes según tipo de análisis
   */
  selectRelevantFiles(fileContents, analysisType) {
    const files = Object.entries(fileContents).map(([path, data]) => ({
      path,
      ...data
    }));

    let filtered = files;

    if (analysisType === 'security') {
      filtered = files.filter(f => 
        f.path.includes('auth') || f.path.includes('security') ||
        f.path.includes('validation') || f.path.includes('middleware')
      );
    } else if (analysisType === 'architecture') {
      filtered = files.filter(f =>
        f.path.includes('controller') || f.path.includes('service') ||
        f.path.includes('model') || f.path.includes('route')
      );
    } else if (analysisType === 'testing') {
      filtered = files.filter(f =>
        f.path.includes('test') || f.path.includes('spec')
      );
    }

    if (filtered.length < 3) filtered = files;

    return filtered.sort((a, b) => b.lines - a.lines).slice(0, 5);
  }
}

module.exports = new QuestionGeneratorService();
```

---

## 🎯 PASO 4: CONTROLADOR DE ANÁLISIS

**Archivo:** `/backend/controllers/repositoryAnalysisController.js`

```javascript
const RepositoryAnalysis = require('../models/RepositoryAnalysis');
const Question = require('../models/Question');
const User = require('../models/User');
const gitingestService = require('../services/gitingestService');
const questionGeneratorService = require('../services/questionGeneratorService');

/**
 * Analizar repositorio completo
 * POST /api/repository-analysis/analyze
 */
exports.analyzeRepository = async (req, res) => {
  try {
    const { repositoryUrl, analysisType, difficulty, language } = req.body;

    if (!repositoryUrl || !repositoryUrl.includes('github.com')) {
      return res.status(400).json({ message: 'Invalid GitHub URL' });
    }

    console.log('📦 Starting analysis:', repositoryUrl);

    // PASO 1: Analizar con GitIngest
    console.log('🔍 Step 1: Analyzing with GitIngest...');
    const gitingestData = await gitingestService.analyzeRepository(repositoryUrl);

    // PASO 2: Crear registro en BD
    console.log('💾 Step 2: Creating database record...');
    const analysis = new RepositoryAnalysis({
      userId: req.userId,
      repositoryUrl,
      repositoryName: gitingestData.name,
      repositoryOwner: gitingestData.owner,
      repositoryLanguage: gitingestData.languages[0]?.name || 'Unknown',
      analysisType: analysisType || 'code_quality',
      difficulty: difficulty || 'intermediate',
      language: language || 'en',
      status: 'analyzing',
      gitingestData: gitingestData,
      codeStructure: gitingestData.statistics
    });

    await analysis.save();

    // PASO 3: Generar preguntas con IA
    console.log('🤖 Step 3: Generating questions...');
    const questions = await questionGeneratorService.generateQuestionsFromRepository(
      gitingestData,
      {
        analysisType: analysisType || 'code_quality',
        difficulty: difficulty || 'intermediate',
        language: language || 'en',
        questionCount: 10
      }
    );

    // PASO 4: Guardar preguntas
    console.log('💾 Step 4: Saving questions...');
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      
      const question = new Question({
        repositoryAnalysisId: analysis._id,
        questionText: q.question,
        codeSnippet: q.codeSnippet || '',
        filePath: q.filePath || '',
        category: q.category,
        difficulty: q.difficulty,
        order: i + 1,
        context: q.context || '',
        expectedPoints: q.expectedPoints || []
      });

      await question.save();
      analysis.questions.push(question._id);
    }

    // PASO 5: Actualizar estado
    analysis.status = 'in_progress';
    await analysis.save();

    // PASO 6: Actualizar usuario
    const user = await User.findById(req.userId);
    if (!user.repositories) user.repositories = [];
    user.repositories.push(analysis._id);
    user.analyzedRepositories = (user.analyzedRepositories || 0) + 1;
    await user.save();

    console.log('✅ Analysis completed');

    res.status(200).json({
      message: 'Repository analyzed successfully',
      analysis: {
        _id: analysis._id,
        repositoryName: analysis.repositoryName,
        repositoryOwner: analysis.repositoryOwner,
        language: analysis.repositoryLanguage,
        status: analysis.status,
        questionsCount: questions.length,
        technologies: gitingestData.technologies
      }
    });

  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({ 
      message: 'Error analyzing repository',
      error: error.message 
    });
  }
};

/**
 * Listar análisis del usuario
 */
exports.getAnalyses = async (req, res) => {
  try {
    const analyses = await RepositoryAnalysis.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .select('repositoryName repositoryOwner repositoryLanguage status totalScore createdAt');
    
    res.status(200).json({ analyses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analyses' });
  }
};

/**
 * Obtener análisis específico
 */
exports.getAnalysis = async (req, res) => {
  try {
    const analysis = await RepositoryAnalysis.findById(req.params.id)
      .populate('questions');
    
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    
    if (analysis.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    
    res.status(200).json({ analysis });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching analysis' });
  }
};

/**
 * Actualizar estado
 */
exports.updateAnalysisStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const analysis = await RepositoryAnalysis.findById(req.params.id);
    
    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }
    
    analysis.status = status;
    if (status === 'completed') {

