const mainUrl = '/playerphp/';

let optionPost = {
  method: 'POST',
  body: {},
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function makeRequest(
  url,
  post = false,
  options = {},
  baseUrl = mainUrl
) {
  if (post) {
    optionPost.body = JSON.stringify({ ...post });
    options = { ...optionPost };
  }

  return fetch(baseUrl + url, options).then((response) => {
    if (response.status !== 200) {
      return response.text().catch((text) => {
        throw new Error(text);
      });
    }

    return response.json();
  });
}
