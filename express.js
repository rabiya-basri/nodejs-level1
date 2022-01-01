const express = require('express')
const app = express()
app.use(express.json())
const port = 3040

const customers = [
    { id: 1, name: 'raj' },
    { id: 2, name: 'ram' }
]

//request handelers
app.get('/', (req, res) => {
    res.send('welcome')
})

app.get('/customer', (req, res) => {
    res.json(customers)
})
app.get('/customer/:id', (req, res) => {
    const id = req.params.id
    const customer = customers.find(customer => customer.id == id)
    if (customer) {
        res.json(customer)
    } else {
        res.json({})
    }
})

//put
app.put('/customer/:id', (req, res) => {
    const id=req.params.id
    res.send(`put method send to server ${id}`)
})

//delete
app.delete('/customer/:id', (req, res) => {
    const id = req.params.id
    res.send(`delete method to perform ${id}`)
})

//create
app.post('/customer', (req, res) => {
    const body = req.body
    res.json(body)
})
app.listen(port, () => {
    console.log('port',port)
})