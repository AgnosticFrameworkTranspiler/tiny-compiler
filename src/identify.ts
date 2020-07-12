// 普通字符
const LETTER: RegExp = /[a-zA-Z]/;
// 空白字符
const WHITESPACE: RegExp = /\s+/;
// 数字
const NUMBER: RegExp = /^[0-9]+$/;
// 操作符
const OPERATORS: string[] = ['+', '-', '*', '/', '%'];
// 是否为普通字符
export const isLetter = (character: string) => LETTER.test(character);
// 是否为空白字符
export const isWhitespace = (character: string) => WHITESPACE.test(character);
// 是否为数字
export const isNumber = (character: string) => NUMBER.test(character);
// 是否为圆括号开始
export const isOpeningParenthesis = (character: string) => character === '(';
// 是否为圆括号结束
export const isClosingParenthesis = (character: string) => character === ')';
// 是否为括号
export const isParenthesis = (character: string) =>
  isOpeningParenthesis(character) || isClosingParenthesis(character);
// 是否为引号
export const isQuote = (character: string) => character === '"';
// 是否为操作符
export const isOperator = (character: string) => OPERATORS.includes(character);
