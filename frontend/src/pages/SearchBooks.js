import React, { useState } from "react";
import { Typography, Grid } from "@mui/material";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import FormHelperText from "@mui/material/FormHelperText";

import { getBooks } from "api/index";
import useAlert from "hooks/use-alert";

import PageWrapper from "components/PageWrapper";
import SearchInput from "components/SearchInput";
import BookItem from "components/BookItem";
import { useSelector } from "react-redux";

const SearchBooks = () => {
  const libraries = useSelector((state) => state.global.libraries);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const [value, setValue] = useState(false);

  const { alert, alertMessage, closeAlert, showAlert } = useAlert(setLoading);

  const fetchBooks = async (title) => {
    setLoading(true);
    try {
      const res = await getBooks(title);
      setBooks(res.data);
      setLoading(false);
    } catch (err) {
      showAlert(
        "Errore durante il recupero dei dati. Prova di nuovo.",
        "error"
      );
    }
  };

  return (
    <PageWrapper alert={alert} alertMessage={alertMessage} onClose={closeAlert}>
      <Grid container rowSpacing={3} px={4} mt={3} align="center">
        <Grid item xs={12}>
          <Typography variant="h4">Catalogo libri</Typography>
        </Grid>
        <Grid container mb={5} justifyContent="center" columnSpacing={2}>
          <Grid item lg={3} sm={2}>
            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel id="demo-simple-select-helper-label">
                Biblioteca
              </InputLabel>
              <NativeSelect
                value={value}
                label="Biblioteca"
                onChange={(e) => setValue(e.target.value)}
                inputProps={{
                  name: "library",
                  id: "uncontrolled-native",
                }}
              >
                <option value="all">Tutte le biblioteche</option>
                {libraries.map((library) => (
                  <option value={library.id}>{library.name}</option>
                ))}
              </NativeSelect>
              <FormHelperText>Seleziona biblioteca</FormHelperText>
            </FormControl>
          </Grid>
          <SearchInput onSearch={fetchBooks} />
        </Grid>
        <Grid container mb={5} justifyContent="center" spacing={2}>
          {books.map((book, index) => (
            <BookItem key={index} book={book} />
          ))}
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default SearchBooks;
