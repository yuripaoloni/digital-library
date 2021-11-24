import React from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import PageWrapper from "components/PageWrapper";
import SearchForms from "components/SearchForms";
import BookItems from "components/BookItems";

const SearchBooks = () => {
  return (
    <PageWrapper>
      <Grid container rowSpacing={3} mt={3}>
        <Grid item xs mb={3}>
          <Typography variant="h4" textAlign="center">
            Catalogo libri
          </Typography>
        </Grid>
        <SearchForms />
        <BookItems />
      </Grid>
    </PageWrapper>
  );
};

export default SearchBooks;
