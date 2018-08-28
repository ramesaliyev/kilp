#! /usr/bin/env node
const exec = require('exec-sh');

const pExec = (command) => new Promise((resolve, reject) =>
  exec(command, true, (err, stdout, stderr) =>
    (err || stderr) ? reject(err || stderr) : resolve(stdout)
  )
);

async function kilp(port) {
  let pid;

  try {
    pid = await pExec(`lsof -ti tcp:${port}`);
    pid = pid.trim();
  } catch (e) {
    return console.log('Process not found.');
  }

  try {
    await pExec(`kill -9 ${pid}`);
  } catch (e) {
    return console.log(`Cannot kill the process PID:${pid}.`);
  }

  return console.log(`Process killed PID:${pid}.`);
}

const port = +process.argv[2];

if (!port) {
  return console.log('usage: kilp <port>');
}

kilp(port);