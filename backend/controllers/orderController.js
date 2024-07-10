import asyncHandler from "../asyncHandler.js";
import Order from "../models/orderModel.js";

const placeOrder=asyncHandler(async(req, res)=>{
    const {orderItems, shippingAddress, paymentMethod,itemsPrice, shippingPrice, taxPrice, totalPrice}= req.body

    if(orderItems && orderItems.length===0 ){
        res.status(400)
        .json("No items found, please add the items")
    }
    else{ 
        const newOrder= new Order({
            orderItems: orderItems.map((item)=>({
                name: item.name,
                quantity: item.quantity,
                image: item.image,
                price: item.price,
                product: item._id,
            })),
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice
        })

        const createOrder= await newOrder.save();
        res.status(201).json({ message: "Order has been placed successfully", order: createOrder });
    }
})


const getMyOrders=asyncHandler(async(req, res)=>{
    const orders= await Order.find({user: req.user._id})
    
    console.log(orders)
    res.status(200).json(orders)
})
export {placeOrder, getMyOrders};
