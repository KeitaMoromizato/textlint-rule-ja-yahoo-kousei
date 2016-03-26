# textlint-rule-ja-yahoo-kousei
[textlint](https://github.com/textlint/textlint) rule that using [Yahoo Proofreading API](http://developer.yahoo.co.jp/webapi/jlp/kousei/v1/kousei.html).

## Installation

```
$ npm install textlint-rule-ja-yahoo-kousei
```

## Usage
```
$ npm install -g textlint textlint-rule-ja-yahoo-kousei
```

Should get Yahoo Application ID [here](https://e.developer.yahoo.co.jp/dashboard/).
And set YAHOO_APP_ID.

```
$ export YAHOO_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

or set in `.textlintrc`.

```
{
  "rules": {
    "textlint-rule-ja-yahoo-kousei": {
      'appID': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    }
  }
}
```

run.

```
$ textlint --rule textlint-rule-ja-yahoo-kousei README.md
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
$ export YAHOO_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
$ npm test
```

## License
MIT
