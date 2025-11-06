import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'

export default function Home(){
  const { lang } = useLang()
  const t = labels[lang]
  return (
    <div>
      <div className="hero">
        <div className="container">
          <span className="tag">Tanzania • Pilot</span>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroDesc}</p>
        </div>
      </div>
      <div className="container">
        <div className="cards-xl">
          <Link className="card-xl" to="/alerts"><h3>🛰️ {t.nav.alerts}</h3><p>{t.homeCards.alertsDesc}</p><div className="cta"><span className="button warn">Open</span></div></Link>
          <Link className="card-xl" to="/symptoms"><h3>🤖 {t.nav.symptoms}</h3><p>{t.homeCards.symptomsDesc}</p><div className="cta"><span className="button">Open</span></div></Link>
          <Link className="card-xl" to="/education"><h3>🎓 {t.nav.education}</h3><p>{t.homeCards.educationDesc}</p><div className="cta"><span className="button">Open</span></div></Link>
          <Link className="card-xl" to="/guidance"><h3>💬 {t.nav.guidance}</h3><p>{t.homeCards.guidanceDesc}</p><div className="cta"><span className="button">Open</span></div></Link>
          <Link className="card-xl" to="/clinics"><h3>🏥 {t.nav.clinics}</h3><p>{t.homeCards.clinicsDesc}</p><div className="cta"><span className="button">Open</span></div></Link>
          <Link className="card-xl" to="/admin"><h3>🛠️ {t.nav.admin}</h3><p>{t.homeCards.adminDesc}</p><div className="cta"><span className="button">Open</span></div></Link>
        </div>
      </div>
    </div>
  )
}
