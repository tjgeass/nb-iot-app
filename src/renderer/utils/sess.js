export default {
    get(name) {
        let value = sessionStorage.getItem(name)
        //if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
        try {
            if (typeof JSON.parse(value) === typeof {}) {
                return JSON.parse(value);
            }
        } catch (e) {
            return value
        }
    },
    set(name, value) {
        if (typeof value === typeof {}) value = JSON.stringify(value)
        return sessionStorage.setItem(name, value)
    },
    remove(name) {
        return sessionStorage.removeItem(name)
    },
    clear() {
        return sessionStorage.clear();
    }

}