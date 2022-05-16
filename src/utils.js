const fsp = require('fs/promises')
const path = require('path')
const gm = require('gm')
const { profile } = require('console')

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
	return readDirFull(dir, cb)
}

const resizing = i => {
	//for (let i = 0; i < 100; i++) {
	console.log(`progress :${i}`)
	//}
}

const ifExists = filePath => {
	fsp.access()
}

const resizer = async (input, dirName, rootDir, profileName, size, quality, waterMark, logo) => {
	// console.log(`${rootDir}${dirName}${profileName}`)

	try {
		let newDir = await fsp.mkdir(`${rootDir}/${dirName}${profileName}`, err => {
			if (err) throw err
		})

		const exists = () => {
			fsp.access()
		}

		if (typeof input === 'object') {
			input.forEach(file => {
				// console.log(`${rootDir}${dirName}/${file}`)
				gm(`${rootDir}/${dirName}${file}`)
					.resize(size)
					.quality(quality)
					.fill('#fd01fe')
					.font('AvantGarde-Demi')
					.drawText(size * 0.1, size * 0.1, logo)
					.fontSize(size * 0.05)
					.monitor(resizing)
					// .composite('../public/waterMarks/watermark.png') // composes two images
					.resize(size)
					.write(`${rootDir}/${dirName}${profileName}/` + file, function (err) {
						if (err) console.log(err)
					})
			})
		} else {
			gm(`${rootDir}/${dirName}${input}`)
				.resize(size, size)
				.quality(quality)
				.fill('#fd01fe')
				.drawText(size * 0.01, size * 0.01, logo)
				.fontSize(size * 0.1)
				.write(`${rootDir}/${dirName}${profileName}/` + input, function (err) {
					if (err) console.log(err)
				})
		}

		console.log(`Finished resizing files from ${rootDir}${dirName}`)
	} catch (err) {
		console.log(err)
	}
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
