import makeRequest from './helper/makeRequest';

function loadTrack(token) {
  let url = 'sound/loadTrack.php';

  if (token !== null) {
    url = url + `?token=${token}`;
  }

  return makeRequest(url);
}

function takeFavoriteTrack(token) {
  let url = `sound/loadOtherData.php?token=${token}&mode=favorite`;
  return makeRequest(url);
}

function sendFavoriteTrack(favorite, token) {
  return makeRequest(`sound/saveFavoriteTrack.php`, {
    favorite,
    token,
  });
}

export { loadTrack, takeFavoriteTrack, sendFavoriteTrack };
