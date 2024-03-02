import { Icon } from "./Icon";

interface BadgeProps {
  name: string
  withIcon?: boolean
}

export default function Badge({ name, withIcon }: BadgeProps) {

  return (
    <span class={`flex ${withIcon ? 'font-medium rounded' : 'rounded-full'}  text-sm gap-2 items-center bg-primary-10 px-2 py-1 text-primary-text`}>
      {name}
      {withIcon && <button type="button" class="rounded">
        <Icon name="exit" size="md" />
      </button>
      }
    </span>
  )
}