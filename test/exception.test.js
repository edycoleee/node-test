import {callMe, MyException} from "../src/exception.js";

test("exception", () => {
    expect(() => callMe("Edy")).toThrow();
    expect(() => callMe("Edy")).toThrow(MyException);
    expect(() => callMe("Edy")).toThrow("Ups my exceptions happens");
});

test("exception not happens", () => {
    expect(callMe("Budi")).toBe("OK");
});