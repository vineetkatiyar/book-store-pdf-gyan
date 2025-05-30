import exoress from 'express';

const app = exoress();

app.get('/', (req, res) => {
    res.status(200).json({message :'Hello World!'});
});

export default app;
