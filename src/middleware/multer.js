import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = async (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true)
    }
    else {
        cb(new Error("Unsupported Image Type"))
    }
}

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
})

export default upload;