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


2. Gestión de recursos (InventoryPage)
- Lista de recursos (software, hardware, ...)
- Crear, editar, pedir y eliminar.

Ejemplos:
- Wireshark – Software – Disponible – Analiza tráfico de red
- Firewall Cisco ASA – Hardware – En uso – Protege la red
- BurpSuite – Software – Mantenimiento – Audita sitios web

Propiedades
name, type, status, description


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

