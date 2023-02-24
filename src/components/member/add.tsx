import { useGlobalContext } from "@/context/store";
import projectService from "@/services/project.service";
import userService from "@/services/user.service";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export const AddMember: any = (props: { id: any }) => {
  const [userList, setUserList] = useState([]);
  const { data } = useGlobalContext();
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const getUserList = async () => {
      const res = await userService.getAll();
      setUserList(res.data);
    };
    getUserList();
  }, []);

  const handleSend = async () => {
    await projectService.addMember(+selectedUser, props.id);
  };
  if (data.role == "admin") {
    return (
      <div>
        <Autocomplete
          disableClearable
          style={{ width: 400 }}
          options={userList.map((user: any) => ({
            id: user.id,
            label: user.email,
          }))}
          onChange={(event, value) => setSelectedUser(value.id)}
          renderOption={(props: any, my_options: any) => (
            <Box component="li" {...props}>
              {my_options.label}
            </Box>
          )}
          renderInput={(params) => <TextField {...params} label="aye aye" />}
        />
        <Button onClick={handleSend}>Add Member</Button>
      </div>
    );
  } else {
    return <></>;
  }
};
