class Calculator {
    static add(testString) {
        if (!testString) return 0;

        testString = testString.trim().replace(/^["']|["']$/g, "");
        testString = testString.replace(/\\n/g, "\n");

        let numbers = [];
        let delimiters = [",", "\n"]; // Default delimiters

        if (testString.startsWith("//")) {
            const delimiterSection = testString.split("\n")[0];
            const numberPart = testString.split("\n")[1];

            const multiDelimiterMatch = delimiterSection.match(/\[(.+?)\]/g);
            if (multiDelimiterMatch) {
                delimiters = multiDelimiterMatch.map(d => d.slice(1, -1));
            } else {
                delimiters.push(delimiterSection.substring(2));
            }

            const delimiterRegex = new RegExp(delimiters.map(d => escapeRegExp(d)).join("|"), "g");
            numbers = numberPart.split(delimiterRegex);
        } else {
            numbers = testString.split(/[\n,]+/);
        }

        const negatives = [];
        const sum = numbers
            .filter(n => n.trim() !== "")
            .map(n => parseInt(n, 10))
            .filter(n => {
                if (n < 0) negatives.push(n);
                return !isNaN(n) && n <= 1000;
            })
            .reduce((acc, val) => acc + val, 0);

        if (negatives.length > 0) {
            throw new Error(`negatives not allowed: ${negatives.join(",")}`);
        }

        return sum;
    }
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

module.exports = Calculator;
