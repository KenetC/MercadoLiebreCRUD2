// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: function (req, file, cb)
    {
      cb(null, path.join(__dirname,'../','../public/images/products') )  
    },
    filename:  function(req, file, cb){
       cb(null, 'img' + "-" + Date.now() + path.extname(file.originalname) );
    }
})

var  upload  =  multer ( { storage } );

router.get('/', productsController.index); 

router.get('/create', productsController.create); 
router.post( '/', upload.single('image'), productsController.store );

router.get('/:id/', productsController.detail); 

router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update );

router.delete('/:id', productsController.destroy); 

module.exports = router;  