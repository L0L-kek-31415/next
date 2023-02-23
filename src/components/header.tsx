import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import Router from "next/router";
import { useGlobalContext } from "@/context/store";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import userService from "@/services/user.service";

export default function Header() {
  const { userId, setUserId, data, setData } = useGlobalContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    const me = async () => {
      const res = await userService.me();
      setData(res.data);
    };
    me();
  }, []);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          marginLeft: 50,
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid container spacing={2}>
          {userId ? (
            <Grid item xs={4}>
              <Button
                onClick={() => Router.push("/")}
              >
                <Typography sx={{ minWidth: 100 }}>Projects</Typography>
              </Button>
            </Grid>
          ) : (
            <Grid item xs={4}>
              <Button
                onClick={() => Router.push("/signup")}
              >
                <Typography sx={{ minWidth: 100 }}>Sign Up</Typography>
              </Button>
            </Grid>
          )}
          <Grid item>
            {userId ? (
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {data.email.slice(0, 1)}
                  </Avatar>
                </IconButton>
              </Tooltip>
            ) : (
              <Grid item xs={4}>
                <Button
                  onClick={() => Router.push("/signin")}
                >
                  <Typography sx={{ minWidth: 100 }}>Sign In</Typography>
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 40,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          sx={{ width: 100 }}
          onClick={() => {
            handleClose();
            localStorage.removeItem("access");
            setUserId("");
            setData({ email: "", role: "", socket: null});
            Router.push("/signin");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
