import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl font-semibold tracking-tight" {...props} />,
    p: (props) => <p className="leading-7" {...props} />,
    ...components,
  }
}
