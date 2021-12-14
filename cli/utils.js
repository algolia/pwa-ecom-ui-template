const fs = require('fs')
const Readable = require('stream').Readable
const StreamArray = require('stream-json/streamers/StreamArray')

function readFile(fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        throw {
          code: 'ERR_READ_ERROR',
          file: fileName,
          message: 'Read error (file "' + fileName + '"): ' + err.message,
        }
      } else {
        resolve({ name: fileName, content: data })
      }
    })
  })
}

function readJsonFiles(fileList) {
  return Promise.all(fileList.map(readFile))
    .then(function (fileContentList) {
      try {
        const returnArray = []
        fileContentList.forEach(function (fileContent) {
          let parsedFileContent
          try {
            parsedFileContent = JSON.parse(fileContent.content)
          } catch (err) {
            throw {
              code: 'ERR_PARSE_ERROR',
              file: fileContent.name,
              message:
                'Parse error (file "' + fileContent.name + '"): ' + err.message,
            }
          }
          returnArray.push(parsedFileContent)
        })
        return returnArray
      } catch (err) {
        throw err
      }
    })
    .catch(function (err) {
      throw err
    })
}

function saveObjectsByChunks(index, records) {
  const stream = Readable.from(records).pipe(StreamArray.withParser())
  let chunks = []

  return new Promise((resolve, reject) => {
    stream
      .on('data', ({ value }) => {
        chunks.push(value)
        if (chunks.length === 10000) {
          stream.pause()
          index
            .saveObjects(chunks, { autoGenerateObjectIDIfNotExist: true })
            .then(() => {
              chunks = []
              stream.resume()
            })
            .catch(reject)
        }
      })
      .on('end', () => {
        if (chunks.length) {
          index
            .saveObjects(chunks, {
              autoGenerateObjectIDIfNotExist: true,
            })
            .catch(reject)
            .then(resolve)
        }
      })
      .on('error', reject)
  })
}

function getIndices(client, indicesNames) {
  return Promise.all(
    indicesNames.map((indexName) => client.initIndex(indexName))
  )
}

module.exports = { readJsonFiles, saveObjectsByChunks, getIndices }
