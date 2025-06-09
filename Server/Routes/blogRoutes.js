import express from 'express'
import {createBlog, filterBlog, getBlogId} from '../controller/blogController.js'
import auth from '../middleware/auth.js'
import multer from 'multer';
const router = express.Router();
import { getBlog } from '../controller/blogController.js';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Specify the uploads directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, uniqueSuffix); // Use a unique filename
    },
  });

const upload = multer({ storage: storage });

router.post('/create',upload.single("image"),createBlog);
router.get('/get',getBlog);
router.get('/filter',filterBlog);
router.get('/:id',getBlogId);

export default router;
