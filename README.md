## [The Product Breakfast Club](https://open.spotify.com/show/1qvzYYHQko5sMuKWmoundZ) website project

This website is using REST API By [Wojciech Połowniak](https://github.com/Worie/pbc-api) to automatically generate content from latest Product Breakfast Club publications.

live demo: [vue-poc.jakubemfoto.pl](https://vue-poc.jakubemfoto.pl)

### Development:
> `npm i` - install dependencies <br>
> `npm run dev` - Compile frontend and start local dev server<br>
> `npm run lighthouse [Your URL]` - Run [Lighthouse](https://github.com/GoogleChrome/lighthouse) on given URL<br>

### How to use
Upload compiled files to your static file hosting.

1. Make sure you have `node.js` and `npm` installed.
2. Clone this repository into desired location.
3. In project directory run `npm i`.
4. Run `npm run prod`.
5. Copy the contents of newly created `dist` folder to your server.