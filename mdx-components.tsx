import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <h1 className="text-3xl font-semibold tracking-tight mb-4" style={{ fontSize: 'var(--font-size-3xl)' }} {...props} />,
    h2: (props) => <h2 className="text-2xl font-semibold tracking-tight mb-3" style={{ fontSize: 'var(--font-size-2xl)' }} {...props} />,
    h3: (props) => <h3 className="text-xl font-semibold tracking-tight mb-2" style={{ fontSize: 'var(--font-size-xl)' }} {...props} />,
    p: (props) => <p className="leading-7 mb-4" style={{ fontSize: 'var(--font-size-lg)' }} {...props} />,
    strong: (props) => <strong className="font-semibold" style={{ fontSize: 'var(--font-size-lg)' }} {...props} />,
    em: (props) => <em className="italic" style={{ fontSize: 'var(--font-size-lg)' }} {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-primary/30 pl-4 italic my-4" style={{ fontSize: 'var(--font-size-lg)' }} {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
    ol: (props) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
    li: (props) => <li className="leading-7" style={{ fontSize: 'var(--font-size-lg)' }} {...props} />,
    ...components,
  }
}
