import makeRequest from './helper/makeRequest';

function oneTrackDataTake(id) {
  return makeRequest(`sound/trackData.php?id=${id}`);
}

function takeAllDataTheTrack(id) {
  return makeRequest(`sound/takeAllDataTheTrack.php?id=${id}`);
}

export { oneTrackDataTake, takeAllDataTheTrack };
