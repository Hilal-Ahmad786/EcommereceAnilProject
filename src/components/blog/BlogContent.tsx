// src/components/blog/BlogContent.tsx
export default function BlogContent({ content }: any) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />
}