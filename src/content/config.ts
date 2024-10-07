// 1. Importa las utilidades de `astro:content`
import { defineCollection, z } from 'astro:content';

// La carpeta de la colección siempre debe estar en la carpeta content y esta
// carpeta solo se debe utilizar para gestionar contenido

// 2. Define tu colección(es)
const subjectCollection = defineCollection({
  // El type definido como "content" es especifico para los archivos markdown
  type: "content",
  // El schema son las variables del frontmatter
  // Esto quiere decir que las variables que se definen en el frontmatter
  // deben cumplan con este formato
  schema: ({ image }) => z.object({
    title: z.string(),
    // Esto genera los metadatos de la imagen
    coverPhoto: image().refine((img) => {
      return img.width >= 100;
    }, {
      message: "La imagen debe tener al menos 100 pixeles"
    }),
    coverPhotoAlt: z.string(),
    excerpt: z.string()
  })
});

// 3. Exporta un único objeto `collections` para registrar tu(s) colección(es)
//    Esta clave debe coincidir con el nombre de tu directorio de colección en "src/content"
export const collections = {
  // La llave debe ser igual al nombre de la carpeta que contiene los markdown
  'subject': subjectCollection,
};
