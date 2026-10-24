import { useSiteData } from '../context/siteData'

/** 在组件外计算年份，避免渲染期间调用不纯函数 */
const currentYear = new Date().getFullYear()

function Footer() {
  const { data } = useSiteData()

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-6 py-8 text-sm text-muted">
        © {currentYear} {data.profile.name}. 保留所有权利。
      </div>
    </footer>
  )
}

export default Footer
