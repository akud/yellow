'use strict';

process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.PUBLIC_URL = process.cwd() + '/build';

process.on('unhandledRejection', err => {
  throw err;
});


const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const openBrowser = require('react-dev-utils/openBrowser');
const mkdirp = require('mkdirp');

if (process.argv.length < 3) {
  throw new Error('usage: display.js <path>');
}

const INPUT_FILE_PATH = process.argv[2];
const SOURCE_PATH = path.resolve(__dirname, '../src');
const ENTRY_POINT_PATH = path.resolve(SOURCE_PATH, 'tmp/index.js');
const BUILD_DIR = path.resolve(__dirname, '../build');
const INDEX_HTML = path.resolve(BUILD_DIR, 'index.html');
const BUILD_FILE_NAME = "display.js"
const BUILD_FILE_PATH = path.resolve(BUILD_DIR, BUILD_FILE_NAME);


Promise.all([
  writeEntryPoint().then(compileEntryPoint),
  writeIndexHtml(),
]).then(function() {
  console.log('Opening ' + INDEX_HTML + '...');
  openBrowser('file://' + INDEX_HTML);
});


function writeEntryPoint() {
  return new Promise(function(resolve, reject) {
    mkdirp('./src/tmp/', function(err) {
      if (err) {
        return reject(err);
      } else {
        fs.writeFile(
          ENTRY_POINT_PATH,
          [
            "import React from 'react';",
            "import ReactDom from 'react-dom';",
            "import App from '" + INPUT_FILE_PATH.replace('src', '..') + "';",
            "ReactDom.render(<App />, document.getElementById('root'));",
          ].join('\n') + '\n',
          function(err) {
            if (err) {
              return reject(err);
            } else {
              console.log("Wrote entrypoint to " + ENTRY_POINT_PATH);
              return resolve();
            }
          }
        );
      }
    });
  });
}

function compileEntryPoint() {
  return new Promise(function(resolve, reject) {
    webpack({
      mode: 'development',
      entry: ENTRY_POINT_PATH,
      output: {
        path: BUILD_DIR,
        filename: BUILD_FILE_NAME,
      },
      performance: false,
      module: {
        rules: [
          {
            test: /\.js$/,
            include: SOURCE_PATH,
            loader: require.resolve('babel-loader'),
            options: {
              customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
              ),

              plugins: [
                [
                  require.resolve('babel-plugin-named-asset-import'),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                        '@svgr/webpack?-prettier,-svgo![path]',
                      },
                    },
                  },
                ],
              ],
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          }

        ],
      }
    },
      function(err, stats) {
        if (err) {
          return reject(err);
        } else if (stats.hasErrors()) {
          return reject(stats.toJson().errors);
        } else {
          console.log("Compiled " + ENTRY_POINT_PATH + " to " + BUILD_FILE_PATH);
          return resolve();
        }
      });
  });
}

function writeIndexHtml() {
  return new Promise(function(resolve, reject) {
    fs.writeFile(
      INDEX_HTML,
      '<html><body><div id="root"><script src="file://' + BUILD_FILE_PATH + '"></script></body><html>',
      function(err) {
        if (err) {
          return reject(err);
        } else {
          console.log('Wrote to ' + INDEX_HTML);
          return resolve();
        }
      }
    );
  });
}
