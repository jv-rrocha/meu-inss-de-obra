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
  AC: { casa_popular: 2143.31, comercial_salas_lojas: 3970.60, conjunto_habitacional_popular: 2143.31, galpao_industrial: 1835.61, residencial_multifamiliar: 3585.47, residencial_unifamiliar: 4242.10, edificio_garagens: 3970.60 },
  AL: { casa_popular: 1362.40, comercial_salas_lojas: 2466.05, conjunto_habitacional_popular: 1362.40, galpao_industrial: 1151.86, residencial_multifamiliar: 2204.66, residencial_unifamiliar: 2558.21, edificio_garagens: 2466.05 },
  AM: { casa_popular: 2143.31, comercial_salas_lojas: 3970.60, conjunto_habitacional_popular: 2143.31, galpao_industrial: 1835.61, residencial_multifamiliar: 3585.47, residencial_unifamiliar: 4242.10, edificio_garagens: 3970.60 },
  AP: { casa_popular: 1902.20, comercial_salas_lojas: 3386.00, conjunto_habitacional_popular: 1902.20, galpao_industrial: 1609.56, residencial_multifamiliar: 2982.56, residencial_unifamiliar: 3376.99, edificio_garagens: 3386.00 },
  BA: { casa_popular: 1487.76, comercial_salas_lojas: 2642.31, conjunto_habitacional_popular: 1487.76, galpao_industrial: 1198.83, residencial_multifamiliar: 2307.07, residencial_unifamiliar: 2752.71, edificio_garagens: 2642.31 },
  CE: { casa_popular: 1695.74, comercial_salas_lojas: 2845.05, conjunto_habitacional_popular: 1695.74, galpao_industrial: 1347.80, residencial_multifamiliar: 2499.51, residencial_unifamiliar: 2878.33, edificio_garagens: 2845.05 },
  DF: { casa_popular: 1588.55, comercial_salas_lojas: 2879.66, conjunto_habitacional_popular: 1588.55, galpao_industrial: 1287.94, residencial_multifamiliar: 2516.31, residencial_unifamiliar: 2903.96, edificio_garagens: 2879.66 },
  ES: { casa_popular: 1916.54, comercial_salas_lojas: 3226.46, conjunto_habitacional_popular: 1916.54, galpao_industrial: 1462.06, residencial_multifamiliar: 2895.38, residencial_unifamiliar: 3403.21, edificio_garagens: 3226.46 },
  GO: { casa_popular: 1518.21, comercial_salas_lojas: 2704.95, conjunto_habitacional_popular: 1518.21, galpao_industrial: 1264.09, residencial_multifamiliar: 2376.01, residencial_unifamiliar: 2845.90, edificio_garagens: 2704.95 },
  MA: { casa_popular: 1312.57, comercial_salas_lojas: 2294.07, conjunto_habitacional_popular: 1312.57, galpao_industrial: 1094.67, residencial_multifamiliar: 2246.52, residencial_unifamiliar: 2348.61, edificio_garagens: 2294.07 },
  MG: { casa_popular: 1725.92, comercial_salas_lojas: 2991.56, conjunto_habitacional_popular: 1725.92, galpao_industrial: 1316.03, residencial_multifamiliar: 2664.40, residencial_unifamiliar: 3071.19, edificio_garagens: 2991.56 },
  MS: { casa_popular: 1292.60, comercial_salas_lojas: 2345.43, conjunto_habitacional_popular: 1292.60, galpao_industrial: 1057.28, residencial_multifamiliar: 1887.01, residencial_unifamiliar: 2252.88, edificio_garagens: 2345.43 },
  MT: { casa_popular: 2222.33, comercial_salas_lojas: 3957.52, conjunto_habitacional_popular: 2222.33, galpao_industrial: 1740.33, residencial_multifamiliar: 3482.69, residencial_unifamiliar: 4007.38, edificio_garagens: 3957.52 },
  PA: { casa_popular: 1655.36, comercial_salas_lojas: 2869.22, conjunto_habitacional_popular: 1655.36, galpao_industrial: 1356.84, residencial_multifamiliar: 2548.39, residencial_unifamiliar: 2917.27, edificio_garagens: 2869.22 },
  PB: { casa_popular: 1135.38, comercial_salas_lojas: 2089.85, conjunto_habitacional_popular: 1135.38, galpao_industrial: 960.51, residencial_multifamiliar: 1859.16, residencial_unifamiliar: 2097.99, edificio_garagens: 2089.85 },
  PE: { casa_popular: 1553.08, comercial_salas_lojas: 2656.82, conjunto_habitacional_popular: 1553.08, galpao_industrial: 1215.84, residencial_multifamiliar: 2341.09, residencial_unifamiliar: 2799.33, edificio_garagens: 2656.82 },
  PI: { casa_popular: 1312.57, comercial_salas_lojas: 2294.07, conjunto_habitacional_popular: 1312.57, galpao_industrial: 1094.67, residencial_multifamiliar: 2025.47, residencial_unifamiliar: 2348.61, edificio_garagens: 2294.07 },
  PR: { casa_popular: 1827.31, comercial_salas_lojas: 3253.13, conjunto_habitacional_popular: 1827.31, galpao_industrial: 1458.10, residencial_multifamiliar: 2844.92, residencial_unifamiliar: 3340.01, edificio_garagens: 3253.13 },
  RJ: { casa_popular: 1731.76, comercial_salas_lojas: 3036.43, conjunto_habitacional_popular: 1731.76, galpao_industrial: 1378.73, residencial_multifamiliar: 2669.62, residencial_unifamiliar: 3101.08, edificio_garagens: 3036.43 },
  RN: { casa_popular: 1530.91, comercial_salas_lojas: 2532.87, conjunto_habitacional_popular: 1530.91, galpao_industrial: 1217.66, residencial_multifamiliar: 2276.11, residencial_unifamiliar: 2651.16, edificio_garagens: 2532.87 },
  RO: { casa_popular: 1739.04, comercial_salas_lojas: 3044.81, conjunto_habitacional_popular: 1739.04, galpao_industrial: 1357.59, residencial_multifamiliar: 2692.13, residencial_unifamiliar: 2958.50, edificio_garagens: 3044.81 },
  RR: { casa_popular: 1913.40, comercial_salas_lojas: 3595.77, conjunto_habitacional_popular: 1913.40, galpao_industrial: 1723.59, residencial_multifamiliar: 3156.13, residencial_unifamiliar: 3682.39, edificio_garagens: 3595.77 },
  RS: { casa_popular: 1854.69, comercial_salas_lojas: 3639.91, conjunto_habitacional_popular: 1854.69, galpao_industrial: 1412.37, residencial_multifamiliar: 3069.41, residencial_unifamiliar: 3467.09, edificio_garagens: 3639.91 },
  SC: { casa_popular: 1994.92, comercial_salas_lojas: 3410.76, conjunto_habitacional_popular: 1994.92, galpao_industrial: 1577.81, residencial_multifamiliar: 2968.24, residencial_unifamiliar: 3498.08, edificio_garagens: 3410.76 },
  SE: { casa_popular: 1396.57, comercial_salas_lojas: 2585.44, conjunto_habitacional_popular: 1396.57, galpao_industrial: 1188.74, residencial_multifamiliar: 2308.47, residencial_unifamiliar: 2548.48, edificio_garagens: 2585.44 },
  SP: { casa_popular: 1517.13, comercial_salas_lojas: 2685.96, conjunto_habitacional_popular: 1517.13, galpao_industrial: 1265.41, residencial_multifamiliar: 2359.48, residencial_unifamiliar: 2705.27, edificio_garagens: 2685.96 },
  TO: { casa_popular: 1518.21, comercial_salas_lojas: 2704.95, conjunto_habitacional_popular: 1518.21, galpao_industrial: 1264.09, residencial_multifamiliar: 2376.01, residencial_unifamiliar: 2845.90, edificio_garagens: 2704.95 },
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
