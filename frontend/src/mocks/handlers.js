import { rest } from "msw";
import { getMockBooks } from "./models/Book";
import { getMockLibraries } from "./models/Library";

export const handlers = [
  rest.get("/book/search", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        getMockBooks(["TitleA", "TitleB", "TitleC"]),
        getMockBooks(["TitleD", "TitleE", "TitleF"]),
      ])
    )
  ),
  rest.get("/book/random", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json([
        getMockBooks(["TitleA", "TitleB", "TitleC"]),
        getMockBooks(["TitleD", "TitleE", "TitleF"]),
      ])
    )
  ),
  rest.get("/library/list", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockLibraries(["MockA", "MockB"])))
  ),
  rest.post("/book/cover", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        "https://bibliotecadigitale.unicam.it/Library/DIR.CIV.-IV-B-601/DIR.CIV.-IV-B-601_0000.JPG"
      )
    )
  ),
  rest.post("/api/login", (req, res, ctx) =>
    res(ctx.status(200), ctx.set({ Authorization: "Bearer 123456abcdef" }))
  ),
  rest.post("/api/signup", (req, res, ctx) => res(ctx.status(200))),
];
