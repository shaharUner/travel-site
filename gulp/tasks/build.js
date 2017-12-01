var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require('browser-sync').create();
var publicFolderName = 'docs';
gulp.task('previewDist',function(){
  browserSync.init({
    notify: false,
    server: {
      baseDir: publicFolderName
    }
  });

});



gulp.task('deleteDistFolder',['icons'],function(){
  return del("./" + publicFolderName);
});
gulp.task('copyGeneralFiles',['deleteDistFolder'], function(){
  var pathsToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/css/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**'
  ];
  gulp.src(pathsToCopy)
  .pipe(gulp.dest("./" + publicFolderName));
});

gulp.task('optimizeImage',['deleteDistFolder'],function(){
 return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons' , '!./app/assets/images/icons/**/*']).
 pipe(imagemin({
   progressive: true,
   interlaced: true,
   miltipass: true
 }))
 .pipe(gulp.dest('./'+ publicFolderName +'/assets/images'));
});
gulp.task('usminTringger',['deleteDistFolder'], function(){
  gulp.start("usemin");
})
gulp.task('usemin' ,['styles','scripts'], function(){
  gulp.src('./app/index.html')
  .pipe(usemin({
    css: [function(){ return rev()}, function(){return cssnano()}],
    js: [function(){return rev()} , function(){return uglify()}]
  }))
  .pipe(gulp.dest("./" + publicFolderName));
});

gulp.task('build',['deleteDistFolder','copyGeneralFiles','optimizeImage','usminTringger']);
