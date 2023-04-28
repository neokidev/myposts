import { type DefaultComponentProps } from '@/components/MarkdownRenderer'
import clsx from 'clsx'
import { useEffect, useRef, useState, type FC } from 'react'

type CodeBlockProps = DefaultComponentProps

export const CodeBlock: FC<CodeBlockProps> = ({ className, ...props }) => {
  const ref = useRef<HTMLElement | null>(null)
  const [fontSize, setFontSize] = useState<number | undefined>()

  useEffect(() => {
    const parentElement = ref.current?.parentElement
    if (parentElement != null) {
      const parentFontSize = window.getComputedStyle(parentElement).fontSize
      const scaledFontSize = parseInt(parentFontSize) * 0.85
      setFontSize(scaledFontSize)
    }
  }, [])

  return (
    <code
      ref={ref}
      style={{ fontSize }}
      className={clsx(
        'relative rounded-md bg-gray-300/25 py-1 px-1.5 font-mono text-gray-600',
        className
      )}
      {...props}
    />
  )
}
