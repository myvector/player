import makeRequest from './helper/makeRequest';

function listOfSound() {
  return makeRequest('sound/all.php');
}

export { listOfSound };
