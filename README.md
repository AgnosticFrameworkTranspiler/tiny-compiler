# Workflow

- input => tokenizer => tokens
- tokens => parser => ast
- ast => transformer => newAst
- newAst => generator => output

## Features

Source code ```(add 2 (subtract 4 2))```

        ↓

Target code ```add(2,subtract(4,2));```
