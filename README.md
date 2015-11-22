# textlint-rule-ja-yahoo-kousei
[textlint](https://github.com/textlint/textlint) rule that using [Yahoo Proofreading API](http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html).

## Installation

```
npm install textlint-rule-ja-yahoo-kousei
```

## Usage
Should get Yahoo Application ID [here](https://e.developer.yahoo.co.jp/dashboard/).

```
npm install -g textlint textlint-rule-ja-yahoo-kousei
export YAHOO_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
textlint --rule textlint-rule-ja-yahoo-kousei README.md
```

## Config

```
{
    "rules": {
        "textlint-rule-ja-yahoo-kousei": {
          'ignores': {
            '用字':['彼方']
          }
        }
    }
}
```

## Example
TODO

## Tests

```
export YAHOO_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
npm test
```

## License
MIT
