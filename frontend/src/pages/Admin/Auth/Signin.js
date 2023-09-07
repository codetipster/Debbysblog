import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import LoadingOverlay from "../components/LoadingOverlay";  // Update with your correct path
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { auth }  from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


function Signin() {
  const [email , setEmail ] = useState("");
  const [password, setPassword] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();  // Hook for navigation
  
  //firebase authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setIsLoading(true);  // Start loading when the request starts
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      if (user) {
        navigate("/admin/dashboard");
      }
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  };
    
  //   if (isLoading) {
  //     return <LoadingOverlay />;
  //   }
  
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "20%", backgroundColor: "#291D59" }}>
      <CardContent>
        <Typography variant="h5" component="div" color="white">
            Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: { color: "#291D59" } }}
            inputProps={{ style: { color: "#291D59" } }}
            sx={{ marginBottom: 2, backgroundColor: "#fff" }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{ style: { color: "#291D59" } }}
            inputProps={{ style: { color: "#291D59" } }}
            sx={{ marginBottom: 2, backgroundColor: "#fffF" }}
          />
          <Button variant="contained" type="submit" style={{backgroundColor: "#8959F3", color: "#fff"}}>
              Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
  
export default Signin;
  