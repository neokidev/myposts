import { Callout } from '@/components/MarkdownRenderer/components/Callout'
import clsx from 'clsx'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote'
import { type FC } from 'react'

type MarkdownRendererProps = {
  content: MDXRemoteSerializeResult
}

type DefaultComponentProps = React.HTMLAttributes<HTMLElement>

const components = {
  h1: ({ className, ...props }: DefaultComponentProps) => (
    <h1
      className={clsx(
        'mt-2 scroll-m-20 text-4xl font-bold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: DefaultComponentProps) => (
    <h2
      className={clsx(
        'mt-10 scroll-m-20 border-b border-b-gray-200 pb-1 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: DefaultComponentProps) => (
    <h3
      className={clsx(
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: DefaultComponentProps) => (
    <h4
      className={clsx(
        'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: DefaultComponentProps) => (
    <h5
      className={clsx(
        'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: DefaultComponentProps) => (
    <h6
      className={clsx(
        'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: DefaultComponentProps) => (
    <a
      className={clsx(
        'font-medium text-gray-900 underline underline-offset-4',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: DefaultComponentProps) => (
    <p
      className={clsx('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: DefaultComponentProps) => (
    <ul className={clsx('my-6 ml-6 list-disc', className)} {...props} />
  ),
  ol: ({ className, ...props }: DefaultComponentProps) => (
    <ol className={clsx('my-6 ml-6 list-decimal', className)} {...props} />
  ),
  li: ({ className, ...props }: DefaultComponentProps) => (
    <li className={clsx('mt-2', className)} {...props} />
  ),
  blockquote: ({ className, ...props }: DefaultComponentProps) => (
    <blockquote
      className={clsx(
        'mt-6 border-l-2 border-gray-300 pl-6 italic text-gray-800 [&>*]:text-gray-600',
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={clsx('rounded-md border border-gray-200', className)}
      alt={alt}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <hr className="my-4 border-gray-200 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={clsx('w-full', className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={clsx(
        'm-0 border-t border-gray-300 p-0 even:bg-gray-100',
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }: DefaultComponentProps) => (
    <th
      className={clsx(
        'border border-gray-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: DefaultComponentProps) => (
    <td
      className={clsx(
        'border border-gray-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: DefaultComponentProps) => (
    <pre
      className={clsx(
        'mt-6 mb-4 overflow-x-auto rounded-lg bg-gray-900 py-4',
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: DefaultComponentProps) => (
    <code
      className={clsx(
        'relative rounded border bg-gray-300/25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-gray-600',
        className
      )}
      {...props}
    />
  ),
  Callout,
}

export const MarkdownRenderer: FC<MarkdownRendererProps> = ({ content }) => {
  return <MDXRemote {...content} components={components} />
}
