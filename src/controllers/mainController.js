const { json } = require('express/lib/response');
const fs = require('fs');
const path = require('path');

const jsonDB = require('../model/jsonDatabase');
const productModel = jsonDB('productsDataBase');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		const visited = productModel.visited(); 
		const inSale = productModel.inSale();

		res.render('index', { visited: visited, inSale : inSale }  );
	},

	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;

