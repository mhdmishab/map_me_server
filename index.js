import express from 'express';
import morgan from 'morgan';
import dbConfig from './connection/dbConfig.js';
import route from './routes/route.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
    origin: ['http://localhost:5173','https://mapmee.netlify.app'],
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
dbConfig();
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/test', (req, res) => {
  res.send('Hello, world!');
});

app.use('/api',route);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});