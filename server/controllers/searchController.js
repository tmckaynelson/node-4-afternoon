const swag = require('../models/swag')

const search = (req, res) => {

    const { category } = req.query

    let searched = swag.filter( swag => swag.category === category)

    if(searched[0]) {
        res.status(200).send(searched)
    }
    else {
        res.status(200).send(swag)
    }
}

module.exports = {
    search
}