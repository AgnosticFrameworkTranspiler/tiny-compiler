import {
  isLetter,
  isWhitespace,
  isNumber,
  isOpeningParenthesis,
  isQuote,
  isClosingParenthesis,
  isParenthesis,
  isOperator,
} from '../src/identify';

describe(isLetter, () => {
  it('should return true', () => {
    expect(isLetter('a')).toBe(true);
  });
  it('should return false', () => {
    expect(isLetter('1')).toBe(false);
    expect(isLetter('_')).toBe(false);
  });
});

describe(isWhitespace, () => {
  it('should return true', () => {
    expect(isWhitespace(' ')).toBe(true);
    expect(isWhitespace('    ')).toBe(true);
  });
  it('should return false', () => {
    expect(isWhitespace('')).toBe(false);
    expect(isWhitespace('1')).toBe(false);
    expect(isWhitespace('a')).toBe(false);
  });
});

describe(isNumber, () => {
  it('should return true', () => {
    expect(isNumber('1')).toBe(true);
  });
  it('should return false', () => {
    expect(isNumber('_')).toBe(false);
    expect(isNumber('a')).toBe(false);
  });
});

describe(isOpeningParenthesis, () => {
  it('should return true', () => {
    expect(isOpeningParenthesis('(')).toBe(true);
  });
  it('should return false', () => {
    expect(isOpeningParenthesis(')')).toBe(false);
  });
});

describe(isClosingParenthesis, () => {
  it('should return true', () => {
    expect(isClosingParenthesis(')')).toBe(true);
  });
  it('should return false', () => {
    expect(isClosingParenthesis('(')).toBe(false);
  });
});

describe(isParenthesis, () => {
  it('should return true', () => {
    expect(isParenthesis('(')).toBe(true);
    expect(isParenthesis(')')).toBe(true);
  });
  it('should return false', () => {
    expect(isParenthesis('{')).toBe(false);
  });
});

describe(isQuote, () => {
  it('should return true', () => {
    expect(isQuote('"')).toBe(true);
  });
  it('should return false', () => {
    expect(isQuote(`'`)).toBe(false);
  });
});

describe(isOperator, () => {
  it('should return true', () => {
    expect(isOperator('+')).toBe(true);
    expect(isOperator('-')).toBe(true);
    expect(isOperator('*')).toBe(true);
    expect(isOperator('/')).toBe(true);
  });
  it('should return false', () => {
    expect(isOperator('1')).toBe(false);
    expect(isOperator('a')).toBe(false);
    expect(isOperator('_')).toBe(false);
    expect(isOperator('$')).toBe(false);
  });
});
