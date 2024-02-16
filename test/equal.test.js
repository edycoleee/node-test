//test/equal.test.js
import { objectSama, stringSama } from "../src/equal";

test("test toBe", () => {
    const name = stringSama("Edi") ;
    const hello = `Hello ${name}`;

    expect(hello).toBe('Hello Edi');
});

test("test toEqual", () => {
    let person = {id: "1"};
    Object.assign(person, {name: "Edi"});

    const testObject = objectSama(person)
    expect(testObject).toEqual({id: "1", name: "Edi"});
})