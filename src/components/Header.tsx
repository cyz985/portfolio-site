import { useSiteData } from '../context/siteData'

/** 顶部导航栏，提供各区块的锚点跳转 */
const navItems = [
  { label: '关于我', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '联系方式', href: '#contact' },
]

function Header() {
  const { data } = useSiteData()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="bg-gradient-to-r from-accent-from to-accent-to bg-clip-text text-lg font-bold text-transparent"
        >
          {data.profile.name}
        </a>
        <ul className="flex gap-6 text-sm text-muted">
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
