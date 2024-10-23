import express from 'express';

const port = 3000;
const app = express();
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World from Docker container!')
});

router.get('*', function(req, res){
    res.status(404).send('Goodbye world...');
});

app.use("/", router);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
