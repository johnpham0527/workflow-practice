const {src, dest, series, parallel} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const concatenate = require ('gulp-concat');

const origin = 'src';
const destination = 'build';

async function clean(cb) {
  await del(destination);
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
  .pipe(concatenate('build.js'))
  .pipe(babel())
  .pipe(dest(`${destination}/js`));
  //.pipe(dest('build'));
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination
      //baseDir: "./build"
    }
  });
  cb();
}

exports.default = series(clean, parallel(html, css, js), server);
//exports.default = series(clean, parallel(html, css, js));