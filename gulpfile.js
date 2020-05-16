const {src, dest, series} = require('gulp');
const del = require('del');
const babel = require('gulp-babel');
//const concatenate = require ('gulp-concat');

const origin = 'src';
const destination = 'build';

async function clean(cb) {
  del(destination);
  cb();
}

function html(cb) {
  src(`${origin}/*.html`).pipe(dest(`${destination}`));
  //src('src/*.html').pipe(dest('build'));
  cb();
}
function css(cb) {
  src(`${origin}/*.css`).pipe(dest(`${destination}/css`));
  //src('src/*css').pipe(dest('build'));
  cb();
}

function js(cb) {
  src(`${origin}/*.js`)
  //src('src/*.js')
  //.pipe(babel({presets: ['es2015']}))
  //.pipe(concatenate('build.js'))
  .pipe(babel())
  .pipe(dest(`${destination}/js`));
  //.pipe(dest('build'));
  cb();
}

exports.default = series(clean, html, css, js);
//exports.default = series(clean, html, css, js);