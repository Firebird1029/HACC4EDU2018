var gulp = require("gulp"),
	plugins = require("gulp-load-plugins")(),
	browserSync = require("browser-sync").create();
	// sass = require("gulp-sass"),
	// autoprefixer = require("gulp-autoprefixer"),
	// cssMin = require("gulp-cssmin"),
	// sourcemaps = require("gulp-sourcemaps");

gulp.task("default", ["css", "js", "watch", "serve"]);

gulp.task("css", function () {
	return gulp.src(["./src/sass/main.scss"])
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.sass().on("error", plugins.sass.logError))
	.pipe(plugins.cssmin())
	.pipe(plugins.autoprefixer())
	.pipe(plugins.sourcemaps.write())
	.pipe(gulp.dest("./dist/css"))
	.pipe(browserSync.stream());
});

gulp.task("js", function () {
	return gulp.src([
		"./src/js/client.js"
	])
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.babel({
		presets: ["es2015"]
	}))
	.pipe(plugins.concat("all.js"))
	.pipe(plugins.uglify())
	.pipe(plugins.sourcemaps.write())
	.pipe(gulp.dest("dist/js"))
	.pipe(browserSync.stream());
});

gulp.task("watch", function () {
	gulp.watch(["src/sass/*.scss", "src/sass/*.sass"], ["css"]);
	gulp.watch(["src/js/*.js"], ["js"]);
});

gulp.task("serve", function () {
	browserSync.init(null, {
		proxy: "http://localhost:8000",
		// files: ["views/**/*.*"],
		// browser: "google chrome",
		port: 8001,
	});

	gulp.watch("*.pug").on("change", browserSync.reload);
	gulp.watch("views/*.pug").on("change", browserSync.reload);
});