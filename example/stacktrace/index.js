require('clarify');

const LightBright = require('../../');
LightBright.addFilter(LightBright.builtins.stacktrace);
LightBright.enable();

function somethingAsync () {
  setTimeout(
    () => {
      throw new Error('I broke');
    }, 10);
}

function callsSomethingAsync () {
  somethingAsync();
}

callsSomethingAsync();

process.on('uncaughtException', (e) => {
  process._rawDebug('UncaughtException');
  process._rawDebug(e);
});

