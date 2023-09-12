import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "BlogPosts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBlog(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {blog ? (
        <>
          {/* Display the image in a div */}
          <div style={{ height: "300px", overflow: "hidden" }}>
            <img
              src={blog.fileUrl}
              alt={blog.title}
              style={{ width: "100%", objectFit: "cover" }}
            />
          </div>
        
          <h1>{blog.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogDetail;
