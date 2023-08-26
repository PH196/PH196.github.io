$(" .lazy").each(function (index, item) {
    var _that = $(this);
    var src = $(this).attr('src');
    var original = $(this).data('original');
    if (original.indexOf('_file') !== -1&&src!==original) {
        //处理 original
        var url = original;
        var e = url.replace("jpg", "data").replace("png", "data").replace("jpeg", "data").replace("webp", "data");

        console.log(e)
        var url = e;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            var buffer = xhr.response;
            var t = new Uint8Array(buffer),
                o = new Blob([t.subarray(3, t.length)], {type: "image/jpg"});
            var a = (window.URL || window.webkitURL).createObjectURL(o);
            _that.attr("src", a);
        };
        xhr.send();
    } else {
        _that.attr("src", original);
    }

})

$(" .lazy-read").each(function (index, item) {
    var _that = $(this);
    var src = $(this).attr('src');
    var original = $(this).data('original');
    if (original.indexOf('_file') !== -1&&src!==original) {
        //处理 original
        var url = original;
        var e = url.replace("jpg", "data").replace("png", "data").replace("jpeg", "data").replace("webp", "data");

        console.log(e)
        var url = e;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (e) {
            var buffer = xhr.response;
            var t = new Uint8Array(buffer),
                o = new Blob([t.subarray(3, t.length)], {type: "image/jpg"});
            var a = (window.URL || window.webkitURL).createObjectURL(o);
            _that.attr("src", a);
        };
        xhr.send();
    } else {
        _that.attr("src", original);
    }

})

