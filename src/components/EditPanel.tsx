import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useSiteData, type SiteData } from '../context/siteData'
import { defaultProfile, type Profile } from '../data/profile'
import type { Project } from '../data/projects'
import { readImageFile } from '../utils/image'
import ProfileAvatar from './ProfileAvatar'

/** 编辑草稿：技术栈以逗号分隔的字符串编辑，保存时再转成数组 */
interface ProjectDraft extends Omit<Project, 'techStack'> {
  techStack: string
}

interface Draft {
  profile: Profile
  skills: string
  projects: ProjectDraft[]
}

const toDraft = (data: SiteData): Draft => ({
  profile: { ...data.profile },
  skills: data.skills.join(', '),
  projects: data.projects.map((project) => ({ ...project, techStack: project.techStack.join(', ') })),
})

/** 逗号分隔字符串 → 去空去重的标签数组 */
const parseTags = (value: string) =>
  Array.from(new Set(value.split(',').map((item) => item.trim()).filter(Boolean)))

const toSiteData = (draft: Draft): SiteData => ({
  profile: { ...draft.profile, name: draft.profile.name.trim() || defaultProfile.name },
  skills: parseTags(draft.skills),
  projects: draft.projects.map((project) => ({ ...project, techStack: parseTags(project.techStack) })),
})

const labelClass = 'block text-sm font-medium text-foreground'
const inputClass =
  'mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent-from focus:outline-none'
const fileClass =
  'mt-1.5 block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-accent-from hover:file:bg-indigo-100'

function EditPanel() {
  const { data, save, reset } = useSiteData()
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<Draft>(() => toDraft(data))

  // 打开时锁定页面滚动，并支持 Esc 关闭
  useEffect(() => {
    if (!open) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const updateProfile = (patch: Partial<Profile>) => {
    setDraft((current) => ({ ...current, profile: { ...current.profile, ...patch } }))
  }

  /** 打开面板前用已保存内容重置草稿，避免残留上次未保存的修改 */
  const openPanel = () => {
    setDraft(toDraft(data))
    setOpen(true)
  }

  const updateProject = (id: string, patch: Partial<ProjectDraft>) => {
    setDraft((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === id ? { ...project, ...patch } : project,
      ),
    }))
  }

  /** 选择图片 → 压缩 → 写回草稿 */
  const handleImageUpload = async (
    event: ChangeEvent<HTMLInputElement>,
    apply: (dataUrl: string) => void,
  ) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      apply(await readImageFile(file))
    } catch {
      window.alert('图片读取失败，请换一张图片再试。')
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    save(toSiteData(draft))
    setOpen(false)
  }

  const handleReset = () => {
    if (!window.confirm('恢复默认内容会清除本机保存的修改，确定继续吗？')) return
    reset()
    setOpen(false)
  }

  const addProject = () => {
    setDraft((current) => ({
      ...current,
      projects: [
        ...current.projects,
        {
          id: `project-${Date.now()}`,
          name: '新项目',
          image: '',
          description: '',
          techStack: '',
          link: '',
        },
      ],
    }))
  }

  const removeProject = (id: string) => {
    setDraft((current) => ({
      ...current,
      projects: current.projects.filter((project) => project.id !== id),
    }))
  }

  return (
    <>
      <button
        type="button"
        onClick={openPanel}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-to-r from-accent-from to-accent-to px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-from/30 transition hover:-translate-y-0.5 hover:shadow-xl"
      >
        编辑资料
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            aria-label="关闭编辑面板"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-foreground/40 backdrop-blur-sm"
          />

          <form
            role="dialog"
            aria-modal="true"
            aria-label="编辑个人资料"
            onSubmit={handleSubmit}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-surface p-6 shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">编辑资料</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭编辑面板"
                className="rounded-full px-3 py-1 text-lg text-muted transition hover:bg-background hover:text-foreground"
              >
                ×
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              内容只保存在当前浏览器，不会上传到服务器；换设备或清理浏览器数据后需要重新填写。
            </p>

            {/* 基本信息 */}
            <section className="mt-6 space-y-4">
              <h3 className="text-base font-semibold">基本信息</h3>

              <div className="flex items-center gap-4">
                <ProfileAvatar
                  src={draft.profile.avatar || undefined}
                  name={draft.profile.name}
                  className="h-20 w-20 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <label htmlFor="avatar-upload" className={labelClass}>
                    头像
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageUpload(event, (avatar) => updateProfile({ avatar }))
                    }
                    className={fileClass}
                  />
                  {draft.profile.avatar && (
                    <button
                      type="button"
                      onClick={() => updateProfile({ avatar: '' })}
                      className="mt-1 text-xs text-muted underline-offset-4 hover:text-accent-to hover:underline"
                    >
                      移除头像
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="profile-name" className={labelClass}>
                    姓名
                  </label>
                  <input
                    id="profile-name"
                    value={draft.profile.name}
                    onChange={(event) => updateProfile({ name: event.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="profile-greeting" className={labelClass}>
                    打招呼语
                  </label>
                  <input
                    id="profile-greeting"
                    value={draft.profile.greeting}
                    onChange={(event) => updateProfile({ greeting: event.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="profile-tagline" className={labelClass}>
                  一句话简介（首页展示）
                </label>
                <textarea
                  id="profile-tagline"
                  rows={2}
                  value={draft.profile.tagline}
                  onChange={(event) => updateProfile({ tagline: event.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="profile-about" className={labelClass}>
                  详细介绍（关于我）
                </label>
                <textarea
                  id="profile-about"
                  rows={4}
                  value={draft.profile.about}
                  onChange={(event) => updateProfile({ about: event.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="profile-skills" className={labelClass}>
                  技能（用英文逗号分隔）
                </label>
                <input
                  id="profile-skills"
                  value={draft.skills}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, skills: event.target.value }))
                  }
                  placeholder="React, TypeScript, Tailwind CSS"
                  className={inputClass}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="profile-email" className={labelClass}>
                    邮箱
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    value={draft.profile.email}
                    onChange={(event) => updateProfile({ email: event.target.value })}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="profile-github" className={labelClass}>
                    GitHub 链接
                  </label>
                  <input
                    id="profile-github"
                    type="url"
                    value={draft.profile.github}
                    onChange={(event) => updateProfile({ github: event.target.value })}
                    placeholder="https://github.com/your-name"
                    className={inputClass}
                  />
                </div>
              </div>
            </section>

            {/* 项目 */}
            <section className="mt-8 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold">项目</h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="rounded-full border border-border px-3 py-1.5 text-sm font-medium text-accent-from transition hover:bg-indigo-50"
                >
                  添加项目
                </button>
              </div>

              {draft.projects.length === 0 && (
                <p className="text-sm text-muted">还没有项目，点击「添加项目」创建一个。</p>
              )}

              {draft.projects.map((project, index) => (
                <div
                  key={project.id}
                  className="space-y-3 rounded-2xl border border-border bg-background/60 p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-muted">项目 {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => removeProject(project.id)}
                      className="text-sm text-muted underline-offset-4 hover:text-accent-to hover:underline"
                    >
                      删除
                    </button>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor={`project-name-${project.id}`} className={labelClass}>
                        名称
                      </label>
                      <input
                        id={`project-name-${project.id}`}
                        value={project.name}
                        onChange={(event) => updateProject(project.id, { name: event.target.value })}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor={`project-link-${project.id}`} className={labelClass}>
                        项目链接
                      </label>
                      <input
                        id={`project-link-${project.id}`}
                        type="url"
                        value={project.link}
                        onChange={(event) => updateProject(project.id, { link: event.target.value })}
                        placeholder="https://..."
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor={`project-desc-${project.id}`} className={labelClass}>
                      描述
                    </label>
                    <textarea
                      id={`project-desc-${project.id}`}
                      rows={2}
                      value={project.description}
                      onChange={(event) =>
                        updateProject(project.id, { description: event.target.value })
                      }
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor={`project-tech-${project.id}`} className={labelClass}>
                      技术栈（用英文逗号分隔）
                    </label>
                    <input
                      id={`project-tech-${project.id}`}
                      value={project.techStack}
                      onChange={(event) =>
                        updateProject(project.id, { techStack: event.target.value })
                      }
                      placeholder="React, TypeScript"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor={`project-image-${project.id}`} className={labelClass}>
                      项目截图
                    </label>
                    <div className="mt-1.5 flex items-center gap-3">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt="项目截图预览"
                          className="h-16 w-24 shrink-0 rounded-lg border border-border object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-16 w-24 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-accent-from/15 to-accent-to/15 text-lg font-bold text-accent-from"
                        >
                          {project.name.trim().charAt(0) || '项'}
                        </div>
                      )}
                      <input
                        id={`project-image-${project.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(event) =>
                          handleImageUpload(event, (image) => updateProject(project.id, { image }))
                        }
                        className={fileClass}
                      />
                    </div>
                    {project.image && (
                      <button
                        type="button"
                        onClick={() => updateProject(project.id, { image: '' })}
                        className="mt-1 text-xs text-muted underline-offset-4 hover:text-accent-to hover:underline"
                      >
                        移除截图
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </section>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-accent-from to-accent-to px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-from/25 transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                保存修改
              </button>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-muted transition hover:text-foreground"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="ml-auto text-sm text-muted underline-offset-4 hover:text-accent-to hover:underline"
              >
                恢复默认
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default EditPanel
