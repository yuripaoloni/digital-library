import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PageWrapper from "components/PageWrapper";
import SearchForms from "components/SearchForms";
import BookItems from "components/BookItems";

import { getBooks } from "api/index";
import useAlert from "hooks/use-alert";

const SearchBooks = () => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);

  const { alert, alertMessage, closeAlert, showAlert } = useAlert(setLoading);

  const fetchBooks = async (title, libraryId) => {
    setLoading(true);
    try {
      const res = await getBooks(title, libraryId);
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
      <Grid container rowSpacing={3} mt={3}>
        <Grid item lg={12} mb={3}>
          <Typography variant="h4" textAlign="center">
            Catalogo libri
          </Typography>
        </Grid>

        <SearchForms onSearch={fetchBooks} />

        <BookItems loading={loading} books={books} />
      </Grid>
    </PageWrapper>
  );
};

export default SearchBooks;
