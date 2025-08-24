import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Deprecated: Local upload middleware is no longer used. All image uploads now use Cloudinary via config/cloudinary.js
