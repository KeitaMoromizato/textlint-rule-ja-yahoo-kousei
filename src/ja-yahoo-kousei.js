import {assign} from 'lodash';
import request from 'request';
import {parseString} from 'xml2js';

const defaultOptions = {

};

function fetchProofreading(text) {
  return new Promise((resolve, reject) => {
    request.post({
      url: 'http://jlp.yahooapis.jp/KouseiService/V1/kousei',
      form: {
        appid: process.env.YAHOO_APP_ID,
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

export default function(context, options = {}) {
  options = assign({}, defaultOptions, options);
  let {Syntax, getSource, report, RuleError} = context;

  return {
    [Syntax.Paragraph](node) {
      return new Promise((resolve, reject) => {
        const paragraph = getSource(node);

        fetchProofreading(paragraph).then(json => {

          if (json && json.ResultSet.Result) {
            json.ResultSet.Result.forEach(result => {
              report(node, new RuleError(`${result.Surface} => ${result.ShitekiInfo}|${result.ShitekiWord}`));
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
