export type ContentItem = {
  path: string
  title: string
  author: string
  platform?: string
  description: string
  format: string[]
  tags: string[]
}

export type FormatIcon = {
  [key: string]: string
} 