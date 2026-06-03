import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import exchangeRatesJson from './data/exchange-rates.json'
import { AppHeader } from './components/AppHeader'
import { Footer } from './components/Footer'
import { AboutPage } from './pages/AboutPage'
import { ContributePage } from './pages/ContributePage'
import { FaqPage } from './pages/FaqPage'
import { HomePage } from './pages/HomePage'
import { RegionPage } from './pages/RegionPage'
import type { ExchangeRateDataset, Language } from './types/price'

const exchangeRates = exchangeRatesJson as ExchangeRateDataset

function App() {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = window.localStorage.getItem('gptprice-language')
    return stored === 'en' ? 'en' : 'zh'
  })
  const [currency, setCurrency] = useState(() => {
    return window.localStorage.getItem('gptprice-currency') ?? exchangeRates.baseCurrency
  })

  const currencies = useMemo(() => Object.keys(exchangeRates.rates), [])

  useEffect(() => {
    window.localStorage.setItem('gptprice-language', language)
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  useEffect(() => {
    window.localStorage.setItem('gptprice-currency', currency)
  }, [currency])

  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col bg-[#f7f8fb] text-slate-950">
        <AppHeader
          currencies={currencies}
          currency={currency}
          language={language}
          onCurrencyChange={setCurrency}
          onLanguageChange={setLanguage}
        />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage currency={currency} language={language} />} />
            <Route
              path="/region/:regionCode"
              element={<RegionPage currency={currency} language={language} />}
            />
            <Route path="/contribute" element={<ContributePage language={language} />} />
            <Route path="/faq" element={<FaqPage language={language} />} />
            <Route path="/about" element={<AboutPage language={language} />} />
          </Routes>
        </div>
        <Footer language={language} />
      </div>
    </HashRouter>
  )
}

export default App
