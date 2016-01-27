'use strict';

const gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	merge = require('merge2'),
	origWebpack = require('webpack'),
	webpack = require('webpack-stream'),
    typedoc = require("gulp-typedoc"),
    del = require('del'),
    mocha = require('gulp-mocha'),
    tslint = require('gulp-tslint');

const project = typescript.createProject('tsconfig.json', {
  typescript: require('typescript')
});

gulp.task('clean', function(cb) {
  return del(paths.dist, cb);
});

gulp.task('clean-docs', function(cb) {
  return del('./docs', cb);
});


gulp.task('build', function () {
	let result = project.src('./src/**/*.ts')
		.pipe(typescript(project));

	return merge([
		result.js
      .pipe(gulp.dest('./lib')),
		result.dts
      .pipe(gulp.dest('./lib'))
	]);

});

gulp.task('pack', ['build'], function () {

	return gulp.src('./lib/index.js')
    .pipe(webpack({
      module: {
        loaders: [
          {test: /\.js$/, loader: 'babel'}
        ]
      },
      output: {
        filename: 'utils.js',
        libraryTarget: 'umd',
        library: 'utils'
      }
    }, origWebpack))
    .pipe(gulp.dest('dist'));

});


gulp.task("docs", ['clean-docs'], function() {
    return gulp
        .src('./src/**/*.ts')
        .pipe(typedoc({ 
            // TypeScript options (see typescript docs)
            // module: "commonjs", 
            target: "es6",
            includeDeclarations: true,

            // Output options (see typedoc docs)
            out: "./docs", 
            json: "./docs/utilities.json",

            // TypeDoc options (see typedoc docs)
            name: "Utilities", 
            // theme: "/path/to/my/theme",
            // plugins: ["my", "plugins"],
            ignoreCompilerErrors: false,
            version: true,
        }))
    ;
});

gulp.task('test', ['pack'], function() {
  return gulp.src('./tests/test.js', {read: false})
    .pipe(mocha({ reporter: 'dot' }));
});


gulp.task('default', ['pack']);
