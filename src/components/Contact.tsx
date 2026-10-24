import { useSiteData } from '../context/siteData'

function Contact() {
  const { data } = useSiteData()
  const { email, github } = data.profile
  const hasContact = Boolean(email || github)

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-24">
      <p className="mb-3 text-sm tracking-[0.3em] text-muted">联系方式</p>
      <h2 className="text-2xl font-bold sm:text-3xl">一起聊聊？</h2>
      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
        欢迎通过下面的方式联系我，聊聊合作、技术或者任何有趣的想法。
      </p>

      {hasContact ? (
        <div className="mt-8 flex flex-wrap gap-4">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-accent-from/40 hover:text-accent-from"
            >
              邮箱
              <span className="text-muted">{email}</span>
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-3 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-accent-from/40 hover:text-accent-from"
            >
              GitHub
              <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      ) : (
        <p className="mt-8 text-sm text-muted">
          还没有联系方式，点击右下角「编辑资料」填写邮箱或 GitHub。
        </p>
      )}
    </section>
  )
}

export default Contact
