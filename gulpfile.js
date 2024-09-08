const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

// Dynamic import of ESM module autoprefixer
async function getAutoprefixer() {
    const autoprefixer = await import('gulp-autoprefixer');
    return autoprefixer.default;
}

async function getImagemin() {
    const imagemin = await import('gulp-imagemin');
    return imagemin.default;
}

// HTML processing
function html() {
    return gulp.src("src/*.html")
        .pipe(gulp.dest("dist"))
        .pipe(browserSync.stream());
}

// Compile Sass to CSS, add prefixes and minify the code
async function sassTask() {
    const autoprefixer = await getAutoprefixer();
    return gulp.src("src/scss/*.sass")
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
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

// Compress images
async function imgs() {
    const imagemin = await getImagemin();
    return gulp.src("src/img/*.{jpg,jpeg,png,gif}")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"))
        .pipe(browserSync.stream());
}

// Initialize BrowserSync server
function browserSyncInit(done) {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    done();
}

// Watch for changes in files
function watchFiles() {
    gulp.watch("src/*.html", html);
    gulp.watch("src/scss/*.sass", sassTask);
    gulp.watch("src/js/*.js", scripts);
    gulp.watch("src/img/*.{jpg,jpeg,png,gif}", imgs);
}

// Default task to run BrowserSync and watch for changes
exports.default = gulp.series(
    gulp.parallel(html, sassTask, scripts, imgs),
    gulp.parallel(watchFiles, browserSyncInit)
);
