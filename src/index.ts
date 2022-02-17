import express from "express";
import nunjucks from "nunjucks";
import apivideo from "@fewlines-education/request";

const app = express();
nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

//Route Home.njk affiche 20 jeux
app.get("/home", (request, response) => {
  apivideo("http://videogame-api.fly.dev/games/", (error, body: string) => {
    //apivideo("http://videogame-api.fly.dev/platforms/", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResponse = JSON.parse(body);
    const games = apiResponse.games;
    response.render("home", { gamesName: games });
  });
});
//Route platform.njk affiche platform
app.get("/", (request, response) => {
  apivideo("http://videogame-api.fly.dev/platforms/", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResp = JSON.parse(body);
    const platforms = apiResp.platforms;
    //console.log(platforms);

    response.render("platform", { platName: platforms });
  });
});

app.get("/test", (request, response) => {
  apivideo("http://videogame-api.fly.dev/genres", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiTest = JSON.parse(body);
    const platfo = apiTest.genres;
    console.log(platfo);

    console.log(apiTest.platforms);
    response.render("test", { testName: platfo });
  });
});
app.get("/onePlatforme", (request, response) => {
  apivideo("http://videogame-api.fly.dev/platforms", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiEssais = JSON.parse(body);
    const one = apiEssais.genres;

    response.render("onePlatform", { oneName: one });
  });
});

// locahost 3000
app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
