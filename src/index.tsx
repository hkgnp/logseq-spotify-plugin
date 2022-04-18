import "@logseq/libs";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { callApi } from "./callApi";
import { handleClosePopup } from "./handleClosePopup";

const main = () => {
  console.log("logseq-spotify-plugin loaded");

  if (!logseq.settings.token) {
    logseq.updateSettings({
      token: "",
    });
  }

  logseq.provideModel({
    async openWebPlayer() {
      // Check if token is empty in settings
      if (logseq.settings.token !== "") {
        const response = await callApi();

        if (response.status !== 200) {
          // Catch errors
          if (response.data.error.message) {
            logseq.App.showMsg(
              "Invalid access token. Please login, get the token and try again.",
              "error"
            );
          }

          ReactDOM.render(
            <React.StrictMode>
              <App />
            </React.StrictMode>,
            document.getElementById("app")
          );

          logseq.showMainUI();
        } else if (response.status === 204) {
          logseq.App.showMsg(
            "Please ensure that Spotify is running and a song is playing.",
            "error"
          );
          return;
        } else {
          // Successful reponse
          ReactDOM.render(
            <React.StrictMode>
              <App currentlyPlayingData={response.data} />
            </React.StrictMode>,
            document.getElementById("app")
          );

          logseq.showMainUI();
        }
        // CHeck if token is empty in settings
      } else {
        ReactDOM.render(
          <React.StrictMode>
            <App />
          </React.StrictMode>,
          document.getElementById("app")
        );

        logseq.showMainUI();
      }
    },
  });

  handleClosePopup();

  // Register UI
  logseq.App.registerUIItem("toolbar", {
    key: "logseq-spotify-plugin",
    template: `
                <a data-on-click="openWebPlayer" class="button">
                <i class="ti ti-brand-spotify"></i>
                </a>
          `,
  });
};

logseq.ready(main).catch(console.error);
