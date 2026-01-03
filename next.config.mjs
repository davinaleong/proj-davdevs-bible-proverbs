// next.config.mjs
import createMDX from "@next/mdx"

const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
}

export default createMDX()(nextConfig)
