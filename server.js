/*
*
*Author: Hector Fernandes
*
*
*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./app/models/product');


dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8003;
let userDB = process.env.DB_USER;
let passwordDB = process.env.DB_PASSWORD;
let nameDB = process.env.DB_NAME;
let hostDB = process.env.DB_HOST;

mongoose.connect(`mongodb+srv://${userDB}:${passwordDB}@${hostDB}.mongodb.net/${nameDB}?retryWrites=true&w=majority`, {useUnifiedTopology: true, useNewUrlParser: true});

let router = express.Router();

router.use((req, res, next) => {
    console.log("Está acontecendo algo.");
    next();
});


router.get('/', (req, res) => {

    res.json({ message: 'Funcionando lindamente!'});

});

router.route('/products')

.post((req, res) =>{
    let product = new Product;

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;

    product.save((error) =>{
        if(error){
            res.send(error);
        }

        res.json({
            message: 'Produto cadastrado com sucesso!!'
        });

    });
})

.get((req, res) => {
    Product.find((error, products) => {
        if(error){
            res.send('erro: ' + error);
        }

        res.json(products);

    });

    
});


router.route('/products/:product_id')

    .get((req, res) => {

        Product.findById(req.params.product_id, (error, product) => {
            if(error)
                res.send('erro: '+ error);

            res.json(product);
        });

    })

    .put((req, res) => {

        Product.findById(req.params.product_id, (error, product) => {
            if(error)
                res.send('erro: ' + error);

            product.name = req.body.name;
            product.price = req.body.price;
            product.description = req.body.description;

            product.save( (error) => {
                if(error)
                    res.send(error);

                res.json({message : "Produto atualizado!"});
            });

        });

    })

    .delete((req, res) => {
        Product.remove({
            _id: req.params.product_id
        }, (error) => {
            if(error)
                res.send('Erro: ' + error);

            res.json({ message: "Produto excluído com sucesso!" });
            
        });
    });



app.use('/api', router);

app.listen(port);

console.log('Iniciando o server na porta ' + port);
