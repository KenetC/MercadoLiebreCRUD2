const fs = require('fs');
const path = require('path');

const modelController = function (name) {
    console.log('Estoy en el modelo:' + name);
    
    return {
        tablePath: path.resolve(__dirname, '../data/', `${name}.json`),

        readFile: function () {
            let tableContents = fs.readFileSync(this.tablePath, 'utf-8'); //leo 
            const table = JSON.parse(tableContents); // lo paso a JS
            return (table.length > 0 ? table : [] );
        },

        writeFile: function (contents) {
            let tableContents = JSON.stringify(contents, null, ' '); // lo paso a JSON
            fs.writeFileSync(this.tablePath, tableContents); // paso tableContentes al DataBase
        },
        
        nextId: function () {
            let products = this.readFile();
            let nextID = products.length;
            return (nextID ? ++nextID : 1);
        },
        
        all: function () {
            return this.readFile();
        },
        
        find: function (id) {
            let products = this.readFile();
            return products.find(i => i.id == id);
        },

        create: function (product) {
            let products = this.readFile();
            product.id = this.nextId();
            products.push(product);
            this.writeFile(products);// lo guardo 
            return product.id;
        },

        update: function (product) {
            let products = this.readFile(); 
            let update = products.map(prod=>{
                (prod.id == product.id ? product : prod);  
            });
            this.writeFile(update); // lo guardo 
            return product.id; 
        },

        delete: function (id) {
            let products = this.readFile();
            let updated = products.filter(product => product.id != id);
            this.writeFile(updated); // lo guardo 
        },

        visited: function () {
            const products = this.readFile();
            const visitados = products.filter(p => p.category == 'visited')
            return visitados 

        },

        inSale: function () {
            const products = this.readFile();
            const enVenta = products.filter(i => i.category == 'in-sale')
            return enVenta
        }

    }
}

module.exports = modelController