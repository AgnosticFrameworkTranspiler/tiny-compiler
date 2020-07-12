import {
  isOpeningParenthesis,
  isClosingParenthesis,
  isWhitespace,
  isNumber,
  isQuote,
  isLetter,
} from './identify';

// 词法单元枚举
export enum TokenType {
  PAREN = 'Parenthesis',
  NUM = 'Number',
  STR = 'String',
  NAME = 'Name',
}

// 词法单元
export type Token = {
  type: TokenType;
  value: string;
};

/**
 * 词法分析器
 * @param input 源代码输入
 */
export default function tokenizer(input: string): Token[] {
  // 光标
  let current: number = 0;
  // 词法单元集合
  const tokens: Token[] = [];

  // 遍历源码，递增光标
  while (current < input.length) {
    // 获取到当前字符
    let char: string = input[current];

    // 是否为圆括号开始
    if (isOpeningParenthesis(char)) {
      tokens.push({
        type: TokenType.PAREN,
        value: '(',
      });
      // 光标加1
      current++;
      // 继续遍历
      continue;
    }

    // 是否为圆括号结束
    if (isClosingParenthesis(char)) {
      tokens.push({
        type: TokenType.PAREN,
        value: ')',
      });
      current++;
      continue;
    }

    // 是否为空白字符
    if (isWhitespace(char)) {
      current++;
      continue;
    }

    // 是否为数字
    if (isNumber(char)) {
      let value: string = '';
      // 遍历所有相邻的数字，直到不是数字
      while (isNumber(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: TokenType.NUM, value });
      continue;
    }

    // 是否为引号
    if (isQuote(char)) {
      let value: string = '';
      // 跳过开始的引号
      char = input[++current];
      // 遍历所有相邻的字符，直到下一个引号
      while (!isQuote(char)) {
        value += char;
        char = input[++current];
      }
      // 跳过结束的引号
      char = input[++current];

      tokens.push({ type: TokenType.STR, value });
      continue;
    }

    // 是否为普通字符
    if (isLetter(char)) {
      let value: string = '';
      // 遍历所有相邻的字符，直到下一个非字符
      while (isLetter(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({ type: TokenType.NAME, value });
      continue;
    }

    // 未知字符抛出异常
    throw new TypeError('I dont know what this character is: ' + char);
  }
  return tokens;
}
