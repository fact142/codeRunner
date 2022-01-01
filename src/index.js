const express = require('express');
const cors = require('cors');
const codeRouter = require('./codeRouter')

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/code', codeRouter)

const start = () => {
  try{
    app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`))
  }catch (e){
    console.log(e)
  }
}

start()
module.exports = app;
