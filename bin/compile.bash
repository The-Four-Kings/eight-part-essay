###
 # @author 雪糕
 # @description 
### 
function compileFile(){
    folderPath=$1
    # echo "这是我的第一个 shell 函数!"
    htmlPath=$(pwd)"$folderPath"'index.html' 
    tsPath=$(pwd)"$folderPath"'index.ts'
    tempPath=$(pwd)"$folderPath"'temp.js'
    jsPath=$(pwd)"$folderPath"'index.js'

    tsc --target es5 "$tsPath"
    # npm run browserify -- "$jsPath" > "$tempPath"
    browserify "$jsPath" > "$tempPath"
    rm "$jsPath"
    mv "$tempPath" "$jsPath"
}