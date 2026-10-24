import { useSiteData } from '../context/siteData'

function About() {
  const { data } = useSiteData()

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <p className="mb-3 text-sm tracking-[0.3em] text-muted">关于我</p>
      <h2 className="text-2xl font-bold sm:text-3xl">我的一点介绍</h2>

      <div className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <p className="whitespace-pre-line leading-relaxed text-muted">{data.profile.about}</p>

        <div>
          <h3 className="text-sm font-semibold">技能</h3>
          {data.skills.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-muted">
              还没有技能标签，点击右下角「编辑资料」添加。
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default About
