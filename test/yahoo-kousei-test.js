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

    it('should report filtered error', (done) => {

      // sample text from
      // http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html
      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 2);
      }).then(done, done);
    });
  });
});
