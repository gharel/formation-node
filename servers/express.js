import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('Hello Express!'));

app.listen(3000, () => console.log('http://localhost:3000'));

// Launch with: npm i -D express && node express.js
