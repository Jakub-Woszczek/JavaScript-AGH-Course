/**
 * @author Stanisław Polak <polak@agh.edu.pl>
 */
import { Application, Context, Router } from "jsr:@oak/oak/";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";

interface Entry {
  name: string;
  content: string;
}

const DATA_FILE = `${Deno.cwd()}/guestbook/src/data/entries.json`;

async function readEntries(): Promise<Entry[]> {
  try {
    const data = await Deno.readTextFile(DATA_FILE);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}


async function addEntry(entry: Entry): Promise<void> {
  const entries = await readEntries();
  entries.push(entry);
  await Deno.writeTextFile(DATA_FILE, JSON.stringify(entries, null, 2));
}

// Initiate app
const app: Application  = new Application();
const router: Router = new Router({
  //prefix: "/admin",
});
const eta: Eta = new Eta({ views: `${Deno.cwd()}/guestbook/src/templates` });

// Allowing static file to fetch from server

// app.use(async (ctx: Context, next) => {
//   try {
//     await ctx.send({
//       root: `${Deno.cwd()}/public`,
//       index: "index.html",
//     });
//   } catch {
//     await next();
//   }
// });


// Creating Routes
console.log("CWD:", Deno.cwd());

router
  .get("/",async (ctx: Context) => {
    const entries = await readEntries();
    const res: string = eta.render("guestbook", {
      title: "Guestbook",
      entries,
    });
    ctx.response.body = res;
  })
  .post("/", async (ctx: Context) => {
    const reqBodyForm: URLSearchParams = await ctx.request.body.form();
    const name = reqBodyForm.get("name") ?? "Anonymous";
    const content = reqBodyForm.get("content") ?? "";

    if (content.trim().length > 0) {
      await addEntry({ name, content });
    }

    // Po dodaniu przekierowujemy do strony głównej (GET /)
    ctx.response.redirect("/");
  });

// Adding middlewares
app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

// Making app to listen to port
console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });