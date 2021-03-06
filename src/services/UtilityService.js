const _fs = require('fs');

/**
 * @param {String} propertyName the property name to search for in request.body
 * @param {Number} nameLength the length of the random string generated for the name of the file to save
 */
function base64ToFile(propertyName, nameLength = 20) {
    return function (request, response, next) {
        let data,
            prop = propertyName.split()[0];
        if (prop.endsWith("[]")) {
            data = Object.assign([], request.body[prop]);
            if (!data.length) return next();
            prop = prop.split("[")[0];
            request.body[prop] = [];
            data.forEach(d => {
                console.log(Object.keys(d));
                dataToFile(d, pathForDb => {
                    request.body[prop].push(pathForDb);
                });
            });
            return next();
        } else {
            data = request.body[prop];
            if (!data) return next();
            dataToFile(data, pathForDb => {
                request.body[prop] = pathForDb;
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
            _fs.writeFile(path, buffer, (err) => console.log("did not wait for the file to finish saving. " + err));
            callback(pathForDb);
        }

        function generateFileName(type) {
            let code = randomCodeGenerator({
                alphaNumeric: true,
                size: nameLength,
                allowedCharacters: "aA#"
            }),
                pathForDb = `/public/uploads/${code}.${type}`,
                path = `${process.cwd()}${pathForDb}`,
                exists = _fs.existsSync(path);
            while (exists) {
                code = randomCodeGenerator({
                    alphaNumeric: true,
                    size: nameLength,
                    allowedCharacters: "aA#"
                }),
                    pathForDb = `/public/uploads/${code}.${type}`,
                    path = `${process.cwd()}${pathForDb}`,
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
            // }
        }
        next();
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