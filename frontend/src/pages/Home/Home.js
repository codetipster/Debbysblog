import React, {useEffect, useState} from "react";
//import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CardInfo from "../../components/CardInfo/CardInfo";
import "./Home.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  //const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const blogPostCollectionRef = collection(db, "BlogPosts"); // Reference to the BlogPosts collection

  useEffect(() => {
    const getBlogs = async () => {
      const data = await getDocs(blogPostCollectionRef);
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      
    };
    getBlogs();
  }, [blogPostCollectionRef]);

  console.log(blogs);

  
  return (
    <Box display="flex" flexWrap="wrap" flexDirection="column" justifyContent="space-around" p={2}>
      <div className="landingHomeForAds">
        <h1>Contact us to place your ads here. </h1>
        <h6>Send an email with your request to admin@iamdebbyrose.com </h6>
      </div>
      <div className="contentSpace">
        {blogs.map((blog) => {
          return (
            <Box m={1} key={blog.id}>
              <CardInfo 
                authorId={blog.authorId}
                content={blog.content}
                createdAt={blog.createdAt}
                fileUrl={blog.fileUrl}
                summary={blog.summary}
                title={blog.title}
                updatedAt={blog.updatedAt}
              />
            </Box>
          );
        })}
      </div>
    </Box>
  );
  
  
  
};

export default Home;
