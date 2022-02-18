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
  //console.log(idParam);
  apivideo(`http://videogame-api.fly.dev/games/platforms/${idParam}`, (error, body: string) => {
    //apivideo("http://videogame-api.fly.dev/platforms/", (error, body: string) => {
    if (error) {
      throw error;
    }
    //console.log(body);

    const apiResponse = JSON.parse(body);
    //console.log(apiResponse);

    const games = apiResponse.games;
    response.render("home", { gamesName: games, paraId: idParam });
  });
});

app.get("/test/:id_platform", (request, response) => {
  const idParams = request.params.id_platform;
  console.log(idParams);
  apivideo(`http://videogame-api.fly.dev/games/platforms/${idParams}`, (error, body: string) => {
    //apivideo("http://videogame-api.fly.dev/platforms/", (error, body: string) => {
    if (error) {
      throw error;
    }
    //console.log(body);

    const apiResponses = JSON.parse(body);
    //console.log(apiResponse);

    const game = apiResponses.games;
    response.render("test", { gamesNames: game, paraId: idParams });
  });
});

// Route test.njk
// app.get("/test/:slug_games", (request, response) => {
//   const idGames = request.params.slug_games;
//   console.log(idGames);

//   apivideo(`http://videogame-api.fly.dev/games/platforms/${idGames}`, (error, body: string) => {
//     if (error) {
//       throw error;
//     }
//     const apiTest = JSON.parse(body);
//     console.log(apiTest);

//     const platfo = apiTest.genres;
//     console.log(platfo);

//     //console.log(apiTest.platforms);
//     response.render("test", { testName: platfo, paraSlug: idGames });
//   });
// });

//Route onePlatform.njk
// app.get("/onePlatform", (request, response) => {
//   apivideo("http://videogame-api.fly.dev/platform/", (error, body: string) => {
//     if (error) {
//       throw error;
//     }
//     const apiEssais = JSON.parse(body);
//     const one = apiEssais.platforms;

//     response.render("onePlatform", { oneName: one });
//   });
// });

// locahost 3000
app.listen(3000, () => {
  console.log("server started on http://localhost:3000");
});
