const fs = require("fs");
const { spawn } = require('child_process');

const formatError = (text) => {
  const string = text.toString('utf8')
  const textArray = string.split(',')
  textArray.shift()
  return textArray.toString()

}

class codeController{
  async execute(req, res){
    try{
      const { code, language } = req.body
      switch (language){
        case 'python':
          fs.writeFileSync("code.py", code)
          const pp = spawn('python', ['code.py']);
          await pp.stdout.on('data', (data) => {
            return res.json({passed: true})
          });
          await pp.stderr.on('data', (data) => {
            return res.json({message: formatError(data)})
          });
          fs.unlinkSync('code.py')
      }
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Registration error"})
    }
  }
}
module.exports = new codeController()
