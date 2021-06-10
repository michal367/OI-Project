const makeKey = (key: string) => {
    return "lazare." + key;
}

const load = (key: string) => {
    let obj = JSON.parse(localStorage.getItem(makeKey(key)) ?? "null");
    console.log("loadKey", obj);
    return obj;
}

const loadForArray = (key: string, initialValue: any[]) => {
    let obj : any[] = load(key);
    if(obj && obj.length > 0)
        initialValue.forEach((el) => {
            // TODO add el to array if its ID is not present there. 
        });
    else
        obj = initialValue;
    return obj
}

const save = (key: string, value: any) => {
    if (value === undefined) return;
    // console.log("saveKey", value);
    return localStorage.setItem(makeKey(key), JSON.stringify(value));
}

const clear = () => localStorage.clear();

export function lazareLocalStorage<T extends string>(keyPrefix: string, version: string) {

    function stringKey(key: T) {
        return keyPrefix + key;
    }

    function loadKey(key: T) {
        return load(stringKey(key));
    }

    function saveKey(key: T, value: any) {
        return save(stringKey(key), value);
    }

    function loadKeyForArray(key: T, value: any) {
        return loadForArray(stringKey(key), value);
    }

    function upgradeStorage() {
        const key = keyPrefix + "version";
        const storedVersion = load(key);

        if (storedVersion === version) return false;

        clear();
        save(key, version);

        return true;
    }

    return {
        loadKey,
        loadKeyForArray,
        saveKey,
        upgradeStorage
    }
};
