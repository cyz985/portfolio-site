import { useState, type ReactNode } from 'react'
import {
  SITE_DATA_STORAGE_KEY,
  SiteDataContext,
  defaultData,
  loadData,
  type SiteData,
} from './siteData'

/** 提供全站可编辑内容，并负责读写 localStorage */
export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(loadData)

  const save = (next: SiteData) => {
    setData(next)
    try {
      localStorage.setItem(SITE_DATA_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // 图片过大导致超出 localStorage 容量时提示用户
      window.alert('保存失败：浏览器本地存储空间不足，请换一张更小的图片后重试。')
    }
  }

  const reset = () => {
    setData(defaultData)
    localStorage.removeItem(SITE_DATA_STORAGE_KEY)
  }

  return (
    <SiteDataContext.Provider value={{ data, save, reset }}>
      {children}
    </SiteDataContext.Provider>
  )
}
