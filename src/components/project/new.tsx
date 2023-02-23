import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, TextField } from "@mui/material";
import projectService from "@/services/project.service";

interface Props {}

const AddProject: React.FC<Props> = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createTicket = async () => {
    await projectService.create({ title: title, description: description });
  };

  return (
    <div>
      <Modal
        sx={{
          border: 3,
          borderColor: "black",
        }}
        style={{
          backgroundColor: "whitesmoke",
          width: "50vw",
          height: "30vw",
          margin: "0 auto",
          marginTop: "50px",
          borderRadius: "5vw",
          padding: 30,
          paddingTop: 50,
        }}
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Create New project</h2>
            <Button onClick={handleClose}>
              <ClearIcon color="action" />
            </Button>
          </div>
          <TextField
            name="title"
            fullWidth
            placeholder="Title"
            onChange={(ev) => {
              setTitle(ev.target.value);
            }}
          />
          <TextField
            name="description"
            fullWidth
            placeholder="Description"
            onChange={(ev) => {
              setDescription(ev.target.value);
            }}
          />
          <Button onClick={() => createTicket()}>Create</Button>
        </Box>
      </Modal>
      <Button
        sx={{ display: "flex" }}
        onClick={() => {
          handleOpen();
        }}
      >
        Add Project
      </Button>
    </div>
  );
};
export default AddProject;
