import { ProductModel } from '../models/product.js';

export async function createProduct(req, res) {
  try {
    const doc = ProductModel({
      name: req.body.name,
      image: req.body.image,
      weight: req.body.weight,
      category: req.body.category,
      size: req.body.size,
      count: req.body.count,
      price: req.body.price,
    });

    const product = await doc.save();

    if (product) {
      res.status(200).json(product);
    } else {
      res.staus(400).send('Не удалось создать товар');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось создать товар');
  }
}

export async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find();

    if (products) {
      res.status(200).json(products);
    } else {
      res.staus(400).send('Не удалось получить товары');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товары');
  }
}
export async function getProducts(req, res) {
  try {
    const { category } = req.params;
    const products = await ProductModel.find({ category });

    if (products) {
      res.status(200).json(products);
    } else {
      res.staus(400).send('Не удалось получить товары');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товары');
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById(id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.staus(400).send('Не удалось получить товар');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось получить товар');
  }
}
