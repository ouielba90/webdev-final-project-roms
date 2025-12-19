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

# 📜 Lista de proyectos (hllricardo)
Enlace a GitHub(https://github.com/hllricardo)

Subpágina para mostrar y gestionar los diferentes proyectos que gestiona la empresa y a los empleados que estan trabajando en los diferentes proyectos.

## Cada proyecto tendra:

* Id como clave única (objeto id, único)
* Un titulo (string,  requerido)
* El nombre del cliente (string, requerido)
* La descripción del proyecto (string)
* Las tareas que hay que realizar (lista de string)
* La lista de trabajadores asignados (Son los trabajadores los que se asignan a los proyectos)
* Y el estado del proyecto (string, requerido)

## Funcionalidades:
* Mostrar información del proyecto:
Para desplegar la información de un proyecto y tener acceso a los botones de eliminar y editar hay que
pinchar en el proyecto.

* Crear:
Para crear un nuevo proyecto se rellenara los campos del titulo, nombre
del cliente y descripción. Los demás campos estarán vacíos o con un
valor por defecto.

* Editar:
Se podrá editar todos los campos menos el de usuarios. Para añadir tareas tendrás
escribir en el campo de "nueva tarea" y darle al botón de añadir, se vera la nueva tarea al
final de la lista de tareas. Pincha en guardar para conservar los cambios.

* Eliminar:
Para borrar un proyecto solo hay que pulsar el botón de eliminar y confirmar la eliminación.

## Estructura que afecta a las sección de proyectos
```
app
└── src
    ├── App.jsx
    ├── components
    │   └── projects
    │       ├── fetchData.js
    │       ├── ProjectCreate.jsx
    │       ├── ProjectDelete.jsx
    │       ├── ProjectEdit.jsx
    │       ├── ProjectItem.jsx
    │       └── ProjectList.jsx
    ├── context
    │   ├── ApiDataContext.js
    │   └── ProviderDataApi.jsx
    ├── logic
    │   ├── getProjects.js
    │   └── useApi.js
    ├── pages
    │   └── projects
    │       ├── HomeProjPage.jsx
    │       └── StylesRicardo.css
    └── sections
        └── projectSections.js

```

## Cambios y mejoras para el futuro:

* Añadir dos filtros en la lista de proyectos, un desplegable que muestre solo los clientes con los que se tenga un proyecto como mínimo y que al seleccionar
uno se vean esos proyectos y otro filtro para ver según el estado en el que se encuentra el proyecto.

* Crear los métodos para que los trabajadores puedan asignarse a los proyectos donde trabajen y también los métodos para que los administradores puedan
mover a los trabajadores de un proyecto a otro.

* Unificar los datos de la base de datos de usuarios con la base provisional de usuarios asignados a proyectos

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

# 📱 Sistema de Comunicaciones Santos https://github.com/sanpro23

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
│   │   │   └── communications.chats.model.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── communications.messages.controller.js
│   │   │   ├── communications.notifications.controller.js
│   │   │   └── communications.chats.controller.js
│   │   │
│   │   └── routes/
│   │       ├── communications.messages.routes.js
│   │       ├── communications.notifications.routes.js
│   │       └── comunications.chats.routes.js
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

## 🚀 Instalación

### Prerrequisitos
- Node.js (v22.2)
- MongoDB (MongoDB Atlas)
- npm
- Git

### Pasos de Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/ouielba90/webdev-final-project-roms.git
```

#### 2. Instalar dependencias del Backend

```bash
cd backend
npm install
```

Dependencias principales:

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  }
}
```

#### 3. Instalar dependencias del Frontend

```bash
cd frontend
npm install
```

Dependencias principales:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

## ⚙️ Configuración

### Backend

#### 1. Crear archivo `.env` en la carpeta backend

```env
# Puerto del servidor
PORT=3000

# MongoDB local
MONGODB_URI=mongodb://localhost:27017/santos

# MongoDB Atlas
# MONGODB_URI=mongodb+srv://usuario:<password>@cluster.mongodb.net/santos

# Entorno
NODE_ENV=development
```

#### 2. Configurar MongoDB

**Opción A: MongoDB Local**

```bash
mongod
```

**Opción B: MongoDB Atlas**

1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear un cluster
3. Obtener connection string
4. Añadir IP a whitelist
5. Copiar URI a `.env`

#### 3. Estructura de la Base de Datos

Colecciones creadas automáticamente:
- `messages` - Mensajes directos
- `notifications` - Notificaciones del sistema
- `chat-messages` - Mensajes de chat

## 🎮 Uso

### Iniciar el Backend

```bash
cd backend
npm start
```

El servidor iniciará en `http://localhost:3000`

Salida esperada:

```
API is running at http://localhost:3000
MongoDB conectado correctamente
```

### Iniciar el Frontend

```bash
cd frontend
npm run dev
```

El frontend iniciará en `http://localhost:5173` (Vite)

### Verificar Instalación

Prueba rápida con curl:

```bash
curl http://localhost:3000/
# Respuesta: "Hello, World!"
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

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

```http
POST http://localhost:3000/santos/messages
Content-Type: application/json

{
  "senderId": "user123",
  "receiverId": "user456",
  "content": "Hola, ¿cómo estás?",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Notificaciones

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/santos/notifications` | Obtener todas las notificaciones |
| GET | `/santos/notifications/:userId` | Obtener notificaciones de usuario |
| POST | `/santos/notifications` | Crear notificación |
| PUT | `/santos/notifications/:id` | Actualizar notificación |
| DELETE | `/santos/notifications/:id` | Eliminar notificación |

**Ejemplo: Crear notificación**

```http
POST http://localhost:3000/santos/notifications
Content-Type: application/json

{
  "userId": "user123",
  "type": "message",
  "content": "Tienes un nuevo mensaje",
  "read": false
}
```

#### Chat Messages

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/santos/chat-messages` | Obtener todos los mensajes de chat |
| GET | `/santos/chat-messages/:id` | Obtener mensaje por ID personalizado |
| POST | `/santos/chat-messages` | Crear mensaje de chat |
| PUT | `/santos/chat-messages/:id` | Actualizar mensaje (ej: marcar como leído) |
| DELETE | `/santos/chat-messages/:id` | Eliminar mensaje |

**Ejemplo: Crear mensaje de chat**

```http
POST http://localhost:3000/santos/chat-messages
Content-Type: application/json

{
  "chatId": "chat001",
  "senderId": "user123",
  "content": "Hola desde el chat",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Ejemplo: Marcar como leído**

```http
PUT http://localhost:3000/santos/chat-messages/1
Content-Type: application/json

{
  "read": true
}
```

## 💻 Frontend

El frontend está construido con React y proporciona una interfaz de usuario intuitiva para:
- Enviar y recibir mensajes directos
- Ver y gestionar notificaciones
- Participar en chats en tiempo real
- Ver historial de conversaciones

## 🧪 Testing con Postman

Puedes importar la colección de Postman para probar todos los endpoints fácilmente. La colección incluye ejemplos de todas las operaciones CRUD para cada módulo.

## 📝 Scripts Disponibles

### Backend

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest"
  }
}
```

### Frontend

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src"
  }
}
```

## 📄 Licencia

Este proyecto es parte de un bootcamp de desarrollo web y está bajo licencia MIT.

## 🙏 Agradecimientos

- A nuestros instructores del bootcamp
- A la comunidad de desarrolladores

## 📚 Recursos Adicionales

### Documentación Oficial
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://react.dev/)

---



# USUARIOS MARC

# Módulo de Gestión de Usuarios y Clientes

## 📋 Descripción General

Este módulo permite gestionar usuarios y clientes dentro de la aplicación. Proporciona funcionalidades completas de CRUD (Crear, Leer, Actualizar, Eliminar) con una interfaz intuitiva para administrar diferentes roles y estados de usuarios.

## 🏗️ Arquitectura del Módulo

### Frontend (React)

```
src/
├── pages/usersClients/
│   ├── clients/
│   │   ├── ClientCard.jsx
│   │   └── ClientPage.jsx
│   ├── users/
│   │   ├── UserCard.jsx
│   │   ├── UserPage.jsx
│   │   ├── EditUserModal.jsx
│   │   └── formulario.jsx
│   └── UserHomePage.jsx
├── logic/
│   ├── getUsers.js
│   └── getClients.js
└── sections/
    └── userSections.js
```

### Backend (Node.js + Express + MongoDB)

```
server/
├── routes/
│   └── users.user.routes.js
├── controllers/
│   └── users.user.controller.js
└── models/
    └── users.user.model.js
```

## 🎯 Características Principales

### Gestión de Usuarios

- ✅ Crear nuevos usuarios mediante formulario
- ✅ Editar información de usuarios existentes
- ✅ Eliminar usuarios
- ✅ Visualizar lista completa de usuarios
- ✅ Sistema de estados visuales (activo, inactivo, ausente, ocupado)

### Gestión de Clientes

- ✅ Filtrado automático de usuarios con rol "Cliente"
- ✅ Visualización específica para clientes
- ✅ Eliminación de clientes
- ✅ Indicadores de estado visual

## 📊 Modelo de Datos

### Schema de Usuario (MongoDB)

```javascript
{
  name: String (requerido),
  email: String (requerido),
  role: String (requerido),
  status: String (requerido),
  createdAt: Date (opcional)
}
```

### Roles Disponibles

- **Manager**: Administrador del sistema
- **Consultor/Consultora**: Personal de consultoría
- **Cliente**: Usuarios clientes
- **Otros**: Roles adicionales

### Estados Disponibles

| Estado | Color | Código Hex |
|--------|-------|------------|
| Activo | Verde | #12a912ff |
| Inactivo | Gris | #bfbfbfff |
| Ausente | Amarillo | #ffbf00 |
| Ocupado | Rojo | #dc143c |

## 🔌 API Endpoints

### Base URL
```
VITE_API_URL_USERS=tu_url_de_api
```

### Endpoints Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Obtener todos los usuarios |
| GET | `/:id` | Obtener un usuario específico |
| POST | `/` | Crear un nuevo usuario |
| PUT | `/:id` | Actualizar un usuario |
| DELETE | `/:id` | Eliminar un usuario |

## 💻 Componentes Principales

### 1. UserHomePage.jsx
Página principal que contiene la navegación y el layout general del módulo de usuarios.

**Características:**
- Navegación entre lista de usuarios y clientes
- Header dinámico según la sección activa
- Carga inicial de datos desde la API

### 2. UserPage.jsx
Gestión completa de usuarios con formulario de creación y lista.

**Funcionalidades:**
- Formulario de registro de nuevos usuarios
- Lista de todos los usuarios
- Modal de edición
- Operaciones CRUD completas

### 3. ClientPage.jsx
Vista específica para la gestión de clientes.

**Funcionalidades:**
- Filtrado automático de usuarios con rol "Cliente"
- Visualización en tarjetas
- Eliminación de clientes

### 4. UserCard.jsx y ClientCard.jsx
Componentes de tarjeta para mostrar información individual.

**Elementos:**
- Nombre, email y rol del usuario
- Indicador visual de estado
- Botones de acción (eliminar, editar)

### 5. EditUserModal.jsx
Modal para editar información de usuarios existentes.

**Campos editables:**
- Nombre y apellidos
- Correo electrónico
- Rol
- Estado

### 6. RegistroForm.jsx (formulario.jsx)
Formulario para el registro de nuevos usuarios.

**Campos:**
- Nombre (obligatorio)
- Email (obligatorio)
- Rol (obligatorio)

## 🎨 Sistema de Estados Visuales

Los estados se representan mediante indicadores de color circulares:

```javascript
function userStatus(estado) {
  if (estado === 'activo') return { background: '#12a912ff' }
  if (estado === 'inactivo') return { background: '#bfbfbfff' }
  if (estado === 'ausente') return { background: '#ffbf00' }
  if (estado === 'ocupado') return { background: '#dc143c' }
}
```

## 🔄 Flujo de Datos

### Creación de Usuario

1. El usuario completa el formulario en `RegistroForm`
2. Se envía `handleSubmit` con los datos del formulario
3. Se actualiza el estado local con `setUsers`
4. Se envía petición POST a la API mediante `usersApi.createData()`
5. MongoDB almacena el nuevo usuario

### Actualización de Usuario

1. Click en botón "Editar" abre `EditUserModal`
2. Se cargan los datos actuales en el formulario
3. Usuario modifica campos necesarios
4. `handleUpdate` envía datos actualizados
5. PUT request actualiza en base de datos
6. Estado local se sincroniza con los cambios

### Eliminación de Usuario

1. Click en botón "Eliminar"
2. Se filtra el usuario del estado local inmediatamente
3. DELETE request elimina de la base de datos
4. La UI se actualiza automáticamente

## 🛠️ Configuración e Instalación

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL_USERS=http://localhost:3000/api/users
```

### Instalación de Dependencias

```bash
# Frontend
npm install react react-router-dom

# Backend
npm install express mongoose
```

### Ejecución

```bash
# Frontend (Puerto 5173 por defecto con Vite)
npm run dev

# Backend (Puerto 3000)
npm start
```

## 📝 Context API

El módulo utiliza `ApiDataContext` para gestionar el estado global:

```javascript
const { users, setUsers, usersApi } = useContext(ApiDataContext)
```

**Propiedades:**
- `users`: Array de usuarios
- `setUsers`: Función para actualizar usuarios
- `usersApi`: Objeto con métodos CRUD

## 🧪 Testing

Para probar los endpoints de la API, puedes usar **Postman**:

### Ejemplo: Crear Usuario

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "role": "Cliente",
  "status": "activo"
}
```

### Ejemplo: Actualizar Usuario

```http
PUT http://localhost:3000/api/users/[ID_DEL_USUARIO]
Content-Type: application/json

{
  "name": "Juan Pérez Actualizado",
  "email": "juan.nuevo@example.com",
  "role": "Manager",
  "status": "ausente"
}
```

## 🐛 Posibles Mejoras

- [ ] Implementar paginación para listas grandes
- [ ] Añadir búsqueda y filtros avanzados
- [ ] Validación más robusta en el frontend
- [ ] Confirmación antes de eliminar usuarios
- [ ] Sistema de permisos según rol
- [ ] Manejo de errores más detallado
- [ ] Loading states durante operaciones asíncronas
- [ ] Notificaciones de éxito/error (toast)

## 📱 Responsive Design

El módulo está diseñado para funcionar en diferentes tamaños de pantalla con las clases CSS apropiadas definidas en `stylesMarc.css`.

## 🔐 Consideraciones de Seguridad

- Validar inputs en frontend y backend
- Implementar autenticación y autorización
- Sanitizar datos antes de guardar en DB
- Usar variables de entorno para URLs sensibles
- Implementar rate limiting en la API

## 📄 Licencia

Este módulo es parte del proyecto final de desarrollo web full stack.

---

**Desarrollado con:** React, Node.js, Express, MongoDB, React Router DOM