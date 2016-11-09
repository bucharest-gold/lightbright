
const LightBright = require('../../');
LightBright.addFilter(LightBright.builtins.stacktrace);

function somethingAsync () {
  setTimeout(
    () => {
      throw new Error('I broke');
    }, 10);
}

function callsSomethingAsync () {
  somethingAsync();
  setTimeout(() => {
    console.log(`Now, we enable LightBright.builtins.stacktrace and
see what the exception looks like. Notice we now have call sites from our own source.`);
    LightBright.enable();
    alsoCallsSomethingAsync();
  }, 20);
}

function alsoCallsSomethingAsync () {
  somethingAsync();
  setTimeout(() => {
    console.log(`Finally, add the 'clarify' module to eliminate all
node core stack lines that we typically don't care about. Just right!`);
    require('clarify');
    stillCallsSomethingAsync();
  }, 30);
}

function stillCallsSomethingAsync () {
  somethingAsync();
}

console.log(`Before enabling LightBright.builtins.stacktrace,
have a look at what an async exception stack looks like`);
callsSomethingAsync();


process.on('uncaughtException', (e) => {
  process._rawDebug('\n------------------------');
  process._rawDebug(e);
  process._rawDebug('------------------------\n');
});

