import makeRequest from './helper/makeRequest';

function sendSetting(settingsEqualizer, token) {
  return makeRequest(`sound/saveEqualizer.php`, {
    settingsEqualizer,
    token,
  });
}

function takeSetting(token) {
  return makeRequest(
    `sound/loadOtherData.php?token=${token}&mode=settingsEqualizer`
  );
}

export { sendSetting, takeSetting };
