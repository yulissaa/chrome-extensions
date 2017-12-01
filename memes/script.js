// Link and a percentage likelihood to replace your link.
var LINK = 'http://cdn.smosh.com/sites/default/files/styles/large/public/2016/04/krabs-meme-th.jpg?itok=q17Ija1l';
var RATIO = 0.5;

// Get all the links on the page.
var links = document.getElementsByTagName("a");

// Replace RATIO of them with Mr.Krabs.
for (var i = 0; i < links.length; i++) {
    if (Math.random() < RATIO) {
    links[i].href = LINK;
    }
}
