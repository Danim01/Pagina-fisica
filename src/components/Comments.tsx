import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "src/firebase/client";

// Firebase es un servicio de google que me permite tener una base de datos no relacional
// en la nube

interface Comment {
  id: string
  name: string
  comment: string
  createdAt: Date
}

// creamos una instancia de la aplicación con la configuración del cliente
const db = getFirestore(app);

function Comments() {
  const [comments, setComments] = useState<Comment[]>([])

  const getComments = async () => {
    // Sacamos una referencia de la colección y recibe la instancia de la base de datos y el nombre de la colección
    const commentsRef = collection(db, "comments")
    // entrega los documentos ordenados, se le pasa la referencia de los comentarios y el orden con la variable que vamos a ordenar
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"))
    // genera un arreglo con todos los documentos
    const commentsSnapshot = await getDocs(commentsQuery)

    // Estamos extrayendo el nuevo comentario
    const newComments = commentsSnapshot.docs.length > 0 ? commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Comment[] : [];

    setComments(newComments)
  }

  // Renderiza el componente una vez con el nuevo comentario
  useEffect(() => {
    getComments()
  }, [])
  return (
    <ul className="commentaries">
      {
        comments.map((comment) => (
          <li key={comment.id} className="commentaries__item">
            <div className="commentaries__item-header">
              <h3 title={comment.name}>
                {comment.name}
              </h3>
              <p>
                {
                  // toLocaleDateString convierte la fecha en un formato mas legible según el idioma y la región
                  comment.createdAt.toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
              </p>
            </div>
            <p className="commentaries__comment">
              {comment.comment}
            </p>
          </li>
        ))
      }
		</ul>
  )
}

export default Comments;