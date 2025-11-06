import { useEffect, useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'
import { listAlerts, DISTRICT_COORDS } from '../services/api'

const DISTRICTS = Object.keys(DISTRICT_COORDS)

function composeMessage(a, lang){
  const outcomes = a.outcomes.join(', ')
  if (lang === 'sw'){
    return `TAHADHARI YA AFYA – ${a.district}
${a.hazard} inatarajiwa ndani ya siku ${a.lead}. Madhara yanayoweza kutokea: ${outcomes}.
Chukua tahadhari: Tumia chandarua, chemsha maji, na ondoa maji yaliyotuama.`;
  } else if (lang === 'fr'){
    return `ALERTE SANTÉ – ${a.district}
${a.hazard} prévue dans ${a.lead} jour(s). Risques possibles: ${outcomes}.
Mesures: Utiliser des moustiquaires, faire bouillir l’eau, éviter les eaux stagnantes.`;
  } else {
    return `HEALTH ALERT – ${a.district}
${a.hazard} expected in ${a.lead} day(s). Possible outcomes: ${outcomes}.
Take action: Use treated bed nets, boil water, and clear standing water.`;
  }
}

export default function Alerts(){
  const { lang } = useLang()
  const t = labels[lang]
  const [district, setDistrict] = useState('Morogoro')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true)
    const res = await listAlerts(district).catch(()=>[])
    setItems(res); setLoading(false)
  }
  useEffect(()=>{ load() }, [])

  return (
    <div className="container">
      <div className="card">
        <h2>{t.alertsTitle}</h2>
        <div style={{display:'flex',gap:8,alignItems:'end',flexWrap:'wrap'}}>
          <div>
            <label>{t.district}</label>
            <select className="input" value={district} onChange={e=>setDistrict(e.target.value)}>
              {DISTRICTS.map(d=> <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button className="button" onClick={load}>Refresh</button>
        </div>
        <div className="legend">
          <span className="item"><span className="box b-high"></span> {t.high}</span>
          <span className="item"><span className="box b-med"></span> {t.med}</span>
          <span className="item"><span className="box b-low"></span> {t.low}</span>
        </div>
      </div>

      {loading ? <div className="card">{t.loading}</div> :
        items.length === 0 ? <div className="card">{t.noAlerts}</div> :
        items.map(a => {
          const msg = composeMessage(a, lang)
          return (
            <div key={a.id} className="card" style={{borderLeft:`6px solid ${a.severity==='high'?'#EF8401':a.severity==='medium'?'#A0A52A':'#088383'}`}}>
              <b>{a.hazard}</b> • <span>{a.district}</span> • Lead: {a.lead} day(s) • Date: {a.date}
              {a.rain_mm ? <div>{t.rainfall}: {a.rain_mm} mm</div> : null}
              {a.heat_index ? <div>{t.heatIndex}: {a.heat_index} °C</div> : null}
              <div style={{marginTop:8}}>{t.outcomes}: {a.outcomes.join(', ')}</div>
              <div style={{marginTop:8}}>
                <button className="button" onClick={()=>navigator.clipboard.writeText(msg)}>{t.copyAlert}</button>
              </div>
              <pre style={{whiteSpace:'pre-wrap', marginTop:8}}>{msg}</pre>
            </div>
          )
        })
      }
    </div>
  )
}


