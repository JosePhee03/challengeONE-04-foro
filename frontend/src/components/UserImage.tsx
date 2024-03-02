interface UserImageProps {
  username: string
  size: keyof typeof imageSize
}

export function UserImage({ username, size }: UserImageProps) {

  return (
    <img class={`${imageSize[size]} rounded-full`} src={`https://ui-avatars.com/api/?background=random&name=${username}&color=ffffff&bold=true`} alt={`Imagen del usuario de ${username}`} width="32" height="32" />
  )
}

const imageSize = {
  sm: "size-7",
  md: "size-8"
}