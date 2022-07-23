const {menu,restaurants} = require('../models/restaurants');
const commanUtils = require('../utils/common');
const {getArray} = require('../utils/user')

const menuController = {
    getItem: (request,response) => {
        if ( Object.keys(request.query).length === 0){
            console.log(menu.find().all())
            response.status(401);
            response.json({
                success:false
            });
        }else{
            const item = request.query.item
            menu.findOne( { where: { item } })
            .then(menuItem => {
                 if(menuItem === null || menuItem === undefined){
                     response.status(401);
                     response.json({
                         success:false,
                         message: item + " was not found"
                     })
                }else{
                    response.status(201);
                    response.json({
                        success:true,
                        data:{
                            menu:menuItem
                        }
                    })           
                }
            })
        }
        console.log(request.query);
        return response;
    },
    addItem: (request, response) => {
        const menuData = {};
        
        if (request.body.item !== undefined && request.body.item !== '' ){
            menuData.item = request.body.item
        }
        if (request.body.item_price !== undefined && request.body.item_price !== '' ){
            menuData.item_price = request.body.item_price
        }

        if(Object.keys(menuData).length === 2){
            
            menu.create(menuData)
            .then( (result) => {
            response.status(201);
            response.json({
                success: true,
                message: 'menu created successfully',
                data: {
                item: menuData,
                },
            });
            return response;
            })

        }else{
            if(Object.keys(menuData).length === 2){
            
            response.status(401);
            response.json({
                success: false,
                message: 'something went wrong.\n',
            });

            return response;
            }
        }
    },
    getAllMenus: (request, response) => {
        restaurants.find()
        .then( (result) => {
            const menus = getArray(result)
            response.status(201);
            response.json({
                success:true,
                message: `There are ${menus.length} menus in total from across ${result.length} restaurants!`,
                data: {
                    menu: menus,
                },
            });
            return response
        })
        .catch(err => console.log(err))
    }
}

const restaurantController = {
    getRestaurants: (request,response) => {
        restaurants.find()
        .then( (result) => {
        response.status(201);
        response.json({
            success: true,
            message: `There are ${result.length} restaurants in total`,
            data: {
            restaurants: result,
            },
        });
        console.log('===>',result.length)
        return response;
        })
    },
    addRestaurant: (request, response) => {
        const restaurantData = {};

        if (request.body.restaurant_name !== undefined && request.body.restaurant_name !== '' ){
            restaurantData.restaurant_name = request.body.restaurant_name
        }
        if (request.body.restaurant_latitude !== undefined && request.body.restaurant_latitude !== '' ){
            restaurantData.restaurant_latitude = request.body.restaurant_latitude
        }
        if (request.body.restaurant_longitude !== undefined && request.body.restaurant_longitude !== '' ){
            restaurantData.restaurant_longitude = request.body.restaurant_longitude
        }
        if (request.body.restaurant_longitude !== undefined && request.body.restaurant_longitude !== '' ){
            const { menu } = request.body;

            if(menu.length > 0){
                const arr = [];
                menu.forEach(item => {
                    const cont = commanUtils.isStringNonEmpty(item.item) && commanUtils.isStringNonEmpty(item.item_price)
                    if (cont){
                        console.log('===>hello>',cont);
                        return arr.push(item);
                    }
                })
                console.log('=====> how bro?',arr)

                if(arr.length === menu.length){
                    restaurantData.menu = menu;
                }else{
                    response.status(401);
                    response.json({
                        success: false,
                        message: 'Item and Item price must not be empty',
                    });
                    return response;
                }
            }
        }

        if(Object.keys(restaurantData).length === 4){
            
            restaurants.create(restaurantData)
            .then( (result) => {
            response.status(201);
            response.json({
                success: true,
                message: 'restaurant was created successfully',
                data: {
                item: restaurantData,
                },
            });
            return response;
            })

        }else{
            response.status(401);
            response.json({
                success: false,
                message: 'something went wrong',
            });
            return response;
        }
        return response;

    },
}


// findById: (id, res) => {
//     models.findOne({ where: { id: id } }).then(user => {
//       res(user);
//     });
//   },

module.exports = {menuController,restaurantController};