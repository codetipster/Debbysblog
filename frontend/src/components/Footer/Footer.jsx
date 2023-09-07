import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Footer = () => {
  return (
    <Container component="footer">
      <Typography variant="body1" sx={{ fontFamily: "Caveat", fontWeight: 200, textAlign: "center", flexGrow: 1, display: { xs: "none", sm: "block" } }}>
        Copyright © Debby &apos;`s Blog 2023. Built with  ❤️
      </Typography>
    </Container>
  );
};

export default Footer;
