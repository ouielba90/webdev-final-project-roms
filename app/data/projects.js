export const projects = [
  {
    id: 1,
    name: "Auditoría de red interna",
    client: "TechNova",
    status: "En progreso",
    description:
      "Evaluación de seguridad de la red local y detección de accesos no autorizados.",
    tasks: [
      "Mapear topología de red",
      "Escanear puertos abiertos",
      "Analizar configuraciones de routers y switches",
      "Revisar autenticaciones internas",
    ],
  },
  {
    id: 2,
    name: "Test de penetración web",
    client: "FinTrust",
    status: "Pendiente",
    description:
      "Simulación de ataques a la aplicación web para detectar vulnerabilidades.",
    tasks: [
      "Identificar superficie de ataque",
      "Ejecutar escaneo de vulnerabilidades",
      "Probar inyecciones SQL y XSS",
      "Generar reporte de hallazgos",
    ],
  },
  {
    id: 3,
    name: "Implementación de firewall",
    client: "DataSafe",
    status: "Completado",
    description:
      "Configuración de un firewall perimetral y revisión de reglas de acceso.",
    tasks: [
      "Seleccionar hardware y firmware",
      "Configurar políticas de entrada y salida",
      "Probar reglas y registros",
    ],
  },
  {
    id: 4,
    name: "Revisión de políticas de contraseñas",
    client: "EduCloud",
    status: "En progreso",
    description:
      "Verificación de políticas de autenticación y contraseñas seguras.",
    tasks: [
      "Analizar políticas actuales",
      "Comparar con estándares NIST",
      "Proponer nuevas reglas de complejidad",
      "Implementar cambios en Active Directory",
    ],
  },
  {
    id: 5,
    name: "Auditoría de correo electrónico",
    client: "MailPro",
    status: "Pendiente",
    description:
      "Revisión de la configuración de servidores SMTP/POP3 para prevenir phishing.",
    tasks: [
      "Analizar cabeceras de correo",
      "Revisar SPF, DKIM y DMARC",
      "Evaluar almacenamiento cifrado",
      "Probar autenticación de usuarios",
    ],
  },
  {
    id: 6,
    name: "Test de intrusión física",
    client: "SecureHome",
    status: "En progreso",
    description:
      "Prueba de acceso físico no autorizado en las oficinas principales.",
    tasks: [
      "Evaluar controles de acceso",
      "Intentar ingreso sin credenciales",
      "Revisar cámaras de seguridad",
      "Emitir informe de vulnerabilidades físicas",
    ],
  },
  {
    id: 7,
    name: "Implementación de VPN segura",
    client: "TeleWork Inc.",
    status: "Completado",
    description: "Instalación de VPN y capacitación para uso remoto seguro.",
    tasks: [
      "Configurar servidor VPN",
      "Establecer cifrado IPSec",
      "Probar conexiones remotas",
      "Entrenar a los usuarios",
    ],
  },
  {
    id: 8,
    name: "Auditoría de servidores Windows",
    client: "MegaData",
    status: "Pendiente",
    description:
      "Evaluación de configuraciones y permisos en servidores Windows Server.",
    tasks: [
      "Analizar políticas de grupo (GPO)",
      "Verificar permisos de archivos",
      "Revisar logs de eventos",
    ],
  },
  {
    id: 9,
    name: "Hardening de Linux",
    client: "CodeHub",
    status: "En progreso",
    description:
      "Endurecimiento de servidores Linux para proteger contra ataques comunes.",
    tasks: [
      "Actualizar paquetes y kernel",
      "Configurar firewall con iptables",
      "Eliminar servicios innecesarios",
      "Establecer políticas de permisos",
      "Probar integridad del sistema",
    ],
  },
  {
    id: 10,
    name: "Análisis forense digital",
    client: "CyberDetect",
    status: "Pendiente",
    description:
      "Investigación de incidentes de seguridad y recuperación de evidencias.",
    tasks: [
      "Recolectar imágenes de disco",
      "Analizar logs del sistema",
      "Recuperar archivos borrados",
      "Documentar evidencia",
    ],
  },
  {
    id: 11,
    name: "Prueba de phishing interno",
    client: "AlphaBank",
    status: "Completado",
    description:
      "Campaña de simulación de phishing para evaluar conciencia de los empleados.",
    tasks: [
      "Diseñar campaña de phishing",
      "Enviar correos simulados",
      "Registrar resultados",
      "Elaborar informe de concienciación",
    ],
  },
  {
    id: 12,
    name: "Configuración de IDS/IPS",
    client: "NetGuard",
    status: "En progreso",
    description:
      "Instalación de sistemas de detección y prevención de intrusos.",
    tasks: [
      "Instalar Snort/Suricata",
      "Configurar alertas en tiempo real",
      "Probar detección de ataques simulados",
      "Optimizar reglas de falsos positivos",
    ],
  },
  {
    id: 13,
    name: "Análisis de vulnerabilidades web",
    client: "ShopLine",
    status: "Pendiente",
    description:
      "Escaneo de vulnerabilidades en su sitio de comercio electrónico.",
    tasks: [
      "Ejecutar escaneo con OWASP ZAP",
      "Revisar autenticación y sesiones",
      "Verificar cifrado HTTPS",
    ],
  },
  {
    id: 14,
    name: "Auditoría de seguridad en base de datos",
    client: "DataBank",
    status: "En progreso",
    description: "Revisión de permisos y cifrado en bases de datos SQL.",
    tasks: [
      "Revisar roles y privilegios",
      "Comprobar cifrado en tránsito y reposo",
      "Analizar logs de consultas",
    ],
  },
  {
    id: 15,
    name: "Evaluación de cumplimiento GDPR",
    client: "PrivacyCorp",
    status: "Completado",
    description:
      "Verificación de políticas de privacidad y tratamiento de datos.",
    tasks: [
      "Analizar flujos de datos personales",
      "Verificar consentimiento de usuarios",
      "Asegurar derecho al olvido",
      "Emitir informe de cumplimiento",
    ],
  },
  {
    id: 16,
    name: "Rediseño de política de backups",
    client: "InfoRestore",
    status: "En progreso",
    description:
      "Actualización del sistema de copias de seguridad y recuperación.",
    tasks: [
      "Evaluar sistema actual",
      "Diseñar nueva política de retención",
      "Probar restauración completa",
    ],
  },
  {
    id: 17,
    name: "Seguridad en IoT",
    client: "SmartWorld",
    status: "Pendiente",
    description:
      "Evaluación de seguridad en dispositivos conectados y sus protocolos.",
    tasks: [
      "Identificar dispositivos IoT",
      "Analizar firmware",
      "Evaluar autenticación y cifrado",
      "Recomendar mejoras de seguridad",
    ],
  },
  {
    id: 18,
    name: "Simulación de ransomware",
    client: "MediLab",
    status: "En progreso",
    description:
      "Simulación controlada para evaluar la respuesta ante ataques de ransomware.",
    tasks: [
      "Preparar entorno aislado",
      "Ejecutar muestra controlada",
      "Medir tiempo de respuesta",
      "Evaluar plan de recuperación",
    ],
  },
  {
    id: 19,
    name: "Migración segura a la nube",
    client: "Cloudify",
    status: "Completado",
    description:
      "Evaluación y migración de sistemas locales a la nube con cifrado.",
    tasks: [
      "Evaluar arquitectura actual",
      "Seleccionar proveedor cloud",
      "Implementar cifrado en tránsito",
      "Probar redundancia y backups",
    ],
  },
  {
    id: 20,
    name: "Pentest en APIs REST",
    client: "DevLink",
    status: "Pendiente",
    description: "Pruebas de seguridad en APIs REST públicas y privadas.",
    tasks: [
      "Mapear endpoints",
      "Probar autenticación y tokens",
      "Ejecutar fuzzing de entradas",
      "Revisar logs de errores",
    ],
  },
  {
    id: 21,
    name: "Capacitación de concienciación",
    client: "EduTech",
    status: "Completado",
    description: "Entrenamiento en ciberseguridad para empleados no técnicos.",
    tasks: [
      "Diseñar material educativo",
      "Realizar sesiones de formación",
      "Aplicar prueba final",
    ],
  },
  {
    id: 22,
    name: "Configuración de autenticación multifactor",
    client: "AccessCorp",
    status: "En progreso",
    description: "Implementación de MFA en entornos corporativos.",
    tasks: [
      "Seleccionar proveedor MFA",
      "Integrar con Active Directory",
      "Probar autenticación en varios dispositivos",
      "Capacitar a los usuarios",
    ],
  },
  {
    id: 23,
    name: "Auditoría de logs",
    client: "LogSecure",
    status: "Completado",
    description:
      "Revisión de registros de eventos y detección de patrones sospechosos.",
    tasks: [
      "Centralizar logs en SIEM",
      "Detectar anomalías",
      "Generar alertas automáticas",
      "Emitir informe de hallazgos",
    ],
  },
  {
    id: 24,
    name: "Evaluación de red Wi-Fi",
    client: "CoffeeZone",
    status: "Pendiente",
    description:
      "Pruebas de seguridad en la red inalámbrica de clientes y empleados.",
    tasks: [
      "Identificar SSIDs activos",
      "Probar cifrado WPA2/WPA3",
      "Detectar puntos de acceso falsos",
    ],
  },
  {
    id: 25,
    name: "Monitoreo de tráfico en tiempo real",
    client: "StreamNet",
    status: "En progreso",
    description: "Implementación de paneles de vigilancia para tráfico de red.",
    tasks: [
      "Instalar herramientas de monitoreo",
      "Configurar paneles de visualización",
      "Establecer umbrales de alerta",
      "Optimizar rendimiento del sistema",
    ],
  },
];

export default projects;
