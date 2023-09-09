import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import image from "../../assets/image.jpg";  // Importing image

// eslint-disable-next-line react/prop-types
export default function CardInfo({ fileUrl, title, summary }) {
  return (
    <Card sx={{ maxWidth: { xs: 340, sm: 254 } }}> {/* Using maxWidth conditionally */}
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
  );
}
