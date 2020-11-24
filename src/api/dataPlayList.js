import makeRequest from './helper/makeRequest';

function sendData(playlists, token) {
  return makeRequest(`sound/savePlayList.php`, { playlists, token });
}

function takeData(token) {
  return makeRequest(`sound/loadOtherData.php?token=${token}&mode=playlists`);
}

export { sendData, takeData };
