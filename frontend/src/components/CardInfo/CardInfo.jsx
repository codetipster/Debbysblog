import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
//import image from "../../assets/image.jpg";  // Importing image

// eslint-disable-next-line react/prop-types
export default function CardInfo({id, fileUrl, title, summary }) {
  return (
    <Link to={`/blog/${id}`} style={{ textDecoration: "none", color: "inherit" }}> {/* Link to BlogDetail */}
      <Card sx={{ width: "300px", height: "400px", maxWidth: { xs: 340, sm: 254 } }}> {/* Using maxWidth conditionally */}
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={fileUrl} // Using image
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography variant="body3" color="text.secondary">
              {summary}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
          Share
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
}
