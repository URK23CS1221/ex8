require('dotenv').config();
const express = require('express');
const connectDB = require('./src/utils/db');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.json());
const limiter = rateLimit({ windowMs: 15*60*1000, max: 200 });
app.use(limiter);

connectDB(process.env.MONGO_URI).catch(err => { console.error(err); process.exit(1); });

app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/students', require('./src/routes/students'));
app.use('/api/payments', require('./src/routes/payments'));

app.get('/', (req,res) => res.send('Fee portal API running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`server ${PORT}`));
