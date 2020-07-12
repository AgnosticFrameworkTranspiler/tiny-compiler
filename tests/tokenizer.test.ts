import tokenizer from '../src/tokenizer';

describe(tokenizer, () => {
  it('should return an array', () => {
    expect(Array.isArray(tokenizer(''))).toBe(true);
  });

  it('should be able to tokenizer a pair of parentheses', () => {
    const input = '()';
    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should ignore whitespace completely', () => {
    const input = '                  ';
    const result: string[] = [];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should correctly tokenizer a single digit', () => {
    const input = '2';
    const result = [{ type: 'Number', value: '2' }];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle single numbers in expressions', () => {
    const input = '(1 2)';

    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Number', value: '1' },
      { type: 'Number', value: '2' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle single letters in expressions', () => {
    const input = '(a b)';

    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Name', value: 'a' },
      { type: 'Name', value: 'b' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should be able to handle multiple-digit numbers', () => {
    const input = '(11 22)';

    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Number', value: '11' },
      { type: 'Number', value: '22' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should correctly tokenizer a simple expression', () => {
    const input = '(add 2 3)';
    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Name', value: 'add' },
      { type: 'Number', value: '2' },
      { type: 'Number', value: '3' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should ignore whitespace', () => {
    const input = '   (add    2 3)';
    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Name', value: 'add' },
      { type: 'Number', value: '2' },
      { type: 'Number', value: '3' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });

  it('should know about strings', () => {
    const input = '(log "hello" "world")';
    const result = [
      { type: 'Parenthesis', value: '(' },
      { type: 'Name', value: 'log' },
      { type: 'String', value: 'hello' },
      { type: 'String', value: 'world' },
      { type: 'Parenthesis', value: ')' },
    ];

    expect(tokenizer(input)).toEqual(result);
  });
});
