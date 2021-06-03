import { useEffect, useState } from "react";
import { NOTFOUND, NOTSET } from "../utils/variables";


function useLocalStorage (key, initialValue = NOTSET ) {
    const prefix = 'whatsapp-clone-';

    const prefixedKey = prefix + key;

    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (!key ) return;
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue !== null) return setValue(JSON.parse(jsonValue));
        return setValue(NOTFOUND);
    }, [key])
    
    useEffect(() => {
        if (!value || !key ) return;
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage
