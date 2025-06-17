const { spawn } = require("child_process");

const proc = spawn("./add");

proc.stdin.write(JSON.stringify({ a: 10, b: 15 }));
proc.stdin.end();

proc.stdout.on("data", (data) => {
  console.log("Result:", data.toString().trim());
});

proc.stderr.on("data", (data) => {
  console.error("Error:", data.toString());
});