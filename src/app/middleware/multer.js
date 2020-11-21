const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/images')
    },

    filename: function (req, file, callback) {
        callback(null, `${Date.now().toString()}-${file.originalname}`)
    }

})

const fileFilter = function (req, file, callback) {

    const imgFormatoAceite = ['image/png', 'image/jpg', 'image/jpeg']
        .find(formatoAceite => formatoAceite == file.mimetype)

    if (imgFormatoAceite) {
        return callback(null, true)
    }

    return callback(null, false)
}



module.exports = multer({
    storage,
    fileFilter
})