import express from "express";
import nunjucks from "nunjucks";
import apivideo from "@fewlines-education/request";

const app = express();
nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

app.get("/", (request, response) => {
  //response.render("home");

  apivideo("https://videogame-api.fly.dev/games", (error, body: string) => {
    if (error) {
      throw error;
    }
    const joke = JSON.parse(body);
    console.log(joke.games);
    //response.render("home", { joke: ga });
    //response.render("home", { jokeText: joke.value });
    response.render("home");
    //response.send(joke);
  });
});
// app.get("/", (request, response) => {
//   response.send("ok");
// });
app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
