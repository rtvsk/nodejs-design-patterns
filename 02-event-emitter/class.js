const { EventEmitter } = require('events');
const { readFile } = require('fs');

class FindRegex extends EventEmitter {
  constructor(regex) {
    super();
    this.regex = regex;
    this.files = [];
  }

  addFile(filename) {
    this.files.push(filename);

    return this;
  }

  find() {
    for (const file of this.files) {
      readFile(file, "utf-8", (err, data) => {
        if (err) {
          return this.emit("error", err);
        }

        this.emit("fileread", file);

        const match = data.match(this.regex);

        if (match) {
          match.forEach((m) => this.emit("found", file, m));
        }
      });
    }

    return this;
  }
}

const findRegexInstance = new FindRegex(/\bconst\b/g);
findRegexInstance
  .addFile("1.txt")
  .addFile("2.txt")
  .find()
  .on("found", (file, match) => {
    console.log(`Matched in ${file} match: ${match}`)
  })
  .on("error", (err) => console.error("Error occured: ", err));