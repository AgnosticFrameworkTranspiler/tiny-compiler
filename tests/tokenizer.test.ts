import tokenizer, { Token, TokenType } from '../src/tokenizer';

describe(tokenizer, () => {
  it('should return an array', () => {
    expect(Array.isArray(tokenizer(''))).toBe(true);
  });

  it('should be able to tokenizer a pair of parentheses', () => {
    const input: string = '()';
    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should ignore whitespace completely', () => {
    const input: string = '                  ';
    const result: Token[] = [];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should correctly tokenizer a single digit', () => {
    const input: string = '2';
    const result: Token[] = [{ type: TokenType.NUM, value: '2' }];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle single numbers in expressions', () => {
    const input: string = '(1 2)';

    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NUM, value: '1' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle single letters in expressions', () => {
    const input: string = '(a b)';

    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'a' },
      { type: TokenType.NAME, value: 'b' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle multiple-digit numbers', () => {
    const input: string = '(11 22)';

    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NUM, value: '11' },
      { type: TokenType.NUM, value: '22' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should correctly tokenizer a simple expression', () => {
    const input: string = '(add 2 3)';
    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'add' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.NUM, value: '3' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should ignore whitespace', () => {
    const input: string = '   (add    2 3)';
    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'add' },
      { type: TokenType.NUM, value: '2' },
      { type: TokenType.NUM, value: '3' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should know about strings', () => {
    const input: string = '(log "hello" "world")';
    const result: Token[] = [
      { type: TokenType.PAREN, value: '(' },
      { type: TokenType.NAME, value: 'log' },
      { type: TokenType.STR, value: 'hello' },
      { type: TokenType.STR, value: 'world' },
      { type: TokenType.PAREN, value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });
});
