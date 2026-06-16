// spartan — OpenCode plugin.
//
// Injects the spartan ruleset into every chat's system prompt at the active
// intensity, and persists /spartan mode switches.
//
// OpenCode loads this as a server plugin — add it to your opencode.json:
//   { "plugin": ["./.opencode/plugins/spartan.mjs"] }

import { createRequire } from 'module';
import fs from 'fs';
import os from 'os';
import path from 'path';

const require = createRequire(import.meta.url);
const { getSpartanInstructions } = require('../../hooks/spartan-instructions');
const { getDefaultMode, normalizePersistedMode } = require('../../hooks/spartan-config');

const statePath = path.join(
  process.env.XDG_CONFIG_HOME || path.join(os.homedir(), '.config'),
  'opencode',
  '.spartan-active',
);

function readMode() {
  try {
    return normalizePersistedMode(fs.readFileSync(statePath, 'utf8').trim()) || getDefaultMode();
  } catch (e) {
    return getDefaultMode();
  }
}

function writeMode(mode) {
  fs.mkdirSync(path.dirname(statePath), { recursive: true });
  fs.writeFileSync(statePath, mode);
}

export default async ({ client } = {}) => {
  const log = (level, message) => {
    try { client && client.app && client.app.log({ body: { service: 'spartan', level, message } }); } catch (e) {}
  };

  return {
    'experimental.chat.system.transform': async (_input, output) => {
      const mode = readMode();
      if (mode === 'off') return;
      output.system.push(getSpartanInstructions(mode));
    },

    'command.execute.before': async (input) => {
      if (!input || input.command !== 'spartan') return;
      const mode = normalizePersistedMode((input.arguments || '').trim()) || getDefaultMode();
      writeMode(mode);
      log('info', 'spartan ' + mode);
    },
  };
};
