import express from 'express'
const app = express()
import usersRouter from './routes/users.routers'
import databaseService from './services/database.services'
const PORT = 3000
databaseService.connect()
app.use(express.json())
//localhost:3000/
app.get('/', (req, res) => {
  res.send('hello world')
})
app.use('/users', usersRouter)
//localhost:3000/users/tweets

app.listen(PORT, () => {
  console.log(`Server đang chạy trên post ${PORT}`)
})
