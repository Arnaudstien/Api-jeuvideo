import express from "express";
import nunjucks from "nunjucks";
import apivideo from "@fewlines-education/request";

const app = express();
nunjucks.configure("views", { autoescape: true, express: app });

app.set("view engine", "njk");

//Route platform.njk au clic renvoi a la page home
app.get("/", (request, response) => {
  apivideo("http://videogame-api.fly.dev/platforms/", (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResp = JSON.parse(body);
    const platforms = apiResp.platforms;
    response.render("platform", { platName: platforms });
  });
});

//Route Home.njk aaffiche liste jeu
app.get("/home/:id_platform", (request, response) => {
  const idParam = request.params.id_platform;
  apivideo(`http://videogame-api.fly.dev/games/platforms/${idParam}`, (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResponse = JSON.parse(body);
    const games = apiResponse.games;
    response.render("home", { gamesName: games, paraId: idParam });
  });
});

//Route test.njk affiche
app.get("/home/twoPlatform/:id", (request, response) => {
  const idParams = request.params.id;
  console.log("££££££££idParams£££££££", idParams);

  apivideo(`http://videogame-api.fly.dev/games/${idParams}`, (error, body: string) => {
    if (error) {
      throw error;
    }
    const apiResp = JSON.parse(body);
    console.log("*************apiResp****************", apiResp);
    const playgames = apiResp.id;
    console.log("******************************", playgames);
    response.render("twoPlatform", { twoName: playgames, parId: idParams });
  });
});

app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
