/**
 * @author 雪糕
 * @description 过滤操作
 * 某些操作会非常占用资源，比如传输大文件，这个时候如果文件已经在分块发送了，就不需要在对新的请求作出相应（非绝对）
 *  这个时候就可以使用 Proxy 对当请求进行特征检测，并根据特征过滤出哪些是不需要响应的，哪些是需要响应的。
 */
let obj = {
    getGiantFile: function (fileId) {/*...*/ }
};

function checkEnroute(id) {
    return true;
}

function checkStatus(id) {
    return true;
}

function getCached(id) {
    return null;
}

obj = new Proxy(obj, {
    get(target, key, proxy) {
        return function (...args) {
            const id = args[0];
            let isEnroute = checkEnroute(id);
            let isDownloading = checkStatus(id);
            let cached = getCached(id);

            if (isEnroute || isDownloading) {
                return false;
            }
            if (cached) {
                return cached;
            }
            return Reflect.apply(target[key], target, args);
        }
    }
});
