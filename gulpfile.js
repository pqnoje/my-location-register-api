const gulp = require('gulp') 
const del = require('del')
const ts = require('gulp-typescript') 
const JSON_FILES = ['src/*.json', 'src/**/*.json'] 

// pull in the project TypeScript config
const tsProject = ts.createProject('tsconfig.json') 

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
  .pipe(tsProject()) 
  return tsResult.js.pipe(gulp.dest('dist')) 

}) 

gulp.task('clean', () => {
	return del([
		'dist/model',
		'dist/providers',
		'dist/routes',
		])
})

gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['clean', 'scripts']) 
}) 

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist')) 
}) 

gulp.task('default', ['watch']) 