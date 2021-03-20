const gulp = require("gulp"),
	concat = require("gulp-concat"),
	terser = require("gulp-terser");

const paths = {
	data: "./src/!(getUser)*.js",
	main: "./src/getUser.js",
	dest: "./functions",
};

function build(cb) {
	gulp
		.src([paths.data, paths.main])
		.pipe(concat("getUser.js"))
		.pipe(
			terser({
				compress: true,
				mangle: true,
				toplevel: true,
			})
		)
		.pipe(gulp.dest(paths.dest));
	cb();
}

exports.build = build;