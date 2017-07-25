/* global document */
/**
 * @param {array} fromArray
 * @return {array} item
 */
export function getRandomItem(fromArray) {
  const randomIndex = Math.floor(Math.random() * fromArray.length)
  return fromArray[randomIndex];
};

/**
 * @param {string} url
 * @return {object} Promise
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
 * @param {string} path  - expects a path with leading '/'
 * @param {number} segNum - /segment-1/segment-2
 * @return {string} - 'segment-1'
 */
export function pathSegment(path, segNum){
  return path.split('/')[segNum];
}

/**
 * Replace all occurences of a string within a string
 * @param {string} target
 * @param {string} search
 * @param {string} replacement
 * @return {string}
 */
export function replaceAll(target, search, replacement) {
  return target.split(search).join(replacement);
}

/**
 * Convert 'Paragraph1\n Paragraph2' to '<p>Paragraph1</p><p>Paragraph2</p>'
 * @param {string} content
 * @return {string} withPTags
 */
export function withPTags(content){ 
  let withPTags = replaceAll(content, '\n', '</p><p>');
  withPTags = `<p>${withPTags}</p>`;
  return withPTags;
}

/**
 * Return the string as a React friendly __html object
 * @param {string} content
 * @return {string} asHtml
 */
export function asHtml(content) {
  const asHtml = { __html: content };
  return asHtml;
}