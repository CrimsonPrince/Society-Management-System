import models from './models'
const express = require('express')
const port = 3000
const app = express()
app.listen(port, function () {
  console.log('Server is running on ' + port + ' port')
})

app.get('/users', (req, res) => {
  return res.send(Object.values(users))
})
app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId])
})
app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource')
})
app.put('/users/:userId', (req, res) => {
  return res.send(
    `PUT HTTP method on user/${req.params.userId} resource`
  )
})
app.delete('/users/:userId', (req, res) => {
  return res.send(
    `DELETE HTTP method on user/${req.params.userId} resource`
  )
})
