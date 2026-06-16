#!/usr/bin/env node
const { getDefaultMode } = require('./spartan-config');
const { clearMode, setMode, writeHookOutput } = require('./spartan-runtime');

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input.replace(/^﻿/, ''));
    const prompt = (data.prompt || '').trim().toLowerCase();

    if (/^[/@$]spartan/.test(prompt)) {
      const parts = prompt.split(/\s+/);
      const arg = parts[1] || '';
      let mode = null;

      if (arg === 'lite') mode = 'lite';
      else if (arg === 'full') mode = 'full';
      else if (arg === 'ultra') mode = 'ultra';
      else if (arg === 'off') mode = 'off';
      else mode = getDefaultMode();

      if (mode && mode !== 'off') {
        setMode(mode);
        writeHookOutput('UserPromptSubmit', mode, 'SPARTAN MODE CHANGED — level: ' + mode);
      } else if (mode === 'off') {
        clearMode();
        writeHookOutput('UserPromptSubmit', 'off', 'SPARTAN MODE OFF');
      }
    }

    if (/\b(stop spartan|normal mode)\b/i.test(prompt)) {
      clearMode();
      writeHookOutput('UserPromptSubmit', 'off', 'SPARTAN MODE OFF');
    }
  } catch (e) {}
});
