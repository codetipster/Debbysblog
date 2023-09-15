import React, {useState} from "react";
import { Box, Typography, Container, Button,  TextField, Divider } from "@mui/material";
import { Link } from "react-router-dom"; 
import Avatar from "@mui/material/Avatar";


const About = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    alert(`Subscribed with email: ${email}`);
    setEmail(""); 
  };

  return (
    <Container>
      <Box my={4}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Typography variant="h4" component="div" sx={{ marginRight: 2 }}>
          Debbyrose
          </Typography>
          <Avatar
            alt="Debby's Profile Picture"
            src="path/to/your/image.jpg"
            sx={{ width: 200, height: 200 }}
          />
        </Box>
        <Typography variant="h2" component="h1" gutterBottom>
          {/* // eslint-disable-next-line react/no-unescaped-entities */}
          About Debby&apos;s Data Blog
        </Typography>
        <Typography variant="h4">
          Meet Debby, Your Go-to Expert for Data Management and Excel Tips
        </Typography>

        <section id="about-debby">
          <Typography variant="h5" gutterBottom>
            About Debby
          </Typography>
          <Typography paragraph>
            [Insert Debby`&apos;`s background information, skills, and a bit about her personal life here.]
          </Typography>
        </section>

        <section id="why-this-blog">
          <Typography variant="h5" gutterBottom>
            Why This Blog Exists
          </Typography>
          <Typography paragraph>
            [Explain the challenges in data management and Excel, and the blog mission.]
          </Typography>
        </section>

        <section id="what-you-will-learn">
          <Typography variant="h5" gutterBottom>
            What You Will Learn
          </Typography>
          <Typography paragraph>
            [Describe the topics Debby will cover and the target audience.]
          </Typography>
        </section>

        <section id="success-stories">
          <Typography variant="h5" gutterBottom>
            Success Stories
          </Typography>
          <Typography paragraph>
            [Insert any testimonials or success stories from readers if available.]
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
