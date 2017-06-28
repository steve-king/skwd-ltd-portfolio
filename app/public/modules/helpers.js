/* global document */
/**
 * @param {array}
 * @return array item
 */
export function getRandomItem(fromArray) {
  const randomIndex = Math.floor(Math.random() * fromArray.length)
  return fromArray[randomIndex];
};

/**
 * @param url {string}
 * return Promise {object}
 */
export function preloadImage(url) {
   const loaded = new Promise(
     (resolve, reject) => {
       const img = new Image(); //document.createElement('img');
       img.onload = () => resolve(url);
       img.src = url;
    },
    err => console.log(err)
  );
   return loaded;
};

export function preloadImages(imageArray) {
  const imagesLoading = imageArray.map(url => {
    return preloadImage(url);
  })

  const allLoaded = new Promise().all(imagesLoading)
    .then(
      result => result,
      err => console.log(err)
    );
  return allLoaded;
}

/**
 * @param path {string} - expects a path with leading '/'
 * @param segNum {number} - /segment-1/segment-2
 * @return {string} - 'segment-1'
 */
export function pathSegment(path, segNum){
  return path.split('/')[segNum];
}