# lightbright

[![Coverage Status](https://coveralls.io/repos/github/bucharest-gold/lightbright/badge.svg?branch=master)](https://coveralls.io/github/bucharest-gold/lightbright?branch=master)
[![Build Status](https://travis-ci.org/bucharest-gold/lightbright.svg?branch=master)](https://travis-ci.org/bucharest-gold/lightbright)
[![Known Vulnerabilities](https://snyk.io/test/npm/lightbright/badge.svg)](https://snyk.io/test/npm/lightbright)
[![dependencies Status](https://david-dm.org/bucharest-gold/lightbright/status.svg)](https://david-dm.org/bucharest-gold/lightbright)

[![NPM](https://nodei.co/npm/lightbright.png)](https://npmjs.org/package/lightbright)

An experimental, lightweight module for code tracing, using
the `process.binding('async-wrap')` API. For more information
about the API, refer to the existing Node.js
[documentation](https://github.com/nodejs/diagnostics/blob/master/tracing/AsyncWrap/README.md)

|                 | Project Info  |
| --------------- | ------------- |
| License:        | Apache-2.0 |
| Build:          | make |
| Documentation:  | N/A |
| Issue tracker:  | https://github.com/bucharest-gold/lightbright/issues |
| Engines:        | Node.js 5.x, 6.x |

## Installation

    $ npm install lightbright -S

## Usage

Lightbright accepts filters which will be notified of all
asynchronous events defined by `async-wrap`. Those are: `init`,
`pre`, `post`, `destroy`. Each time the filter is called, its
parameter is an object containing information about one of these
events. E.g.

    {
      uid: 12,
      step: 'pre',
      timestamp: 1466221549272
    }

## Filters

Add a filter using the `addFilter` function. And then activate it.

    lightbright.addFilter(myFilter);
    lightbright.activate();

Filters are just functions which accept a `record` parameter.

    const lightbright = require('lightbright');
    lightbright.addFilter((record) => fs.writeSync(1, record.toString()));

Records are simply objects that contain the asynchronous trace information.

    {
        uid: 1,
        step: 'init',
        handle:
            TCP {
                bytesRead: 0,
                _externalStream: undefined,
                fd: -22,
                reading: false,
                owner: null,
                onread: null,
                onconnection: null
            },
        provider: 15,
        parent: {
            parentUid: null,
            parentHandle: null
        },
        timestamp: 1470251890590
    }

**Note:** Do _not_ execute asyncronous code from within a filter function.

You can deactivate and remove all filters using the `deactivate`
function.

    lightbright.deactivate();

To remove a single filter, use the `removeFilter` function.

    lightbright.removeFilter(noLongerUsedFilter);


### Builtin Filters

Lightbright comes with some builtin filters that make common
processing of the trace data a little simpler. For example, the
timing filter aggregates timing data. Use it in your application
like so:

    const LightBright = require('lightbright');
    const Timing = LightBright.builtins.timing;

    LightBright.addFilter(Timing.timer);
    LightBright.enable();

    // Do some async stuff

    util.format(Timing.timings())

Ouput of this filter for an HTTP request might look something like this.

    [ { location: 'TCP',
        stack:
        [ '    at TCP.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at createServerHandle (net.js:1180:14)',
        '    at Server._listen2 (net.js:1224:14)',
        '    at listen (net.js:1289:10)',
        '    at Server.listen (net.js:1385:5)',
        '    at Object.<anonymous> (/Users/lanceball/src/lightbright/example/timing/index.js:18:8)' ],
        id: 1,
        init: 1470255980229,
        pre: 1470255982061,
        post: 1470255982061,
        elapsed: 0 },
    { location: 'TCP',
        stack:
        [ '    at TCP.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at createServerHandle (net.js:1180:14)',
        '    at Server._listen2 (net.js:1224:14)',
        '    at listen (net.js:1289:10)',
        '    at Server.listen (net.js:1385:5)',
        '    at Object.<anonymous> (/Users/lanceball/src/lightbright/example/timing/index.js:18:8)' ],
        id: 1,
        init: 1470255980229,
        pre: 1470255982061,
        post: 1470255982061,
        elapsed: 0 },
    { location: 'TCP',
        stack:
        [ '    at TCP.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at createServerHandle (net.js:1180:14)',
        '    at Server._listen2 (net.js:1224:14)',
        '    at listen (net.js:1289:10)',
        '    at Server.listen (net.js:1385:5)',
        '    at Object.<anonymous> (/Users/lanceball/src/lightbright/example/timing/index.js:18:8)' ],
        id: 1,
        init: 1470255980229,
        pre: 1470255982061,
        post: 1470255982061,
        elapsed: 0 },
    { location: 'TCP',
        stack:
        [ '    at TCP.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at createServerHandle (net.js:1180:14)',
        '    at Server._listen2 (net.js:1224:14)',
        '    at listen (net.js:1289:10)',
        '    at Server.listen (net.js:1385:5)',
        '    at Object.<anonymous> (/Users/lanceball/src/lightbright/example/timing/index.js:18:8)' ],
        id: 1,
        init: 1470255980229,
        pre: 1470255982061,
        post: 1470255982061,
        elapsed: 0 },
    { location: 'HTTPParser',
        stack:
        [ '    at HTTPParser.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at new <anonymous> (_http_common.js:159:16)',
        '    at exports.FreeList.alloc (internal/freelist.js:14:46)',
        '    at Server.connectionListener (_http_server.js:316:24)',
        '    at emitOne (events.js:96:13)',
        '    at Server.emit (events.js:188:7)' ],
        id: 7,
        init: 1470255982059,
        pre: 1470255982164,
        post: 1470255982164,
        elapsed: 0 },
    { location: 'HTTPParser',
        stack:
        [ '    at HTTPParser.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at new <anonymous> (_http_common.js:159:16)',
        '    at exports.FreeList.alloc (internal/freelist.js:14:46)',
        '    at Server.connectionListener (_http_server.js:316:24)',
        '    at emitOne (events.js:96:13)',
        '    at Server.emit (events.js:188:7)' ],
        id: 7,
        init: 1470255982059,
        pre: 1470255982164,
        post: 1470255982164,
        elapsed: 0 },
    { location: 'HTTPParser',
        stack:
        [ '    at HTTPParser.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at new <anonymous> (_http_common.js:159:16)',
        '    at exports.FreeList.alloc (internal/freelist.js:14:46)',
        '    at Server.connectionListener (_http_server.js:316:24)',
        '    at emitOne (events.js:96:13)',
        '    at Server.emit (events.js:188:7)' ],
        id: 7,
        init: 1470255982059,
        pre: 1470255982164,
        post: 1470255982164,
        elapsed: 0 },
    { location: 'FSReqWrap',
        stack:
        [ '    at FSReqWrap.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at Object.fs.readFile (fs.js:303:11)',
        '    at Server.http.createServer (/Users/lanceball/src/lightbright/example/timing/index.js:12:6)',
        '    at emitTwo (events.js:106:13)',
        '    at Server.emit (events.js:191:7)',
        '    at HTTPParser.parserOnIncoming [as onIncoming] (_http_server.js:543:12)' ],
        id: 14,
        init: 1470255982163,
        pre: 1470255982165,
        post: 1470255982165,
        elapsed: 0 },
    { location: 'FSReqWrap',
        stack:
        [ '    at FSReqWrap.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at FSReqWrap.readFileAfterOpen [as oncomplete] (fs.js:374:11)' ],
        id: 15,
        init: 1470255982165,
        pre: 1470255982165,
        post: 1470255982165,
        elapsed: 0 },
    { location: 'FSReqWrap',
        stack:
        [ '    at FSReqWrap.init (/Users/lanceball/src/lightbright/lib/trace_hooks.js:32:3)',
        '    at ReadFileContext.read (fs.js:342:11)',
        '    at FSReqWrap.readFileAfterStat [as oncomplete] (fs.js:398:11)' ],
        id: 16,
        init: 1470255982165,
        pre: 1470255982165,
        post: 1470255982166,
        elapsed: 1 } ]

## Caveat Emptor

This is a work in progress. Don't expect it to remain stable for
for any amount of time in the near future.

## Contributing

Please read the [contributing guide](./CONTRIBUTING.md)
