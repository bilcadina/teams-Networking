const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// const jsonPath = __dirname + '../team.json';
// console.log(jsonPath);

app.use(express.static('./team.json'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})