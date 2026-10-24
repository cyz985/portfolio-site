/** 个人资料，可在页面右下角「编辑资料」中修改，保存在本机浏览器 */
export interface Profile {
  /** 首页打招呼语，例如「你好，我是」 */
  greeting: string
  /** 姓名 */
  name: string
  /** 首页的一句话简介 */
  tagline: string
  /** 关于我的详细介绍，支持换行 */
  about: string
  /** 头像图片（上传后的 data URL），为空时显示姓名首字占位 */
  avatar: string
  /** 联系邮箱 */
  email: string
  /** GitHub 主页链接 */
  github: string
}

export const defaultProfile: Profile = {
  greeting: '你好，我是',
  name: '你的名字',
  tagline: '在这里写一句话介绍自己，点击右下角「编辑资料」修改后会立即生效。',
  about:
    '在这里写一段更详细的自我介绍，可以聊聊你的职业方向、做过的事情和感兴趣的技术。\n\n点击右下角的「编辑资料」即可修改这段文字、上传自己的照片，并管理下面的项目。',
  avatar: '',
  email: '',
  github: '',
}
