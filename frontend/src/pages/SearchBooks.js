import React, { useState } from "react";
import {
  Typography,
  Grid,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

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
        <Grid item md={12}>
          <Typography variant="h3">Catalogo libri</Typography>
        </Grid>
        <Grid item md={12} mb={5}>
          <SearchInput onSearch={fetchBooks} />
        </Grid>
        <Grid item md={3}>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h5">Filtri</Typography>
            <FormGroup>
              {libraries.map((library, index) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={false} /*onChange={} */ />}
                  label={library.name}
                />
              ))}
            </FormGroup>
          </Stack>
        </Grid>
        <Grid item md={8}>
          <Grid container spacing={2}>
            {books.map((book, index) => (
              <BookItem key={index} book={book} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default SearchBooks;
