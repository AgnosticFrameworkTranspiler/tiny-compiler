import parser, { AstNode, AstNodeType } from '../src/parser';
import { Token, TokenType } from '../src/tokenizer';

describe(parser, () => {
  it('should return a token with the type of NumericLiteral for number tokens', () => {
    const tokens: Token[] = [{ type: TokenType.NUM, value: '2' }];

    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [{ type: AstNodeType.NUM, value: '2' }],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  it('should return a token with the type of StringLiteral for string tokens', () => {
    const tokens: Token[] = [{ type: TokenType.STR, value: 'hello' }];

    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [{ type: AstNodeType.STR, value: 'hello' }],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  it('should return a token with the type of Identifier for Identifier tokens', () => {
    const tokens: Token[] = [{ type: TokenType.NAME, value: 'x' }];

    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [{ type: AstNodeType.ID, value: 'x' }],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  it('should return an AST for a basic data structure', () => {
    const tokens: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'add' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.NUM, value: '3' },
      { type: TokenType.PAREN, value: ')' },
    ];

    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [
        {
          type: AstNodeType.CALL,
          name: 'add',
          params: [
            { type: AstNodeType.NUM, value: '2' },
            { type: AstNodeType.NUM, value: '3' },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });

  it('should return an AST for a nested data structure', () => {
    const tokens: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'add' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.NUM, value: '3' },
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'subtract' },
      { type: TokenType.NUM, value: '4' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.PAREN, value: ')' },
      { type: TokenType.PAREN, value: ')' },
    ];

    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [
        {
          type: AstNodeType.CALL,
          name: 'add',
          params: [
            { type: AstNodeType.NUM, value: '2' },
            { type: AstNodeType.NUM, value: '3' },
            {
              type: AstNodeType.CALL,
              name: 'subtract',
              params: [
                { type: AstNodeType.NUM, value: '4' },
                { type: AstNodeType.NUM, value: '2' },
              ],
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });
});
