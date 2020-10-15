# Web Profiling with Lighthouse

tags: lighthouse, profiling, chrome, performance

Chrome now has an [audit panel](https://developers.google.com/web/updates/2017/05/devtools-release-notes#lighthouse) in their
dev tools console. 

The audits are done with [Lighthouse](https://developers.google.com/web/tools/lighthouse/). There is an [npm](https://www.npmjs.com/package/lighthouse) 
with which you can use Lighthouse programmatically both on your local box and on a server.

Regular chrome is now headless, so you like don't have to install anything aside from npms on your local box.

On Ubuntu, you can install chromium, to have a headless browser to use with Lighthouse:

```bash
sudo apt install chromium-browser
``` 

To use light house programatically you need 2 npms: 

```bash
npm i lighthouse chrome-launcher
```

Here is an example of how to get performance data from an array of urls. In this instance we're running the tests in series
and not in parallel, so as to put less stress on the server.

User `results.lhr` for javascript parseable results. There is a lot more information on the results object to look at.


```javascript
'use strict';

const urls = ['https://www.soliddigital.com', 'https://www.soliddigital.com/insights'];
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const flags = {
    chromeFlags: ['--headless'],
    onlyCategories: [
        'performance',
        'accessibility',
        'best-practices',
        'seo'
    ]
};

const BB = require('bluebird');

module.exports = performAudit;

function performAudit() {
    console.log('Starting audit');

    return BB.mapSeries(urls, url => {
        return auditUrl(url, flags)
            .catch(e => {
                console.log('lighthouse error', e);
                console.log('continuing through the rest of the urls....');
            });
    });
}

function auditUrl(url, flags) {
    return launchChromeAndRunLighthouse(url, flags)
        .then(results => {
            const audit =  {
                performance: results.lhr.categories.performance.score,
                accessibility: results.lhr.categories.accessibility.score,
                bestPractices: results.lhr.categories['best-practices'].score,
                seo: results.lhr.categories.seo.score
            };

            console.log(audit);

            return audit;
        });
}

function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
    return chromeLauncher.launch(flags).then(chrome => {
        flags.port = chrome.port;
        return lighthouse(url, flags, config)
            .then(results => chrome.kill().then(() => results));
    });
}
```

For interpretation of Lighthouse scores, see [this page](https://developers.google.com/web/tools/lighthouse/scoring).
