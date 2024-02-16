import {sayHelloAsync} from "../src/async.js";

test("test async function", async () => {
    const result = await sayHelloAsync("Edy");
    expect(result).toBe("Hello Edy");
});

test("test async matchers", async () => {
    await expect(sayHelloAsync("Edy")).resolves.toBe("Hello Edy");
    await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});