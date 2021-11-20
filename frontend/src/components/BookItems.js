import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Pagination from "@mui/material/Pagination";
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
        <Grid item lg={8}>
          <Stack divider={<Divider />}>
            {books[page - 1].map((book, index) => (
              <Grid
                key={index}
                container
                alignItems="center"
                columnSpacing={2}
                mt={1.5}
                mb={0.5}
              >
                <Grid item lg={1}>
                  {loading ? (
                    <Skeleton variant="rectangular" height={100} />
                  ) : (
                    <Img src={Logo} />
                  )}
                </Grid>
                <Grid item lg={6}>
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
                      <Typography variant="subtitle2">{book.author}</Typography>
                    </>
                  )}
                </Grid>
                <Grid item lg={2}>
                  {loading ? (
                    <>
                      <Skeleton variant="text" />
                      <Skeleton variant="text" width="60%" />
                    </>
                  ) : (
                    <>
                      <Typography variant="subtitle1">{book.title}</Typography>
                      <Typography variant="subtitle2">{book.title}</Typography>
                    </>
                  )}
                </Grid>
                <Grid item lg={2}>
                  {loading ? (
                    <>
                      <Skeleton variant="rectangle" />
                    </>
                  ) : (
                    <>
                      <Button variant="outlined">Leggi</Button>
                      <Button variant="outlined" sx={{ ml: 2 }}>
                        Dettagli
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
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
