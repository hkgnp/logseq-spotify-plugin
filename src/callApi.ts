import axios from "axios";

export const callApi = async () => {
  return await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player?additional_types=episode",
    headers: {
      Authorization: "Bearer " + logseq.settings.token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
};
