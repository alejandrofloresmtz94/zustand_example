import { useMemo } from "react";
import { nanoid } from "nanoid";

const useUuid = (arraySize = 1) => {
    const ids:Array<string> = [];

    for (let i = 0; i < arraySize; i = i + 1) {
        ids.push(nanoid());
    }

    return useMemo(() => ids, [])
}

export default useUuid;