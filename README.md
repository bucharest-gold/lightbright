# lightbright

An experimental, lightweight module for code tracing, using
the still-undocumented `process.binding('async-wrap')`.

## Installation

    $ npm install --save lightbright

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

Add a filter using the `addFilter` function.

    const lightbright = require('lightbright');
    lightbright.addFilter((obj) => console.log(obj));

And then activate it.

    lightbright.activate();

You can deactivate and remove all filters using the `deactivate`
function.

    lightbright.deactivate(myFilter);

To remove a single filter, use the `removeFilter` function.

    lightbright.removeFilter(noLongerUsedFilter);

## Caveat Emptor

This is a work in progress. Don't expect it to remain stable for
for any amount of time in the near future.