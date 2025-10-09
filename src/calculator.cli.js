const readline = require("readline");
const Calculator = require("./calculator");

(function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("Enter numbers string: ", (input) => {
        console.log("Result:", Calculator.add(input));
        rl.close();
    });
})();