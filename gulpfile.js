const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const imagemin = require('gulp-imagemin')
const processhtml = require('gulp-useref')

gulp.task('copyHtml', async () => {
    gulp.src('./src/*.html')
        .pipe(processhtml())
        .pipe(gulp.dest('dist'))
})

// TODO: Minify
gulp.task('copyJS', async () => {
    gulp.src('./src/javascript/*')
        .pipe(processhtml())
        .pipe(gulp.dest('dist/javascript'))
})

gulp.task('imageMin', async () =>
    gulp.src('./src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
)

gulp.task('sass', async () => {
    gulp.src('./src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('default', gulp.series('imageMin', 'sass', 'copyJS', 'copyHtml'))

gulp.task('watch', () => {
    gulp.watch('./src/*.html', gulp.series('copyHtml'))
    gulp.watch('./src/javascript/*', gulp.series('copyJS'))
    gulp.watch('./src/images/*', gulp.series('imageMin'))
    gulp.watch('./src/sass/*.scss', gulp.series('sass'))
})