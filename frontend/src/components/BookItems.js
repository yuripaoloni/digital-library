import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Logo from "assets/sample.jpg";

const Img = styled("img")({
  height: 100,
});

const BookItems = ({ loading, books }) => {
  const [page, setPage] = useState(1);

  return (
    books.length > 0 && (
      <Grid container justifyContent="center">
        <Grid item lg={9} xs={10}>
          <Stack spacing={2}>
            {books[page - 1].map((book, index) => (
              <Paper
                data-testid={`book-item-${index}`}
                key={index}
                elevation={4}
                sx={{ px: 2 }}
              >
                <Grid
                  container
                  alignItems="center"
                  mt={1.5}
                  mb={0.5}
                  columnSpacing={2}
                >
                  <Grid item lg={1} md={1.5} sm={2} xs>
                    {loading ? (
                      <Skeleton variant="rectangular" height={100} />
                    ) : (
                      <Img src={Logo} />
                    )}
                  </Grid>
                  <Grid item md={6} sm={10}>
                    {loading ? (
                      <>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h6"
                          style={{ wordWrap: "break-word" }}
                        >
                          {book.title}
                        </Typography>
                        <Typography variant="subtitle2">
                          {book.author}
                        </Typography>
                      </>
                    )}
                  </Grid>
                  <Grid item md={3} sm={8}>
                    {loading ? (
                      <Skeleton variant="text" />
                    ) : (
                      <Typography variant="subtitle1">{`${book.plot}, ${book.year}`}</Typography>
                    )}
                  </Grid>
                  <Grid item lg={2} md={1.5} sm={4}>
                    {loading ? (
                      <Skeleton variant="rectangle" />
                    ) : (
                      <Grid container justifyContent="center">
                        <Button>Leggi</Button>
                        <Button>Dettagli</Button>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))}
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
    )
  );
};

export default BookItems;
