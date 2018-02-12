export const loadImageSizes = (files) => {
  return Promise.all( files.map( file => {
    return new Promise((resolve, reject) => {

      // Check if the file is not an image #fail-fast
      if( !file.uploadTaskSnaphot.metadata.contentType.startsWith('image')) {
        resolve(file);
      }

      // Create a new Image element
      const img = new Image();

      // Set the onload callback
      img.onload = event => {
        // Get image dimensions
        const { width, height } = event.target;

        // Save dimensions in the file item
        file.width = width;
        file.height = height;

        // resolve and return the file with the dimensions
        resolve(file);
      };

      img.onerror = () => reject('Error al cargar las dimensiones de la imagen');

      // Add the url as the src of hte image
      img.src = file.File.downloadURL;
    });
  }))
};
