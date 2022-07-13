const {Order} = require("../models/order");

exports.placeOrder = (req, res) => {

	req.body.order.user = req.profile;
	const order = new Order(req.body.order);
	order.save((err, order) => {
		if (err) {
			return res.status(400).json({
				error: "Failed to place your order ",
			});
		}
		res.json(order);
	});
};