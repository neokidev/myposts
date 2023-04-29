import clsx from 'clsx'

interface CalloutProps {
  children?: React.ReactNode
}

export function Callout({ children }: CalloutProps) {
  return (
    <div
      className={clsx(
        'not-prose',
        'relative shadow-lg p-4 pl-6 rounded-md border',
        'before:block before:absolute before:w-1.5 before:top-1 before:bottom-1 before:left-1 before:bg-black before:rounded-full'
      )}
    >
      {children}
    </div>
  )
}
