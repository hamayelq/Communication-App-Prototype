import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  FormControl,
  InputLabel,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  //put everything in grids eventually, shit in cards?
  return (
    <div>
      <div>
        <Grid
          container
          direction="column"
          spacing={3}
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Join Chat
            </Typography>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel htmlFor="my-input">Name</InputLabel>
              <Input
                id="nameInput"
                type="text"
                onChange={(event) => setName(event.target.value)}
              />
              <FormControl>
                <InputLabel htmlFor="my-input">Room</InputLabel>
                <Input
                  id="roomInput"
                  type="text"
                  onChange={(event) => setRoom(event.target.value)}
                />
              </FormControl>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Link
              //don't let user join without name/room
              onClick={(event) =>
                !name || !room ? event.preventDefault() : null
              }
              to={`/chat?name=${name}&room=${room}`}
              style={{ textDecoration: "none" }}
            >
              <Button id="signIn" variant="contained" fullWidth={true}>
                Sign In
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Join;
