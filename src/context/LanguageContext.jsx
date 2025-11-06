import React, { createContext, useContext, useEffect, useState } from 'react'

// Simple translations object
const labels = {
  en: {
    nav: {
      dashboard: 'Dashboard',
      riskMap: 'Risk Map',
      alerts: 'Alerts',
      symptoms: 'Symptom Checker',
      education: 'Education',
      guidance: 'Guidance',
      clinics: 'Clinics',
      youth: 'Youth',
      subscribe: 'Subscribe',
      admin: 'Admin'
    }
  },
  sw: {
    nav: {
      dashboard: 'Dashibodi',
      riskMap: 'Ramani ya Hatari',
      alerts: 'Tahadhari',
      symptoms: 'Kichanganuzi cha Dalili',
      education: 'Elimu',
      guidance: 'Mwongozo',
      clinics: 'Vituo',
      youth: 'Vijana',
      subscribe: 'Jiandikishe',
      admin: 'Usimamizi'
    }
  },
  fr: {
    nav: {
      dashboard: 'Tableau de bord',
      riskMap: 'Carte des risques',
      alerts: 'Alertes',
      symptoms: 'Analyse des symptômes',
      education: 'Éducation',
      guidance: 'Conseils',
      clinics: 'Cliniques',
      youth: 'Jeunesse',
      subscribe: "S'abonner",
      admin: 'Admin'
    }
  }
}

const defaultLang = localStorage.getItem('climhealth_lang') || 'en'
const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLang)

  // Safe translation function
  const t = (key) => {
    try {
      const keys = key.split('.')
      let value = labels[lang]
      
      for (const k of keys) {
        value = value?.[k]
      }
      
      // Fallback to English if translation not found
      if (!value) {
        let enValue = labels.en
        for (const k of keys) {
          enValue = enValue?.[k]
        }
        return enValue || key
      }
      
      return value
    } catch (error) {
      return key
    }
  }

  useEffect(() => {
    localStorage.setItem('climhealth_lang', lang)
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider')
  }
  return context
}