import axios from 'axios';
import resolveId from 'postcss-import/lib/resolve-id';

export const callApi = async () => {
  return await axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/me/player',
    headers: {
      Authorization: 'Bearer ' + logseq.settings.token,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((e) => {
      return e.response;
    });
};
