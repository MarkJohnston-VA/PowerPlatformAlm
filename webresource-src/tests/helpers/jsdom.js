const { JSDOM } = require('../../node_modules/jsdom/lib/api.js');

const dom = new JSDOM('<html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;