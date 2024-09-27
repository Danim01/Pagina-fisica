// 1. Importa las utilidades de `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Define tu colección(es)
const subjectCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    coverPhotoSrc: z.string(),
    coverPhotoAlt: z.string(),
    excerpt: z.string()
  })
});

// 3. Exporta un único objeto `collections` para registrar tu(s) colección(es)
//    Esta clave debe coincidir con el nombre de tu directorio de colección en "src/content"
export const collections = {
  'subject': subjectCollection,
};
