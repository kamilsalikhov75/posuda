import { OrderModel } from '../models/order.js';

export async function createOrder(req, res) {
  try {
    const doc = new OrderModel({
      products: req.body.products,
      user: req.userId,
      price: req.body.price,
      address: req.body.address,
    });

    const order = await doc.save();

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(400).send('Не удалось создать заказ');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Не удалось создать заказ');
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await OrderModel.find({ user: req.userId }).populate(
      'products.id'
    );

    if (orders) {
      res.status(200).json(orders);
    } else {
      res.status(400).send('Не удалось получить заказы');
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Не удалось получить заказы');
  }
}
