const Order = require("../models/orderModel.js");

exports.getAvailableOrders = async (req, res) => {
  const orders = await Order.findAll();

  // preguntar a joaco como hacer acá el filter
  // pq no se que objeto seria orders

  //filter((e) => e.status === "created")

  return res.status(200).json({
    status: "success",
    data: {
      results: orders.length,
      orders,
    },
  });
};

exports.getOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByPk(id, {}); // completar con el response

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  return res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
};

exports.completeOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByPk(id, {}); // completar con el response

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  order.status == "done";
  order.completedAt == Date.now();

  await newOrder
    .save()
    .then((_) => {
      res.status(201).json({
        status: "success",
        data: {
          order: order,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        status: "fail",
        message: err.parent.detail,
      });
    });
};

exports.assignOrderById = async (req, res) => {
  const id = req.params.id;
  const depositId = req.params.depositId;
  const order = await Order.findByPk(id, {}); // completar con el response

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  order.status == "done";
  order.depositId == depositId;

  await newOrder
    .save()
    .then((_) => {
      res.status(201).json({
        status: "success",
        data: {
          order: order,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        status: "fail",
        message: err.parent.detail,
      });
    });
};

exports.createOrder = async (req, res) => {
  const { observations, materials } = req.body;

  if (materials.length === 0)
    return res.status(400).json({
      status: "fail",
      message: "An order needs materials",
    });

  // falta settear createdAt y status en created
  const newOrder = Order.build({ materials, observations });

  await newOrder
    .save()
    .then((_) => {
      res.status(201).json({
        status: "success",
        data: {
          order: newOrder,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({
        status: "fail",
        message: err.parent.detail,
      });
    });
};