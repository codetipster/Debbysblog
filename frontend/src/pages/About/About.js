/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, Container, Button, TextField, Divider, Input } from "@mui/material";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";
import { AuthContext } from "../../context/AuthProvider";

const About = ({ isEditable: initialIsEditable }) => {
  const [email, setEmail] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isEditable, setEditable] = useState(initialIsEditable || false);  // Initialize from props if available
  const currentUser = useContext(AuthContext);
  const [aboutDebbyEditor, setAboutDebbyEditor] = useState(""); // state for the editable content
  const [whyThisBlogEditor, setWhyThisBlogEditor] = useState(""); // state for the editable content


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleSubscribe = () => alert(`Subscribed with email: ${email}`);

  const handleEdit = () => {
    if (currentUser) {
      setEditable(true);
      setAboutDebbyEditor(aboutDebby);
      setWhyThisBlogEditor(whyThisBlog);
    } else {
      console.log("You need to be logged in to edit.");
    }
  };

  const handleSave = async () => {
    try {
      // Update the "AboutBlogger" document
      await setDoc(doc(db, "About", "AboutBlogger"), {
        DescribeBlogger: aboutDebbyEditor,
      });

      // Update the "TheWhy" document
      await setDoc(doc(db, "About", "TheWhy"), {
        Why: whyThisBlogEditor,
      });
      
      // Optionally, you can refresh the content after updating
      // For now, just update the existing state
      const updatedSections = [...sections];
      const aboutIndex = updatedSections.findIndex(s => s.id === "AboutBlogger");
      const whyIndex = updatedSections.findIndex(s => s.id === "TheWhy");

      updatedSections[aboutIndex].DescribeBlogger = aboutDebbyEditor;
      updatedSections[whyIndex].Why = whyThisBlogEditor;

      setSections(updatedSections);

    } catch (err) {
      console.error("Error updating document: ", err);
    }
    setEditable(false);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `aboutImage/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    //const storageRef = ref(storage, "aboutImage/avatar.png");

    uploadTask.on("state_changed",
      (snapshot) => {
        // Handle progress
      },
      (error) => {
        // Handle upload errors
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAvatarUrl(downloadURL);
        });
      }
    );
  };

  const aboutPageCollectionRef = collection(db, "About");
  
  useEffect(() => {
    const getSections = async () => {
      try {
        const data = await getDocs(aboutPageCollectionRef);
        setSections(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getSections();

    const avatarRef = ref(storage, "aboutImage/Screenshot 2023-06-16 at 16.45.49.png");
    getDownloadURL(avatarRef)
      .then((url) => setAvatarUrl(url))
      .catch((error) => console.error("Error fetching avatar: ", error));

    if (initialIsEditable) {
      handleEdit();
    }

  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const aboutDebby = sections.find(section => section.id === "AboutBlogger")?.DescribeBlogger || "";
  const whyThisBlog = sections.find(section => section.id === "TheWhy")?.Why || "";
  const aboutPageTitle = sections.find(section => section.id === "Title")?.theme || "";



  return (
    <Container>
      <Box my={4}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="h4" sx={{ marginRight: 2 }}>
            Debbyrose
          </Typography>
          <Avatar
            alt="Debby's Profile Picture"
            src={avatarUrl}
            sx={{ width: 200, height: 200 }}
          />

          {isEditable && (
            <Input
              accept="image/*"
              id="avatar-upload"
              type="file"
              onChange={handleAvatarChange}
            />
          )}
        </Box>

        <Typography variant="h4" gutterBottom>
          {aboutPageTitle}
        </Typography>

        {isEditable ===  true ? <Button onClick={handleSave}>Save</Button> : <Button onClick={handleEdit}>Edit About</Button>}

        <section id="about-debby">
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
          {isEditable ? (
            <TextField 
              fullWidth
              value={aboutDebbyEditor}
              onChange={(e) => setAboutDebbyEditor(e.target.value)}
            />

          ) : (
            <Typography paragraph>
              {aboutDebby}
            </Typography>
          )}
        </section>

        <section id="why-this-blog">
          <Typography variant="h5" gutterBottom>
            Why This Blog Exists
          </Typography>
          {isEditable ? (
            <TextField 
              fullWidth
              value={whyThisBlogEditor}
              onChange={(e) => setWhyThisBlogEditor(e.target.value)}
            />

          ) : (
            <Typography paragraph>
              {whyThisBlog}
            </Typography>
          )}
        </section>

        <Box display="flex" justifyContent="space-between" alignItems="center" mt={20}>
          {/* Newsletter Section */}
          <Box flex={1} textAlign="center" p={3}>
            <Typography variant="h5" gutterBottom>
              Newsletter Signup
            </Typography>
            <Typography paragraph>
              Stay updated with the latest posts from Debby!
            </Typography>
            <TextField
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              style={{ width: "80%" }}
            />
            <Box mt={2}>
              <Button variant="contained" color="primary" onClick={handleSubscribe}>
                Subscribe
              </Button>
            </Box>
          </Box>

          {/* Vertical Divider */}
          <Divider orientation="vertical" flexItem />

          {/* Contact Section */}
          <Box flex={1} textAlign="center" p={3}>
            <Typography variant="h5" gutterBottom>
              Contact Information
            </Typography>
            <Typography paragraph>
              For more details about contacting Debby, please visit our:
            </Typography>
            <Box mt={2}>
              <Link to="/contact" style={{ textDecoration: "none" }}>
                <Button variant="contained" color="primary">
                  Contact Page
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
