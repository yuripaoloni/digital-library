import React from "react";
import Logo from "assets/sample.jpg";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Link,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  height: 100,
});

const BookItem = ({ book }) => {
  return (
    <Grid item xs={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Img alt="book-logo" src={Logo} />
          <Typography variant="h5" component="div">
            {book.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {book.author}
          </Typography>
          <Typography variant="body2">
            <Link href={book.library.url}>{book.library.name}</Link>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Dettagli</Button>
          <Button size="small">Leggi</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default BookItem;
