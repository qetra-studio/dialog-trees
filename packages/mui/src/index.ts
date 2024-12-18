import { coreFunction } from "@qetra-drees/core";

export const greet = (name: string): string => {
    console.log(coreFunction())
    return `Hello, ${name}!`;
};


greet("hello")
