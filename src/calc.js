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
  AC: { casa_popular: 2159.19, comercial_salas_lojas: 4000.04, conjunto_habitacional_popular: 2159.19, galpao_industrial: 1849.22, residencial_multifamiliar: 3612.04, residencial_unifamiliar: 4273.55, edificio_garagens: 4000.04 },
  AL: { casa_popular: 1372.50, comercial_salas_lojas: 2484.33, conjunto_habitacional_popular: 1372.50, galpao_industrial: 1160.40, residencial_multifamiliar: 2221.00, residencial_unifamiliar: 2577.17, edificio_garagens: 2484.33 },
  AM: { casa_popular: 2159.19, comercial_salas_lojas: 4000.04, conjunto_habitacional_popular: 2159.19, galpao_industrial: 1849.22, residencial_multifamiliar: 3612.04, residencial_unifamiliar: 4273.55, edificio_garagens: 4000.04 },
  AP: { casa_popular: 1916.30, comercial_salas_lojas: 3411.10, conjunto_habitacional_popular: 1916.30, galpao_industrial: 1621.49, residencial_multifamiliar: 3004.67, residencial_unifamiliar: 3402.03, edificio_garagens: 3411.10 },
  BA: { casa_popular: 1498.78, comercial_salas_lojas: 2661.90, conjunto_habitacional_popular: 1498.78, galpao_industrial: 1207.71, residencial_multifamiliar: 2324.17, residencial_unifamiliar: 2773.12, edificio_garagens: 2661.90 },
  CE: { casa_popular: 1708.31, comercial_salas_lojas: 2866.14, conjunto_habitacional_popular: 1708.31, galpao_industrial: 1357.80, residencial_multifamiliar: 2518.04, residencial_unifamiliar: 2899.66, edificio_garagens: 2866.14 },
  DF: { casa_popular: 1600.33, comercial_salas_lojas: 2901.01, conjunto_habitacional_popular: 1600.33, galpao_industrial: 1297.49, residencial_multifamiliar: 2534.96, residencial_unifamiliar: 2925.49, edificio_garagens: 2901.01 },
  ES: { casa_popular: 1930.74, comercial_salas_lojas: 3250.38, conjunto_habitacional_popular: 1930.74, galpao_industrial: 1472.90, residencial_multifamiliar: 2916.84, residencial_unifamiliar: 3428.43, edificio_garagens: 3250.38 },
  GO: { casa_popular: 1529.46, comercial_salas_lojas: 2725.00, conjunto_habitacional_popular: 1529.46, galpao_industrial: 1273.46, residencial_multifamiliar: 2393.62, residencial_unifamiliar: 2867.00, edificio_garagens: 2725.00 },
  MA: { casa_popular: 1322.30, comercial_salas_lojas: 2311.07, conjunto_habitacional_popular: 1322.30, galpao_industrial: 1102.79, residencial_multifamiliar: 2263.17, residencial_unifamiliar: 2366.02, edificio_garagens: 2311.07 },
  MG: { casa_popular: 1738.72, comercial_salas_lojas: 3013.73, conjunto_habitacional_popular: 1738.72, galpao_industrial: 1325.78, residencial_multifamiliar: 2684.15, residencial_unifamiliar: 3093.96, edificio_garagens: 3013.73 },
  MS: { casa_popular: 1302.19, comercial_salas_lojas: 2362.81, conjunto_habitacional_popular: 1302.19, galpao_industrial: 1065.12, residencial_multifamiliar: 1901.00, residencial_unifamiliar: 2269.58, edificio_garagens: 2362.81 },
  MT: { casa_popular: 2238.80, comercial_salas_lojas: 3986.86, conjunto_habitacional_popular: 2238.80, galpao_industrial: 1753.23, residencial_multifamiliar: 3508.51, residencial_unifamiliar: 4037.08, edificio_garagens: 3986.86 },
  PA: { casa_popular: 1667.63, comercial_salas_lojas: 2890.49, conjunto_habitacional_popular: 1667.63, galpao_industrial: 1366.90, residencial_multifamiliar: 2567.28, residencial_unifamiliar: 2938.90, edificio_garagens: 2890.49 },
  PB: { casa_popular: 1143.80, comercial_salas_lojas: 2105.34, conjunto_habitacional_popular: 1143.80, galpao_industrial: 967.63, residencial_multifamiliar: 1872.95, residencial_unifamiliar: 2113.54, edificio_garagens: 2105.34 },
  PE: { casa_popular: 1564.59, comercial_salas_lojas: 2676.52, conjunto_habitacional_popular: 1564.59, galpao_industrial: 1224.85, residencial_multifamiliar: 2358.44, residencial_unifamiliar: 2820.08, edificio_garagens: 2676.52 },
  PI: { casa_popular: 1322.30, comercial_salas_lojas: 2311.07, conjunto_habitacional_popular: 1322.30, galpao_industrial: 1102.79, residencial_multifamiliar: 2040.48, residencial_unifamiliar: 2366.02, edificio_garagens: 2311.07 },
  PR: { casa_popular: 1840.85, comercial_salas_lojas: 3277.25, conjunto_habitacional_popular: 1840.85, galpao_industrial: 1468.91, residencial_multifamiliar: 2866.01, residencial_unifamiliar: 3364.77, edificio_garagens: 3277.25 },
  RJ: { casa_popular: 1744.59, comercial_salas_lojas: 3058.94, conjunto_habitacional_popular: 1744.59, galpao_industrial: 1388.95, residencial_multifamiliar: 2689.41, residencial_unifamiliar: 3124.06, edificio_garagens: 3058.94 },
  RN: { casa_popular: 1542.26, comercial_salas_lojas: 2551.65, conjunto_habitacional_popular: 1542.26, galpao_industrial: 1226.69, residencial_multifamiliar: 2292.98, residencial_unifamiliar: 2292.98, edificio_garagens: 2551.65 },
  RO: { casa_popular: 1751.94, comercial_salas_lojas: 3067.38, conjunto_habitacional_popular: 1751.94, galpao_industrial: 1367.65, residencial_multifamiliar: 2712.08, residencial_unifamiliar: 2980.43, edificio_garagens: 3067.38 },
  RR: { casa_popular: 1927.58, comercial_salas_lojas: 3622.42, conjunto_habitacional_popular: 1927.58, galpao_industrial: 1736.37, residencial_multifamiliar: 3179.52, residencial_unifamiliar: 3709.69, edificio_garagens: 3622.42 },
  RS: { casa_popular: 1868.44, comercial_salas_lojas: 3666.89, conjunto_habitacional_popular: 1868.44, galpao_industrial: 1422.84, residencial_multifamiliar: 3092.16, residencial_unifamiliar: 3492.79, edificio_garagens: 3666.89 },
  SC: { casa_popular: 2009.71, comercial_salas_lojas: 3436.05, conjunto_habitacional_popular: 2009.71, galpao_industrial: 1589.51, residencial_multifamiliar: 2990.25, residencial_unifamiliar: 3524.01, edificio_garagens: 3436.05 },
  SE: { casa_popular: 1406.92, comercial_salas_lojas: 2604.60, conjunto_habitacional_popular: 1406.92, galpao_industrial: 1197.55, residencial_multifamiliar: 2325.58, residencial_unifamiliar: 2567.37, edificio_garagens: 2604.60 },
  SP: { casa_popular: 1528.38, comercial_salas_lojas: 2705.87, conjunto_habitacional_popular: 1528.38, galpao_industrial: 1274.79, residencial_multifamiliar: 2376.97, residencial_unifamiliar: 2725.32, edificio_garagens: 2705.87 },
  TO: { casa_popular: 1529.46, comercial_salas_lojas: 2725.00, conjunto_habitacional_popular: 1529.46, galpao_industrial: 1273.46, residencial_multifamiliar: 2393.62, residencial_unifamiliar: 2393.62, edificio_garagens: 2725.00 },
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
