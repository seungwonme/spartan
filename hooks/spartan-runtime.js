#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { getClaudeDir } = require('./spartan-config');

const STATE_FILE = '.spartan-active';
const statePath = path.join(getClaudeDir(), STATE_FILE);

function setMode(mode) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, mode);
}

function clearMode() {
  try { fs.unlinkSync(statePath); } catch (e) {}
}

function writeHookOutput(event, mode, context = '') {
  process.stdout.write(context);
}

module.exports = { clearMode, setMode, writeHookOutput };
