const express = require('express');
const cors = require('cors');

const app = express();

app.get('/', (req: any, res: any) => {
    res.json({ message: 'true' })
})

app.use(cors('*'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8001, () => {
    console.log('Api_Server is listening at PORT 8001');
})