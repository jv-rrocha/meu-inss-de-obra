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
  AC: { casa_popular: 2134.13, comercial_salas_lojas: 3953.60, conjunto_habitacional_popular: 2134.13, galpao_industrial: 1827.75, residencial_multifamiliar: 3570.12, residencial_unifamiliar: 4223.94, edificio_garagens: 3953.60 },
  AL: { casa_popular: 1356.57, comercial_salas_lojas: 2455.49, conjunto_habitacional_popular: 1356.57, galpao_industrial: 1146.93, residencial_multifamiliar: 2195.22, residencial_unifamiliar: 2547.26, edificio_garagens: 2455.49 },
  AM: { casa_popular: 2134.13, comercial_salas_lojas: 3953.60, conjunto_habitacional_popular: 2134.13, galpao_industrial: 1827.75, residencial_multifamiliar: 3570.12, residencial_unifamiliar: 4223.94, edificio_garagens: 3953.60 },
  AP: { casa_popular: 1894.06, comercial_salas_lojas: 3371.50, conjunto_habitacional_popular: 1894.06, galpao_industrial: 1602.67, residencial_multifamiliar: 2969.79, residencial_unifamiliar: 3362.53, edificio_garagens: 3371.50 },
  BA: { casa_popular: 1481.39, comercial_salas_lojas: 2631.00, conjunto_habitacional_popular: 1481.39, galpao_industrial: 1193.70, residencial_multifamiliar: 2297.19, residencial_unifamiliar: 2740.92, edificio_garagens: 2631.00 },
  CE: { casa_popular: 1688.48, comercial_salas_lojas: 2832.87, conjunto_habitacional_popular: 1688.48, galpao_industrial: 1342.03, residencial_multifamiliar: 2488.81, residencial_unifamiliar: 2860.01, edificio_garagens: 2832.87 },
  DF: { casa_popular: 1581.75, comercial_salas_lojas: 2867.33, conjunto_habitacional_popular: 1581.75, galpao_industrial: 1282.43, residencial_multifamiliar: 2505.54, residencial_unifamiliar: 2891.53, edificio_garagens: 2867.33 },
  ES: { casa_popular: 1908.33, comercial_salas_lojas: 3212.65, conjunto_habitacional_popular: 1908.33, galpao_industrial: 1455.80, residencial_multifamiliar: 2882.98, residencial_unifamiliar: 3388.64, edificio_garagens: 3212.65 },
  GO: { casa_popular: 1511.71, comercial_salas_lojas: 2693.37, conjunto_habitacional_popular: 1511.71, galpao_industrial: 1258.68, residencial_multifamiliar: 2365.84, residencial_unifamiliar: 2833.72, edificio_garagens: 2693.37 },
  MA: { casa_popular: 1306.95, comercial_salas_lojas: 2284.25, conjunto_habitacional_popular: 1306.95, galpao_industrial: 1089.98, residencial_multifamiliar: 2236.90, residencial_unifamiliar: 2338.55, edificio_garagens: 2284.25 },
  MG: { casa_popular: 1718.53, comercial_salas_lojas: 2978.75, conjunto_habitacional_popular: 1718.53, galpao_industrial: 1310.40, residencial_multifamiliar: 2652.99, residencial_unifamiliar: 3058.04, edificio_garagens: 2978.75 },
  MS: { casa_popular: 1287.07, comercial_salas_lojas: 2335.39, conjunto_habitacional_popular: 1287.07, galpao_industrial: 1052.75, residencial_multifamiliar: 1878.93, residencial_unifamiliar: 2243.23, edificio_garagens: 2335.39 },
  MT: { casa_popular: 2212.81, comercial_salas_lojas: 3940.58, conjunto_habitacional_popular: 2212.81, galpao_industrial: 1732.88, residencial_multifamiliar: 3467.78, residencial_unifamiliar: 3990.22, edificio_garagens: 3940.58 },
  PA: { casa_popular: 1648.27, comercial_salas_lojas: 2856.94, conjunto_habitacional_popular: 1648.27, galpao_industrial: 1351.03, residencial_multifamiliar: 2537.48, residencial_unifamiliar: 2904.78, edificio_garagens: 2856.94 },
  PB: { casa_popular: 1130.52, comercial_salas_lojas: 2080.90, conjunto_habitacional_popular: 1130.52, galpao_industrial: 956.40, residencial_multifamiliar: 1851.20, residencial_unifamiliar: 2089.01, edificio_garagens: 2080.90 },
  PE: { casa_popular: 1546.43, comercial_salas_lojas: 2645.44, conjunto_habitacional_popular: 1546.43, galpao_industrial: 1210.63, residencial_multifamiliar: 2331.07, residencial_unifamiliar: 2787.34, edificio_garagens: 2645.44 },
  PI: { casa_popular: 1306.95, comercial_salas_lojas: 2284.25, conjunto_habitacional_popular: 1306.95, galpao_industrial: 1089.98, residencial_multifamiliar: 2016.80, residencial_unifamiliar: 2338.55, edificio_garagens: 2284.25 },
  PR: { casa_popular: 1819.49, comercial_salas_lojas: 3239.20, conjunto_habitacional_popular: 1819.49, galpao_industrial: 1451.86, residencial_multifamiliar: 2832.74, residencial_unifamiliar: 3325.71, edificio_garagens: 3239.20 },
  RJ: { casa_popular: 1724.35, comercial_salas_lojas: 3023.43, conjunto_habitacional_popular: 1724.35, galpao_industrial: 1372.83, residencial_multifamiliar: 2658.19, residencial_unifamiliar: 3087.80, edificio_garagens: 3023.43 },
  RN: { casa_popular: 1524.36, comercial_salas_lojas: 2522.03, conjunto_habitacional_popular: 1524.36, galpao_industrial: 1212.45, residencial_multifamiliar: 2266.36, residencial_unifamiliar: 2639.81, edificio_garagens: 2522.03 },
  RO: { casa_popular: 1731.59, comercial_salas_lojas: 3031.77, conjunto_habitacional_popular: 1731.59, galpao_industrial: 1351.78, residencial_multifamiliar: 2680.60, residencial_unifamiliar: 2945.83, edificio_garagens: 3031.77 },
  RR: { casa_popular: 1905.21, comercial_salas_lojas: 3580.37, conjunto_habitacional_popular: 1905.21, galpao_industrial: 1716.21, residencial_multifamiliar: 3142.62, residencial_unifamiliar: 3666.62, edificio_garagens: 3580.37 },
  RS: { casa_popular: 1846.75, comercial_salas_lojas: 3624.33, conjunto_habitacional_popular: 1846.75, galpao_industrial: 1406.32, residencial_multifamiliar: 3056.27, residencial_unifamiliar: 3452.25, edificio_garagens: 3624.33 },
  SC: { casa_popular: 1986.38, comercial_salas_lojas: 3396.16, conjunto_habitacional_popular: 1986.38, galpao_industrial: 1571.05, residencial_multifamiliar: 2955.53, residencial_unifamiliar: 3483.10, edificio_garagens: 3396.16 },
  SE: { casa_popular: 1390.59, comercial_salas_lojas: 2574.37, conjunto_habitacional_popular: 1390.59, galpao_industrial: 1183.65, residencial_multifamiliar: 2298.59, residencial_unifamiliar: 2537.57, edificio_garagens: 2574.37 },
  SP: { casa_popular: 1510.63, comercial_salas_lojas: 2674.46, conjunto_habitacional_popular: 1510.63, galpao_industrial: 1259.99, residencial_multifamiliar: 2349.38, residencial_unifamiliar: 2693.69, edificio_garagens: 2674.46 },
  TO: { casa_popular: 1511.71, comercial_salas_lojas: 2693.37, conjunto_habitacional_popular: 1511.71, galpao_industrial: 1258.68, residencial_multifamiliar: 2365.84, residencial_unifamiliar: 2833.72, edificio_garagens: 2693.37 },
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
