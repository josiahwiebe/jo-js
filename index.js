import os from "os";
import fs from "fs";
import path from "path";

function get_git_config_user() {
  const gitconfigPath = path.join(os.homedir(), '.gitconfig');
  if (!fs.existsSync(gitconfigPath)) {
    return null;
  }

  const content = fs.readFileSync(gitconfigPath, 'utf8');
  const match = content.match(/\[user\][^\[]*name\s*=\s*(.*)/);

  return match ? match[1].trim() : null;
}

const name_checks = [
  process.env.USER,
  process.env.USERNAME,
  process.env.LOGNAME,
  os.userInfo().username,
  os.userInfo().name,
  os.userInfo().username,
  os.userInfo().name,
  get_git_config_user(),
]

const name = name_checks.find(name => name !== null);

if (!name || name.length === 0 || !name.toLowerCase().startsWith("jo")) {
  console.log('\x1b[33m%s\x1b[0m', '⚠️  Warning: It doesn\'t look like you are authorized to use Jo.js.');
  process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', '✅  Success: You are authorized to use Jo.js.');