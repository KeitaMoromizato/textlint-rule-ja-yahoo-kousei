"use strict";

import assert from 'power-assert';
import {textlint} from 'textlint';
import rule from '../src/ja-yahoo-kousei.js';

describe('yahoo-kousei', function() {

  beforeEach(() => {
    textlint.setupRules({
      'ja-yahoo-kousei': rule
    });
  });

  afterEach(() => {
    textlint.resetRules();
  });

  context('when use sample text', () => {
    it('should report error', () => {
      // sample text from
      // http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html
      textlint.lintMarkdown('遙か彼方に小形飛行機が見える。').then(result => {
        assert(result.messages.length === 3);
      });
    });
  });
});
