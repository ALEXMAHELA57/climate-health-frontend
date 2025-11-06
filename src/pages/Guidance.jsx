import { useState } from 'react'
import { useLang } from '../context/LanguageContext.jsx'
import { labels } from '../i18n'
import { chatGuidance } from '../services/api'

export default function Guidance() {
  const { lang } = useLang()
  const t = labels[lang].chatbot

  const [messages, setMessages] = useState([
    { sender: 'bot', text: t.welcome }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Grouped topic-based relevance system
  const topics = {
    climate: ['climate', 'weather', 'heat', 'rain', 'flood', 'storm', 'drought', 'temperature', 'humidity'],
    health: ['health', 'disease', 'fever', 'malaria', 'cholera', 'infection', 'mosquito', 'hospital', 'clinic'],
    environment: ['water', 'air', 'pollution', 'hygiene', 'sanitation', 'nutrition', 'waste', 'clean', 'boil']
  }

  function isRelevant(question) {
    const lower = question.toLowerCase()
    return Object.values(topics).flat().some(k => lower.includes(k))
  }

  async function sendMessage(e) {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    const newMsg = { sender: 'me', text: userText }
    setMessages(m => [...m, newMsg])
    setLoading(true)
    setInput('')

    let reply

    if (!isRelevant(userText)) {
      reply =
        lang === 'sw'
          ? 'Samahani, siwezi kujibu maswali yasiyohusiana na afya, mazingira, au mabadiliko ya tabianchi.'
          : lang === 'fr'
          ? "Désolé, je ne peux répondre qu'aux questions liées à la santé, à l'environnement ou au climat."
          : "Sorry, I can only answer questions related to climate, environment, or public health."
    } else {
      const res = await chatGuidance({ message: userText, lang }).catch(() => null)
      reply =
        res?.reply ||
        (lang === 'sw'
          ? 'Samahani, sina jibu kwa sasa. Tafadhali jaribu tena.'
          : lang === 'fr'
          ? "Désolé, je n’ai pas de réponse pour le moment."
          : 'Sorry, I have no answer right now. Please try again.')
    }

    // Simulate typing animation
    setTimeout(() => {
      setMessages(m => [...m, { sender: 'bot', text: reply }])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="container">
      <div className="card">
        <h2>
          {lang === 'sw'
            ? 'Msaidizi wa Afya wa Akili Bandia'
            : lang === 'fr'
            ? 'Assistant Santé IA'
            : 'AI Health Assistant'}
        </h2>

        <div className="chat">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.sender === 'me' ? 'me' : 'bot'}`}>
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="msg bot" style={{ fontStyle: 'italic', opacity: 0.6 }}>
              • • •
            </div>
          )}
        </div>

        <form onSubmit={sendMessage} style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <input
            className="input"
            placeholder={
              lang === 'sw'
                ? 'Andika swali lako kuhusu afya, mazingira, au tabianchi...'
                : lang === 'fr'
                ? 'Posez une question sur la santé, l’environnement ou le climat...'
                : 'Ask about health, environment, or climate...'
            }
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="button" disabled={loading}>
            {loading
              ? lang === 'sw'
                ? 'Inatuma...'
                : lang === 'fr'
                ? 'Envoi...'
                : 'Sending...'
              : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
