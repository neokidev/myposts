import { Callout } from '@/components/MarkdownRenderer/components/Callout'
import Markdoc, { type Config } from '@markdoc/markdoc'
import clsx from 'clsx'
import { Highlight, themes } from 'prism-react-renderer'
import React, { Fragment, type FC, type ReactNode } from 'react'

type FenceProps = {
  children: ReactNode
  language: string
}

export const Fence: FC<FenceProps> = ({ children, language }) => (
  <Highlight
    code={children === undefined ? '' : String(children).trimEnd()}
    language={language}
    theme={themes.dracula}
  >
    {({ className, style, tokens, getTokenProps }) => (
      <pre className={clsx(className, 'not-prose')} style={style}>
        <code className="text-[90%]">
          {tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line
                .filter((token) => !token.empty)
                .map((token, tokenIndex) => (
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              {'\n'}
            </Fragment>
          ))}
        </code>
      </pre>
    )}
  </Highlight>
)

const fence = {
  render: 'Fence',
  attributes: {
    language: {
      type: String,
    },
  },
}

const callout = {
  render: 'Callout',
  attributes: {},
}

export const config: Config = {
  tags: { callout },
  nodes: { fence },
  variables: {},
}

const components = {
  Fence,
  Callout,
}

export function renderMarkdownContent(content: string) {
  const ast = Markdoc.parse(content)
  const transformed = Markdoc.transform<Config>(ast, config)
  return Markdoc.renderers.react(transformed, React, { components })
}
