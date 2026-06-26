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
  AC: { casa_popular: 2108.41, comercial_salas_lojas: 3905.95, conjunto_habitacional_popular: 2108.41, galpao_industrial: 1805.72, residencial_multifamiliar: 3527.09, residencial_unifamiliar: 4173.03, edificio_garagens: 3905.95 },
  AL: { casa_popular: 1340.22, comercial_salas_lojas: 2425.89, conjunto_habitacional_popular: 1340.22, galpao_industrial: 1133.11, residencial_multifamiliar: 2168.76, residencial_unifamiliar: 2516.56, edificio_garagens: 2425.89 },
  AM: { casa_popular: 2108.41, comercial_salas_lojas: 3905.95, conjunto_habitacional_popular: 2108.41, galpao_industrial: 1805.72, residencial_multifamiliar: 3527.09, residencial_unifamiliar: 4173.03, edificio_garagens: 3905.95 },
  AP: { casa_popular: 1871.23, comercial_salas_lojas: 3330.86, conjunto_habitacional_popular: 1871.23, galpao_industrial: 1583.35, residencial_multifamiliar: 2934.00, residencial_unifamiliar: 3322.00, edificio_garagens: 3330.86 },
  BA: { casa_popular: 1463.53, comercial_salas_lojas: 2599.29, conjunto_habitacional_popular: 1463.53, galpao_industrial: 1179.31, residencial_multifamiliar: 2269.50, residencial_unifamiliar: 2707.88, edificio_garagens: 2599.29 },
  CE: { casa_popular: 1668.13, comercial_salas_lojas: 2798.73, conjunto_habitacional_popular: 1668.13, galpao_industrial: 1325.85, residencial_multifamiliar: 2458.81, residencial_unifamiliar: 2831.47, edificio_garagens: 2798.73 },
  DF: { casa_popular: 1562.69, comercial_salas_lojas: 2832.77, conjunto_habitacional_popular: 1562.69, galpao_industrial: 1266.97, residencial_multifamiliar: 2475.34, residencial_unifamiliar: 2856.68, edificio_garagens: 2832.77 },
  ES: { casa_popular: 1885.33, comercial_salas_lojas: 3173.93, conjunto_habitacional_popular: 1885.33, galpao_industrial: 1438.25, residencial_multifamiliar: 2848.23, residencial_unifamiliar: 3347.80, edificio_garagens: 3173.93 },
  GO: { casa_popular: 1493.49, comercial_salas_lojas: 2660.91, conjunto_habitacional_popular: 1493.49, galpao_industrial: 1243.51, residencial_multifamiliar: 2337.32, residencial_unifamiliar: 2799.57, edificio_garagens: 2660.91 },
  MA: { casa_popular: 1291.20, comercial_salas_lojas: 2256.72, conjunto_habitacional_popular: 1291.20, galpao_industrial: 1076.84, residencial_multifamiliar: 2209.94, residencial_unifamiliar: 2310.36, edificio_garagens: 2256.72 },
  MG: { casa_popular: 1697.82, comercial_salas_lojas: 2942.85, conjunto_habitacional_popular: 1697.82, galpao_industrial: 1294.61, residencial_multifamiliar: 2621.01, residencial_unifamiliar: 3021.18, edificio_garagens: 2942.85 },
  MS: { casa_popular: 1271.56, comercial_salas_lojas: 2307.24, conjunto_habitacional_popular: 1271.56, galpao_industrial: 1040.06, residencial_multifamiliar: 1856.28, residencial_unifamiliar: 2216.19, edificio_garagens: 2307.24 },
  MT: { casa_popular: 2186.14, comercial_salas_lojas: 3893.08, conjunto_habitacional_popular: 2186.14, galpao_industrial: 1711.99, residencial_multifamiliar: 3425.98, residencial_unifamiliar: 3942.13, edificio_garagens: 3893.08 },
  PA: { casa_popular: 1628.40, comercial_salas_lojas: 2822.51, conjunto_habitacional_popular: 1628.40, galpao_industrial: 1334.75, residencial_multifamiliar: 2506.90, residencial_unifamiliar: 2869.77, edificio_garagens: 2822.51 },
  PB: { casa_popular: 1116.89, comercial_salas_lojas: 2055.82, conjunto_habitacional_popular: 1116.89, galpao_industrial: 944.87, residencial_multifamiliar: 1828.89, residencial_unifamiliar: 2063.83, edificio_garagens: 2055.82 },
  PE: { casa_popular: 1527.79, comercial_salas_lojas: 2613.55, conjunto_habitacional_popular: 1527.79, galpao_industrial: 1196.04, residencial_multifamiliar: 2302.97, residencial_unifamiliar: 2753.74, edificio_garagens: 2613.55 },
  PI: { casa_popular: 1291.20, comercial_salas_lojas: 2256.72, conjunto_habitacional_popular: 1291.20, galpao_industrial: 1076.84, residencial_multifamiliar: 1992.49, residencial_unifamiliar: 2310.36, edificio_garagens: 2256.72 },
  PR: { casa_popular: 1797.56, comercial_salas_lojas: 3200.16, conjunto_habitacional_popular: 1797.56, galpao_industrial: 1434.36, residencial_multifamiliar: 2798.60, residencial_unifamiliar: 3285.63, edificio_garagens: 3200.16 },
  RJ: { casa_popular: 1703.57, comercial_salas_lojas: 2986.99, conjunto_habitacional_popular: 1703.57, galpao_industrial: 1356.28, residencial_multifamiliar: 2626.15, residencial_unifamiliar: 3050.58, edificio_garagens: 2986.99 },
  RN: { casa_popular: 1505.99, comercial_salas_lojas: 2491.63, conjunto_habitacional_popular: 1505.99, galpao_industrial: 1197.84, residencial_multifamiliar: 2239.04, residencial_unifamiliar: 2607.99, edificio_garagens: 2491.63 },
  RO: { casa_popular: 1710.72, comercial_salas_lojas: 2995.23, conjunto_habitacional_popular: 1710.72, galpao_industrial: 1335.49, residencial_multifamiliar: 2648.29, residencial_unifamiliar: 2910.32, edificio_garagens: 2995.23 },
  RR: { casa_popular: 1882.25, comercial_salas_lojas: 3537.22, conjunto_habitacional_popular: 1882.25, galpao_industrial: 1695.52, residencial_multifamiliar: 3104.74, residencial_unifamiliar: 3622.43, edificio_garagens: 3537.22 },
  RS: { casa_popular: 1824.49, comercial_salas_lojas: 3580.65, conjunto_habitacional_popular: 1824.49, galpao_industrial: 1389.37, residencial_multifamiliar: 3019.43, residencial_unifamiliar: 3410.64, edificio_garagens: 3580.65 },
  SC: { casa_popular: 1962.44, comercial_salas_lojas: 3355.23, conjunto_habitacional_popular: 1962.44, galpao_industrial: 1552.11, residencial_multifamiliar: 2919.91, residencial_unifamiliar: 3441.12, edificio_garagens: 3355.23 },
  SE: { casa_popular: 1373.83, comercial_salas_lojas: 2543.34, conjunto_habitacional_popular: 1373.83, galpao_industrial: 1169.38, residencial_multifamiliar: 2270.89, residencial_unifamiliar: 2506.98, edificio_garagens: 2543.34 },
  SP: { casa_popular: 1492.42, comercial_salas_lojas: 2642.22, conjunto_habitacional_popular: 1492.42, galpao_industrial: 1244.80, residencial_multifamiliar: 2321.06, residencial_unifamiliar: 2661.22, edificio_garagens: 2642.22 },
  TO: { casa_popular: 1493.49, comercial_salas_lojas: 2660.91, conjunto_habitacional_popular: 1493.49, galpao_industrial: 1243.51, residencial_multifamiliar: 2337.32, residencial_unifamiliar: 2799.57, edificio_garagens: 2660.91 },
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
