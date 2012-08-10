JS_DIR='public/javascripts/lib'
CSS_DIR='public/css'

echo "**** Compiling Deps ****"
COMPILE_CMD="cat $JS_DIR/jquery.js $JS_DIR/jquery.jplayer.min.js $JS_DIR/underscore.js $JS_DIR/backbone.js $JS_DIR/moment.min.js $JS_DIR/jquery_extension.js | uglify -o public/javascripts/myvolume.deps.min.js"
echo "$COMPILE_CMD"
$COMPILE_CMD

echo "**** Compiling App ****"
COMPILE_CMD="node public/javascripts/lib/r.js -o name=app/main baseUrl=public/javascripts out=public/javascripts/myvolume.app.min.js paths.requireLib=require include=requireLib insertRequire=app/main"
echo "$COMPILE_CMD"
$COMPILE_CMD

#node /ebs/appvenmo/api/static/js/lib/r.js -o name=main out=/ebs/appvenmo/api/static/js/venmo.app.min.js baseUrl=/ebs/appvenmo/api/static/js/app paths.requireLib=/ebs/appvenmo/api/static/js/lib/require include=requireLib insertRequire=main


echo "**** Compiling CSS ****"
COMPILE_CMD="cd $CSS_DIR && lessc styles.less > myvolume.min.css && cd -"
echo "$COMPILE_CMD"
$COMPILE_CMD
