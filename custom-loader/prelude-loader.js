const fileExists = require("file-exists");
const fs = require("fs");

module.exports = function(source, map) {
	const callback = this.async();
	const { integrateWith, pluginDirectory } = this.query;
	if (typeof source === "string") {
		source = source.replace(/(.*)\/\/prelude::(\w*?)::\s*[\r\n]/gi, (match, _, string) => {
			if (integrateWith) {
				const hook = `${pluginDirectory}/${integrateWith}/${string}.js`;
				if (fileExists.sync(hook)) {
					return fs.readFileSync(hook);
				}
				return "";
			}
		});
	} else {
		this.emitWarning("'source' received by loader was not a string");
	}
	this.cacheable && this.cacheable();
	callback(null, source, map);
};
