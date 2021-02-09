import React, { useEffect } from "react";
import GlobalState from "./context/GameContext";
import HomePage from "./pages/HomePage";
import GameSettings from "./pages/GameSettings";
import GameArena from "./pages/GameArena";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TeamSetUp from "./pages/TeamSetUp";
import NoCardsError from "./components/NoCardsError";
import GameRules from "./pages/GameRules";
import ReactGA from "react-ga";
import { isFromPWA } from "./utils/GlobalVariables";

const App = () => {
  const mainCache = "v0.123";

  useEffect(() => {
    const pageView = isFromPWA ? "pwa" : "/";
    ReactGA.initialize("Analytics tracking ID");
    ReactGA.pageview(pageView);

    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter((name) => {
              return name !== mainCache;
            })
            .map((cache) => caches.delete(cache))
        )
      )
      .catch((err) => {});
  }, []);

  const assets = [
    "/",
    "/index.html",
    ".htaccess",
    "/favicon.ico",
    "/rules",
    "/config",
    "/team-selection",
    "/arena",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/logo-apple.png",
    "/sw.js",
    "/manifest.json",
    "/static/css/main.chunk.css",
    "/static/js/main.chunk.js",
    "/static/js/2.chunk.js",
    "/static/js/runtime-main.js",
    "/static/media/alarm.f52fc787.mp3",
    "/static/media/dices.c7a8c5a6.png",
    "/static/media/error.7bf26524.png",
    "/static/media/loading.606c93cf.gif",
    // "/static/media/settings-icon.0762c1cf.png",
    "/static/media/warning.2586130a.svg",
  ];

  caches.open(mainCache).then((cache) =>
    assets.forEach((asset) =>
      cache
        .match(asset)
        .then((res) => {
          if (!res) {
            cache.add(asset).catch(() => {});
          }
        })
        .catch((err) => {})
    )
  );

  return (
    <GlobalState>
      <NoCardsError />
      <Router>
        <Switch>
          <Route path="/rules" exact component={GameRules} />
          <Route path="/config" exact component={GameSettings} />
          <Route path="/team-selection" exact component={TeamSetUp} />
          <Route path="/arena" exact component={GameArena} />
          <Route path="" component={HomePage} />
        </Switch>
      </Router>
    </GlobalState>
  );
};

export default App;
