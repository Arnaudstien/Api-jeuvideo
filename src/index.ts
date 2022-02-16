import express from "express";
import nunjucks from "nunjucks";
import apivideo from "@fewlines-education/request";

const app = express();
nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

app.get("/", (request, response) => {
  //response.render("home");

  apivideo("http://videogame-api.fly.dev/platforms", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResponse = JSON.parse(body);
    const games = apiResponse.games;
    //console.log(games.platform);

    console.log(apiResponse);
    response.render("home", { gamesName: games });
    //response.render("home", { joke: ga });
    //response.render("home", { jokeText: joke.value });
    //response.render("home");
    //response.send(joke);
  });
});

app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
