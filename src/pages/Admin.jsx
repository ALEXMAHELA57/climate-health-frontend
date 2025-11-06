import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'

export default function Admin(){
  const { lang } = useLang()
  return (
    <div className="container">
      <div className="card">
        <h2>{labels[lang].admin.title}</h2>
        <ul>
          <li>Manage content & lessons</li>
          <li>Export data/reports</li>
          <li>User roles & access</li>
        </ul>
      </div>
    </div>
  )
}
