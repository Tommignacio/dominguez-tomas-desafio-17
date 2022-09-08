export const info = {
	"Node version": process.version,
	platformName: process.platform,
	"Directorio de ejecución": process.cwd(),
	"ID del proceso": process.pid,
	"Uso de la memoria": process.memoryUsage(),
	"Memoria total reservada (rss)": process.memoryUsage().rss,
	"path de ejecución": process.execPath, //donde está el ejecutable de node
	"Argumentos de entrada": process.argv,
};
