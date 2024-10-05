import { collection, getDocs, getFirestore, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "src/firebase/client";

interface Comment {
  id: string
  name: string
  comment: string
  createdAt: Date
}

const db = getFirestore(app);

function Comments() {
  const [comments, setComments] = useState<Comment[]>([])

  const getComments = async () => {
    const commentsRef = collection(db, "comments")
    const commentsQuery = query(commentsRef, orderBy("createdAt", "desc"))
    const commentsSnapshot = await getDocs(commentsQuery)

    const newComments = commentsSnapshot.docs.length > 0 ? commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Comment[] : [];

    setComments(newComments)
  }

  useEffect(() => {
    getComments()
  }, [])
  return (
    <ul className="commentaries">
      {
        comments.map((comment) => (
          <li className="commentaries__item">
            <div className="commentaries__item-header">
              <h3 title={comment.name}>
                {comment.name}
              </h3>
              <p>
                {
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