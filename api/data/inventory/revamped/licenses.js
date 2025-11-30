export const licenses = [
  {
    id: 4001,
    softwareId: 1005,
    seats: 10,
    purchaseDate: "15/02/2024",
    expiryDate: "15/02/2026",
    licenseKey: "BURP-PRO-2837-ABCD",
    vendor: "PortSwigger",
    cost: 3999,
  }, // Burp Suite Pro
  {
    id: 4002,
    softwareId: 1006,
    seats: 5,
    purchaseDate: "01/11/2023",
    expiryDate: "10/11/2024", // expires in < 1 month
    licenseKey: "MALT-ENT-9182-XYTZ",
    vendor: "Maltego GmbH",
    cost: 2990,
  }, // Maltego Enterprise
  {
    id: 4003,
    softwareId: 1007,
    seats: 20,
    purchaseDate: "04/04/2024",
    expiryDate: "04/04/2025",
    licenseKey: "NESS-PRO-7612-KLMN",
    vendor: "Tenable",
    cost: 5200,
  }, // Nessus Professional
  {
    id: 4004,
    softwareId: 1010,
    seats: 3,
    purchaseDate: "10/06/2024",
    expiryDate: "20/11/2024", // expires soon
    licenseKey: "IDA-PRO-0091-FFAA",
    vendor: "Hex-Rays",
    cost: 7800,
  }, // IDA Pro
  {
    id: 4005,
    softwareId: 1011,
    seats: 7,
    purchaseDate: "22/08/2023",
    expiryDate: "22/08/2026",
    licenseKey: "BNINJA-TE-5512-GHJK",
    vendor: "Vector 35",
    cost: 3400,
  }, // Binary Ninja (team)
  {
    id: 4006,
    softwareId: 1012,
    seats: 5,
    purchaseDate: "02/10/2024",
    expiryDate: "02/10/2025",
    licenseKey: "IMDBG-5521-ZZTT",
    vendor: "Immunity",
    cost: 499,
  }, // Immunity Debugger (example)
  {
    id: 4007,
    softwareId: 1065,
    seats: 1,
    purchaseDate: "01/03/2024",
    expiryDate: "05/11/2024", // expires soon
    licenseKey: "SPLUNK-ENT-9711-POIU",
    vendor: "Splunk",
    cost: 12000,
  }, // Splunk Enterprise (server)
  {
    id: 4008,
    softwareId: 1066,
    seats: 50,
    purchaseDate: "05/05/2024",
    expiryDate: "05/05/2025",
    licenseKey: "DATA-ENT-5528-WWRR",
    vendor: "Datadog",
    cost: 15000,
  }, // Datadog (example)
  {
    id: 4009,
    softwareId: 1070,
    seats: 15,
    purchaseDate: "18/07/2023",
    expiryDate: "18/07/2026",
    licenseKey: "SNYK-TEAM-2891-QQWE",
    vendor: "Snyk",
    cost: 8500,
  }, // Snyk (team)
  {
    id: 4010,
    softwareId: 1071,
    seats: 10,
    purchaseDate: "12/09/2023",
    expiryDate: "12/09/2025",
    licenseKey: "VERA-SEC-1182-AASS",
    vendor: "Veracode",
    cost: 9900,
  }, // Veracode (example)
  {
    id: 4011,
    softwareId: 1072,
    seats: 8,
    purchaseDate: "03/01/2024",
    expiryDate: "03/01/2026",
    licenseKey: "CMX-ENT-7812-DDFF",
    vendor: "Checkmarx",
    cost: 6500,
  }, // Checkmarx (example)
  {
    id: 4012,
    softwareId: 1088,
    seats: 20,
    purchaseDate: "21/02/2024",
    expiryDate: "21/02/2026",
    licenseKey: "GTLAB-ENT-8127-KJUY",
    vendor: "GitLab",
    cost: 22000,
  }, // GitLab Enterprise
  {
    id: 4013,
    softwareId: 1095,
    seats: 5,
    purchaseDate: "17/08/2024",
    expiryDate: "17/08/2025",
    licenseKey: "IDS-COM-0021-MNBB",
    vendor: "Unknown Vendor",
    cost: 1900,
  }, // Commercial IDS/console example
  {
    id: 4014,
    softwareId: 1098,
    seats: 10,
    purchaseDate: "10/10/2023",
    expiryDate: "10/10/2026",
    licenseKey: "MON-ENT-8821-OOPP",
    vendor: "Monitoring Corp",
    cost: 5400,
  }, // Commercial monitoring example
  {
    id: 4015,
    softwareId: 1009,
    seats: 12,
    purchaseDate: "05/03/2024",
    expiryDate: "05/03/2026",
    licenseKey: "SCAN-ENT-8991-BBCC",
    vendor: "Scanner Corp",
    cost: 4800,
  }, // Example: enterprise edition of a scanner
  {
    id: 4016,
    softwareId: 1014,
    seats: 2,
    purchaseDate: "04/06/2024",
    expiryDate: "05/11/2024", // expires soon
    licenseKey: "FOR-ENT-3381-QQMM",
    vendor: "Forensic Tools Ltd",
    cost: 1299,
  }, // Commercial forensic tool example
  {
    id: 4017,
    softwareId: 1082,
    seats: 6,
    purchaseDate: "15/07/2023",
    expiryDate: "15/07/2025",
    licenseKey: "VAULT-ENT-0033-GGHH",
    vendor: "Vault Corp",
    cost: 7000,
  }, // Example: enterprise Vault
  {
    id: 4018,
    softwareId: 1099,
    seats: 10,
    purchaseDate: "01/09/2024",
    expiryDate: "01/09/2025",
    licenseKey: "BACKUP-ENT-5521-LLOO",
    vendor: "Backup Solutions",
    cost: 2500,
  }, // Example: enterprise backup/agent
  {
    id: 4019,
    softwareId: 1100,
    seats: 3,
    purchaseDate: "20/11/2023",
    expiryDate: "07/11/2024", // expires in days
    licenseKey: "SECTOOL-ENT-8421-NNJJ",
    vendor: "SecurityTool Co",
    cost: 1600,
  }, // Example commercial security tool
  {
    id: 4020,
    softwareId: 1069,
    seats: 12,
    purchaseDate: "08/02/2024",
    expiryDate: "08/02/2026",
    licenseKey: "GRAF-ENT-5521-VVCC",
    vendor: "Grafana Labs",
    cost: 3100,
  }, // Commercial Grafana Cloud / plugin license (example)
];

export default licenses;
