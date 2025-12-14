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


# 📦 Inventario 

Esta sección implementa la **gestión integral de activos tecnológicos** de la plataforma de consultoría de ciberseguridad. El módulo cubre **hardware, software, licencias y servidores**, proporcionando trazabilidad completa, relaciones entre entidades y validación de reglas de negocio críticas.

La implementación está realizada con **React**, **Context API** y una arquitectura modular orientada a escalabilidad y mantenimiento.

---

## 🧱 Arquitectura y Diseño

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

