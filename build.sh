#!/bin/sh
################################################################################
# BUILDER OF THE papit.fr WEBSITE
# DEPENDENCIES: CLOSURE JS, TRIMAGE, HTML-MINIFIER, POSTCCS, NANOCSS, SHELL...
################################################################################
# PREPARE THE FOLDER
################################################################################
# REMOVE POTENTIAL BUILD FOLDER
rm -rf build
# CREATE BUILD FOLDER CALLED build
mkdir build
# COPY SRC TO BUILD DIRECTORY
cp -r ./www ./build/www
#cp -r ./favicon.ico ./build/favicon.ico
################################################################################
# JAVASCRIPT WITH CLOSURE JS
################################################################################
# COPY JS FILES AS TEMP FILES
cp www/js/index.js .
# JS CLOSURE COMPILER
java -jar closure-compiler-v20190909.jar -O SIMPLE --js_output_file=build/www/js/index.js --js=index.js
# REMOVE JS TEMP FILES
rm index.js
################################################################################
# CSS WITH POSTCSS AND CSS NANO
################################################################################
postcss www/css/index.css > build/www/css/index.css
postcss www/css/pandoc-article.css > build/www/css/pandoc-article.css
################################################################################
# HTML WITH HTML-MINIFIER
################################################################################
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags \
  --remove-redundant-attributes --remove-tag-whitespace --use-short-doctype \
  --minify-css true --minify-js true www/index.html > build/www/index.html
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags \
  --remove-redundant-attributes --remove-tag-whitespace --use-short-doctype \
  --minify-css true --minify-js true www/404.html > build/www/404.html
html-minifier --collapse-whitespace --remove-comments --remove-optional-tags \
  --remove-redundant-attributes --remove-tag-whitespace --use-short-doctype \
  --minify-css true --minify-js true www/article/graalvm-cobol.html > build/www/article/graalvm-cobol.html
################################################################################
# COMPRESS IMAGE WITH TRIMAGE
################################################################################
trimage -d build/www/img >/dev/null 2>&1