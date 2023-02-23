import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Modal, TextField } from "@mui/material";
import userService from "@/services/user.service";
import { useGlobalContext } from "@/context/store";

interface Props {
  socket: any;
  projectID: number;
}

const AddBoard: React.FC<Props> = ({ projectID }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const { userId, data } = useGlobalContext();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createBoard = async () => {
    const me = await userService.me();
    data.socket.emit("createBoard", {
      title: title,
      project_id: projectID,
    });
    handleClose();
  };

  if (data.role == "admin") {
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
              <h2>Create New Board</h2>
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
            <Button onClick={() => createBoard()}>Create</Button>
          </Box>
        </Modal>
        <Button
          sx={{ display: "flex" }}
          onClick={() => {
            handleOpen();
          }}
        >
          Add Board
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
};
export default AddBoard;
