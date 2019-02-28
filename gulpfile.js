const gulp = require('gulp');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const bs = require('browser-sync').create();

function sassBuild() {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(gulp.dest('./css/'))
        .pipe(bs.stream()) // Sassのコンパル後、BrowserSyncのリロードを行う
}

function browserSync(done) {
    bs.init({
        server: {
            baseDir: "./", // ルートとなるディレクトリを指定
        },
        port: 8080 // Portはこのオプションで変えれる
    });
    done();
}

function reload(done) {
    bs.reload();
    done();
}

function watchAllFiles() {
    gulp.watch('scss/**/*.scss', sassBuild);
}

const watch = gulp.parallel(watchAllFiles, browserSync);

exports.watch = watch;
exports.default = watch;
