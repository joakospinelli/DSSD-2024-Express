const Order = require("../models/orderModel.js");
const OrderMaterial = require("../models/orderMaterialModel.js");
const Material = require("../models/materialModel.js");

/**
 * @returns Devuelve todas las órdenes con el estado "created".
 */
exports.getAvailableOrders = async (req, res) => {
  const orders = await Order.findAll({
    where: { status: "created" },
    include: [
      {
        model: OrderMaterial,
        as: "materials",
        include: [
          {
            model: Material,
            as: "material",
          },
        ],
        required: false,
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    data: {
      results: orders.length,
      orders,
    },
  });
};

/**
 * @param {number} res.params.id Id de la orden
 * @returns La orden con id recibido por parametro.
 */
exports.getOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByPk(id, {
    include: [
      {
        model: OrderMaterial,
        as: "materials",
        include: [
          {
            model: Material,
            as: "material",
          },
        ],
        required: false,
      },
    ],
  });

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

/**
 * Actualiza el estado y la fecha de completitud.
 * @param {number} res.params.id Id de la orden
 * @returns La orden con el estado "done".
 */
exports.completeOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByPk(id); // completar con el response

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  if (!(order.status == "sent"))
    return res.status(404).json({
      status: "fail",
      message: `Couldn't change the order status. Current status: ${order.status}`,
    });

  order.status = "done";
  order.completedAt = Date.now();

  await order
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

/**
 * Actualiza el estado y el deposito que tomo la orden.
 * @param {number} res.params.id Id de la orden
 * @returns La orden con el estado "assigned".
 */
exports.assignOrderById = async (req, res) => {
  const id = req.body.id;
  const depositId = req.body.depositId;
  const order = await Order.findByPk(id); // completar con el response

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  if (!(order.status == "created"))
    return res.status(404).json({
      status: "fail",
      message: `Couldn't change the order status. Current status: ${order.status}`,
    });

  order.status = "assigned";
  order.depositId = depositId;

  await order
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

/**
 * Actualiza el estado.
 * @param {number} res.params.id Id de la orden
 * @returns La orden con el estado "sent".
 */
exports.sendOrderById = async (req, res) => {
  const id = req.params.id;
  const order = await Order.findByPk(id);

  if (!order)
    return res.status(404).json({
      status: "fail",
      message: `Couldn't find order with ID ${id}`,
    });

  if (!(order.status == "assigned"))
    return res.status(404).json({
      status: "fail",
      message: `Couldn't change the order status. Current status: ${order.status}`,
    });

  order.status = "sent";

  await order
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
      res.status(400).json({
        status: "fail",
        message: err.parent.detail,
      });
    });
};

/**
 * @returns La orden creada por la red global.
 */
exports.createOrder = async (req, res) => {
  const { observations, materials } = req.body;

  if (materials.length === 0)
    return res.status(400).json({
      status: "fail",
      message: "An order needs materials",
    });

  const newOrder = Order.build({
    observations,
  });

  await newOrder
    .save()
    .then((_) => {
      materials.forEach(async (e) => {
        const newMaterial = OrderMaterial.build({
          amount: e.amount,
          materialId: e.id,
          orderId: newOrder.id,
        });
        await newMaterial.save();
      });

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
