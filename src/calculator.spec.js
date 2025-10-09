const Calculator = require("./calculator");

describe("String Calculator", () => {
    test("Empty string returns 0", () => {
        expect(Calculator.add("")).toBe(0);
    });

    test("Single number returns itself", () => {
        expect(Calculator.add("5")).toBe(5);
    });

    test("Two numbers comma-separated", () => {
        expect(Calculator.add("1,2")).toBe(3);
    });

    test("Unknown amount of numbers", () => {
        expect(Calculator.add("1,2,3,4")).toBe(10);
    });

    test("Newline as delimiter", () => {
        expect(Calculator.add("1\n2,3")).toBe(6);
    });

    test("Custom single delimiter", () => {
        expect(Calculator.add("//;\n1;2")).toBe(3);
    });

    test("Negative numbers throw exception", async () => {
        await Promise.resolve(expect(() => Calculator.add("1,-2,3,-4")).toThrow(
            "negatives not allowed: -2,-4"
        ));
    });

    test("Numbers greater than 1000 ignored", () => {
        expect(Calculator.add("2,1001")).toBe(2);
    });

    test("Custom delimiter of any length", () => {
        expect(Calculator.add("//[***]\n1***2***3")).toBe(6);
    });

    test("Multiple delimiters", () => {
        expect(Calculator.add("//[*][%]\n1*2%3")).toBe(6);
    });

    test("Multiple delimiters of any length", () => {
        expect(Calculator.add("//[**][%%]\n1**2%%3")).toBe(6);
    });

    test("Ignore empty values", () => {
        expect(Calculator.add("1,\n")).toBe(1);
    });
});
