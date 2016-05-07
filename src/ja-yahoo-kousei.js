import assign from 'lodash/assign';
import find from 'lodash/find';

import request from 'request';
import {parseString} from 'xml2js';

const defaultOptions = {
  ignores:{}
};

function fetchProofreading(appID, text) {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'http://jlp.yahooapis.jp/KouseiService/V1/kousei',
      form: {
        appid: appID,
        sentence: text
      },
      json: true
    }, (error, response, body) => {
      if (error) return reject(error);

      parseString(body, (error, result) => {
        if (error) return reject(error);

        resolve(result);
      });
    });
  });
}

function getReportMessage(record, lang = 'en') {
  const info = record.ShitekiInfo[0];
  const invalidWord = record.Surface[0];
  const validWord = record.ShitekiWord.length ? `(${record.ShitekiWord[0]})` : '';

  switch(lang) {
    case 'ja':
      return `「${invalidWord}」は${info}です。${validWord}`;
    default:
      return `${invalidWord} => ${info}${validWord}`
  }
}

function containedIgnoreList(word, info, ignores) {
  const target = ignores[info];
  
  if (!target) {
    return false;
  }
  else if (target === '*') {
    return true;
  }
  else if (Array.isArray(target)) {
    return !!find(target, w => w === word);
  }
  
  return false;
}

export default function(context, options = {}) {
  const appID = options.appID || process.env.YAHOO_APP_ID;

  if (!appID) {
    throw new Error(`YAHOO_APP_ID is not set.`);
  }

  options = assign({}, defaultOptions, options);
  const {Syntax, getSource, report, RuleError} = context;

  return {
    [Syntax.Paragraph](node) {
      return new Promise((resolve, reject) => {
        const paragraph = getSource(node);

        fetchProofreading(appID, paragraph).then(json => {
          if (json.Error) {
            return reject(new Error(json.Error.Message[0]));
          }

          if (json && json.ResultSet.Result) {
            json.ResultSet.Result.forEach(result => {
              
              if (containedIgnoreList(result.Surface[0], result.ShitekiInfo[0], options.ignores)) return;

              report(node, new RuleError(getReportMessage(result, options.lang)));
            });
          }

          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}
