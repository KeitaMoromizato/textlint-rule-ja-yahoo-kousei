"use strict";

import assert from 'power-assert';
import {TextLintCore} from 'textlint';
import rule from '../src/ja-yahoo-kousei.js';

describe('yahoo-kousei', function() {

  context('when use sample text', () => {
    const textlint = new TextLintCore();

    textlint.setupRules({
      'ja-yahoo-kousei': rule
    });

    it('should report error', (done) => {
      // sample text from
      // http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html
      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 3);
      }).then(done, done);
    });
  });

  context('when use filter config', () => {

    it('should report filtered error', (done) => {

      const textlint = new TextLintCore();

      textlint.setupRules({
        'ja-yahoo-kousei': rule
      }, {
        'ja-yahoo-kousei': {
          'ignores': {
            '用字':['彼方']
          }
        }
      });

      // sample text from
      // http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html
      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 2);
      }).then(done, done);
    });
    
    it('should report filtered error(use wildcard)', (done) => {

      const textlint = new TextLintCore();

      textlint.setupRules({
        'ja-yahoo-kousei': rule
      }, {
        'ja-yahoo-kousei': {
          'ignores': {
            '用字': '*'
          }
        }
      });

      // sample text from
      // http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html
      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 2);
      }).then(done, done);
    });
  });

  context('when use language config', () => {
    const textlint = new TextLintCore();

    textlint.setupRules({
      'ja-yahoo-kousei': rule
    }, {
      'ja-yahoo-kousei': {
        'ignores': {
          '用字':['彼方'],
          '表外漢字あり': ['遙か']
        },
        'lang': 'ja'
      }
    });

    it('should report filtered error', (done) => {

      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 1);
        assert(result.messages[0].message == '「小形飛行機」は誤変換です。(小型飛行機)');
      }).then(done, done);
    });
  });
});
