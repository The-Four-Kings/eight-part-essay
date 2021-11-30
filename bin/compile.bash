###
 # @author 雪糕
 # @description 编译指定文件夹 index.ts 文件
### 
function compileFile(){
    folderPath=$1
    tsPath=$(pwd)"/src/$folderPath"'index.ts'
    outDir=$(pwd)"/output/$folderPath"
    tempPath=$outDir'/temp.js'
    jsPath=$outDir'/index.js'

    tsc --target es5 --outDir "output" "$tsPath"
    browserify "$jsPath" > "$tempPath"
    rm "$jsPath"
    mv "$tempPath" "$jsPath"
}