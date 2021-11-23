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
      rowSpacing={{ xs: 2 }}
    >
      <Grid item md={2.5} sm={3} xs={5}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Seleziona biblioteca
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            data-testid="select-library"
            value={library}
            label="Seleziona biblioteca"
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
      <Grid item lg={3.5} sm={5} xs={5}>
        <TextField
          data-testid="input-title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="outlined-required"
          label="Titolo"
          placeholder="Inserisci titolo libro..."
        />
      </Grid>
      <Grid item lg={1} md={1.5} sm={2} xs={10}>
        <Grid container justifyContent="center">
          <Button
            data-testid="search-button"
            size="large"
            variant="outlined"
            onClick={() => onSearch(title, library)}
          >
            CERCA
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SearchForms;
