import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import LoadingOverlay from "../components/LoadingOverlay";  // Update with your correct path
import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { auth }  from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useSnackbar } from "notistack";

function Signup() {
  const [email , setEmail ] = useState("");
  const [password, setPassword] = useState("");
  //const [isLoading, setIsLoading] = useState(false);
  //const navigate = useNavigate();  // Hook for navigation
  const { enqueueSnackbar } = useSnackbar(); // notistack hook
  
  //firebase authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    //setIsLoading(true);  // Start loading when the request starts
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in 
      //const user = userCredential.user;
      enqueueSnackbar("Account created Successfully!", { variant: "success" });
      // console.log(user);
    }).catch((error) => {
      //const errorCode = error.code;
      const errorMessage = error.message;
      enqueueSnackbar(`failed: ${errorMessage}`, { variant: "error" });
      // console.log(errorCode, errorMessage);
    });
  };
    
  //   if (isLoading) {
  //     return <LoadingOverlay />;
  //   }
  
  return (
    <Card sx={{ maxWidth: 400, margin: "auto", marginTop: "20%", backgroundColor: "#000" }}>
      <CardContent>
        <Typography variant="h5" component="div" color="white">
            Register as a new Author
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
              Register
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
  
export default Signup;
  