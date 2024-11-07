const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const file_include = require('gulp-file-include')
const imagemin = require('gulp-imagemin');

// HTML processing
function html() {
    return gulp.src("src/index.html")
        .pipe(file_include({
            prefix:'@@',
            basepath:'@file'
        }))
        .pipe(gulp.dest("dist/"))
        .pipe(browserSync.stream());
}

// Compile Sass to CSS, add prefixes, and minify the code
function sassTask() {
    return gulp.src("src/scss/*.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
}

// Combine and minify JS files
function scripts() {
    return gulp.src("src/js/*.js")
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/js"))
        .pipe(browserSync.stream());
}

// Compress img
function imgs() {
    return gulp.src("src/img/*.{jpg,jpeg,png,gif}", {encoding:false})
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
}

function jsonSync() {
    return gulp.src("src/data/*.json")
        .pipe(gulp.dest("dist/data"))
        .pipe(browserSync.stream());
}
// Initialize BrowserSync server
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        cache: false
    });
    done();
}

// Watch for changes in files
function watchFiles() {
    gulp.watch("src/*.html", html);
    gulp.watch("src/scss/*.scss", sassTask);
    gulp.watch("src/js/*.js", scripts);
    gulp.watch("src/data/*.json", jsonSync);
    gulp.watch("src/img/*.{jpg,jpeg,png,gif}", imgs);
}

exports.html = html;
exports.sass = sassTask;
exports.scripts = scripts;
exports.imgs = imgs;
exports.jsonSync = jsonSync;
exports.watch = gulp.parallel(watchFiles, browserSyncInit);

// Default task to run BrowserSync and watch for changes
exports.default = gulp.series(
    gulp.parallel(html, sassTask, scripts, imgs, jsonSync),
    gulp.parallel(watchFiles, browserSyncInit)
);
