import { useState } from 'react'
import { checkSymptoms } from '../services/api'
import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'

export default function SymptomChecker(){
  const { lang } = useLang()
  const t = labels[lang].symptomChecker
  const [symptomsText, setSymptomsText] = useState(lang==='sw' ? 'homa, kuharisha' : (lang==='fr' ? 'fièvre, diarrhée' : 'fever, diarrhea'))
  const [location, setLocation] = useState('Dar es Salaam')
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(false)

  const commonMap = {
    sw: ['homa (fever)','maumivu ya kichwa (headache)','kuharisha (diarrhea)','kichefuchefu (nausea)','upele (rash)','kupumua kwa shida (breathlessness)'],
    en: ['fever','headache','diarrhea','nausea','rash','breathlessness'],
    fr: ['fièvre','céphalée','diarrhée','nausée','éruption','essoufflement']
  }
  const common = commonMap[lang] || commonMap.en

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    const list = symptomsText.split(',').map(s=>s.trim()).filter(Boolean)
    const r = await checkSymptoms({ language: lang, symptoms: list, location }).catch(()=>null)
    setResp(r); setLoading(false)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>{t.title}</h2>
        <p>{t.hint}</p>

        <div className="quiz-q">
          <b>{t.common}</b>
          <div className="toolbar">
            {common.map(s => (
              <button key={s} type="button" className="button"
                onClick={()=>setSymptomsText(prev => prev ? `${prev}, ${s}` : s)}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={submit}>
          <label>{t.labelSymptoms}</label>
          <textarea className="input" rows={3}
            value={symptomsText} onChange={e=>setSymptomsText(e.target.value)} />
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <div style={{flex:1}}>
              <label>{t.labelLocation}</label>
              <input className="input" value={location} onChange={e=>setLocation(e.target.value)} />
            </div>
          </div>
          <button className="button" style={{marginTop:12}} disabled={loading}>
            {loading ? t.checking : t.check}
          </button>
        </form>
      </div>

      {resp && (
        <div className="card" style={{marginTop:16}}>
          <h3>{t.result}</h3>
          <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(resp, null, 2)}</pre>
          <p style={{marginTop:8}}><i>{t.note}</i></p>
        </div>
      )}
    </div>
  )
}
