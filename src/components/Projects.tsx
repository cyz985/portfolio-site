import { useSiteData } from '../context/siteData'

function Projects() {
  const { data } = useSiteData()

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="mb-3 text-sm tracking-[0.3em] text-muted">作品集</p>
        <h2 className="text-2xl font-bold sm:text-3xl">项目展示</h2>
        <p className="mt-4 leading-relaxed text-muted">
          这里是我近期参与和独立完成的一些项目，点击右下角「编辑资料」即可替换成你自己的作品。
        </p>
      </div>

      {data.projects.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center text-sm text-muted">
          还没有项目，点击右下角「编辑资料」添加。
        </p>
      ) : (
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <li key={project.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                {/* 项目截图；未上传时显示渐变占位块 */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.name} 项目截图`}
                    width={640}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-accent-from/15 to-accent-to/15 text-3xl font-bold text-accent-from"
                  >
                    {project.name.trim().charAt(0) || '项'}
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="text-sm leading-relaxed text-muted">{project.description}</p>

                  {/* 技术栈标签 */}
                  <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-sm font-medium text-transparent"
                    >
                      查看项目
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Projects
