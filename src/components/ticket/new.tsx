import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, TextField } from "@mui/material";
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
  const { data } = useGlobalContext();

  const handleOpen = () => {
    setOpen(true);
  };

  const createTicket = async () => {
    const me = await userService.me();
    data.socket.emit("createTicket", {
      title: title,
      description: description,
      board_id: boardID,
      project_id: projectID,
    });
    setOpen(false);
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
