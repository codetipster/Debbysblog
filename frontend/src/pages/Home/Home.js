/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CardInfo from "../../components/CardInfo/CardInfo";
import "./Home.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const blogPostCollectionRef = collection(db, "BlogPosts");

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const data = await getDocs(blogPostCollectionRef);
        setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getBlogs();
  }, [blogPostCollectionRef]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box display="flex" flexWrap="wrap" flexDirection="column" justifyContent="space-around" p={2}>
      <div className="landingHomeForAds">
        <h1>Contact us to place your ads here. </h1>
        <h6>Send an email with your request to admin@iamdebbyrose.com </h6>
        {/* // eslint-disable-next-line jsx-a11y/iframe-has-title */}
        {/* <iframe src="https://getmika.retool.com/apps/Invoice-Previewer" width="100%" height="800px"></iframe> */}
      </div>
      <h3>Latest Blogs</h3> {/* For SEO and clarity */}
      <div className="contentSpace">
        {blogs.map((blog) => (
          <Box m={1} key={blog.id} >
            <CardInfo {...blog} />
          </Box>
        ))}
        
      </div>
    </Box>
  );
};

export default Home;


