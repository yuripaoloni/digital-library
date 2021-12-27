import { rest } from "msw";
import { getMockBooks } from "./models/Book";
import { getMockBookmark } from "./models/Bookmark";
import { getMockGroup } from "./models/Group";
import { getMockLibraries } from "./models/Library";
import { getMockNotes } from "./models/Note";
import { getMockUser } from "./models/User";

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
    res(
      ctx.status(200),
      ctx.set({ Authorization: "Bearer 123456abcdef" }),
      ctx.json(getMockUser())
    )
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
  rest.post("/note/add", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(getMockNotes(["CreateMockNote"], 1)[0])
    );
  }),
  rest.post("/note/edit", (req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.post("/note/all", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(getMockNotes(["MockNote", "MockNote", "MockNote"]))
    )
  ),
  rest.delete("/note/delete/:id", (req, res, ctx) => res(ctx.status(200))),
  rest.post("/bookmark/add", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockBookmark([req.body.description])[0]))
  ),
  rest.post("/bookmark/edit", (req, res, ctx) => res(ctx.status(200))),
  rest.post("/bookmark/all", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(
        getMockBookmark(["MockBookmarkA", "MockBookmarkB", "MockBookmarkC"])
      )
    )
  ),
  rest.delete("/bookmark/delete/:id", (req, res, ctx) => res(ctx.status(200))),
  rest.get("/user/search", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockUser()))
  ),
  rest.post("/group/create", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockGroup([req.body.name])[0]))
  ),
  rest.get("/group/created", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(getMockGroup(["MockCreatedGroup1", "MockCreatedGroup2"]))
    )
  ),
  rest.delete("/group/created/:id", (req, res, ctx) => res(ctx.status(200))),
  rest.post("/group/edit/:id", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockGroup([req.body.name])[0]))
  ),
  rest.delete("/group/created/:id/remove", (req, res, ctx) =>
    res(ctx.status(200), ctx.json(getMockGroup(["MockGroup"], true)[0]))
  ),
  rest.delete("/group/joined/:id", (req, res, ctx) => res(ctx.status(200))),
  rest.get("/group/joined", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(getMockGroup(["MockJoinedGroup1", "MockJoinedGroup2"]))
    )
  ),
  rest.get("/book/saved", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json(getMockBooks(["MockSavedBook1", "MockSavedBook2"]))
    )
  ),
  rest.delete("/book/saved/delete", (req, res, ctx) => res(ctx.status(200))),
  rest.post("/book/saved/add", (req, res, ctx) => res(ctx.status(200))),
];
