import { Application, Context, Router } from "jsr:@oak/oak";
import { Eta } from "https://deno.land/x/eta/src/index.ts";
import logger from "https://deno.land/x/oak_logger/mod.ts";
import { MongoClient } from "npm:mongodb@5.6.0";

const MONGODB_URI="mongodb://127.0.0.1:27017"
const DB_NAME="AGH"

if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set");
  Deno.exit(1);
}

const client = new MongoClient(MONGODB_URI);
try {
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
  Deno.exit(1);
}

const db = client.db(DB_NAME);
const todos = db.collection("students");

const eta: Eta = new Eta({ views: `${Deno.cwd()}/mongoDB/views` });

const router = new Router();
router.get("/", async (ctx: Context) => {
  const entries = await todos.find({}).toArray();
  console.log("Entries from database:", entries);
  const html: string = eta.render("index", {
    title: "Zawartość bazy danych",
    entries,
  });
  ctx.response.body = html;
});

const app = new Application();
app.use(logger.logger);
app.use(logger.responseTime);
app.use(router.routes());
app.use(router.allowedMethods());

console.log("App is listening to port: 8000");
await app.listen({ port: 8000 });
