const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/login', (req, res) => {
    const payload = req.body;

    if (payload.login === "Piotr" && payload.password === "Piotr123!")
    {
        res.send({
            clientId: 1,
            firstName: "Piotr",
            surname: "Kowalski",
            tokenStr: 'urgu9843t9uons'
        });
    }
    else
        res.sendStatus(404);
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));