import React, { useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const SearchForms = ({ onSearch }) => {
  const libraries = useSelector((state) => state.global.libraries);

  const [title, setTitle] = useState("");
  const [library, setLibrary] = useState("");

  return (
    <Grid
      container
      mb={5}
      justifyContent="center"
      alignItems="center"
      columnSpacing={2}
    >
      <Grid item lg={2}>
        <FormControl data-testid="dropdown-library" fullWidth>
          <InputLabel>Biblioteca</InputLabel>
          <Select
            data-testid="select-library"
            value={library}
            label="Biblioteca"
            onChange={(e) => setLibrary(e.target.value)}
          >
            <MenuItem value="all">Tutte le biblioteche</MenuItem>
            {libraries.map((library, index) => (
              <MenuItem key={index} value={library.id}>
                {library.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={3} sm={4}>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-required"
          label="Titolo"
          placeholder="Inserisci titolo libro..."
        />
      </Grid>
      <Grid item lg={1}>
        <Button
          size="large"
          variant="outlined"
          onClick={() => onSearch(title, library)}
        >
          SEARCH
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchForms;
