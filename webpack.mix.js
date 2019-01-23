const mix = require('laravel-mix');
const glob = require('glob');

/*
	|--------------------------------------------------------------------------
	| Mix Asset Management
	|--------------------------------------------------------------------------
	|
	| Mix provides a clean, fluent API for defining some Webpack build steps
	| for your Laravel application. By default, we are compiling the Sass
	| file for the application as well as bundling up all the JS files.
	|
*/

const js = glob.sync(`src/js/[^_]*.js`);
const scss = glob.sync(`src/scss/[^_]*.scss`);

mix.js(`src/js/main.js`, `dist/app.js`).sass(`src/scss/app.scss`, `dist/app.css`);

mix.copy(`src/index.html`, `dist/index.html`);

mix.browserSync({
	proxy: '',
	server: 'dist/',
	files: ['dist/**/**/*'],
});
