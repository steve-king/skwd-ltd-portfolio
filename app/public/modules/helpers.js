/* global document */
/**
 * @param {array}
 * @return array item
 */
export function getRandomItem(fromArray) {
  const randomIndex = Math.floor(Math.random() * fromArray.length)
  console.log('RANDOM INDEX', randomIndex);
  return fromArray[randomIndex];
};

/**
 * @param url {string}
 * return Promise {object}
 */
 export function preloadImage(url) {
   const loaded = new Promise(
     (resolve, reject) => {
       // Create the image
       const img = new Image(); //document.createElement('img');
       console.log(img);
       console.log('promise called');

       // Wait for onload to fire
       img.onload = function(){
         console.log('load event');
         resolve(url);
       };
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
