var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    webp = require('gulp-webp'),
    imagemin = require("gulp-imagemin"),
    browserSync = require("browser-sync").create();

var paths = {
    styles: {
        // CAMINHO DEV
        src: "SITE/assets/scss/*.scss",
        // DESTINO
        dest: "SITE/assets/css",

        // CAMINHO DEV
        imgsrc: "SITE/assets/img-dev/**/*.scss",
        // DESTINO
        imgdest: "SITE/assets/img" 
    }

    // ,html: {
    //  src: '...',
    //  dest: '...'
    // }
};




function style() {
    return gulp
        .src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

function reload() {
    browserSync.reload();
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "SITE"
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.styles.imgsrc, img).on('change', browserSync.reload);
    gulp.watch("SITE/*.html").on('change', browserSync.reload);
}



function img(){
    gulp.src('SITE/assets/img-dev/**/*.{png,jpg,jpeg}')
      .pipe(imagemin())
      .pipe(webp())
      .pipe(gulp.dest('SITE/assets/img/'))
      .pipe(browserSync.stream());
}



exports.watch = watch
exports.style = style;
exports.webp = webp;
exports.img = img;


var build = gulp.parallel(style, watch, img);
 
gulp.task('default', build);