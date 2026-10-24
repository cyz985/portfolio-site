/** 项目数据结构，可在编辑面板中增删改 */
export interface Project {
  /** 唯一标识，用于列表编辑 */
  id: string
  /** 项目名称 */
  name: string
  /** 项目截图（上传后的 data URL），为空时显示渐变占位块 */
  image: string
  /** 简短描述 */
  description: string
  /** 技术栈 */
  techStack: string[]
  /** 项目链接，为空时不展示入口 */
  link: string
}

/** 默认示例数据，可在页面中直接替换成自己的项目 */
export const defaultProjects: Project[] = [
  {
    id: 'nebula',
    name: 'Nebula 电商后台',
    image: '',
    description: '面向中小商家的订单与库存管理后台，支持多店铺数据汇总、批量操作与实时销售看板。',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    link: '',
  },
  {
    id: 'flownote',
    name: 'FlowNote 协作文档',
    image: '',
    description: '支持多人实时协作的在线文档工具，提供光标同步、版本历史与 Markdown 快捷输入。',
    techStack: ['React', 'Vite', 'WebSocket', 'PostgreSQL'],
    link: '',
  },
  {
    id: 'pulse',
    name: 'Pulse 数据看板',
    image: '',
    description: '实时业务指标看板，聚合多数据源并以可交互图表呈现，支持自定义指标与告警阈值。',
    techStack: ['React', 'D3.js', 'Tailwind CSS'],
    link: '',
  },
]
