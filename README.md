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


Aquí tienes una **versión más corta, más técnica y centrada únicamente en el inventario**:

---

# 📦 Inventario

Este subpágina implementa la gestión completa de activos tecnológicos del sistema: **hardware, software, licencias y servidores**, utilizando React, Context API y un conjunto de componentes modulares.

---

## 🧱 Arquitectura

* **Contexto global** (`ProviderInventory.jsx` + `DataContext.js`):
  Centraliza software, hardware, licencias y servidores, exponiendo los datos a todas las páginas del inventario.

* **APIs dedicadas** (`useHardwareApi`, `useSoftwareApi`, `useLicensesApi`, `useServersApi`):
  Hooks personalizados que encapsulan las llamadas a las distintas rutas del backend mediante `fetch()`.

* **Estructura modular** en `/components/inventory` y `/pages/inventory`.
  Cada tipo de recurso tiene:

  * Página de listado
  * Página de detalles
  * Formularios de alta y edición
  * Tarjetas reutilizables
  * Modales para CRUD

---

## 📊 Dashboard 

Incluye:

* Conteo total de recursos y estado global.
* Métricas por categoría (software/hardware/licencias/servidores).
* Detección automática de:

  * licencias próximas a expirar
  * servidores con mayor carga de usuarios
  * alertas por uso de CPU/RAM/Disco
* Uso de animaciones Lottie para estados.

---

## 💿 Software

* Alta, edición y eliminación con validaciones básicas.
* Asignación a hardware y servidores.
* Filtros por categoría/estado y búsqueda por nombre.
* Vista detallada con relaciones y metadatos.

---

## 🖥️ Hardware

Funcionalidad:

* CRUD completo (add/edit/delete) con formularios estructurados.
* Filtrado por tipo/estado, búsqueda por modelo y ordenación A–Z/Z–A.
* Asociación de software mediante `select` múltiple.
* Vista detallada con specs, fecha de compra y software instalado.

---

## 🔑 Licencias

* Relación automática con el software asociado.
* Cálculo de estado (activa/expirada) en función de la fecha.
* CRUD con campos técnicos: vendor, licenseKey, seats, fechas, coste.
* Filtros + búsqueda por software.

---

## 🖧 Servidores

* Card con estado, ubicación, OS, usuarios y software alojado.
* Vista detallada con:

  * Cálculo de promedios por CPU/RAM/Disco
  * Grid de nodos individuales
  * Listado de software y usuarios con acceso

---
# 📜 Lista de proyectos

Subpágina para mostrar y gestionar los diferentes proyectos que gestiona la empresa y a los empleados que estan trabajando en los diferentes proyectos.

*Cada proyecto tendra:
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

