const fsp = require('fs/promises')
const path = require('path')

const readDirFull = async (dir, cb) => {

	// reading a directory then returning an array of objects with names and last edit time
	// of files of each file in declared directory
	//
	return fsp.readdir(dir).then(files => {
		let returnedArr = files.map(cb)
		return Promise.all(returnedArr)
	})
}

const readDirStat = async (dir) => {
	const cb = async file => {
		return fsp.stat(path.join( dir, file )).then(stat => {
			return {
			name: file,
			time: stat.mtime.toDateString(),
			size: stat.size,
			isFile: stat.isFile(),
			isDirectory: stat.isDirectory(),
		};});
	}
	return readDirFull(dir,cb);
}

/*
const readOnlyFiles = async (dir) => {
	const cb = (file) => {
		return `plik dupa ${file}`;
	}
	return readDirFull(dir, cb)
}

const main = async () => {
	console.log(JSON.stringify(await readOnlyFiles('/home/adam/')));
	console.log(JSON.stringify(await readDirStat('/home/adam/')));

}

main()
*/
module.exports.readDirFull = readDirFull;
module.exports.readDirStat = readDirStat;
