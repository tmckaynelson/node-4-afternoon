const users = require('../models/users')

let id = 1

const login = (req, res) => {
    const { username, password } = req.body

    let foundUser = users.filter(user => username === user.username) 

    if (foundUser.length === 0) {
        res.status(500).send('user not found')
        return
    }

    if(foundUser[0].password === password) {
        req.session.user.username = username
        res.status(200).send(foundUser[0])
    }
    else {
        res.status(500).send('incorrect password')
    }
}

const register = (req, res) => {
    const {username, password} = req.body
    const newUser = {
        id,
        username,
        password
    }
    id++
    users.push(newUser)

    req.session.user.username = username

    res.status(200).send(req.session.user)
}

const signout = (req, res) => {

    req.session.destroy()
    res.status(200).send(req.session)
}

const getUser = (req, res) => {

    console.log(req.session.user)

    res.status(200).send(req.session.user)
}

module.exports = {
    login,
    register,
    signout,
    getUser
}