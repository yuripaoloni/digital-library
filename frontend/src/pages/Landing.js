import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import BookItem from "components/BookItem";
import Footer from "components/Footer";

export default function Landing({ test }) {
  const books = useSelector((state) => state.books.books);
  const loading = useSelector((state) => state.books.loading);

  return (
    <>
      <CssBaseline />
      <main data-testid={test}>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
            justifyContent: "center",
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              data-testid="main_header"
            >
              Biblioteca digitale
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
              data-testid="sub_header"
            >
              Portale online per la consultazione dei libri digitalizzati con il
              sistema BooKeeper. Scegli da un catalogo sempre a tua
              disposizione.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                style={{
                  borderRadius: 35,
                  backgroundColor: "#222C4A",
                }}
                variant="contained"
                data-testid="trova_button"
                LinkComponent={Link}
                to="/books"
              >
                Trova un Libro
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="lg">
          <Stack spacing={2}>
            {loading ? (
              Array(8)
                .fill(0)
                .map((i, index) => <BookItem key={index} book={false} />)
            ) : books.length > 0 ? (
              books[0].map((book, index) => (
                <BookItem key={index} book={book} index={index} />
              ))
            ) : (
              <Typography variant="h2" textAlign="center">
                Nessun risultato
              </Typography>
            )}
          </Stack>
        </Container>
        <Footer />
      </main>
    </>
  );
}
