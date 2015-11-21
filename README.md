# textlint-rule-ja-yahoo-kousei
textlint rule that using Yahoo Proofreading API.

## Installation

```
npm install textlint-rule-ja-yahoo-kousei
```

## Usage

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
