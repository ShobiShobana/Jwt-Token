const expresss = require('express');
const router = expresss.Router();
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
        console.log('uploaded');
    },
    filename: function(req, file, cb) {
        console.log('filename changed to -->' + file.originalname);
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const ProductController = require('../controllers/products');

router.get('/', ProductController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'), ProductController.products_create_product);

router.get('/:productId', ProductController.product_get_product);

router.patch('/:productId', checkAuth, ProductController.product_update_product);

router.delete('/:productId', checkAuth, ProductController.products_delete_product);

module.exports = router;