import multer from "multer";
import path from "path";
import { authenticated } from "../../middleware/auth";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appending extension
    },
});

const upload = multer({ storage: storage });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default authenticated(async (req, res) => {
    if (req.method === "POST") {
        // handle upload
        const multerSingle = upload.single("file");

        await new Promise((resolve, reject) => {
            multerSingle(req, res, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });

        if (!req.file) {
            res.status(400).json({ error: "Please provide a file" });
            return;
        }

        // Here, req.file is the newly uploaded file
        // You can now save req.file.path to your database
        res.status(200).json({
            message: "File uploaded successfully",
            filePath: req.file.path,
        });
    } else {
        res.status(405).end(); //Method Not Allowed
    }
});
