// ============================================================
// TABELA DE PERCENTUAL DE EQUIVALÊNCIA (Passo 1)
// ============================================================
const TABELA_EQUIVALENCIA = {
  residencial_unifamiliar: (area) => area <= 1000 ? 0.89 : 0.85,
  residencial_multifamiliar: (area) => area <= 1000 ? 0.90 : 0.86,
  comercial_salas_lojas: (area) => area <= 3000 ? 0.86 : 0.83,
  galpao_industrial: () => 0.95,
  casa_popular: () => 0.98,
  conjunto_habitacional_popular: () => 0.98,
  edificio_garagens: (area) => area <= 3000 ? 0.86 : 0.83,
}

// ============================================================
// TABELA VAU — JUL/2025 (Passo 2)
// ============================================================
const TABELA_VAU = {
  AC: { casa_popular: 2152.95, comercial_salas_lojas: 3988.47, conjunto_habitacional_popular: 2152.95, galpao_industrial: 1843.87, residencial_multifamiliar: 3601.60, residencial_unifamiliar: 4261.19, edificio_garagens: 3988.47 },
  AL: { casa_popular: 1368.53, comercial_salas_lojas: 2477.15, conjunto_habitacional_popular: 1368.53, galpao_industrial: 1157.04, residencial_multifamiliar: 2214.58, residencial_unifamiliar: 2569.72, edificio_garagens: 2477.15 },
  AM: { casa_popular: 2152.95, comercial_salas_lojas: 3988.47, conjunto_habitacional_popular: 2152.95, galpao_industrial: 1843.87, residencial_multifamiliar: 3601.60, residencial_unifamiliar: 4261.19, edificio_garagens: 3988.47 },
  AP: { casa_popular: 1910.76, comercial_salas_lojas: 3401.24, conjunto_habitacional_popular: 1910.76, galpao_industrial: 1616.80, residencial_multifamiliar: 2995.98, residencial_unifamiliar: 3392.19, edificio_garagens: 3401.24 },
  BA: { casa_popular: 1494.45, comercial_salas_lojas: 2654.20, conjunto_habitacional_popular: 1494.45, galpao_industrial: 1204.22, residencial_multifamiliar: 2317.45, residencial_unifamiliar: 2765.10, edificio_garagens: 2654.20 },
  CE: { casa_popular: 1703.37, comercial_salas_lojas: 2857.85, conjunto_habitacional_popular: 1703.37, galpao_industrial: 1353.87, residencial_multifamiliar: 2510.76, residencial_unifamiliar: 2891.28, edificio_garagens: 2857.85 },
  DF: { casa_popular: 1595.70, comercial_salas_lojas: 2892.62, conjunto_habitacional_popular: 1595.70, galpao_industrial: 1293.74, residencial_multifamiliar: 2527.63, residencial_unifamiliar: 2917.03, edificio_garagens: 2892.62 },
  ES: { casa_popular: 1925.16, comercial_salas_lojas: 3240.98, conjunto_habitacional_popular: 1925.16, galpao_industrial: 1468.64, residencial_multifamiliar: 2908.41, residencial_unifamiliar: 3418.52, edificio_garagens: 3240.98 },
  GO: { casa_popular: 1525.04, comercial_salas_lojas: 2717.12, conjunto_habitacional_popular: 1525.04, galpao_industrial: 1269.78, residencial_multifamiliar: 2386.70, residencial_unifamiliar: 2858.71, edificio_garagens: 2717.12 },
  MA: { casa_popular: 1318.48, comercial_salas_lojas: 2304.39, conjunto_habitacional_popular: 1318.48, galpao_industrial: 1099.60, residencial_multifamiliar: 2256.63, residencial_unifamiliar: 2359.18, edificio_garagens: 2304.39 },
  MG: { casa_popular: 1733.69, comercial_salas_lojas: 3005.02, conjunto_habitacional_popular: 1733.69, galpao_industrial: 1321.95, residencial_multifamiliar: 2676.39, residencial_unifamiliar: 3085.01, edificio_garagens: 3005.02 },
  MS: { casa_popular: 1298.42, comercial_salas_lojas: 2355.98, conjunto_habitacional_popular: 1298.42, galpao_industrial: 1062.04, residencial_multifamiliar: 1895.50, residencial_unifamiliar: 2263.02, edificio_garagens: 2355.98 },
  MT: { casa_popular: 2232.33, comercial_salas_lojas: 3975.33, conjunto_habitacional_popular: 2232.33, galpao_industrial: 1748.16, residencial_multifamiliar: 3498.36, residencial_unifamiliar: 4025.41, edificio_garagens: 3975.33 },
  PA: { casa_popular: 1662.81, comercial_salas_lojas: 2882.13, conjunto_habitacional_popular: 1662.81, galpao_industrial: 1362.95, residencial_multifamiliar: 2559.86, residencial_unifamiliar: 2930.40, edificio_garagens: 2882.13 },
  PB: { casa_popular: 1140.49, comercial_salas_lojas: 2099.25, conjunto_habitacional_popular: 1140.49, galpao_industrial: 964.83, residencial_multifamiliar: 1867.53, residencial_unifamiliar: 2107.43, edificio_garagens: 2099.25 },
  PE: { casa_popular: 1560.07, comercial_salas_lojas: 2668.78, conjunto_habitacional_popular: 1560.07, galpao_industrial: 1221.31, residencial_multifamiliar: 2351.62, residencial_unifamiliar: 2811.93, edificio_garagens: 2668.78 },
  PI: { casa_popular: 1318.48, comercial_salas_lojas: 2304.39, conjunto_habitacional_popular: 1318.48, galpao_industrial: 1099.60, residencial_multifamiliar: 2034.58, residencial_unifamiliar: 2359.18, edificio_garagens: 2304.39 },
  PR: { casa_popular: 1835.53, comercial_salas_lojas: 3267.77, conjunto_habitacional_popular: 1835.53, galpao_industrial: 1464.66, residencial_multifamiliar: 2857.72, residencial_unifamiliar: 3355.04, edificio_garagens: 3267.77 },
  RJ: { casa_popular: 1739.55, comercial_salas_lojas: 3050.09, conjunto_habitacional_popular: 1739.55, galpao_industrial: 1384.93, residencial_multifamiliar: 2681.63, residencial_unifamiliar: 3115.03, edificio_garagens: 3050.09 },
  RN: { casa_popular: 1537.80, comercial_salas_lojas: 2544.27, conjunto_habitacional_popular: 1537.80, galpao_industrial: 1223.14, residencial_multifamiliar: 2286.35, residencial_unifamiliar: 2663.09, edificio_garagens: 2544.27 },
  RO: { casa_popular: 1746.87, comercial_salas_lojas: 3058.51, conjunto_habitacional_popular: 1746.87, galpao_industrial: 1363.70, residencial_multifamiliar: 2704.24, residencial_unifamiliar: 2971.81, edificio_garagens: 3058.51 },
  RR: { casa_popular: 1922.01, comercial_salas_lojas: 3611.95, conjunto_habitacional_popular: 1922.01, galpao_industrial: 1731.35, residencial_multifamiliar: 3170.33, residencial_unifamiliar: 3698.96, edificio_garagens: 3611.95 },
  RS: { casa_popular: 1863.04, comercial_salas_lojas: 3656.29, conjunto_habitacional_popular: 1863.04, galpao_industrial: 1418.73, residencial_multifamiliar: 3083.22, residencial_unifamiliar: 3482.69, edificio_garagens: 3656.29 },
  SC: { casa_popular: 2003.90, comercial_salas_lojas: 3426.11, conjunto_habitacional_popular: 2003.90, galpao_industrial: 1584.91, residencial_multifamiliar: 2981.60, residencial_unifamiliar: 3513.82, edificio_garagens: 3426.11 },
  SE: { casa_popular: 1402.85, comercial_salas_lojas: 2597.07, conjunto_habitacional_popular: 1402.85, galpao_industrial: 1194.09, residencial_multifamiliar: 2318.86, residencial_unifamiliar: 2559.95, edificio_garagens: 2597.07 },
  SP: { casa_popular: 1523.96, comercial_salas_lojas: 2698.05, conjunto_habitacional_popular: 1523.96, galpao_industrial: 1271.10, residencial_multifamiliar: 2370.10, residencial_unifamiliar: 2717.44, edificio_garagens: 2698.05 },
  TO: { casa_popular: 1525.04, comercial_salas_lojas: 2717.12, conjunto_habitacional_popular: 1525.04, galpao_industrial: 1269.78, residencial_multifamiliar: 2386.70, residencial_unifamiliar: 2858.71, edificio_garagens: 2717.12 },
}

// ============================================================
// TABELA CONCRETO USINADO (Passo 3)
// ============================================================
const TABELA_CONCRETO = {
  AC: { casa_popular: 0.0469, comercial_salas_lojas: 0.1333, conjunto_habitacional_popular: 0.0469, galpao_industrial: 0.0452, residencial_multifamiliar: 0.0961, residencial_unifamiliar: 0.0743, edificio_garagens: 0.1333 },
  AL: { casa_popular: 0.0398, comercial_salas_lojas: 0.1135, conjunto_habitacional_popular: 0.0398, galpao_industrial: 0.0382, residencial_multifamiliar: 0.0812, residencial_unifamiliar: 0.0611, edificio_garagens: 0.1135 },
  AM: { casa_popular: 0.0469, comercial_salas_lojas: 0.1333, conjunto_habitacional_popular: 0.0469, galpao_industrial: 0.0452, residencial_multifamiliar: 0.0961, residencial_unifamiliar: 0.0743, edificio_garagens: 0.1333 },
  AP: { casa_popular: 0.0488, comercial_salas_lojas: 0.1293, conjunto_habitacional_popular: 0.0488, galpao_industrial: 0.0438, residencial_multifamiliar: 0.0941, residencial_unifamiliar: 0.0748, edificio_garagens: 0.1293 },
  BA: { casa_popular: 0.0373, comercial_salas_lojas: 0.1031, conjunto_habitacional_popular: 0.0373, galpao_industrial: 0.0362, residencial_multifamiliar: 0.0746, residencial_unifamiliar: 0.0553, edificio_garagens: 0.1031 },
  CE: { casa_popular: 0.0370, comercial_salas_lojas: 0.1069, conjunto_habitacional_popular: 0.0370, galpao_industrial: 0.0344, residencial_multifamiliar: 0.0769, residencial_unifamiliar: 0.0572, edificio_garagens: 0.1069 },
  DF: { casa_popular: 0.0353, comercial_salas_lojas: 0.0962, conjunto_habitacional_popular: 0.0353, galpao_industrial: 0.0343, residencial_multifamiliar: 0.0706, residencial_unifamiliar: 0.0524, edificio_garagens: 0.0962 },
  ES: { casa_popular: 0.0333, comercial_salas_lojas: 0.0945, conjunto_habitacional_popular: 0.0333, galpao_industrial: 0.0326, residencial_multifamiliar: 0.0685, residencial_unifamiliar: 0.0515, edificio_garagens: 0.0945 },
  GO: { casa_popular: 0.0388, comercial_salas_lojas: 0.1027, conjunto_habitacional_popular: 0.0388, galpao_industrial: 0.0360, residencial_multifamiliar: 0.0762, residencial_unifamiliar: 0.0579, edificio_garagens: 0.1027 },
  MA: { casa_popular: 0.0418, comercial_salas_lojas: 0.1206, conjunto_habitacional_popular: 0.0418, galpao_industrial: 0.0407, residencial_multifamiliar: 0.0873, residencial_unifamiliar: 0.0694, edificio_garagens: 0.1206 },
  MG: { casa_popular: 0.0315, comercial_salas_lojas: 0.0866, conjunto_habitacional_popular: 0.0315, galpao_industrial: 0.0305, residencial_multifamiliar: 0.0622, residencial_unifamiliar: 0.0468, edificio_garagens: 0.0866 },
  MS: { casa_popular: 0.0434, comercial_salas_lojas: 0.1220, conjunto_habitacional_popular: 0.0434, galpao_industrial: 0.0428, residencial_multifamiliar: 0.0874, residencial_unifamiliar: 0.0674, edificio_garagens: 0.1220 },
  MT: { casa_popular: 0.0402, comercial_salas_lojas: 0.1096, conjunto_habitacional_popular: 0.0402, galpao_industrial: 0.0389, residencial_multifamiliar: 0.0801, residencial_unifamiliar: 0.0622, edificio_garagens: 0.1096 },
  PA: { casa_popular: 0.0491, comercial_salas_lojas: 0.1348, conjunto_habitacional_popular: 0.0491, galpao_industrial: 0.0445, residencial_multifamiliar: 0.0977, residencial_unifamiliar: 0.0758, edificio_garagens: 0.1348 },
  PB: { casa_popular: 0.0412, comercial_salas_lojas: 0.1181, conjunto_habitacional_popular: 0.0412, galpao_industrial: 0.0381, residencial_multifamiliar: 0.0858, residencial_unifamiliar: 0.0632, edificio_garagens: 0.1181 },
  PE: { casa_popular: 0.0351, comercial_salas_lojas: 0.0974, conjunto_habitacional_popular: 0.0351, galpao_industrial: 0.0342, residencial_multifamiliar: 0.0974, residencial_unifamiliar: 0.0512, edificio_garagens: 0.0974 },
  PI: { casa_popular: 0.0353, comercial_salas_lojas: 0.1000, conjunto_habitacional_popular: 0.0353, galpao_industrial: 0.0330, residencial_multifamiliar: 0.0716, residencial_unifamiliar: 0.0533, edificio_garagens: 0.1000 },
  PR: { casa_popular: 0.0318, comercial_salas_lojas: 0.0878, conjunto_habitacional_popular: 0.0318, galpao_industrial: 0.0308, residencial_multifamiliar: 0.0650, residencial_unifamiliar: 0.0491, edificio_garagens: 0.0878 },
  RJ: { casa_popular: 0.0320, comercial_salas_lojas: 0.0902, conjunto_habitacional_popular: 0.0320, galpao_industrial: 0.0308, residencial_multifamiliar: 0.0652, residencial_unifamiliar: 0.0494, edificio_garagens: 0.0902 },
  RN: { casa_popular: 0.0401, comercial_salas_lojas: 0.1041, conjunto_habitacional_popular: 0.0401, galpao_industrial: 0.0363, residencial_multifamiliar: 0.0762, residencial_unifamiliar: 0.0596, edificio_garagens: 0.1041 },
  RO: { casa_popular: 0.0402, comercial_salas_lojas: 0.1096, conjunto_habitacional_popular: 0.0402, galpao_industrial: 0.0389, residencial_multifamiliar: 0.0801, residencial_unifamiliar: 0.0622, edificio_garagens: 0.1096 },
  RR: { casa_popular: 0.0469, comercial_salas_lojas: 0.1333, conjunto_habitacional_popular: 0.0469, galpao_industrial: 0.0452, residencial_multifamiliar: 0.0961, residencial_unifamiliar: 0.0743, edificio_garagens: 0.1333 },
  RS: { casa_popular: 0.0325, comercial_salas_lojas: 0.0877, conjunto_habitacional_popular: 0.0325, galpao_industrial: 0.0323, residencial_multifamiliar: 0.0654, residencial_unifamiliar: 0.0501, edificio_garagens: 0.0877 },
  SC: { casa_popular: 0.0293, comercial_salas_lojas: 0.0836, conjunto_habitacional_popular: 0.0293, galpao_industrial: 0.0287, residencial_multifamiliar: 0.0619, residencial_unifamiliar: 0.0479, edificio_garagens: 0.0836 },
  SE: { casa_popular: 0.0434, comercial_salas_lojas: 0.1250, conjunto_habitacional_popular: 0.0434, galpao_industrial: 0.0418, residencial_multifamiliar: 0.0905, residencial_unifamiliar: 0.0697, edificio_garagens: 0.1250 },
  SP: { casa_popular: 0.0315, comercial_salas_lojas: 0.0869, conjunto_habitacional_popular: 0.0315, galpao_industrial: 0.0296, residencial_multifamiliar: 0.0635, residencial_unifamiliar: 0.0490, edificio_garagens: 0.0869 },
  TO: { casa_popular: 0.0353, comercial_salas_lojas: 0.1000, conjunto_habitacional_popular: 0.0353, galpao_industrial: 0.0330, residencial_multifamiliar: 0.0716, residencial_unifamiliar: 0.0533, edificio_garagens: 0.1000 },
}

// ============================================================
// FATOR SOCIAL (Passo 6)
// ============================================================
function getFatorSocial(area) {
  if (area <= 100) return 0.20
  if (area <= 200) return 0.40
  if (area <= 300) return 0.55
  if (area <= 400) return 0.70
  return 0.90
}

// ============================================================
// PMO (Passo 7)
// ============================================================
const TABELA_PMO = {
  alvenaria: 0.20,
  madeira: 0.15,
  mista: 0.15,
}

// ============================================================
// FUNÇÃO PRINCIPAL DE CÁLCULO
// ============================================================
export function calcularINSS({ area, tipoObra, uf, tipoConstrucao }) {
  // Passo 1 — Área de Equivalência
  const percEquiv = TABELA_EQUIVALENCIA[tipoObra](area)
  const areaEquivalente = area * percEquiv

  // Passo 2 — VAU
  const vau = TABELA_VAU[uf][tipoObra]

  // Passo 3 — Percentual de Concreto Usinado
  const percConcreto = TABELA_CONCRETO[uf][tipoObra]

  // Passo 4 — Custo da Obra por Destinação
  const custoObra = areaEquivalente * vau

  // Passo 5 — Remuneração por Concreto Usinado
  const remunConcreto = (custoObra * percConcreto) * 0.05

  // Passo 6 — Fator Social
  const fatorSocial = getFatorSocial(area)

  // Passo 7 — PMO
  const pmo = TABELA_PMO[tipoConstrucao]

  // Passo 8 — Remuneração de Mão de Obra Total
  const remunMaoDeObra = ((custoObra * fatorSocial) * pmo) - remunConcreto

  // Passo 9 — INSS Final
  const inss = remunMaoDeObra * 0.368

  return {
    areaEquivalente,
    percEquiv,
    vau,
    percConcreto,
    custoObra,
    remunConcreto,
    fatorSocial,
    pmo,
    remunMaoDeObra,
    inss,
  }
}

export function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatPct(value) {
  return (value * 100).toFixed(2).replace('.', ',') + '%'
}
