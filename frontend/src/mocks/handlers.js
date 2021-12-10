import { rest } from "msw";
import { getMockBooks } from "./models/Book";
import { getMockLibraries } from "./models/Library";
import { getMockNotes } from "./models/Note";

export const handlers = [
  rest.get("/library/list", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockLibraries(["MockA", "MockB"])))
  ),
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
  rest.post("/book/cover", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        "https://bibliotecadigitale.unicam.it/Library/DIR.CIV.-IV-B-601/DIR.CIV.-IV-B-601_0000.JPG"
      )
    )
  ),
  rest.post("/login", (req, res, ctx) =>
    res(ctx.status(200), ctx.set({ Authorization: "Bearer 123456abcdef" }))
  ),
  rest.post("/signup", (req, res, ctx) => res(ctx.status(200))),
  rest.post("/book/page", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        "https://bibliotecadigitale.unicam.it/Library/B.G.5-4/B.G.5-4_0000.JPG"
      )
    )
  ),
  rest.post("/note/add", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockNotes(["CreateMockNote"])))
  ),
  rest.post("/note/edit", (req, res, ctx) => {
    req.body = getMockNotes(["MockNote"]);
    return res(ctx.status(200), ctx.json(getMockNotes(["EditMockNote"])));
  }),
  rest.post("/note/all", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(getMockNotes(["MockNote", "MockNote", "MockNote"]))
    )
  ),
  rest.delete("/note/delete", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockNotes("MockNote")))
  ),
];
