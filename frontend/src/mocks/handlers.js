import { rest } from "msw";

export const handlers = [
  rest.get("/api/books", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "2",
          name: "addsfs",
        },
      ])
    );
  }),
];
