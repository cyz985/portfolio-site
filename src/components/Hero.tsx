import { useSiteData } from '../context/siteData'
import ProfileAvatar from './ProfileAvatar'

function Hero() {
  const { data } = useSiteData()
  const { greeting, name, tagline, avatar } = data.profile

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* 顶部柔和渐变光晕装饰 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-128 w-128 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent-from/25 to-accent-to/25 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col-reverse items-center gap-12 px-6 py-24 md:flex-row md:justify-between md:py-32">
        <div className="text-center md:text-left">
          <p className="mb-4 text-sm tracking-[0.3em] text-muted">{greeting}</p>
          <h1 className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-6xl">
            {name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {tagline}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 md:justify-start">
            <a
              href="#projects"
              className="rounded-full bg-gradient-to-r from-accent-from to-accent-to px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-from/25 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              查看项目
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent-from/40 hover:text-accent-from"
            >
              联系我
            </a>
          </div>
        </div>

        {/* 头像：未上传时显示姓名首字占位 */}
        <div className="relative shrink-0">
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-from/40 to-accent-to/40 opacity-70 blur-xl"
          />
          <ProfileAvatar
            src={avatar || undefined}
            name={name}
            className="h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
