import { useEffect } from "react";
import { TestComponentTypes } from "../types/testTypes";
import { useStore } from "../../store/store";

export default function TestComponent({ selector, effect } : TestComponentTypes){
    const items = useStore(selector);

    useEffect(() => effect(items), [items])

    return null;
}