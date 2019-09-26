const swag  = require('../models/swag')

const add = (req, res) => {

    const { id } = req.params

    let index = req.session.user.cart.findIndex(swag => swag.id == id)

    if(index === -1) {

        let item = swag.findIndex(swag => swag.id == id)
        req.session.user.cart.push(swag[item])

        console.log(item)
        console.log(swag[item])

        req.session.user.total += swag[item].price

        res.status(200).send(req.session.user)
    }
    else {
        res.status(200).send(req.session.user)
    }
}

const deleteItem = (req, res) => {

    const { id } = req.params

    let index = req.session.user.cart.findIndex(swag => swag.id == id)
    console.log(index)
    req.session.user.total -= req.session.user.cart[index].price

    req.session.user.cart.splice(index, 1)

    res.status(200).send(req.session.user)
}

const checkout = (req, res) => {

    req.session.user.cart = []
    req.session.user.total = 0

    res.status(200).send(req.session.user)
}

module.exports = {
    add,
    deleteItem,
    checkout
}