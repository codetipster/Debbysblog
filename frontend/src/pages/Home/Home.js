import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import CardInfo from "../../components/CardInfo/CardInfo";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-around" p={2}>
      <div className="landingHomeForAds">
        <h1>i am for ads</h1>

      </div>
      <div className="contentSpace">
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
        <Box m={1}><CardInfo /></Box>
      </div> 
    </Box>
  );
};

export default Home;
