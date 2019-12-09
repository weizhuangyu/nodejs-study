const fs = require('fs');
const zlib = require('zlib')

const compressFile = (filename, outputFilename) => new Promise((re, rj) => {
  const readStream = fs.createReadStream(filename)
  const writeStream = fs.createWriteStream(outputFilename)
  const compress = zlib.createGzip()
  readStream.pipe(compress).pipe(writeStream).on('error', rj)
  writeStream.on('close', re)
});

const decompressFile = (filename, outputFilename) => new Promise((re, rj) => {
  const readStream = fs.createReadStream(filename)
  const writeStream = fs.createWriteStream(outputFilename)
  const decompress = zlib.createGunzip()

  readStream.pipe(decompress).pipe(writeStream).on('error', rj)
  writeStream.on('close', re)
});

(async () => {
  await compressFile('./extra/fileForCompress.txt', './extra/fileForCompress.txt.gz')
  await decompressFile('./extra/fileForCompress.txt.gz', './extra/fileForCompress1.txt')
})().catch(console.error)

