// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';
import {products} from '../../../libs/products.json'

export default function handler(req, res) {
    if (req.query && Object.keys(req.query).length > 0) {
        console.log('co bien query')

        const filteredProducts = products.filter((product) => {
            return product.title.toLowerCase().includes(req.query.title.toLowerCase());
        });

        res.send(filteredProducts);
    } else {
        console.log('tra het ket qua')
        res.send(products)
    }

}
