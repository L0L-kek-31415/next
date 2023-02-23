import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { Alert } from "@mui/material";
import Router from "next/router";
import { useGlobalContext } from "@/context/store";
import userService from "@/services/user.service";

interface Props {
  children: string;
  href: string;
  link: string;
  reqLink: string;
}

const AuthForm: React.FC<Props> = ({ children, href, link, reqLink }) => {
  const [errors, setErrors] = useState([""]);
  const { userId, setUserId, data, setData } = useGlobalContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([""]);
    const data = new FormData(event.currentTarget);
    try {
      const response = await axios.post(reqLink, {
        email: data.get("email"),
        password: data.get("password"),
      });
      setErrors(["complete"]);
      if (href == "/signup") {
        localStorage.setItem("access", response.data);
        const userData = (await userService.me()).data;
        setUserId(userData.id);
        setData({ role: userData.role, email: userData.email, socket: null });
        Router.push("/");
      }
      Router.push("/signin");

    } catch (error: any) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        margin: "0 auto",
      }}
    >
      <CssBaseline />
      <Box
        style={{
          padding: 20,
          border: "1px solid red",
          borderRadius: "5px",
          marginTop: 50,
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Typography component="h1" variant="h5">
            {children}
          </Typography>
          <TextField
            style={{ borderRadius: "10px" }}
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            color="primary"
          />
          <TextField
            style={{ borderRadius: "10px" }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "red" }}
          >
            {children}
          </Button>
          <Grid container>
            <Grid item>
              <Link href={href} style={{ color: "black" }}>
                {link}
              </Link>
            </Grid>
          </Grid>
          <div>
            {errors &&
              errors.map((err) => {
                if (err) {
                  return <Alert severity="error">{err}</Alert>;
                }
              })}
          </div>
        </Box>
      </Box>
    </Container>
  );
};

export default AuthForm;
