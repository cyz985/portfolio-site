import { createContext, useContext } from 'react'
import { defaultProfile, type Profile } from '../data/profile'
import { defaultProjects, type Project } from '../data/projects'
import { defaultSkills } from '../data/skills'

/** 全站可编辑内容 */
export interface SiteData {
  profile: Profile
  skills: string[]
  projects: Project[]
}

export interface SiteDataContextValue {
  data: SiteData
  /** 保存到内存与浏览器 localStorage */
  save: (next: SiteData) => void
  /** 恢复为默认内容并清除本机保存 */
  reset: () => void
}

const STORAGE_KEY = 'portfolio-site-data:v1'

export const defaultData: SiteData = {
  profile: defaultProfile,
  skills: defaultSkills,
  projects: defaultProjects,
}

/** 读取本机保存的内容，缺失字段时用默认值补齐 */
export function loadData(): SiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultData
    const parsed = JSON.parse(raw) as Partial<SiteData>
    return {
      profile: { ...defaultProfile, ...(parsed.profile ?? {}) },
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaultSkills,
      projects: Array.isArray(parsed.projects) ? parsed.projects : defaultProjects,
    }
  } catch {
    return defaultData
  }
}

export const SITE_DATA_STORAGE_KEY = STORAGE_KEY

export const SiteDataContext = createContext<SiteDataContextValue | null>(null)

/** 在组件中读取可编辑内容 */
export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) throw new Error('useSiteData 必须在 SiteDataProvider 内使用')
  return context
}
