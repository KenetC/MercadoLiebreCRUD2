const fs = require('fs');
const path = require('path');

const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('productsDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = productModel.all();

		res.render('products', { products } );		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = productModel.find(req.params.id);
		res.render('detail', { product } )
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res, next) => {
		if (req.file){
			console.log(req.file);
			let aCrear = req.body;
			aCrear.image = req.file.filename;
			let aCrearID = productModel.create(aCrear);
			res.redirect(`/products/${aCrearID}`);
		}else { 
			const error = new Error('Hubo un error intente nuevamente, subir la imagen!')
			return next(error)
		}
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = productModel.find(req.params.id);
		res.render('product-edit-form', {productToEdit : product});
	},
	// Update - Method to update
	update: (req, res) => {
		let product = productModel.find(req.params.id);
		let aCambiar = {
			id: Number(req.params.id),
			name: req.body.name, 
			description: req.body.description,
			price: Number(req.body.price), 
			discount: Number(req.body.discount), 
			category: req.body.category, 
			image: product.image
		};
		productModel.update(aCambiar);
		res.redirect(`/products`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const product = productModel.find( req.params.id );
		fs.unlinkSync( path.join(__dirname,'../','../public/images/products',`${product.image}` ) )
		productModel.delete(req.params.id);
		res.redirect('/products');  
	}
};

module.exports = controller;