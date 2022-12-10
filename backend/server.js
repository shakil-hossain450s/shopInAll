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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`)
})