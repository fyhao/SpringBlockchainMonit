import React, { createContext, useContext, useMemo, useState } from 'react';

export const locales = {
  en: {
    language: 'Language', home: 'Home', logout: 'Logout', subtitle: 'Blockchain monitoring system',
    title: 'Unlock the next generation blockchain experience', description: 'Track token prices in real time',
    getStarted: 'Get Started', name: 'Name', network: 'Network', price: 'Price', loading: 'Loading…',
    visit: 'Visit explorer', back: 'Back'
  },
  'zh-SG': {
    language: '语言', home: '主页', logout: '退出', subtitle: '区块链监控系统',
    title: '开启新一代区块链体验', description: '实时追踪代币价格',
    getStarted: '开始使用', name: '名称', network: '网络', price: '价格', loading: '加载中…',
    visit: '查看区块链浏览器', back: '返回'
  },
  ms: {
    language: 'Bahasa', home: 'Laman utama', logout: 'Log keluar', subtitle: 'Sistem pemantauan rantaian blok',
    title: 'Terokai pengalaman rantaian blok generasi baharu', description: 'Jejaki harga token dalam masa nyata',
    getStarted: 'Mula', name: 'Nama', network: 'Rangkaian', price: 'Harga', loading: 'Memuatkan…',
    visit: 'Buka penjelajah', back: 'Kembali'
  }
};

const localeNames = { en: 'English', 'zh-SG': '中文', ms: 'Bahasa Melayu' };
const I18nContext = createContext({ locale: 'en', setLocale: () => {}, t: key => key });

function initialLocale() {
  const saved = window.localStorage && window.localStorage.getItem('locale');
  if (saved && locales[saved]) return saved;
  const browserLocale = (window.navigator.language || 'en').toLowerCase();
  if (browserLocale.startsWith('zh')) return 'zh-SG';
  if (browserLocale.startsWith('ms')) return 'ms';
  return 'en';
}

export function I18nProvider({ children }) {
  const [locale, updateLocale] = useState(initialLocale);
  const value = useMemo(() => ({
    locale,
    localeNames,
    setLocale: next => {
      if (!locales[next]) return;
      window.localStorage && window.localStorage.setItem('locale', next);
      document.documentElement.lang = next;
      updateLocale(next);
    },
    t: key => locales[locale][key] || locales.en[key] || key
  }), [locale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
