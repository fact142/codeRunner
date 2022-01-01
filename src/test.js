const { spawn } = require('child_process');
const pp = spawn('python', ['code_test.py']);

pp.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

pp.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

pp.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
