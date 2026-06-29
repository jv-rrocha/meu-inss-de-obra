import { useState, useRef } from 'react'
import { calcularINSS, formatBRL, formatPct } from './calc.js'

const TIPOS_OBRA = [
  { value: 'casa_popular', label: 'Casa Popular' },
  { value: 'comercial_salas_lojas', label: 'Comercial Salas e Lojas' },
  { value: 'conjunto_habitacional_popular', label: 'Conjunto Habitacional Popular' },
  { value: 'edificio_garagens', label: 'Edifício de Garagens' },
  { value: 'galpao_industrial', label: 'Galpão Industrial' },
  { value: 'residencial_multifamiliar', label: 'Residencial Multifamiliar' },
  { value: 'residencial_unifamiliar', label: 'Residencial Unifamiliar' },
]

const ESTADOS = [
  'AC','AL','AM','AP','BA','CE','DF','ES','GO','MA',
  'MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN',
  'RO','RR','RS','SC','SE','SP','TO',
]

const TIPOS_CONSTRUCAO = [
  { value: 'alvenaria', label: 'Alvenaria' },
  { value: 'madeira', label: 'Madeira' },
  { value: 'mista', label: 'Mista' },
]

function BuildingSVG() {
  const S = '#1D6CE8'
  const SB = '#3B82F6'
  const W = '1.5'
  const WT = '1'
  const F = '#080B12'
  return (
    <svg className="building-svg" viewBox="0 0 560 400" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── GROUND LINE ── */}
      <line x1="30" y1="345" x2="530" y2="345" stroke={S} strokeWidth={W}/>

      {/* ══════════════════════════════════════
          LOWER LEFT BLOCK — garage / carport
      ══════════════════════════════════════ */}

      {/* Front face of lower block */}
      <polygon points="60,345 60,230 220,230 220,345" fill={F} stroke={S} strokeWidth={W}/>
      {/* Top face (perspective) */}
      <polygon points="60,230 80,210 240,210 220,230" fill="#060d1a" stroke={S} strokeWidth={W}/>
      {/* Right side face */}
      <polygon points="220,230 240,210 240,345 220,345" fill="#040a14" stroke={S} strokeWidth={WT}/>

      {/* Carport opening — front arch/frame */}
      <polygon points="68,345 68,245 145,245 145,345" fill="#010610" stroke={S} strokeWidth={WT}/>
      {/* Carport inner frame */}
      <polygon points="74,345 74,251 139,251 139,345" fill="none" stroke={SB} strokeWidth="0.8"/>

      {/* Carport top horizontal beam */}
      <line x1="60" y1="245" x2="220" y2="245" stroke={S} strokeWidth={WT}/>
      <line x1="68" y1="245" x2="80" y2="235" stroke={S} strokeWidth={WT}/>

      {/* ══════════════════════════════════════
          UPPER MAIN BLOCK — 2 storey house
      ══════════════════════════════════════ */}

      {/* Front face of main block */}
      <polygon points="200,345 200,130 400,130 400,345" fill={F} stroke={S} strokeWidth={W}/>
      {/* Top face (flat roof perspective) */}
      <polygon points="200,130 222,108 422,108 400,130" fill="#060d1a" stroke={S} strokeWidth={W}/>
      {/* Right side face */}
      <polygon points="400,130 422,108 422,345 400,345" fill="#040a14" stroke={S} strokeWidth={WT}/>

      {/* Floor divider (ground floor / upper floor) */}
      <line x1="200" y1="237" x2="400" y2="237" stroke={S} strokeWidth={WT} opacity="0.7"/>
      <line x1="400" y1="237" x2="422" y2="215" stroke={S} strokeWidth={WT} opacity="0.5"/>

      {/* ══ CANTILEVERED OVERHANG / VARANDA ══ */}
      {/* Slab underside */}
      <polygon points="155,175 200,175 200,195 155,195" fill="#040a14" stroke={S} strokeWidth={WT}/>
      {/* Slab top */}
      <polygon points="155,165 200,165 200,175 155,175" fill="#060d1a" stroke={S} strokeWidth={W}/>
      {/* Slab perspective edge */}
      <polygon points="155,165 172,148 200,148 200,165" fill="#060d1a" stroke={S} strokeWidth={WT}/>
      {/* Slab front edge bright line */}
      <line x1="155" y1="165" x2="200" y2="165" stroke={SB} strokeWidth={W}/>
      {/* Slab connection to main wall */}
      <line x1="200" y1="148" x2="200" y2="175" stroke={S} strokeWidth={WT}/>
      {/* Vertical support column under overhang */}
      <line x1="162" y1="195" x2="162" y2="237" stroke={S} strokeWidth={WT}/>
      <line x1="162" y1="237" x2="200" y2="237" stroke={S} strokeWidth={WT} opacity="0.5"/>

      {/* ══ UPPER FLOOR WINDOWS ══ */}
      {/* Window left upper */}
      <polygon points="212,145 212,195 270,195 270,145" fill="#010918" stroke={S} strokeWidth={WT}/>
      <polygon points="218,151 218,189 264,189 264,151" fill="none" stroke={SB} strokeWidth="0.8"/>
      {/* Window right upper — tall narrow */}
      <polygon points="310,138 310,195 355,195 355,138" fill="#010918" stroke={S} strokeWidth={W}/>
      <polygon points="316,144 316,189 349,189 349,144" fill="none" stroke={SB} strokeWidth="0.8"/>

      {/* ══ LOWER FLOOR ELEMENTS ══ */}
      {/* Door */}
      <polygon points="250,345 250,262 300,262 300,345" fill="#010610" stroke={S} strokeWidth={WT}/>
      <polygon points="255,345 255,267 295,267 295,345" fill="none" stroke={SB} strokeWidth="0.8"/>
      {/* Door handle */}
      <circle cx="258" cy="305" r="2.5" fill="none" stroke={SB} strokeWidth="0.8"/>

      {/* Lower right window */}
      <polygon points="325,248 325,310 385,310 385,248" fill="#010918" stroke={S} strokeWidth={WT}/>
      <polygon points="331,254 331,304 379,304 379,254" fill="none" stroke={SB} strokeWidth="0.8"/>

      {/* ══════════════════════════════════════
          SCAFFOLD — right side
      ══════════════════════════════════════ */}
      {/* Vertical poles */}
      <line x1="422" y1="160" x2="422" y2="345" stroke={S} strokeWidth={W}/>
      <line x1="460" y1="160" x2="460" y2="345" stroke={S} strokeWidth={W}/>
      <line x1="495" y1="190" x2="495" y2="345" stroke={S} strokeWidth={WT}/>
      {/* Horizontal levels */}
      <line x1="420" y1="200" x2="497" y2="200" stroke={S} strokeWidth={W}/>
      <line x1="420" y1="250" x2="497" y2="250" stroke={S} strokeWidth={W}/>
      <line x1="420" y1="300" x2="497" y2="300" stroke={S} strokeWidth={W}/>
      {/* Scaffold plank at top */}
      <rect x="420" y="157" width="77" height="5" fill="#060d1a" stroke={S} strokeWidth={WT}/>
      {/* Cross braces */}
      <line x1="422" y1="200" x2="460" y2="250" stroke={S} strokeWidth="0.8" opacity="0.6"/>
      <line x1="460" y1="200" x2="422" y2="250" stroke={S} strokeWidth="0.8" opacity="0.6"/>
      <line x1="422" y1="250" x2="460" y2="300" stroke={S} strokeWidth="0.8" opacity="0.6"/>
      <line x1="460" y1="250" x2="422" y2="300" stroke={S} strokeWidth="0.8" opacity="0.6"/>

      {/* ══ DASHED CONSTRUCTION LINES ══ */}
      {/* Left dashed pole */}
      <line x1="115" y1="155" x2="115" y2="210" stroke={S} strokeWidth={WT} strokeDasharray="5 4"/>
      {/* Center dashed pole */}
      <line x1="290" y1="60" x2="290" y2="108" stroke={S} strokeWidth={WT} strokeDasharray="5 4"/>
    </svg>
  )
}

function Accordion({ children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="accordion">
      <button className="accordion-trigger" onClick={() => setOpen(!open)}>
        Detalhamento do cálculo
        <svg className={`accordion-icon ${open ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  )
}

export default function App() {
  const calcRef = useRef(null)
  const resultRef = useRef(null)

  const [form, setForm] = useState({ area: '', tipoObra: '', uf: '', tipoConstrucao: '' })
  const [errors, setErrors] = useState({})
  const [resultado, setResultado] = useState(null)

  const scrollToCalc = () => calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.area || isNaN(Number(form.area)) || Number(form.area) <= 0)
      errs.area = 'Informe a área válida'
    if (!form.tipoObra) errs.tipoObra = 'Selecione o tipo de obra'
    if (!form.uf) errs.uf = 'Selecione o estado'
    if (!form.tipoConstrucao) errs.tipoConstrucao = 'Selecione o tipo de construção'
    return errs
  }

  const handleCalcular = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    const r = calcularINSS({
      area: Number(form.area),
      tipoObra: form.tipoObra,
      uf: form.uf,
      tipoConstrucao: form.tipoConstrucao,
    })
    setResultado(r)
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  const economia = resultado ? resultado.inss * 0.70 : 0

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <a href="/" className="navbar-brand">
          <div className="brand-icon">🏗️</div>
          Meu <span style={{ color: 'var(--blue-light)', marginLeft: '4px' }}>INSS</span> de Obra
        </a>
        <button className="btn-nav" onClick={scrollToCalc}>Calcular agora</button>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Calculadora INSS</span>
          <h1>
            Quanto você vai pagar de <span className="accent">INSS</span> ao encerrar sua obra?
          </h1>
          <p>Descubra o valor em segundos. Construtor, esta ferramenta é para você.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToCalc}>Calcule já</button>
            <a href="#como-funciona" className="btn-ghost">Como funciona</a>
          </div>
        </div>
        <div className="hero-visual">
          <BuildingSVG />
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section className="section" ref={calcRef} id="calculadora">
        <div className="calc-card">
          <h2>Calculadora de INSS de Obra</h2>
          <p className="calc-desc">Preencha os dados abaixo para estimar o INSS a ser pago no encerramento do seu CNO.</p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="area">Área construída (m²)</label>
              <input
                id="area"
                name="area"
                type="number"
                placeholder="Ex: 150"
                value={form.area}
                onChange={handleChange}
                className={errors.area ? 'error' : ''}
                min="1"
              />
              {errors.area && <span className="error-msg">{errors.area}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tipoObra">Tipo de obra</label>
              <select
                id="tipoObra"
                name="tipoObra"
                value={form.tipoObra}
                onChange={handleChange}
                className={errors.tipoObra ? 'error' : ''}
              >
                <option value="">Selecione...</option>
                {TIPOS_OBRA.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              {errors.tipoObra && <span className="error-msg">{errors.tipoObra}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="uf">Estado (UF) da obra</label>
              <select
                id="uf"
                name="uf"
                value={form.uf}
                onChange={handleChange}
                className={errors.uf ? 'error' : ''}
              >
                <option value="">Selecione o estado...</option>
                {ESTADOS.map(uf => (
                  <option key={uf} value={uf}>{uf}</option>
                ))}
              </select>
              {errors.uf && <span className="error-msg">{errors.uf}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tipoConstrucao">Tipo de construção</label>
              <select
                id="tipoConstrucao"
                name="tipoConstrucao"
                value={form.tipoConstrucao}
                onChange={handleChange}
                className={errors.tipoConstrucao ? 'error' : ''}
              >
                <option value="">Selecione...</option>
                {TIPOS_CONSTRUCAO.map(t => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
              {errors.tipoConstrucao && <span className="error-msg">{errors.tipoConstrucao}</span>}
            </div>
          </div>

          <button className="btn-calcular" onClick={handleCalcular}>
            Calcular meu INSS de Obra
          </button>

          {/* ── RESULTADO ── */}
          {resultado && (
            <div className="result-section" ref={resultRef}>
              <div className="result-card">
                <div className="result-label">Painel de Obra · Resultado</div>
                <div className="result-sublabel">INSS estimado a recolher no encerramento do CNO</div>
                <div className="result-value">{formatBRL(resultado.inss)}</div>

                <Accordion>
                  <div className="detail-row">
                    <span>Percentual de Equivalência</span>
                    <span>{formatPct(resultado.percEquiv)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Área de Equivalência</span>
                    <span>{resultado.areaEquivalente.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²</span>
                  </div>
                  <div className="detail-row">
                    <span>VAU (R$/m²)</span>
                    <span>{formatBRL(resultado.vau)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Custo da Obra por Destinação</span>
                    <span>{formatBRL(resultado.custoObra)}</span>
                  </div>
                  <div className="detail-row">
                    <span>% Concreto Usinado</span>
                    <span>{formatPct(resultado.percConcreto)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Remun. por Concreto Usinado</span>
                    <span>{formatBRL(resultado.remunConcreto)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Fator Social</span>
                    <span>{formatPct(resultado.fatorSocial)}</span>
                  </div>
                  <div className="detail-row">
                    <span>PMO (% Mão de Obra)</span>
                    <span>{formatPct(resultado.pmo)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Remun. de Mão de Obra Total</span>
                    <span>{formatBRL(resultado.remunMaoDeObra)}</span>
                  </div>
                  <div className="detail-row">
                    <span>Alíquota INSS</span>
                    <span>36,80%</span>
                  </div>
                </Accordion>

                <p className="result-disclaimer">
                  * Valor estimado com base nas tabelas VAU e nas normas da Receita Federal vigentes. O valor real pode variar conforme fiscalização.
                </p>
              </div>

              {/* CTA WhatsApp */}
              <div className="cta-card">
                <div className="cta-headline">
                  <span>↘</span> Você pode diminuir 70% desse valor.
                </div>
                <div className="cta-economia">
                  <div className="cta-economia-label">Economia potencial estimada:</div>
                  <span className="cta-economia-value">{formatBRL(economia)}</span>
                </div>
                <p className="cta-sub">Para saber mais, entre em contato com a nossa equipe.</p>
                <a
                  href="https://wa.me/NUMERO_AQUI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar com a equipe no WhatsApp
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="section" id="como-funciona">
        <h2 className="section-title">Como funciona o INSS de Obra?</h2>
        <p className="section-sub">Entenda o cálculo aplicado pela Receita Federal no encerramento do CNO.</p>
        <div className="how-grid">
          <div className="how-card">
            <span className="how-icon">📋</span>
            <h3>CNO — Cadastro Nacional de Obras</h3>
            <p>Todo imóvel construído por pessoa física deve ter um CNO registrado na Receita Federal. Ao encerrar, o INSS é apurado sobre a mão de obra estimada.</p>
          </div>
          <div className="how-card">
            <span className="how-icon">📐</span>
            <h3>Base de Cálculo Oficial</h3>
            <p>O cálculo usa o VAU (Valor Unitário Avaliado) por estado, o fator social da área construída e o percentual de mão de obra conforme o tipo de construção.</p>
          </div>
          <div className="how-card">
            <span className="how-icon">💰</span>
            <h3>Alíquota de 36,80%</h3>
            <p>O INSS é calculado à alíquota de 36,80% sobre a remuneração de mão de obra apurada. Com planejamento, esse valor pode ser significativamente reduzido.</p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="footer">
          <div>
            <div className="footer-brand">
              <div className="brand-icon" style={{ width: 24, height: 24, fontSize: '0.75rem' }}>🏗️</div>
              Meu INSS de Obra
            </div>
            <div className="footer-tagline">Inteligência tributária para quem constrói.</div>
          </div>
          <p className="footer-disclaimer">
            Este site não substitui consultoria contábil ou jurídica. Os valores apresentados são estimativas baseadas em tabelas oficiais.
          </p>
        </div>
      </footer>
    </>
  )
}
