const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const browserSyncReuseTab  = require('browser-sync-reuse-tab')(browserSync,'external')
const sass        = require('gulp-sass');
const pug         = require('gulp-pug');
const uglify      = require('gulp-uglify');
const imageMin    = require('gulp-imagemin');
const concat      = require('gulp-concat');
const ts          = require('gulp-typescript');
const tsProject   = ts.createProject("tsconfig.json");
const del         = require('del');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const wait = require('gulp-wait');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
sass.compiler = require('node-sass');

// Compile Pug
gulp.task('pug', () => {
    return gulp.src(['src/pug/*.pug'])
        .pipe(plumber(
            {
                errorHandler: function(err) {
                // display the error message
                 console.log(err.message);
                // end the errored task
                this.emit('end') }
            }
        ))
        .pipe(pug({
          doctype: 'html',
          pretty: true
        }))
        .pipe(gulp.dest('./src'));
});

// Compile Sass & Inject Into Browser
gulp.task('scss', () => {
    return gulp.src(['./src/scss/*','./src/scss/**/_*','node_modules/bootstrap/scss/bootstrap-grid.scss','node_modules/bootstrap/scss/bootstrap-reboot.scss'])
        .pipe(plumber(
            {
                errorHandler: function(err) {
                  // display the error message
                  console.log(err.message);
                  // end the errored task
                  this.emit('end') }
              }
        ))
        .pipe(sass({includePaths: ['src/scss/*','src/scss/**/*','src/scss/**/**/*']}))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(concat('ano.css'))
        .pipe(gulp.dest("src/assets/css"))
        .pipe(browserSync.stream());
});

gulp.task("babel", function () {
    return gulp.src(['src/assets/js/main.js','src/assets/js/valid.js'])
        .pipe(plumber(
            {
                errorHandler: function(err) {
                // display the error message
                console.log(err.message);
                // end the errored task
                this.emit('end') }
            }
        ))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest("src/assets/compjs"));
});

// Watch Sass, Pug & Serve
gulp.task('serve', ['scss', 'pug', 'babel'], () => {
    browserSync.init({
        server: "./src",
        open: true,
        notify: false,
        reloadDelay: 100

    })
    gulp.watch(['src/pug/*.pug','src/pug/**/*.pug'], ['pug']).on('change',browserSync.reload);
    gulp.watch(['src/scss/*','src/scss/**/*','src/scss/**/**/*'], ['scss']).on('change', browserSync.reload);
    gulp.watch(['src/assets/js/main.js'], ['babel']).on('change',browserSync.reload);
});
// Default Task
gulp.task('default', ['serve']);

// **************************No Pug compiling************************************
// Watch Sass & Serve
gulp.task('serve-no-pug', ['sass', 'copyNoPugHtml'], () => {
    browserSync.init({
        server: "./src"
    })
    gulp.watch(['src/scss/**/*'], ['sass']).on('change', browserSync.reload)
    gulp.watch(['src/no-pug/*.html']).on('change', () => {
      return gulp.src(['src/no-pug/*.html'])
          .pipe(gulp.dest('src'));
    });
});
// Copy index.html file from no-pug folder
gulp.task('copyNoPugHtml', () => {
    return gulp.src(['src/no-pug/*.html'])
        .pipe(gulp.dest('src'));
});
gulp.task('no-pug', ['copyNoPugHtml', 'serve-no-pug', 'help']);
// ********************************************************************************

// This is the Build part it creates the dist folder and readys all the files for deployment

// Copy HTML to dist folder
gulp.task('copyHtml', () => {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist'));
});
// Copy Css to dist folder
gulp.task('copyCSS', () => {
    return gulp.src(['src/assets/css/*.css'])
        .pipe(gulp.dest('dist/assets/css'));
});
// ImageMin
gulp.task('imageMin', () => {
    return gulp.src(['src/assets/img/*'])
        .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/img'));
});
//copy fonts 
gulp.task('copyfonts', function() {
    gulp.src('src/assets/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('dist/assets/fonts'));
 });

// Minify, concat js files and copy them to dist folder
gulp.task('scripts', () => {
    return gulp.src(['src/assets/js/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'));
});

// Builds to dist folder, ready to deploy
gulp.task('build', ['imageMin', 'scripts', 'copyHtml', 'copyCSS','copyfonts']);

// Clean the build folder
gulp.task('clean', () => {
  console.log('-> Cleaning dist folder')
  del([
    'dist',
    'src/assets/css/ano.css',
    'src/assets/compJs',
    'src/*.html'

  ]);
});

// Help Task
gulp.task('help', () => {
  console.log('');
  console.log('===== Help for Riiiad Starter Kit =====');
  console.log('');
  console.log('Usage: gulp [command]');
  console.log('The commands are the following');
  console.log('-------------------------------------------------------');
  console.log('        typescript: Runs the typescript compiler');
  console.log('        clean: Removes all the compiled files on ./dist');
  console.log('        copyCss: Copy the complied css files');
  console.log('        copyHtml: Copy the Html files');
  console.log('        imageMin: Copy the newer images to the build folder');
  console.log('        build: Creates the dist folder if not already create and copy all files in it');
  console.log('        no-pug: If you do not want to use pug');
  console.log('        help: Print this message');
  console.log('');
});
