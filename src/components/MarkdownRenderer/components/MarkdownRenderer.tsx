import { renderMarkdownContent } from '@/utils/markdoc'
import clsx from 'clsx'
import { type FC } from 'react'

type Props = {
  content: string
}

export const MarkdownRenderer: FC<Props> = ({ content }) => {
  return (
    <div
      className={clsx(
        'prose-h1:mt-2 prose-h1:scroll-m-20 prose-h1:text-4xl prose-h1:font-bold prose-h1:tracking-tight',
        'prose-h2:mt-10 prose-h2:scroll-m-20 prose-h2:border-b prose-h2:border-b-gray-200 prose-h2:pb-1 prose-h2:text-3xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:first:mt-0',
        'prose-h3:mt-8 prose-h3:scroll-m-20 prose-h3:text-2xl prose-h3:font-semibold prose-h3:tracking-tight',
        'prose-h4:mt-8 prose-h4:scroll-m-20 prose-h4:text-xl prose-h4:font-semibold prose-h4:tracking-tight',
        'prose-a:font-medium prose-a:text-gray-900 prose-a:underline prose-a:underline-offset-4',
        'prose-p:leading-7 prose-p:[&:not(:first-child)]:mt-6',
        'prose-ul:my-6 prose-ul:ml-6 prose-ul:list-disc',
        'prose-ol:my-6 prose-ol:ml-6 prose-ol:list-decimal',
        'prose-li:mt-2',
        'prose-blockquote:mt-6 prose-blockquote:border-l-2 prose-blockquote:border-gray-300 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-800 prose-blockquote:[&>*]:text-gray-600 prose-blockquote:font-normal',
        'prose-img:rounded-md prose-img:border prose-img:border-gray-200',
        'prose-hr:my-4 prose-hr:border-gray-200 prose-hr:md:my-8',
        'prose-table:my-6 prose-table:w-full prose-table:overflow-y-auto',
        'prose-tr:m-0 prose-tr:border-t prose-tr:border-gray-300 prose-tr:p-0 prose-tr:odd:bg-gray-100 prose-tr:even:bg-white',
        'prose-th:border prose-th:border-gray-200 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:[&[align=center]]:text-center prose-th:[&[align=right]]:text-right prose-th:bg-white',
        'prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2 prose-td:text-left prose-td:[&[align=center]]:text-center prose-td:[&[align=right]]:text-right',
        'prose-pre:mt-6 prose-pre:mb-4 prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-gray-900 prose-pre:p-4',
        'prose-code:relative prose-code:rounded-md prose-code:bg-gray-300/25 prose-code:px-1.5 prose-code:py-1 prose-code:font-mono prose-code:text-gray-600 prose-code:text-[85%]'
      )}
    >
      {renderMarkdownContent(content)}
    </div>
  )
}
