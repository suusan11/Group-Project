const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const path = {
  'src': {
    'scss': 'src/scss/**/*.scss',
    'js': 'src/js/app.js'
  },
  'dist': {
    'css': 'dist/css',
    'js': 'dist/script'
  }
}

function serve(done) {
  browserSync.init({
    port: 8080,
    server: {
      baseDir: './',
      index: 'index.html'
    },
    reloadOnRestart: true
  });
  done();
}

function reload(done) {
  browserSync.reload();
  done();
}

const setWatchFiles = () => { 
  gulp.watch(path.src.scss, gulp.series(style, reload)); 
  gulp.watch(path.src.js, gulp.series(script, reload)); 
}

function script() {
  return gulp.src(path.src.js, { sourcemaps: true })
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(gulp.dest(path.dist.js, { sourcemaps: './' }));
}

function prodScript() {
  return gulp.src(path.src.js)
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(gulp.dest(path.dist.js))
        .pipe(uglify())
        .pipe( rename({ suffix: '.min' }) )
        .pipe( gulp.dest(path.dist.js) );
}

// Sass/Scss Compile with Sourcemaps
function style() {
  return gulp.src(path.src.scss, { sourcemaps: true }) // Set path
        .pipe(
          // https://github.com/dlmanning/gulp-sass#readme
          sass({
            outputStyle: 'expanded'
          })
          .on('error', sass.logError)
        ).pipe(
          // https://github.com/sindresorhus/gulp-autoprefixer#readme
          autoprefixer({ browsers: ['last 2 versions'] })
        ).pipe( gulp.dest(path.dist.css, { sourcemaps: './'}) );
}

// Sass/Scss Compile and minify
function prodStyle() {
  return gulp.src(path.src.scss)
        .pipe(
          // https://github.com/dlmanning/gulp-sass#readme
          sass({
            outputStyle: 'expanded'
          })
          .on('error', sass.logError)
        ).pipe(
          // https://github.com/sindresorhus/gulp-autoprefixer#readme
          autoprefixer({ browsers: ['last 2 versions'] }) 
        ).pipe( gulp.dest(path.dist.css) )
        .pipe(cleancss())
        .pipe( rename({ suffix: '.min' }) )
        .pipe( gulp.dest(path.dist.css) );
}

// gulp default task
// watch files scss/js
gulp.task('default', gulp.series( gulp.parallel(script, style), serve, setWatchFiles ) );

// gulp production build
// compile and minify
gulp.task('prod', gulp.series( gulp.parallel(prodStyle, prodScript)) );