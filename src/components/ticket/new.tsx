import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Box, Button, Modal, TextField } from "@mui/material";
import userService from "@/services/user.service";
import { useGlobalContext } from "@/context/store";

interface Props {
  projectID: number;
  boardID: number;
}

const AddTicket: React.FC<Props> = ({ projectID, boardID }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { data, socket } = useGlobalContext();
  const [error, setErrors] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const createTicket = async () => {
    if (!title) {
      setErrors("Title is required");
    } else if (!description) {
      setErrors("Description is required");
    } else {
      socket.emit("createTicket", {
        title: title,
        description: description,
        board_id: boardID,
        project_id: projectID,
      });
      setTitle("");
      setDescription("");
      setOpen(false);
    }
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
          width: "30vw",
          height: "20vw",
          margin: "0 auto",
          marginTop: "50px",
          borderRadius: "5vw",
          padding: 30,
          paddingTop: 50,
        }}
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Create New Ticket</h2>
            <Button onClick={() => setOpen(false)}>
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
          {error ? (
            <Alert severity="error" sx={{ width: 300 }}>
              {error}
            </Alert>
          ) : (
            <></>
          )}
          <Button onClick={() => createTicket()}>Create</Button>
        </Box>
      </Modal>
      <Button
        sx={{ display: "flex" }}
        onClick={() => {
          handleOpen();
        }}
      >
        Add Ticket
      </Button>
    </div>
  );
};
export default AddTicket;
