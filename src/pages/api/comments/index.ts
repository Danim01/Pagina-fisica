export const prerender = false;
import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

// Request es la petición, redirect manda a la persona a otra parte 
export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const comment = formData.get("comment")?.toString();

  // Respuesta de error
  if (!name || !comment) {
    return new Response("Missing required fields", {
      status: 400,
    });
  }
  try {
    const db = getFirestore(app);
    const commentsRef = db.collection("comments");

    // Se crea el documento que representa al comentario
    await commentsRef.add({
      name,
      comment,
      // Timestamp es una etiqueta de tiempo que sirve para saber en que momento se creo
      createdAt: Timestamp.now()
    });

    // Estamos extrayendo la ruta de donde se hizo el comentario
    const referer = request.headers.get("referer") || '/';
    // Redireccionamos a la persona a esta nueva ruta, con el #footer le estamos
    // diciendo que lo redireccione al final de la página
    return Response.redirect(`${referer}#footer`, 303);
  } catch (error) {
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};