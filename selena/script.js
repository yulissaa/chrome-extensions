// Links to pictures of Selena
var SELENA_URLS = ['http://cdn.cnn.com/cnnnext/dam/assets/150327112800-03-selena-restricted-super-169.jpg',
                 'https://typeset-beta.imgix.net/elite-daily/2015/03/05200209/ULBbXV6.jpg',
                 'http://media.gettyimages.com/photos/selena-perez-selena-perez-by-cesare-bonazza-selena-perez-los-angeles-picture-id76406114',
                 'https://pbs.twimg.com/media/DKIyKV0WsAEOc_f.jpg',
                 'https://upload.wikimedia.org/wikipedia/en/4/40/Selena_Quintanilla-P%C3%A9rez.jpg'
                ];

// Pick out a random image from our collection.
function getRandomImage() {
    return SELENA_URLS[Math.floor(Math.random() * SELENA_URLS.length)];
}

// Get all the images on a page.
var images = document.getElementsByTagName("img");

// Replace each image with a random one.
for (var i = 0; i < images.length; i++) {
    var image = images[i];
  image.src = getRandomImage();
  console.log(image);
}