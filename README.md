
# 🛡️ Sistema de Gestión de Consultoría de Ciberseguridad (SGCC)

![Status](https://img.shields.io/badge/Estado-En%20curso-yellow)
![Version](https://img.shields.io/badge/version-0.5.0--alpha-blue)


## 📖 Introducción General

**SGCC** es una plataforma web integral desarrollada como Proyecto Final del Bootcamp de Desarrollo Web Fullstack. La aplicación está diseñada para digitalizar y optimizar los procesos operativos de una **consultora de ciberseguridad**, centralizando la gestión de recursos, proyectos, usuarios y comunicaciones en un único dashboard unificado.

El sistema permite la administración eficiente de:
*   **Proyectos**: Ciclo de vida completo de auditorías y consultorías.
*   **Inventario Tecnológico**: Hardware, software, licencias y servidores.
*   **Comunicaciones**: Mensajería interna e instantánea entre departamentos.
*   **Usuarios**: Gestión de roles (consultor, cliente) y accesos.

### 🚀 Arquitectos del Proyecto

El proyecto ha sido construido por un equipo multidisciplinar que ha asumido roles de ingeniería especializados:

| Miembro | Rol Especializado | Impacto Clave |
|---------|-------------------|---------------|
| **Ricardo** | *Arquitecto Principal de Software* | Orquestación de flujos de trabajo y lógica de negocio escalable. |
| **Ouissam** | *Ingeniero de Sistemas y Validaciones* | Validación de sistemas críticos y trazabilidad de activos físicos/lógicos. |
| **Santos** | *Especialista en Sistemas Tiempo Real* | Implementación de ecosistemas de mensajería síncrona y reactiva. |
| **Marc** | *Responsable de Seguridad y Accesos* | Blindaje de accesos, autenticación robusta y gestión granular de roles (RBAC). |


<details>
<summary><h2>🛠️ Tecnologías usadas</h2></summary>

### 🖥️ Backend
- **Node.js** - Entorno de ejecución
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones entre dominios
- **dotenv** - Variables de entorno

### 💻 Frontend
- **React** - Librería de UI
- **React Router DOM** - Enrutamiento
- **Framer Motion & Lottie** - Animaciones avanzadas
- **JavaScript (ES6+)** - Lenguaje de programación
- **HTML5 & CSS3** - Estructura y estilos

### 🧰 Herramientas de Desarrollo
- **Postman** - Testing de API
- **Git** - Control de versiones
- **npm** - Gestor de paquetes


</details>

---

<details>
<summary><h2>▶️ Instrucciones de Ejecución</h2></summary>

Para desplegar el proyecto en tu entorno local, necesitarás **Node.js** y **MongoDB**. El repositorio está dividido en dos directorios principales: `api` (Backend) y `app` (Frontend).

### 📋 Prerrequisitos
*   Node.js (v16 o superior)
*   MongoDB (Instancia local o Atlas)


### ⚙️ Configuración

Antes de iniciar el servidor, es necesario configurar las variables de entorno.

#### 1. Backend (API)
Copia el archivo de ejemplo y renómbralo a `.env` en la carpeta `api`:

```bash
cp api/.env.example api/.env
```

Edita el archivo `.env` con tus credenciales:

```env
# Cadena de conexión a MongoDB (Local o Atlas)
MONGO_URI=mongodb+srv://user:<password>@cluster...

# Nombre de la base de datos
MONGO_DB=webdev-final-project

# Puerto del servidor (Por defecto 3000)
PORT=3000
```

### 👣 Pasos para iniciar la aplicación

Deberás ejecutar el backend y el frontend en terminales separadas:

#### 1. Iniciar el Backend (API)
Navega a la carpeta del servidor e instala las dependencias:
```bash
cd api
npm install
```
Asegúrate de tener configurado tu archivo `.env` (basado en `.env.example`). Luego inicia el servidor:
```bash
npm start
```
> La API estará escuchando en el puerto 3000 (por defecto).

#### 2. Iniciar el Frontend (APP)
En una nueva terminal, navega a la carpeta de la aplicación:
```bash
cd app
npm install
```
Inicia el servidor de desarrollo de Vite:
```bash
npm run dev
```
> Abre tu navegador en `http://localhost:5173` para ver la aplicación.


</details>

---

<details>
<summary><h2>🔌 API y Backend</h2></summary>

El backend está construido con **Node.js** y **Express**, exponiendo una API RESTful que gestiona la lógica de negocio y la persistencia de datos en **MongoDB**. Utiliza principios de arquitectura MVC (Modelo-Vista-Controlador) para organizar el código.

### 🛣️ Endpoints Disponibles

#### 📜 Proyectos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ricardo/projects/` | Obtener todos los proyectos |
| GET | `/ricardo/projects/:id` | Obtener un proyecto por ID |
| POST | `/ricardo/projects/` | Crear un nuevo proyecto |
| PUT | `/ricardo/projects/:id` | Actualizar un proyecto |
| DELETE | `/ricardo/projects/:id` | Eliminar un proyecto |

#### 📦 Inventario 
**Hardware**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ouissam/hardware/` | Obtener todo el hardware |
| GET | `/ouissam/hardware/:id` | Obtener un hardware específico |
| POST | `/ouissam/hardware/` | Crear nuevo hardware |
| PUT | `/ouissam/hardware/:id` | Actualizar hardware |
| DELETE | `/ouissam/hardware/:id` | Eliminar hardware |

*(Rutas similares existen para software (`/software`), licencias (`/licenses`) y servidores (`/servers`) bajo `/ouissam/...`)*

#### 👥 Usuarios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/marc/users/` | Obtener todos los usuarios |
| GET | `/marc/users/:id` | Obtener usuario por ID |
| POST | `/marc/users/` | Registrar nuevo usuario |
| PUT | `/marc/users/:id` | Editar perfil de usuario |
| DELETE | `/marc/users/:id` | Eliminar usuario |

#### 📱 Comunicaciones
**Mensajes**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/santos/messages/` | Listar todos los mensajes |
| GET | `/santos/messages/:id` | Ver mensaje individual |
| POST | `/santos/messages/` | Enviar mensaje |
| PUT | `/santos/messages/:id` | Editar mensaje |
| DELETE | `/santos/messages/:id` | Borrar mensaje |

**Notificaciones**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/santos/notifications/` | Ver todas las notificaciones |
| POST | `/santos/notifications/` | Crear notificación |
| PUT | `/santos/notifications/:id` | Marcar como leída/editar |
| DELETE | `/santos/notifications/:id` | Eliminar notificación |

**Chats**
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/santos/chats/` | Listar chats disponibles |
| GET | `/santos/chats/type/:type` | Filtrar chats por tipo (internal/client) |
| POST | `/santos/chats/` | Iniciar nuevo chat |
| POST | `/santos/chats/:id/messages` | Añadir mensaje al chat |


</details>

---

<details>
<summary><h2>🌐 Contexto Global (Provider)</h2></summary>

La aplicación utiliza **React Context API** para gestionar el estado global, centralizado en el componente `ProviderDataApi`.

### 🧠 Funcionamiento de `ProviderDataApi.jsx`

1.  **Centralización**: Agrupa múltiples estados (`software`, `hardware`, `users`, `projects`, etc.) en un único proveedor.
2.  **Hooks de API**: Inicializa instancias de `useApi` para cada módulo, proporcionando métodos CRUD estandarizados (`get`, `post`, `put`, `delete`).
3.  **Distribución**: Expone tanto los **datos** (ej. `software`) como las **funciones modificadoras** (ej. `setSoftware`) y los **métodos de API** (ej. `softwareApi`) a toda la aplicación a través de `ApiDataContext`.

**Ejemplo de Consumo:**
Cualquier componente envuelto por este proveedor puede acceder a los datos y lógica sin necesidad de prop drilling:

```javascript
import { useContext } from 'react';
import { ApiDataContext } from '../context/ApiDataContext';

const Component = () => {
    const { hardware, hardwareApi } = useContext(ApiDataContext);
    // Acceso directo a la lista de hardware y funciones para modificarla
}
```


</details>

---

<details>
<summary><h2>📜 Lista de Proyectos (@hllricardo)</h2></summary>

Enlace a GitHub: [hllricardo](https://github.com/hllricardo)

Subpágina diseñada con **React** para la visualización y gestión dinámica de los **proyectos** de la empresa, permitiendo una interacción fluida en la asignación de empleados tareas.

---

## 🧩 Modelo de Datos

### 📁 Proyecto

Cada proyecto cuenta con las siguientes propiedades:

* **Id**: Clave única (ObjectId)
* **Título**: (string, requerido)
* **Cliente**: Nombre del cliente (string, requerido)
* **Descripción**: Detalles del proyecto (string, requerido)
* **Tareas**: Lista de tareas a realizar (array de strings)
* **Trabajadores asignados**: Lista de usuarios vinculados al proyecto
* **Estado**: Situación actual del proyecto (string, requerido)

---

## ⚙️ Funcionalidades

### 📄 Visualización
Para desplegar la información completa de un proyecto y acceder a las opciones de gestión, basta con hacer clic en la tarjeta del proyecto.

### ➕ Crear
Permite registrar nuevos proyectos completando los campos de **título**, **nombre del cliente** y **descripción**. El resto de campos se inicializan con valores por defecto.

### ✏️ Editar
Se permite la edición de todos los campos excepto la asignación de usuarios.
* **Tareas**: Para añadir tareas, escribir en el campo "nueva tarea" y pulsar añadir.
* **Guardado**: Pulsar en "Guardar" para persistir los cambios.

### 🗑️ Eliminar
Eliminación de proyectos mediante botón dedicado con confirmación previa.

---

<details>
<summary><b>🗂️ Estructura del Proyecto</b></summary>

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
</details>

---

## 🚀 Cambios y mejoras para el futuro

* **Filtros avanzados**: Filtrado por cliente (desplegable) y por estado del proyecto.
* **Gestión de asignaciones**: Métodos para que los trabajadores se auto-asignen y para que los administradores gestionen el equipo del proyecto.
* **Unificación de datos**: Integración total entre la base de datos de usuarios y la asignación de proyectos.

</details>

---

<details>
<summary><h2>📦 Inventario (@ouielba90)</h2></summary>

Enlace a GitHub: [ouielba90](https://github.com/ouielba90)

Módulo integral de **gestión de activos IT**, implementado con una interfaz reactiva que facilita el control centralizado de **hardware, software, licencias y servidores**. Incorpora validaciones en tiempo real y reglas de negocio para garantizar la integridad de los datos.

---

## 🧩 Modelos de Inventario

El inventario se compone de los siguientes dominios:

### 🖥️ Hardware

Cada elemento de hardware dispone de:

* **Id**: Clave única (ObjectId)
* **Tipo de dispositivo**: (string, requerido)
* **Modelo**: (string, requerido)
* **Estado**: (string, requerido)
* **Fecha de compra**: (date, requerido)
* **Especificaciones técnicas**:
  * CPU
  * RAM
  * Almacenamiento
* **Sistema operativo**: (string, requerido)
* **Fecha de último mantenimiento**: (date, requerido)
* **Usuario asignado**: (String, opcional)
* **Software instalado**: (relación múltiple con Software)

---

### 💿 Software

Cada software contiene:

* **Id**: Clave única (ObjectId)
* **Nombre**: (string, requerido)
* **Versión**: (string, requerido)
* **Categoría**: (string, requerido)
* **Estado**: (string, requerido)
* **Descripción**: (string, requerido)
* **Licencia asociada**: (ObjectId, opcional, ref: LicensesPost)
* **Hardware donde está instalado**: (relación múltiple con Hardware)
* **Servidores donde está desplegado**: (relación múltiple con Servidores)

---

### 🔑 Licencias

Cada licencia incluye:

* **Id**: Clave única (ObjectId)
* **Software asociado**: (ObjectId, requerido)
* **Número de asientos**: (number, requerido)
* **Fecha de compra**: (date, requerido)
* **Fecha de expiración**: (date, requerido)
* **Clave de licencia**: (string, requerido)
* **Proveedor**: (string, requerido)
* **Coste**: (number, requerido)

---

### 🖧 Servidores

Los servidores se gestionan como recursos existentes del sistema:

* **Id**: Clave única (ObjectId)
* **Nombre y dirección IP**
* **Ubicación**
* **Sistema operativo**
* **Estado**
* **Número de nodos**
* **Especificaciones por nodo**: (CPU, RAM, disco y uso)
* **Software alojado**: (relación múltiple con Software)
* **Usuarios con acceso**: (Array de strings)
* **Número de usuarios conectados**: (Number)

> ⚠️ **Los servidores no se pueden crear ni eliminar desde la interfaz**, solo visualizar  información relevante.

---

## ⚙️ Funcionalidades

### 📄 Visualización

* Listados independientes por dominio (hardware, software, licencias, servidores)
* Tarjetas resumen con estado y métricas clave
* Vistas de detalle con relaciones entre entidades

---

### ➕ Crear

Se permite **crear únicamente**:

* Hardware
* Software
* Licencias

Los formularios incluyen validación completa antes del envío.
Los servidores no pueden crearse desde el inventario.

---

### ✏️ Editar

* Se pueden editar todos los campos de cada entidad
* Las relaciones (software ↔ hardware / servidores / licencias) se gestionan de forma controlada
* Los estados se recalculan automáticamente cuando aplica (ej. licencias expiradas)

---

### 🗑️ Eliminar

Se permite **eliminar únicamente**:

* Hardware
* Software
* Licencias

La eliminación requiere confirmación mediante modal.
Los servidores **no pueden eliminarse** desde el sistema.

---

## 🧠 Validación y Reglas de Negocio

La lógica de validación está desacoplada de la interfaz mediante **custom hooks**:

* `useHardwareValidation`
* `useSoftwareValidation`
* `useLicensesValidation`

### Reglas aplicadas:

* No se permiten fechas futuras de compra
* Las fechas de expiración o mantenimiento deben ser posteriores a la compra
* Validación por expresiones regulares (versiones, modelos, claves)
* Valores numéricos positivos y coherentes
* Control de envío mediante `canSubmit`

---

## 📊 Dashboard de Inventario

El inventario dispone de un **dashboard central** que permite:

* Visualizar el total de activos por categoría
* Detectar licencias próximas a expirar
* Identificar servidores con alta carga
* Mostrar alertas de estado mediante animaciones visuales (Lottie)

Este enfoque facilita una **gestión proactiva** del inventario IT.

---

<details>
<summary><b>🗂️ Estructura del Inventario</b></summary>

```
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
</details>

---

## 🚀 Cambios y mejoras para el futuro

* Añadir control de permisos por rol (admin / técnico / consulta)
* Historial de cambios por activo (auditoría)
* Alertas automáticas por email para licencias y mantenimientos
* Integración con sistemas de monitorización externos
* Exportación de inventario a PDF / CSV

</details>

---

<details>
<summary><h2>📱 Sistema de Comunicaciones (@sanpro23)</h2></summary>

Enlace a GitHub: [sanpro23](https://github.com/sanpro23)

Módulo integral diseñado con una **interfaz intuitiva en React** para la gestión de la comunicación. Permite **enviar y recibir mensajes**, visualizar **historiales de chat** y gestionar **notificaciones** en tiempo real.

---

## 🧩 Modelo de Datos

### 💬 Mensajes Directos (CommunicationsMessages)
* **From**: Emisor del mensaje (String, requerido)
* **To**: Receptor del mensaje (String, requerido)
* **Text**: Contenido del mensaje (String, requerido)
* **Date**: Fecha de envío (Date, requerido)
* **Edited**: Estado de edición (Boolean)
* **EditedAt**: Fecha de edición (Date)

### 🔔 Notificaciones (CommunicationsNotifications)
* **From**: Origen de la notificación (String, requerido)
* **To**: Destinatario (String, requerido)
* **Text**: Contenido (String, requerido)
* **Date**: Fecha (Date, requerido)
* **IsAlert**: Indicador de alerta prioritaria (Boolean, requerido)

### 🗨️ Chats (Chat)
* **Type**: Tipo de chat ('internal' o 'client')
* **Participants**: Lista de participantes (Array de Strings)
* **Messages**: Colección de mensajes del chat (Array de Subdocumentos)
* **UnreadCount**: Contador de mensajes no leídos (Number)
* **LastMessageDate**: Fecha del último mensaje (Date)

---

## ⚙️ Funcionalidades

### 📨 Mensajería
* **Mensajes directos**: Envío y recepción de mensajes en tiempo real entre usuarios.
* **Edición de Mensajes**: Capacidad para modificar mensajes ya enviados.
* **Chats Grupales**: Salas de chat internas y canales de comunicación con clientes.
* **Historial Persistente**: Almacenamiento y consulta de todas las conversaciones pasadas.

### 🔔 Notificaciones
* **Alertas**: Sistema de avisos para eventos importantes.
* **Estado de lectura**: Seguimiento de mensajes leídos/no leídos.

---

<details>
<summary><b>🗂️ Estructura de Comunicaciones</b></summary>

```
├── api
│    ├── src
│    │    ├── controllers
│    │    │    ├── communications.chats.controller.js
│    │    │    ├── communications.messages.controller.js
│    │    │    └── communications.notifications.controller.js
│    │    ├── models
│    │    │    ├── communications.chats.model.js
│    │    │    ├── communications.messages.model.js
│    │    │    └── communications.notifications.model.js
│    │    └── routes
│    │        ├── comunications.chats.routes.js
│    │        ├── communications.messages.routes.js
│    │        └── communications.notifications.routes.js
├── app
│    ├── src
│    │    ├── components
│    │    │    └── communications
│    │    │        ├── ChatListItem.jsx
│    │    │        ├── ChatMessage.jsx
│    │    │        ├── FetchExample.jsx
│    │    │        ├── MessageCard.jsx
│    │    │        └── NotificationCard.jsx
│    │    ├── pages
│    │    │    └── communications
│    │    │        ├── ChatViewPage.jsx
│    │    │        ├── ClientChatsPage.jsx
│    │    │        ├── HomeCommPage.jsx
│    │    │        ├── InternalChatsPage.jsx
│    │    │        ├── MessagesPage.jsx
│    │    │        └── NotificationsPage.jsx
│    │    ├── services
│    │    │    ├── chatService.js
│    │    │    ├── messagesService.js
│    │    │    └── notificationsService.js
│    │    └── sections
│    │        └── communicationSections.js
```
</details>

---

## 🚀 Cambios y mejoras para el futuro

* **Multimedia**: Soporte para envío de archivos adjuntos e imágenes.
* **Grupos**: Creación de grupos de chat dinámicos.
* **Videollamadas**: Integración de WebRTC para llamadas en tiempo real.

</details>

---

<details>
<summary><h2>👥 Gestión de Usuarios y Clientes (@MarcCaBe)</h2></summary>

Módulo de administración de perfiles construido con una **interfaz dedicada** para la gestión eficiente de usuarios, autenticación y control de roles dentro de la plataforma.

---

## 🧩 Modelo de Datos

### 👤 Usuario (User)
* **Name**: Nombre completo (String, requerido)
* **Email**: Correo electrónico (String, requerido)
* **Role**: Rol del usuario (String, requerido: Manager, Consultor, Cliente, etc.)
* **Status**: Estado actual (String, requerido: activo, inactivo, ausente, ocupado)
* **CreatedAt**: Fecha de creación (Date)

---

## ⚙️ Funcionalidades

### 📝 Gestión de Perfiles
* **CRUD Completo**: Crear, leer, actualizar y eliminar usuarios.
* **Roles**: Asignación y gestión de permisos mediante roles.
* **Estados**: Visualización del estado de disponibilidad del usuario (colores indicadores).

### 🤝 Gestión de Clientes
* **Filtrado**: Vistas específicas para usuarios tipo Cliente.
* **Administración**: Gestión dedicada para perfiles de clientes.

---

<details>
<summary><b>🗂️ Estructura de Usuarios</b></summary>

```
├── api
│    ├── src
│    │    ├── controllers
│    │    │    └── users.user.controller.js
│    │    ├── models
│    │    │    └── users.user.model.js
│    │    └── routes
│    │        └── users.user.routes.js
├── app
│    ├── src
│    │    ├── logic
│    │    │    ├── getClients.js
│    │    │    └── getUsers.js
│    │    ├── pages
│    │    │    └── usersClients
│    │    │        ├── UserHomePage.jsx
│    │    │        ├── clients
│    │    │        │    ├── ClientCard.jsx
│    │    │        │    └── ClientPage.jsx
│    │    │        ├── users
│    │    │        │    ├── EditUserModal.jsx
│    │    │        │    ├── UserCard.jsx
│    │    │        │    ├── UserPage.jsx
│    │    │        │    └── formulario.jsx
│    │    │        └── stylesMarc.css
│    │    └── sections
│    │        └── userSections.js
```
</details>

---

## 🚀 Cambios y mejoras para el futuro

* **Seguridad Avanzada**: Implementación de 2FA, sanitización de datos y rate limiting en la API.
* **Experiencia de Usuario**:
    *   **Feedback Visual**: Notificaciones tipo 'toast' para éxito/error y estados de carga (loading states).
    *   **Confirmaciones**: Modales de confirmación para acciones críticas (eliminación).
* **Gestión de Datos**:
    *   **Búsqueda Avanzada**: Filtros combinados y búsqueda en tiempo real.
    *   **Paginación**: Optimización para listados con gran volumen de usuarios.
    *   **Historial**: Registro de actividad y auditoría de cambios en perfiles.

</details>
