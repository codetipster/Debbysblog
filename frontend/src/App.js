import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container } from "@mui/material";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

//creating theme colors for the website
const theme = createTheme({
  palette: {
    primary: {
      main: "#352578",
    },
    secondary: {
      main: "#ff4081",
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box display="flex" flexDirection="column" minHeight="100vh">
          <Header />
          <Box flex="1">
            {/* Main content */}
            
            <Container maxWidth="lg">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>  
            </Container>
            
          </Box>
          <Footer />
        </Box>
      </Router>  
    </ThemeProvider>
  );
}

export default App;