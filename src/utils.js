const fsp = require('fs/promises')
const path = require('path')
const gm = require('gm')

const readDirFull = async (dir, cb) => {
	// reading a directory then returning an array of objects with names and last edit time
	// of files of each file in declared directory
	//
	return fsp.readdir(dir).then(files => {
		let returnedArr = files.map(cb)
		return Promise.all(returnedArr)
	})
}

const readDirStat = async dir => {
	const cb = async file => {
		return fsp.stat(path.join(dir, file)).then(stat => {
			return {
				name: file,
				time: stat.mtime.toDateString(),
				size: stat.size,
				isFile: stat.isFile(),
				isDirectory: stat.isDirectory(),
			}
		})
	}
	console.log()
	return readDirFull(dir, cb)
}

const resizer = async (filesArr, dirName, rootDir, outputDir) => {
	filesArr.forEach(file => {
		// console.log(`${rootDir}${dirName}/${file}`)
		gm(`${rootDir}${dirName}/${file}`)
			.resize(200, 200)
			.write('./converted' + '/resizes_' + file, function (err) {
				if (err) console.log(err)
			})
		console.log(`Resized ${file}`)
	})
	console.log(`Finished resizing files from ${rootDir}${dirName}`)
}

// const readOnlyFiles = async dir => {
// 	const cb = file => {
// 		return `plik dupa ${file}`
// 	}
// 	return readDirStat(dir, cb)
// }

// const main = async () => {
// 	console.log(JSON.stringify(await readOnlyFiles('./')));
// 	// console.log(JSON.stringify(await readDirStat('./')))
// }

// main()

module.exports.resizer = resizer
module.exports.readDirFull = readDirFull
module.exports.readDirStat = readDirStat
