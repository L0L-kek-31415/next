import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

import Router from "next/router";
import { Button, Modal, TextField } from "@mui/material";
import projectService from "@/services/project.service";
import { useGlobalContext } from "@/context/store";
import AddProject from "./project/new";

interface UserProps {
  email: string;
  role: string;
  id: number;
}

export default function MyDrawer() {
  const { data } = useGlobalContext();
  const [date, setDate] = React.useState(true);

  const [projects, setProjects] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await projectService.getAll();
        setProjects(response.data);
      } catch (err) {
        console.log("Oh fuck, we've got another error");
      }
    };
    fetchPages();
  }, [date]);

  return (
    <List style={{ width: 300, position: "fixed" }}>
      {projects.map((pr: any) => (
        <ListItem
          key={pr.id}
          disablePadding
          onClick={() => Router.push(`/project/${pr.id}`)}
        >
          <ListItemButton>
            <ListItemText primary={pr.title} secondary={pr.description} />
            {data && data.role == "admin" ? (
              <Button
                onClick={() => {
                  // @ts-ignore
                  projectService.delete(pr.id).catch((err) => alert(err));
                  setDate(!date);
                }}
              >
                <HighlightOffOutlinedIcon color="action" />
              </Button>
            ) : (
              <></>
            )}
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
    </List>
  );
}
