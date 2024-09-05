// npm install mongoose uuid

const Order = require('../models/order_model');

// Function to save a new order
async function create(order) {
  try {
    // Create a new order
    const newOrder = new Order(order);

    // Save the order to the database
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}

// Function to get an order by order id
async function getOneByOrderId(orderId) {
  try {
    const order = await Order.findOne({ order_id: orderId });
    return order;
  } catch (error) {
    console.error('Error getting order by order_id:', error);
    throw error;
  }
}

// Function to find all orders
async function findAll() {
  try {
    const orders = await Order.find();
    return orders;
  } catch (error) {
    console.error('Error finding orders:', error);
    throw error;
  }
}

// Function to delete an order by order ID
async function deleteOneByOrderId(orderId) {
  try {
    const deletedOrder = await Order.findOneAndDelete({ order_id: orderId });
    if (!deletedOrder) {
      throw new Error('Order not found');
    }
    return deletedOrder;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
}

// Function to update an order by order ID
async function updateOneByOrderId(orderId, updateData) {
  try {
    const updatedOrder = await Order.findOneAndUpdate(
      { order_id: orderId },
      updateData,
      { new: true, runValidators: true } // Return the updated document and run validators
    );
    if (!updatedOrder) {
      throw new Error('Order not found');
    }
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
}

module.exports = { create, getOneByOrderId, findAll, deleteOneByOrderId, updateOneByOrderId };