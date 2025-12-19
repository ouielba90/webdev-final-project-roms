# Proyecto Final

## Negocio: consultoría de ciberseguridad

1. Proyectos (ProjectPage)
- Lista de proyectos + tareas internas (usuarios y clientes pueden interactuar (...) con estos)
- Crear, editar y eliminar

Ejemplos
- Auditoría de red interna – Cliente: TechNova – Estado: En progreso – Revisión de red y accesos 
    - Tareas: Escaneo de puertos (ok) Análisis de logs (en progreso) Informe final (en progreso)
- Test de penetración web – Cliente: FinTrust – Estado: Pendiente – Simulación de ataques web
- Autenticación multifactor – Cliente: AccessCorp – Estado: Completado – Activación de MFA en usuario

Propiedades
id, name, client, status, description, tasks, collabs


# 📦 Inventario (@ouielba90) 

Esta sección implementa la **gestión integral de activos tecnológicos** de la plataforma de consultoría de ciberseguridad. El módulo cubre **hardware, software, licencias y servidores**, proporcionando trazabilidad completa, relaciones entre entidades y validación de reglas de negocio críticas.

La implementación está realizada con **React**, **Context API** y una arquitectura modular orientada a escalabilidad y mantenimiento.

---

## 🧱 Arquitectura y Diseño

### Estructura del Proyecto
```
├── api
│    ├── index.js
│    └── src
│        ├── config
│        │    └── db.js
│        ├── controllers
│        │    ├── inventory.hardware.controller.js
│        │    ├── inventory.licenses.controller.js
│        │    ├── inventory.servers.controller.js
│        │    ├── inventory.software.controller.js
│        ├── models
│        │    ├── inventory.hardware.model.js
│        │    ├── inventory.licenses.model.js
│        │    ├── inventory.servers.model.js
│        │    ├── inventory.software.model.js
│        └── routes
│            ├── inventory.hardware.routes.js
│            ├── inventory.licenses.routes.js
│            ├── inventory.servers.routes.js
│            ├── inventory.software.routes.js
├── app
│    ├── src
│    │    ├── App.jsx
│    │    ├── components
│    │    │    ├── inventory
│    │    │    │    ├── AddHardware.jsx
│    │    │    │    ├── AddLicense.jsx
│    │    │    │    ├── AddSoftware.jsx
│    │    │    │    ├── animations
│    │    │    │    │    ├── green_dot.json
│    │    │    │    │    ├── Hourglass.json
│    │    │    │    │    ├── MaterialWaveLoading.json
│    │    │    │    │    ├── orange_dot.json
│    │    │    │    │    ├── red_dot.json
│    │    │    │    │    ├── server-error.json
│    │    │    │    │    └── TrailLoading.json
│    │    │    │    ├── DashboardGeneralStatus.jsx
│    │    │    │    ├── DashboardInsightsII.jsx
│    │    │    │    ├── DashboardInsightsI.jsx
│    │    │    │    ├── EditHardware.jsx
│    │    │    │    ├── EditLicense.jsx
│    │    │    │    ├── EditSoftware.jsx
│    │    │    │    ├── ErrorAnimation.jsx
│    │    │    │    ├── GeneralStatus.jsx
│    │    │    │    ├── HardwareCard.jsx
│    │    │    │    ├── LicenseCard.jsx
│    │    │    │    ├── LoadingAnimation.jsx
│    │    │    │    ├── Modal.jsx
│    │    │    │    ├── OSImage.jsx
│    │    │    │    ├── ServerCard.jsx
│    │    │    │    ├── SoftwareCard.jsx
│    │    │    │    └── StatusAnimation.jsx
│    │    ├── context
│    │    │    ├── ApiDataContext.js
│    │    │    └── ProviderDataApi.jsx
│    │    ├── logic
│    │    │    ├── inventory
│    │    │    │    ├── useFiltersSearch.js
│    │    │    │    ├── useHardwareActions.js
│    │    │    │    ├── useHardwareValidation.js
│    │    │    │    ├── useLicensesActions.js
│    │    │    │    ├── useLicensesValidation.js
│    │    │    │    ├── useSoftwareActions.js
│    │    │    │    └── useSoftwareValidation.js
│    │    │    └── useApi.js
│    │    ├── main.jsx
│    │    ├── pages
│    │    │    ├── inventory
│    │    │    │    ├── DashboardPage.jsx
│    │    │    │    ├── HardwareDetailsPage.jsx
│    │    │    │    ├── HardwareInvPage.jsx
│    │    │    │    ├── HomeInvPage.jsx
│    │    │    │    ├── LicensesDetailsPage.jsx
│    │    │    │    ├── LicensesInvPage.jsx
│    │    │    │    ├── ServersDetailsPage.jsx
│    │    │    │    ├── ServersInvPage.jsx
│    │    │    │    ├── SoftwareDetailsPage.jsx
│    │    │    │    └── SoftwareInvPage.jsx
│    │    │    ├── projects
│    │    │    │    ├── HomeProjPage.jsx
│    │    │    │    └── StylesRicardo.css
│    │    ├── sections
│    │    │    ├── inventorySections.js
│    │    └── utils
│    │        └── inventory
│    │            └── date.js
```
---

### Contexto Global de Inventario

**`ProviderInventory.jsx` + `DataContext.js`**

Se utiliza un **contexto global centralizado** para gestionar el estado compartido de:

* Hardware
* Software
* Licencias
* Servidores

Este enfoque evita el *prop drilling*, lo que garantiza consistencia entre vistas y permite que cualquier componente del inventario acceda o actualice los datos de forma controlada.

---

### Hook de Acceso a la API

**`useApi`**

Cada tipo de recurso dispone de un **hook dedicado** que encapsula:

* Llamadas HTTP (`fetch`)
* Normalización de datos
* Operaciones CRUD

Esto desacopla completamente la lógica de red de los componentes de presentación y facilita futuras migraciones o cambios de backend.

---

### Estructura Modular

Ubicación:
`/components/inventory`
`/pages/inventory`

Cada dominio (hardware, software, licencias, servidores) sigue una **estructura homogénea**, compuesta por:

* Página de listado
* Página de detalle
* Formularios de alta y edición
* Tarjetas reutilizables
* Modales de confirmación para operaciones CRUD

Esta consistencia mejora la legibilidad del repositorio y reduce la curva de aprendizaje para nuevos desarrolladores.

---

## ✅ Validación Frontend y Lógica de Negocio

La validación está **desacoplada de la UI** mediante **Custom Hooks** ubicados en `/logic/inventory`, garantizando la integridad de los datos antes de cualquier interacción con la API.

### Hooks Implementados

* `useSoftwareValidation`
* `useHardwareValidation`
* `useLicensesValidation`

### Características Clave

* **Validación reactiva en tiempo real** mediante `useEffect`
* Control del estado de envío mediante `canSubmit`
* Gestión de errores granular mediante un objeto `errors` para feedback visual inmediato

### Reglas de Negocio Aplicadas

* **Consistencia temporal**

  * No se permiten fechas de compra futuras
  * Las fechas de mantenimiento o expiración deben ser posteriores a la compra
* **Validación de formato (Regex)**

  * Modelos de hardware
  * Versiones de software
  * Claves de licencia
* **Restricciones lógicas**

  * Longitudes mínimas y máximas
  * Valores numéricos positivos (costes, asignaciones, recursos)

---

## 📊 Dashboard de Inventario

El Dashboard actúa como un **centro de control operativo**, ofreciendo información crítica de un solo vistazo:

* Conteo global de activos
* Métricas por categoría
* Detección automática de:

  * Licencias próximas a expirar
  * Servidores con alta carga de usuarios
  * Alertas por uso de CPU, RAM y disco
* Uso de **animaciones Lottie** para estados y feedback visual

Este enfoque permite una gestión **proactiva**, alineada con un entorno de consultoría IT/ciberseguridad.

---

## 💿 Gestión de Software

Funcionalidades:

* CRUD completo con validaciones
* Asociación bidireccional con hardware y servidores
* Filtros por categoría y estado
* Búsqueda por nombre
* Vista de detalle con relaciones y metadatos

---

## 🖥️ Gestión de Hardware

Funcionalidades:

* CRUD completo con formularios estructurados
* Filtros por tipo y estado
* Búsqueda por modelo y ordenación A–Z / Z–A
* Asociación múltiple de software
* Vista de detalle con:

  * Especificaciones técnicas
  * Fechas relevantes
  * Software instalado

---

## 🔑 Gestión de Licencias

Funcionalidades:

* Asociación automática con software
* Cálculo dinámico de estado (activa / expirada)
* CRUD completo con campos técnicos:

  * Proveedor
  * Clave de licencia
  * Asignaciones
  * Fechas
  * Coste
* Filtros y búsqueda por software

---

## 🖧 Gestión de Servidores

Funcionalidades:

* Tarjetas resumen con estado, ubicación, SO y usuarios
* Vista de detalle avanzada con:

  * Cálculo de promedios de CPU, RAM y disco
  * Visualización de nodos individuales
  * Listado de software y usuarios con acceso

---
---

# 📜 Lista de proyectos

Subpágina para mostrar y gestionar los diferentes proyectos que gestiona la empresa y a los empleados que estan trabajando en los diferentes proyectos.

Cada proyecto tendra:

  * Un titulo
  * El nombre del cliente
  * Las tareas que hay que realizar
  * La lista de trabajadores asignados
  * Y el estado del proyecto

---

3. Usuarios y clientes (UserPage)
- Lista de usuarios y clientes
- Crear, editar y eliminar perfiles

Propiedades
id, name, role, email, type (usuarios/clientes)


4. Mensajeria y notificaciones (MessagesPage)
- Mensajes instántaneos internos (usuario a usuario) y notificaciones relacionadas con los proyectos
- Crear y eliminar mensajes.

Propiedades
id, from, to (multiples o a un grupo en concreto), text, date, (attachments)


<!-- Comunicaciones por Santos --> 

https://github.com/sanpro23

# 📱 Sistema de Comunicaciones

## 🛠️ Tecnologías

### Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones entre dominios
- **dotenv** - Variables de entorno

### Frontend
- **React** - Librería de UI
- **JavaScript (ES6+)** - Lenguaje de programación
- **HTML5 & CSS3** - Estructura y estilos

### Herramientas de Desarrollo
- **Postman** - Testing de API
- **Git** - Control de versiones
- **npm** - Gestor de paquetes


## ✨ Características

### 💬 Módulo de Comunicaciones (Santos)
- ✅ Mensajes directos entre usuarios
- ✅ Sistema de notificaciones
- ✅ Chat con historial de conversaciones
- ✅ Marcado de mensajes como leídos
- ✅ Edición de mensajes


## 📁 Estructura del Proyecto
``` 
proyecto/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                              # Conexión MongoDB
│   │   │
│   │   ├── models/
│   │   │   ├── communications.messages.model.js
│   │   │   ├── communications.notifications.model.js
│   │   │   ├── communications.chats.model.js
│   │   │  
│   │   │
│   │   ├── controllers/
│   │   │   ├── communications.messages.controller.js
│   │   │   ├── communications.notifications.controller.js
│   │   │   ├── communications.chats.controller.js
│   │   │  
│   │   │
│   │   └── routes/
│   │       ├── communications.messages.routes.js
│   │       ├── communications.notifications.routes.js
│   │       ├── comunications.chats.routes.js
│   │      
│   │
│   ├── data/
│   │   ├── ChatMessages.data.js
│   │   ├── messages.data.js
│   │   └── notifications.data.js
│   │
│   ├── .env
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md


``` 
� Instalacióón### Prerrequisitos

- Node.js (v22.2 )
- MongoDB (MongoDB Atlas)
- npm 
- Git

### Pasos de Instalación

#### 1. Clonar el repositorio

git clone https://github.com/tu-usuario/tu-proyecto.git


#### 2. Instalar dependencias del Backend

npm install


**Dependencias principales:**

{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}


#### 3. Instalar dependencias del Frontend
npm install

**Dependencias principales:**

{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}


## ⚙️ Configuración

### Backend

#### 1. Crear archivo `.env` en la carpeta backend

# Puerto del servidor
PORT=3000

# MongoDB local
MONGODB_URI=mongodb://localhost:3000/santos/

# MongoDB Atlas
# MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net

# Entorno
NODE_ENV=development


#### 2. Configurar MongoDB

**Opción A: MongoDB Local**
# Iniciar MongoDB
mongod

**Opción B: MongoDB Atlas**
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster
3. Obtener connection string
4. Añadir IP a whitelist
5. Copiar URI a `.env`

#### 3. Estructura de la Base de Datos

**Colecciones creadas automáticamente:**
- `messages` - Mensajes directos
- `notifications` - Notificaciones del sistema
- `chat-messages` - Mensajes de chat

## 🎮 Uso

### Iniciar el Backend

npm start

El servidor iniciará en `http://localhost:3000`

**Salida esperada:**

API is running at http://localhost:3000
MongoDB conectado correctamente

### Iniciar el Frontend

npm run dev

El frontend iniciará en `http://localhost:5173` (Vite) 

### Verificar Instalación

**Prueba rápida con curl:**

curl http://localhost:3000/
# Respuesta: "Hello, World!"


## 📡 API Endpoints

### Base URL

http://localhost:3000


### 💬 Módulo de Comunicaciones

#### Mensajes Directos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/santos/messages` | Obtener todos los mensajes |
| GET | `/santos/messages/:id` | Obtener mensaje por ID |
| POST | `/santos/messages` | Crear nuevo mensaje |
| PUT | `/santos/messages/:id` | Actualizar mensaje |
| DELETE | `/santos/messages/:id` | Eliminar mensaje |

**Ejemplo: Crear mensaje**

POST http://localhost:3000/santos/messages
Content-Type: application/json


#### Notificaciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/santos/notifications` | Obtener todas las notificaciones |
| GET | `/santos/notifications/:userId` | Obtener notificaciones de usuario |
| POST | `/santos/notifications` | Crear notificación |
| PUT | `/santos/notifications/:id` | Actualizar notificación |
| DELETE | `/santos/notifications/:id` | Eliminar notificación |

**Ejemplo: Crear notificación**

POST http://localhost:3000/santos/notifications
Content-Type: application/json


#### Chat Messages

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/santos/chat-messages` | Obtener todos los mensajes de chat |
| GET | `/santos/chat-messages/:id` | Obtener mensaje por ID personalizado |
| POST | `/santos/chat-messages` | Crear mensaje de chat |
| PUT | `/santos/chat-messages/:id` | Actualizar mensaje (ej: marcar como leído) |
| DELETE | `/santos/chat-messages/:id` | Eliminar mensaje |

**Ejemplo: Crear mensaje de chat**

POST http://localhost:3000/santos/chat-messages
Content-Type: application/json


**Ejemplo: Marcar como leído**

PUT http://localhost:3000/santos/chat-messages/1
Content-Type: application/json


## 💻 Frontend

### Estructura de Componentes


src/
├── components/
│   ├── Messages/
│   │   ├── MessageList.jsx
│   │   ├── MessageItem.jsx
│   │   └── MessageForm.jsx
│   │
│   ├── Notifications/
│   │   ├── NotificationList.jsx
│   │   └── NotificationItem.jsx
│   │
│   └── Chat/
│       ├── ChatWindow.jsx
│       ├── ChatMessage.jsx
│       └── ChatInput.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Messages.jsx
│   ├── Notifications.jsx
│   └── Chat.jsx
│
├── services/
│   ├── api.js
│   ├── messagesService.js
│   ├── notificationsService.js
│   └── chatService.js
│
├── App.jsx
└── main.jsx


## 🧪 Testing con Postman

### Colección de Postman


## 📝 Scripts Disponibles

### Backend

{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}


### Frontend

{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  }
}

## 📄 Licencia

Este proyecto es parte de un bootcamp de desarrollo web y está bajo licencia MIT.


## 🙏 Agradecimientos

- A nuestros instructores del bootcamp

## 📚 Recursos Adicionales

### Documentación Oficial
- [Node.js](https://nodejs.org/docs/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://docs.mongodb.com/)
- [Mongoose](https://mongoosejs.com/docs/)
- [React](https://react.dev/)


