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
      console.log('error');
      console.log(error);
      response = { error };

    } else {
      console.log('body');
      console.log(body);
      response = { body };
    }


    if(typeof callback === 'function') {
      callback(response);
    }

  });


}
