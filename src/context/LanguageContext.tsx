import { createContext, useContext, useState, type ReactNode } from 'react'
import t, { type Lang, type TKey } from '../i18n/translations'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  tr: (key: TKey) => string
}

const LanguageContext = createContext<LangCtx>({
  lang: 'fr',
  setLang: () => {},
  tr: (k) => k,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'fr'
  })

  const handleSetLang = (l: Lang) => {
    setLang(l)
    localStorage.setItem('lang', l)
  }

  const tr = (key: TKey): string => t[lang][key] as string

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, tr }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
