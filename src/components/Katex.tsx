import katex from 'katex';
import { useEffect, useRef } from 'react';

interface Props {
  tex: string
  className?: string
}

export default function Katex({ tex, className }: Props) {
  // containerRef es una manera de acceder al DOM, en este caso a un elemento div,
  // por el HTMLDivElement de la forma que lo utiliza read
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // .current es un elemento html donde katex va a renderizar el tex que le llega como prop
    katex.render(tex, containerRef.current as HTMLInputElement)
  }, [tex])

  return (
    // ref es un atributo de read para asociar el elemento con el useRef
    <div ref={containerRef} className={className} />
  )
}