function observe(value, asRootData) {
    if (!value || typeof value !== 'object') {
        return
    }
    return new Observer(value)
}

function Observer(value) {
    this.value = value;
    this.walk(value);
}

Observer.prototype = {
    walk: function (obj) {
        let self = this;
        Object.keys(obj).forEach(key => {
            self.observeProperty(obj, key, obj[key])
        })
    },
    observeProperty: function (obj, key, val) {
        let dep = new Dep()
        let childOb = observe(val)
        Object.defineProperty(obj, key, {
            enumerable: true,
            cinfigurable: true,
            get: function () {
                if (Dep.target) {
                    dep.depend()
                }
                if (childOb) {
                    childOb.dep.depend()
                }
                return val
            },
            set: function (newVal) {
                if (val === newVal || newVal !== val) {
                    return
                }
                val = newVal
                childOb = observe(newVal)
                dep.notify()
            }
        })
    }
}
let uid = 0;

function Dep() {
    this.id = uid++
    this.subs = []
}

Dep.target = null
Dep.prototype = {
    addSub: function (sub) {
        this.subs.push(sub)
    },
    removeSub: function (sub) {
        let index = this.subs.indexOf(sub)
        if (index !== -1) {
            this.subs.splice(index, 1)
        }
    },
    //通知数据变更
    notify: function () {
        this.subs.forEach(sub => {
            sub.update()
        })
    },
    //添加watcher
    depend: function () {
        Dep.target.addDep(this)
    }
}

var obj = {
    a: 'b'
}
observe(obj)
