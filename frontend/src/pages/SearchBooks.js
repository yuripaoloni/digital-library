import React, { useState } from "react";
import { useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PageWrapper from "components/PageWrapper";
import SearchForms from "components/SearchForms";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import BookItem from "components/BookItem";

const SearchBooks = () => {
  const [page, setPage] = useState(1);

  const loading = useSelector((state) => state.books.loading);
  const books = useSelector((state) => state.books.books);

  return (
    <PageWrapper reducer="books">
      <Grid container rowSpacing={3}>
        <Grid item xs mb={3}>
          <Typography variant="h4" textAlign="center">
            Catalogo libri
          </Typography>
        </Grid>
        <SearchForms />
        <Grid container justifyContent="center">
          <Grid item lg={9} xs={10}>
            <Stack spacing={2}>
              {loading ? (
                Array(8)
                  .fill(0)
                  .map((i, index) => <BookItem key={index} book={false} />)
              ) : books && books?.length > 0 ? (
                books[page - 1].map((book, index) => (
                  <BookItem key={index} book={book} page={page} index={index} />
                ))
              ) : (
                <Typography variant="h4" textAlign="center">
                  Nessun risultato con i parametri di ricerca inseriti
                </Typography>
              )}
            </Stack>
            <Grid container justifyContent="center" mt={2}>
              <Pagination
                page={page}
                count={books.length}
                onChange={(e, page) => setPage(page)}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageWrapper>
  );
};

export default SearchBooks;
