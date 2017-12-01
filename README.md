<a id="top"></a>
# How to Build a Chrome Extensions

*Improve your browser experience.*

Updated by [Yulissa Arroyo-Paredes][yulissaa18]. Original version was written and developed by [Matt Piccolella][matt-pic] and [ADI][adi]. The GitHub repository for this talk is available [here][github-repo].

Credit to [Chrome Developer] [chrome-developer].

**Download the sample code [here][code-link].**

## Getting Started: FAQs

### What is a Chrome Extension?
From Google Chrome's website, Chrome extensions "allow you to add functionality to Chrome without diving deeply into native code." The uses of Chrome extensions are infinite, they range from...
  - Helpful: [blocks ads that would appear on a page][ad-block]
  - Silly: [adds some much-needed doge to your webpages][doge]
  - Empowering: [suggests black-owned businesses][buy-black]
  - Accessibility focused: [tools to help with web accessibility development for blind users][chrome-lens]

### Why should I build Chrome extensions?
Chrome extensions are fun, fast, and easy! Using just a few lines of beginner JavaScript code, you can make something that can make people's lives easier, or something that will make them laugh.

### What will this tutorial teach me?
This tutorial will teach you the basics of Chrome extensions: 
  - what files you'll need
  - what goes in each file
  - how to use it in your Chrome browser
After the tutorial, you will have several Chrome extensions that you can use and hopefully you'll be inspired to make your own!

## Using this Document
The start of this document walks you through building a Chrome extension and launching it on your browser. After you've gotten your 'Hello World' extension done, we'll give you some examples of things you can do with your Chrome extensions. From there, it's all up to your own creativity!

## Table of Contents
-   [1.0 Your First Chrome Extension](#first-extension)
    - [1.1 `manifest.json`](#manifest)
    - [1.2 Writing your JavaScript](#javascript)
    - [1.3 Using your Extension](#using-extension)
-   [2.0 Examples](#examples)
    - [2.1 Image Replacement](#image-replace)
    - [2.2 Text Replacement](#text-replace)
    - [2.3 Link Replacement](#link-replace)
    - [2.4 Other Things](#other-things)
-    [3.0 More Advanced Topics](#advanced)
    - [3.1 Background Scripts](#background)
    - [3.2 Browser Actions](#browser_action)
    - [3.3 Message Passing](#messaging)
-   [Additional Resources](#additionalresources)

------------------------------
<a id="first-extension"></a>
## 1.0 Your First Chrome Extension
Building a Chrome extension is surprisingly easy, and takes just a few pieces of understanding. You'll need at least two files, all of which are written in the familiar HTML, CSS, and JavaScript languages that the rest of the web is written in. This is wonderful because we won't need to worry about any of the internals of Chrome, which can be quite complicated, in order to get our apps working.

<a id="manifest"></a>
### 1.1 `manifest.json`
One of our files must be `manifest.json`. This file is a small file which provides some details about what the Chrome extension is: things like name, version number, a description of what your extension does, what images/scripts you'll be using, etc. This is generally just a few lines long, and contains just a few details. Here is a simple manifest file:

```javascript
{
  "manifest_version": 2,
  "name": "My First Chrome Extension",
  "version": "1.0",
  "description": "The very first chrome extension I've ever written!",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

Let's go through this piece by piece.

1. `manifest_version`: This is the version of the manifest specification we're using, basically just describing what format of the file we're currently using. **This will always be 2, for our purposes.**
2. `name`: The name of our Chrome extension. Be creative!
3. `version`: A string to represent the version of our application. Generally a good idea to start with `1.0` or `1.0.0`, but this is purely descriptive.
4. `description`: The description of your extension. This let's your users know what they're in for, so it's best to be descriptive.
5. `content_scripts`: This field is the first of the ones we've seen that is **optional**. Content scripts allow us to specify some scripts that we want to run in the browser context, which basically means we have access to the [DOM][dom], or the HTML elements of the page. 
    1. We use `matches` to provide a regular expression for websites we'd match: `*://*/*` matches all websites! However, say we only wanted this to happen on Google websites, we could provide `http://www.google.com/*`. We can also provide more than one of these.
    2. We use `js` to provide the scripts we want to run. For example, here we provide the file name `script.js`, which tells the browser that we will be providing a file `script.js` that the browser will run. **We will create this file in the next section.
    3. We use `run_at` to tell the browser when the script should execute. In this case, we want to run it at `document_end`, which means once the entire page has loaded.

This is just one simple `manifest.json` file. There are lots of other attributes you can set, such as [`background`][background], which allows us to run a single script in the background, [`permissions`][permissions], which allow us to ask the user for certain things we may not be able to do withour permission, and [`browser_action`][browser-action], which creates small icons next to the search bar that you can click and have something happen. However, `content_scripts` is what we'll mainly be looking in this tutorial.

<a id="javascript"></a>
### 1.2 Writing your JavaScript
In the same directory that you have your `manifest.json` file, now create a new file and call it `script.js`; remember, this is the name that we used in our `manifest.json` file, so we're now going to create that script. Now our directory, which I've called `first-chrome-extension`, has our two files:

```
manifest.json script.js
```

Inside of `script.js`, put the following line:

```javascript
console.log("My first chrome extension!");
```

That's it! With this simple line of JavaScript, we can prove that we have a working Chrome extension, which will print `My first chrome extension!` in the JavaScript console on every page that you load.

<a id="using-extension"></a>
### 1.3 Using your Extension
Let's run `first-chrome-extension` now. To do this, you're going to need to open Chrome (install [here][chrome-install] if you haven't already). 

Next, visit `chrome://extensions` by typing it into the toolbar and pressing enter (or selecting `More Tools > Extensions` from the Chrome menu).Once you've done this, make sure the option for `Developer mode` in the top-right corner is selected, as follows:

![Developer Mode](https://dl.dropboxusercontent.com/s/gtz78ws5pxyi0c0/extensions.png)

Once this is checked, select the option for `Load unpacked extension...`. In the dialogue that appears, select the directory in which you have been keeping your files, for me `first-chrome-extension`. Once you've done this, your Chrome extension is installed!

To try it out, try visiting a website, like `https://google.com`. Once you've done this, open up your JavaScript console (`More Tools > JavaScript Console` or `Alt-Command-J`). You should see the following:

![First Extension](https://dl.dropboxusercontent.com/s/2ihtch3i6qmklio/first-chrome-extension.png)

Congrats! You've created your first Chrome extension! 

<a id="examples"></a>
## 2.0 Examples
Now that we know how to create the simplest Chrome extension, we can start thinking about other things we're going to be doing. We'll provide three examples of (funny) applications that all deal with DOM manipulation, which is manipulating elements that already exist on the page. **There are other types of Chrome extensions then the `content_scripts` examples we provide in these examples; we'll discuss those in [section 2.4](#other-things).

<a id="image-replace"></a>
### 2.1 Image Replacement
It is a known fact that Selena's smile was incredibly contagious. There was a [Google Doodle][selena-doodle] recently that celebrated this icon! So we should add more pictures of her to our browser! 

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Selena",
  "version": "1.0",
  "description": "Replace all the images on a webpage with pictures of Selena!",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
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
```

Replace the links in our `SELENA_URLS` array with links to any pictures you'd like, and watch your browsing experience transform!

<a id="text-replace"></a>
### 2.2 Text Replacement
You've heard of [Cloud-to-Butt][cloud-to-butt]. Let's make our own! Maybe I want to change `Beyoncé` to `My Queen`, or `Michelle Obama` to `My President`. The possibilities are endless!

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Text Replacement",
  "version": "1.0",
  "description": "Sample application that will replace text on webpages.",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
var ELEMENT = 1;
var DOCUMENT = 9;
var DOCUMENT_FRAGMENT = 11;
var TEXT = 3;

// Enter things that you'd like to replace
var MATCH = ['Beyonce','Michelle Obama'];
var REPLACE = ['My Queen','My President'];

walk(document.body);

function walk(node) {
    // Function from here for replacing text: http://is.gd/mwZp7E
    
    var child, next;

    switch (node.nodeType) {
        case ELEMENT:  // Element
        case DOCUMENT:  // Document
        case DOCUMENT_FRAGMENT: // Document fragment
            child = node.firstChild;
            while (child) {
                next = child.nextSibling;
                walk(child);
                child = next;
            }
            break;

        case TEXT: // Text node
            replaceText(node);
            break;
    }
}

function replaceText(textNode) {
    var v = textNode.nodeValue;

    // Go through and match/replace all the strings we've given it, using RegExp.
    for (var i = 0; i < MATCH.length; i++) {
        v = v.replace(new RegExp('\\b' + MATCH[i] + '\\b', 'g'), REPLACE[i]);
    }

    textNode.nodeValue = v;
}
```

All you need to do to have all the text-replace goodness you want is change the arrays at the top of the script.

You may notice that our text doesn't replace the lowercase version of 'Michelle Obama.' Or that 'Beyoncé' doesn't get replaced either. To change this, you have a few options. The first, which is likely the expected behavior, would be to simply add more pairs to `MATCH` and `REPLACE` i.e. add 'michelle obama' to `MATCH` and `my president` to `REPLACE`. But we don't want to add every varition of this string, so how would you change the RegExp to include some of additional strings with essentially the same meaning?

<a id="link-replace"></a>
### 2.3 Link Replacement
Meme culture is real. Let's make a certain percentage of the links on every page redirect to the [Mr.Krabs meme][meme].

`manifest.json`
```javascript
{
  "manifest_version": 2,
  "name": "Memes Memes Memes",
  "version": "1.0",
  "description": "Application that replaces all links with a link to a meme.",
  "content_scripts": 
  [
    {
      "matches": ["*://*/*"],
      "js": ["script.js"],
      "run_at": "document_end"
    }
  ]
}
```

`script.js`
```javascript
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
```

Click with care people!

<a id="other-things"></a>
### 2.4 Other Things
This is just one simple `manifest.json` file. There are lots of other attributes you can set, such as [`background`][background], which allows us to run a single script in the background, [`permissions`][permissions], which allow us to ask the user for certain things we may not be able to do withour permission, and [`browser_action`][browser-action], which creates small icons next to the search bar that you can click and have something happen. However, `content_scripts` is what we'll mainly be looking in this tutorial.

Those are the basics though, you did it! 

<a id="advanced"></a>
## 3.0 More Advanced Topics
Chrome extensions provide all sorts of functionality beyond the functionality described above. You can explore more advanced topics on the [Chrome Developer Website][chrome-developer]. Here are some that are definitely worth taking a look at!

<a id="background"></a>
### 3.1 Background Pages
So far, we've been working with content scripts, which are linked to individual pages. They can be loaded and run at different times in the page's life; for example, when the page first loads, or when it's about to be presented. However, it will useful for certain applications to have a single script that runs across the entire lifetime of an extension; rather than having the script run once for every page, we can just have one script that runs when the extension is first loaded.

As a result, Chrome extensions provide us with something called [background pages][background-pages]. A background page is essentially a single dummy page that runs in the extension process that exists for the entire lifetime of the process. In order to utilize the background page, we must first make a change to our `manifest.json` file:

```javascript
{
  "name" : "My extension",
  ...
  "background": {
    "scripts" : ["background.js"]
  },
  ...
}
```

By adding this, we'll have a new background page created by the extension that is associated with each of our scripts. To try this out, create a new file called `background.js` and add a single line:

```javascript
console.log("I am in the background.");
```

Reload your page, and check your console for the print message. You won't see the printed statement. So what gives? Well, as we saw before, the background page is not linked to any specific page, which explains why we're not seeing it in the individual tab's console. Instead, it'll be linked to the extension's background page.

To view the background page, go to `chrome://extensions`. Once you reload your extension, there should be a new part of your chrome extension that says "Inspect views: background page." Click 'background page', and a new console should show up that shows our "I am in the background" message! Thus, we see that the background page is linked to the application and not the tab.

<a id="browser_action"></a>
### 3.2 Browser Actions
You may be used to using Chrome extensions that have icons next to your search bar. We can customize these images, add tooltips, and respond to clicks to the button by user [browser actions][browser-actions].

Just as before, to add a browser action, we simply add a new JSON object to our `manifest.json`:

```javascript
{
  "name" : "My extension",
  ...
  "browser_action": {
    "default_icon": "icon.png",
    "default_title": "My extension",
    "default_popup": "popup.html"
  },
  ...
}
```

By adding this, we can customize the icon that gets added to the Chrome toolbar for our extension. `default_icon` allows us to set a custom icon; to do this, simple add an icon to your extension directory and refer to it by name here. `default_title` allows us to change the tooltip that we see when we hover over the icon. `default_popup` allows us to define an HTML page that will show when we click the icon; this is for applications where you might want to allow the user to fill out some form when they click on your icon.

We can also, somewhat more interestingly, add listeners for clicks to our icon. If we want to set a listener for a click to our icon, we can use the following code segment:

```javascript
// Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(function(tab) {
  ...
});
```

As we will see in a moment, this function will be called from our background script. The parameter, `tab`, refers to the tab that was open when the button was pressed; thus, this is a way for us to be able to interact with the contents of a page from the background of our application.

<a id="messaging"></a>
### 3.3 Message Passing
Imagine you want to do something to the page you're currently viewing when you click on the extension's icon. This is a very common task; later, we'll change all the images on the page when we click the icon. However, before when we were discussing background pages, we learned that we have only one page running for the entire extension. Similarly, we only have one icon for the entire application; we don't get a new icon for each new tab. Thus, this means that our icon is handled by our `background.js` script, while our current page is handled by our `script.js` script, our content script. So, if we want to be able to change the current page in response to a click of the icon, we're going to need some way for these two scripts to interact.

For this, we will use a technology called [message passing][message-passing]. Message passing essentially allows us to send messages from the background of our script to the content (each browser page) of our browser. To send a message from the content to the background, we simply call this:

```javascript
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response);
})
```

Thus, from any one of our pages, we can send data from the client to the background. We then get a callback function that runs when the message has been successfully returned. Similarly, we can send a message from the background to any one of our pages by using a different API:

```javascript
chrome.tabs.sendMessage(tab.id, {greeting: "hello"}, function(response) {
  console.log(response);
});
```

However, as we see here, we have to provide a tab ID. This is because, as we saw before, there is one background page but many content pages; so, in order for the background to send to a content page, it needs to know which of the many content pages it needs to send the message to (there are ways of finding the tab ID for the tab that you're interested in though!)

___________

<a id="additionalresources"></a>
## Additional Resources
If you want to learn more about how to build awesome Chrome extensions, check out these resources:

- [Sample Extensions][samples]
- [Boiler Plate to Start][extensionizr]
- [jQuery and DOM Manipulation][jquery]
- [Inspiration][inspiration]
- [ADI Resources][learn]

[cloud-to-butt]: https://chrome.google.com/webstore/detail/cloud-to-butt-plus/apmlngnhgbnjpajelfkmabhkfapgnoai
[ad-block]: https://chrome.google.com/webstore/detail/betafish-adblocker/gighmmpiobklfepjocnamgkkbiglidom
[doge]: https://chrome.google.com/webstore/detail/libdoge/ifbchccfedjkkhlnffjckaghjdpchhmo
[adi]: https://adicu.com
[sample-code]: http://google.com
[yulissaa18]: https://twitter.com/YulissaA18
[matt-pic]: https://twitter.com/matthew_pic
[github-repo]: https://github.com/yulissaa/chrome-extensions
[chrome-developer]: https://developer.chrome.com/extensions
[dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
[background]: https://developer.chrome.com/extensions/event_pages
[permissions]: https://developer.chrome.com/extensions/activeTab
[browser-action]: https://developer.chrome.com/extensions/browserAction
[chrome-install]: https://www.google.com/chrome/browser/desktop/
[samples]: https://developer.chrome.com/extensions/samples
[extensionizr]: http://extensionizr.com/
[jquery]: http://learn.adicu.com/jquery/
[inspiration]: http://www.creativebloq.com/web-design/google-chrome-extensions-21410570
[learn]: https://adicu.com/resources
[code-link]: https://github.com/yulissa/chrome-extensions/archive/master.zip
[browser-actions]: https://developer.chrome.com/extensions/browserAction
[background-pages]: https://developer.chrome.com/extensions/background_pages
[message-passing]: https://developer.chrome.com/extensions/messaging
[buy-black]: https://chrome.google.com/webstore/detail/buyblack/cnogabdkdcfmdbnmjpfipikopbdkkjcd
[chrome-lens]: https://chrome.google.com/webstore/detail/chromelens/idikgljglpfilbhaboonnpnnincjhjkd?hl=en
[selena-doodle]: https://www.youtube.com/watch?v=5gH8iXNW8wE
[meme]: http://cdn.smosh.com/sites/default/files/styles/large/public/2016/04/krabs-meme-th.jpg?itok=q17Ija1l
