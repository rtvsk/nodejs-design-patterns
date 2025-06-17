const { EventEmitter } = require('events');
const { readFile } = require('fs');

function findRegex (files, regex) {
  const emitter = new EventEmitter();

  for (const file of files) {
    readFile(file, 'utf8', (err, content) => {
      if (err) {
        return emitter.emit('error', err)
      }
      
      emitter.emit('fileread', file);
      const match = content.match(regex);
      console.log({ match });
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem));
      }
    })
  }

  return emitter;
}

findRegex(
  ['1.txt', '2.txt'],
  /\bconst\b/g
)
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in ${file}`))
  .on('error', err => console.error(`Error emitted ${err.message}`));