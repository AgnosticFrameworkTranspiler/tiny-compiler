import { Token, TokenType } from './tokenizer';
import { isOpeningParenthesis, isClosingParenthesis } from './identify';

// 抽象语法树节点枚举
export enum AstNodeType {
  PROGRAM = 'Program',
  ID = 'Identifier',
  CALL = 'CallExpression',
  EXP = 'ExpressionStatement',
  NUM = 'NumberLiteral',
  STR = 'StringLiteral',
}

// 抽象语法树节点
export type AstNode = {
  type: AstNodeType;
  value?: string;
  name?: string;
  body?: AstNode[];
  params?: AstNode[];
  callee?: AstNode;
  expression?: AstNode;
  arguments?: AstNode[];
  _context?: AstNode[];
};

/**
 * 语法解析器
 * @param tokens 词法单元集合
 */
export default function parser(tokens: Token[]): AstNode {
  // 光标
  let current: number = 0;

  function walk(): AstNode {
    // 获取词法单元
    let token: Token = tokens[current];
    // 是否为数字
    if (token.type === TokenType.NUM) {
      current++;
      return {
        type: AstNodeType.NUM,
        value: token.value,
      };
    }

    // 是否为字符
    if (token.type === TokenType.STR) {
      current++;
      return {
        type: AstNodeType.STR,
        value: token.value,
      };
    }

    // 是否为标识符
    if (token.type === TokenType.NAME) {
      current++;
      return {
        type: AstNodeType.ID,
        value: token.value,
      };
    }

    // 是否为调用表达式
    if (token.type === TokenType.PAREN && isOpeningParenthesis(token.value)) {
      // 跳过圆括号的开始
      token = tokens[++current];

      const node: AstNode = {
        type: AstNodeType.CALL,
        name: token.value,
        params: [],
      };

      // 跳过调用名
      token = tokens[++current];

      // 遍历所有参数
      while (
        token.type !== TokenType.PAREN ||
        (token.type === TokenType.PAREN && !isClosingParenthesis(token.value))
      ) {
        // 遍历获取参数节点
        node.params?.push(walk());
        token = tokens[current];
      }

      // 跳过圆括号的结束
      current++;

      return node;
    }
    // 类型错误
    throw new TypeError(token.type);
  }

  const ast: AstNode = {
    type: AstNodeType.PROGRAM,
    body: [],
  };

  // 尾递归优化成循环
  while (current < tokens.length) {
    ast.body?.push(walk());
  }

  return ast;
}
