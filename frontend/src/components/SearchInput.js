import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchInput = ({ onSearch }) => {
  const [title, setTitle] = useState("");

  return (
    <Grid item lg={4} sm={4}>
      <FormControl variant="standard" fullWidth>
        <InputLabel>Cerca libro</InputLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={() => onSearch(title)}>
                {<Search fontSize="large" />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Grid>
  );
};

export default SearchInput;
