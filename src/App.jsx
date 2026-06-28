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
  return (
    <svg className="building-svg" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <radialGradient id="win-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#1D6CE8" stopOpacity="0.2"/>
        </radialGradient>
        <radialGradient id="win-dark" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0a0f1e" stopOpacity="1"/>
          <stop offset="100%" stopColor="#1D6CE8" stopOpacity="0.15"/>
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="500" height="500" fill="#080B12"/>

      {/* Left scaffolding column */}
      <rect x="52" y="60" width="4" height="390" fill="none" stroke="#1D6CE8" strokeWidth="1.5" filter="url(#glow-soft)"/>
      {/* Scaffolding horizontal bars */}
      {[100, 190, 280, 370].map((y, i) => (
        <line key={i} x1="52" y1={y} x2="118" y2={y} stroke="#1D6CE8" strokeWidth="1" filter="url(#glow-soft)"/>
      ))}

      {/* Main building body */}
      <rect x="118" y="60" width="300" height="390" fill="#080d1a" stroke="#1D6CE8" strokeWidth="2" filter="url(#glow-blue)"/>

      {/* Left annex */}
      <rect x="52" y="60" width="66" height="390" fill="#06090f" stroke="#1D6CE8" strokeWidth="1.5" filter="url(#glow-soft)"/>

      {/* Horizontal floor dividers */}
      {[150, 240, 330].map((y, i) => (
        <line key={i} x1="52" y1={y} x2="418" y2={y} stroke="#1D6CE8" strokeWidth="1" opacity="0.6"/>
      ))}

      {/* Crane tower */}
      <rect x="390" y="20" width="6" height="200" fill="none" stroke="#1D6CE8" strokeWidth="2" filter="url(#glow-soft)"/>
      {/* Crane arm */}
      <line x1="230" y1="30" x2="430" y2="30" stroke="#1D6CE8" strokeWidth="2.5" filter="url(#glow-blue)"/>
      {/* Crane diagonal cable */}
      <line x1="393" y1="30" x2="300" y2="70" stroke="#1D6CE8" strokeWidth="1.5" opacity="0.7"/>
      <line x1="393" y1="30" x2="430" y2="70" stroke="#1D6CE8" strokeWidth="1.5" opacity="0.7"/>
      {/* Crane hook cable */}
      <line x1="260" y1="30" x2="260" y2="75" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 3"/>

      {/* WINDOWS — Row 1 (top, lit) */}
      <rect x="148" y="75" width="65" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>
      <rect x="233" y="75" width="65" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>
      <rect x="318" y="75" width="75" height="55" fill="url(#win-dark)" stroke="#1D6CE8" strokeWidth="1.5"/>

      {/* WINDOWS — Row 2 */}
      <rect x="148" y="165" width="65" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>
      <rect x="233" y="165" width="65" height="55" fill="url(#win-dark)" stroke="#1D6CE8" strokeWidth="1.5"/>
      <rect x="318" y="165" width="75" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>

      {/* WINDOWS — Row 3 */}
      <rect x="148" y="255" width="65" height="55" fill="url(#win-dark)" stroke="#1D6CE8" strokeWidth="1.5"/>
      <rect x="233" y="255" width="65" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>
      <rect x="318" y="255" width="75" height="55" fill="url(#win-dark)" stroke="#1D6CE8" strokeWidth="1.5"/>

      {/* WINDOWS — Row 4 (bottom) */}
      <rect x="148" y="345" width="65" height="55" fill="url(#win-dark)" stroke="#1D6CE8" strokeWidth="1.5"/>
      {/* Door center */}
      <rect x="233" y="355" width="65" height="95" fill="#040710" stroke="#1D6CE8" strokeWidth="1.5"/>
      <rect x="318" y="345" width="75" height="55" fill="url(#win-glow)" stroke="#3B82F6" strokeWidth="1.5" filter="url(#glow-soft)"/>

      {/* Foundation / ground line */}
      <line x1="30" y1="450" x2="470" y2="450" stroke="#1D6CE8" strokeWidth="2" filter="url(#glow-soft)"/>

      {/* Left annex windows (small) */}
      {[85, 165, 255, 345].map((y, i) => (
        <rect key={i} x="68" y={y} width="30" height="40" fill={i % 2 === 0 ? 'url(#win-glow)' : 'url(#win-dark)'} stroke="#1D6CE8" strokeWidth="1" filter={i % 2 === 0 ? 'url(#glow-soft)' : undefined}/>
      ))}
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
