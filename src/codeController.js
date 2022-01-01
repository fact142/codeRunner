const fs = require("fs");
const { spawn } = require('child_process');

const formatError = (text) => {
  const string = text.toString('utf8')
  const textArray = string.split(',')
  textArray.shift()
  return textArray.toString()
}
const checkTest = (text) => {
  const string = text.toString('utf8')
  return string.indexOf('OK') >= 0;
}
class codeController{
  async execute(req, res){
    try{
      const { code, language } = req.body
      switch (language){
        case 'python':
          fs.writeFileSync("code.py", code)
          const pp = spawn('python', ['code.py']);
          pp.stderr.on('data', (data) => {
            return res.json({message: formatError(data)})
          });
          await pp.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          })
          const test = spawn('python', ['code_test.py'])
          await test.stderr.on('data', (data) => {
            if(checkTest(data)){
              return res.json({passed: true})
            }
            return res.json({message: 'tests failed'})
          });
          await test.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
          })
      }
    } catch (e){
      console.log(e)
      res.status(400).json({message: "Registration error"})
    }
  }
}
module.exports = new codeController()
