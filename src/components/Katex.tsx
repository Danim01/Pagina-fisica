import katex from 'katex';
import { useEffect, useRef } from 'react';

interface Props {
  tex: string
  className?: string
}

export default function Katex({ tex, className }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    katex.render(tex, containerRef.current as HTMLInputElement)
  }, [tex])

  return (
    <div ref={containerRef} className={className} />
  )
}