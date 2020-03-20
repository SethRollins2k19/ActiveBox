const gulp = require('gulp');
const babel = require('gulp-babel');
const env = require('babel-preset-es2015');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

const cssFiles = ['./css/style.css'];
const jsFiles = ['./script/main.js'];


function bSync() {
    browserSync.init({
        server: {
            baseDir: './docs'
        },
        notify: false
    })
    console.log('Prebuild')
}

function style() {
    return gulp.src(cssFiles)
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./docs/css'))
        .pipe(browserSync.reload({stream: true}))
}

function script() {
    return gulp.src("script/**/*.js")
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: [env]
        }))
        .pipe(minify())
        .pipe(gulp.dest('./docs/js'))
        .pipe(browserSync.reload({stream: true}))

}


function htmlCode() {
    return gulp.src('index.html')
        .pipe(gulp.dest('docs/'))
        .pipe(browserSync.reload({stream: true}))
}
function preBuild(){
        gulp.watch("index.html",gulp.series(htmlCode))
        gulp.watch("css/**/*.css",gulp.series(style))
        gulp.watch("script/**/*.js",gulp.series(script))
}


gulp.task('html', htmlCode);
gulp.task('style', style);
gulp.task('scripts', script);
gulp.task('preBuild',preBuild)
gulp.task('brSync', bSync);
gulp.task("build", gulp.series('html', 'style', 'scripts'))
gulp.task('watch', gulp.parallel('brSync', 'preBuild'));