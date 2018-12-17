const _fs = require('fs');

/**
 * @param {String} propertyName the property name to search for in request.body
 * @param {Number} nameLength the length of the random string generated for the name of the file to save
 */
function base64ToFile(propertyName, nameLength = 20) {
    return function (request, response, next) {
        let data = Object.assign([], request.body[propertyName]);

        if (propertyName.endsWith("[]")) {
            propertyName = propertyName.split("[")[0];
            request.body[propertyName] = [];
            data.forEach(d => {
                console.log(Object.keys(d));
                dataToFile(d, pathForDb => {
                    request.body[propertyName].push(pathForDb);
                });
            });
            return next();
        } else {
            dataToFile(data, pathForDb => {
                request.body[propertyName] = pathForDb;
                return next();
            });
        }

        function dataToFile(data, callback) {
            const buffer = new Buffer(data.base64, 'base64');
            let type = getTypeFromMime(data.mime);

            const {
                path,
                pathForDb
            } = generateFileName(type);
            _fs.writeFile(path, buffer, () => console.log("did not wait for the file to finish saving"));
            callback(pathForDb);
        }

        function generateFileName(type) {
            let code = randomCodeGenerator({
                    alphaNumeric: true,
                    size: nameLength,
                    allowedCharacters: "aA#"
                }),
                pathForDb = `/public/uploads/${code}.${type}`,
                path = `${__dirname}${pathForDb}`,
                exists = _fs.existsSync(path);
            while (exists) {
                code = randomCodeGenerator({
                        alphaNumeric: true,
                        size: nameLength,
                        allowedCharacters: "aA#"
                    }),
                    pathForDb = `/public/uploads/${code}.${type}`,
                    path = `${__dirname}${pathForDb}`,
                    exists = _fs.existsSync(path);
            }
            return {
                path,
                pathForDb
            };
        }

        function getTypeFromMime(mime) {
            switch (mime) {
                case 'image/jpeg' || 'image/jpg':
                    return "jpg";
                case 'image/png':
                    return "png";
                case 'image/mpeg' || 'video/mp4' || 'video/mpeg':
                    return "mp4";
                default:
                    return "";
            }
        }
    }
}

function randomCodeGenerator({
    alphaNumeric,
    size,
    allowedCharacters
}) {
    if (alphaNumeric) {
        var container = "";
        if (allowedCharacters.indexOf("a") > -1) container += "abcdefghijklmnopqrstuvwxyz";
        if (allowedCharacters.indexOf("A") > -1) container += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (allowedCharacters.indexOf("#") > -1) container += "0123456789";
        if (allowedCharacters.indexOf("!") > -1) container += "~`!@#$%^&*()_+-={}[]:\";'<>?,./|\\";
        var result = "";
        for (var i = 0; i < size; i++) result += container[Math.floor(Math.random() * container.length)];
        return result;
    }
    return Math.floor(Math.random() * Math.floor(Math.pow(10, size - 1)));
};

module.exports = {
    base64ToFile,
    randomCodeGenerator
};