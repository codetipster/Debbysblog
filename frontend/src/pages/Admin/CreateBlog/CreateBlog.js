import React, { useState } from "react";
import { db, storage } from "../../../firebase";  // Adjust this import to your file structure

import { Button, TextField, TextareaAutosize } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import styles
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);

  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const storage = getStorage();
    const storageRef = ref(storage, "blog_images/" + file.name);
    const blogPostCollectionRef = collection(db, "BlogPosts"); // Reference to the BlogPosts collection
    
    // Upload the file to Firebase Storage
    const uploadTask = uploadBytes(storageRef, file);
  
    uploadTask.then(async (snapshot) => {
      console.log("Uploaded a blob or file!");
  
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log("File available at", downloadURL);
  
      // Here we'll send the data to Firestore
      const BlogPost = {
        title,
        content,
        summary,
        fileUrl: downloadURL
        // You can add more fields like date, author, etc.
      };
  
      try {
        await addDoc(blogPostCollectionRef, BlogPost);
        setTitle("");
        setContent("");
        setSummary("");
        setFile(null);
        alert("Blog post created successfully");
      } catch (error) {
        console.error("Error writing new post to Firestore", error);
      }
    });
  };
  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <h2>Create New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        
        <ReactQuill 
          value={content} 
          onChange={setContent} 
          style={{ height: "450px", marginBottom: "50px" }} 
          placeholder="Main content for your blog...."
        />
       
        <TextareaAutosize
          minRows={5}
          placeholder="Write a short summary for this blog post..."
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          style={{ width: "100%", padding: "12px" }}
        />
        
        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ paddingTop: "10px" }} 
        />
       
        <div style={{ paddingTop: "10px" }}>
          <Button type="submit" variant="contained" color="primary">
            Create Post
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
