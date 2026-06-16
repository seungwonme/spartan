#!/usr/bin/env node
const { getDefaultMode } = require('./spartan-config');
const { getSpartanInstructions } = require('./spartan-instructions');
const { clearMode, setMode, writeHookOutput } = require('./spartan-runtime');

const mode = getDefaultMode();

if (mode === 'off') {
  clearMode();
  writeHookOutput('SessionStart', 'off', 'OK');
  process.exit(0);
}

try { setMode(mode); } catch (e) {}

const output = getSpartanInstructions(mode);
writeHookOutput('SessionStart', mode, output);
