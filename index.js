import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import { createUser, getUser, login } from './controllers/user-controller.js';
import { checkToken } from './check-token.js';
import {
  createProduct,
  getAllProducts,
  getProduct,
  getProducts,
} from './controllers/product-controller.js';
import { createOrder, getOrders } from './controllers/order-controller.js';

const dbUrl =
  process.env.DB ||
  'mongodb+srv://fbnvbv588ufe:6vl6RRcuyXMUukNT@cluster0.okuuchh.mongodb.net/test';

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads');
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log('DB ok');
  })
  .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);
app.use('/uploads', express.static('uploads'));

app.post('/uploads', upload.single('image'), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT || 4002, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

app.post('/register', createUser);
app.post('/login', login);
app.get('/user', checkToken, getUser);

app.post('/products', createProduct);
app.get('/products', getAllProducts);
app.get('/products/:category', getProducts);
app.get('/product/:id', getProduct);

app.post('/orders', checkToken, createOrder);
app.get('/orders', checkToken, getOrders);
