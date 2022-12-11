import express from 'express';
import data from './data.js';
const port = process.env.PORT || 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('Server is running')
})
app.get('/api/products', (req, res) => {
    res.send(data)
});

app.get('/api/products/slug/:slug', (req, res)=>{
    const slug = req.params.slug;
    const product = data.products.find(p => p.slug === slug);
    if (product) {
        res.send(product)
    }
    else {
        res.status(404).send('Product not found')
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})