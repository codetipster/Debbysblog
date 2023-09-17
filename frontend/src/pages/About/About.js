import React, {useState, useEffect} from "react";
import { Box, Typography, Container, Button,  TextField, Divider } from "@mui/material";
import { Link } from "react-router-dom"; 
import Avatar from "@mui/material/Avatar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase";  // Update with your correct path



const About = () => {
  const [email, setEmail] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [avatarUrl, setAvatarUrl] = useState("");



  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    alert(`Subscribed with email: ${email}`);
    setEmail(""); 
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

    // Fetch the avatar
    const avatarRef = ref(storage, "aboutImage/Screenshot 2023-06-16 at 16.45.49.png");  // Update path
    getDownloadURL(avatarRef)
      .then((url) => {
        setAvatarUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching avatar: ", error);
      });

  }, []);



  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const aboutDebby = sections.find(section => section.id === "AboutBlogger")?.DescribeBlogger || "";
  const whyThisBlog = sections.find(section => section.id === "TheWhy")?.Why || "";
  const aboutPageTitle = sections.find(section => section.id === "Title")?.theme || "";

  return (
    <Container>
      <Box my={4}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="h4" component="div" sx={{ marginRight: 2 }}>
          Debbyrose
          </Typography>
          <Avatar
            alt="Debby's Profile Picture"
            src={avatarUrl}
            sx={{ width: 200, height: 200 }}
          />
        </Box>
        <Typography variant="h2" component="h1" gutterBottom>
          {aboutPageTitle}
        </Typography>

        <section id="about-debby">
          <Typography variant="h5" gutterBottom>
            About
          </Typography>
          <Typography paragraph>
            {aboutDebby}
          </Typography>
        </section>

        <section id="why-this-blog">
          <Typography variant="h5" gutterBottom>
            Why This Blog Exists
          </Typography>
          <Typography paragraph>
            {whyThisBlog}
          </Typography>
        </section>

        <Box display="flex" justifyContent="space-between" alignItems="center"  mt={20}>
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
