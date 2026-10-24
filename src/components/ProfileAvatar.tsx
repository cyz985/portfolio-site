interface ProfileAvatarProps {
  /** 上传的头像 data URL，为空时显示姓名首字 */
  src?: string
  name: string
  /** 尺寸等样式类 */
  className?: string
}

/** 头像：渐变描边圆环，未上传图片时用姓名首字占位 */
function ProfileAvatar({ src, name, className = '' }: ProfileAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '我'

  return (
    <div className={`relative rounded-full bg-gradient-to-tr from-accent-from to-accent-to p-1 ${className}`}>
      {src ? (
        <img
          src={src}
          alt={`${name} 的头像`}
          loading="lazy"
          decoding="async"
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center rounded-full bg-surface text-4xl font-bold text-foreground"
        >
          {initial}
        </div>
      )}
    </div>
  )
}

export default ProfileAvatar
