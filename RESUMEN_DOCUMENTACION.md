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
