import Vimeo from 'vimeo';

export const getVimeoData = (id, callback) => {
  const vimeo = new Vimeo.Vimeo(
    process.env.REACT_APP_VIMEO_CLIENT_ID,
    process.env.REACT_APP_VIMEO_CLIENT_SECRET,
    process.env.REACT_APP_VIMEO_ACCESS_TOKEN
  );

  vimeo.request({
    path: `/me/videos/${id}`,
  }, (error, body, status_code, headers) => {

    let response = {};

    if (error) {
      console.log('error', error);
      response = { error };
    } else {
      response = { body };
    }

    if(typeof callback === 'function') {
      callback(response);
    }

  });

}

export const parseVimeoRedirectUrl = (url, callback) => {
  let response = url;
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(e) {
    if (xhr.status === 200 && xhr.readyState === 2) { // readyState 2 = HEADERS_RECEIVED
      if (url !== xhr.responseURL) { // Redirect detected
        response = xhr.responseURL.replace('&download=1',''); // Remove the download parameter
      }

      xhr.abort();

      if (typeof callback === 'function') {
        callback(response);
      }
    }
  }

  xhr.open('GET', url, true);
  xhr.send();
}
