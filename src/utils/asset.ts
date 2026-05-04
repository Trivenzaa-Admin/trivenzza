/** Prepends Vite's base URL so paths work on GitHub Pages subpaths */
export const asset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
