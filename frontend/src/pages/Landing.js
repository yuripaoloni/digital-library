import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export default function Landing({ test }) {
  return (
    <ThemeProvider theme={theme}>
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
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container direction="row" spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h6" data-testid="book_header">
                        Books title
                      </Typography>
                    }
                  />
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Heading
                    </Typography>
                    <Typography>Books description</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      style={{
                        color: "#222C4A",
                      }}
                      size="small"
                    >
                      Read
                    </Button>
                    <Button
                      style={{
                        color: "#222C4A",
                      }}
                      size="small"
                    >
                      Detail
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
