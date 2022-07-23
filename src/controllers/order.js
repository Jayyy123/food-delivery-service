const {order} = require('../models/orders');
const { restaurants } = require('../models/restaurants');
const user = require('../models/user');
const { isStringNonEmpty } = require('../utils/common');
const commanUtils = require('../utils/common');
const {getArray} = require('../utils/user')

const orderController = {
    getOrders: (request,response) => {

        const email_id = request.query.id
        if(email_id){
            order.find({ email_id })
            .then(user => {
                console.log(user)
                if(user.length < 1){
                    response.status(401)
                    response.json({
                        success:false,
                        message:'User order not found'
                    })
                }else{
                    let total = 0;

                    total += user.reduce((t,prev) => t + parseInt(prev.cost) ,0)

                    response.status(201);
                    response.json({
                        success:true,
                        orders:user,
                        message:`Your total expense is ${total}`
                    })
                }
            })
        }else{
            response.status(401)
            response.json({
                success:false,
                message:'No userid present'
            })
        }

        return response;
    },
    makeOrder: (request,response) => {
        const email_id = request.body.email_id
        const menuItem = request.body.menuItem
        const quantity = request.body.quantity

        if(commanUtils.isStringNonEmpty(email_id) && commanUtils.isStringNonEmpty(menuItem) && commanUtils.isStringNonEmpty(quantity)){
            
            let cost = parseInt(quantity);
            let found = false

            user.findOne({ email_id })
            .then( result => {
                if(result !== null){
                    restaurants.find()
                    .then( (result) => {
                        
                        const menus = getArray(result)
                        menus.forEach(item => {
                            if(item.item === menuItem){
                                cost *= parseInt(item.item_price);
                                found = true;
                            }
                        })
                        if(found){
                            if(cost !== NaN && cost != 0){
                                const data = {email_id,menuItem,quantity,cost}
            
                                order.create(data)
                                .then( (result) => {
                                    response.status(201);
                                    response.json({
                                        success: true,
                                        message: 'order was made successfully',
                                        data: {
                                        order: data,
                                        },
                                    });
                                })
                            }else{
                                response.status(401)
                                response.json({
                                    success:false,
                                    message:'Invalid quantity'
                                })
                            }
                        }else{
                            response.status(401)
                            response.json({
                                success:false,
                                message:'Invalid Menu Item. Please enter a valid meal'
                            })
                        }
        
                    })
                }else{
                    response.status(401)
                    response.json({
                        success:false,
                        message:'Invalid User. Please create an account to make an order'
                    })
                }
            })
        }else{
            response.status(401);
            response.json({
                success: false,
                message: 'something went wrong while making your order',
            });
        }
        return response;
    },

    checkOrderStatus: () => {

    },
}

module.exports = {orderController}