function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(key => {
        observeProperty(data, key, data[key])
    })
}

function observeProperty(obj, key, val) {
    console.log(val)
    observe(val)
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function () {
            return val
        },
        set: function (newVal) {
            if (val === newVal || (newVal && val !== val)) {
                return;
            }
            console.log('数据更新啦', val , '=>', newVal);
            val = newVal;
        }
    })
}

var data = {
    a: 'hello'
}
observe(data)