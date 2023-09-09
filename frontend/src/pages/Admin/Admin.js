import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CreateIcon from "@mui/icons-material/Create";
import ManageIcon from "@mui/icons-material/ManageSearch";
import UploadIcon from "@mui/icons-material/CloudUpload";
import StoreIcon from "@mui/icons-material/Store";
import EditIcon from "@mui/icons-material/Edit";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate =  useNavigate();
  const handleCreate = (() => navigate("/admin/dashboard/create"));

  return (
    <div>
      <h2>Admin Panel</h2>
      <List>
        <ListItem button onClick={handleCreate}>
          <ListItemIcon>
            <CreateIcon style={{ color: "#8A5BF2" }}/>
          </ListItemIcon>
          <ListItemText primary="Create New Blog Post" />
        </ListItem>

        <ListItem button onClick={() => console.log("Manage blog posts")}>
          <ListItemIcon>
            <ManageIcon style={{ color: "#8A5BF2" }}/>
          </ListItemIcon>
          <ListItemText primary="Manage Blog Posts" />
        </ListItem>

        <ListItem button onClick={() => console.log("Upload assets")}>
          <ListItemIcon>
            <UploadIcon style={{ color: "#8A5BF2" }}/>
          </ListItemIcon>
          <ListItemText primary="Upload Assets" />
        </ListItem>

        <ListItem button onClick={() => console.log("Add product to store")}>
          <ListItemIcon>
            <StoreIcon style={{ color: "#8A5BF2" }}/>
          </ListItemIcon>
          <ListItemText primary="Add Product to Store" />
        </ListItem>

        <ListItem button onClick={() => console.log("Edit About Page")}>
          <ListItemIcon>
            <EditIcon style={{ color: "#8A5BF2" }} />
          </ListItemIcon>
          <ListItemText primary="Edit About Page" />
        </ListItem>

        <ListItem button onClick={() => console.log("Edit Contact Page")}>
          <ListItemIcon>
            <EditIcon style={{ color: "#8A5BF2" }} />
          </ListItemIcon>
          <ListItemText primary="Edit Contact Page" />
        </ListItem>

        <ListItem button onClick={() => console.log("Add Info to Homepage")}>
          <ListItemIcon>
            <HomeIcon style={{ color: "#8A5BF2" }} />
          </ListItemIcon>
          <ListItemText primary="Add Info to Homepage" />
        </ListItem>
      </List>
    </div>
  );
};

export default Admin;
