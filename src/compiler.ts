import codeGenerator from './code-generator';
import parser, { AstNode } from './parser';
import tokenizer, { Token } from './tokenizer';
import transformer from './transformer';

/**
 * 编译器
 * @param input 源代码
 */
export default function compiler(input: string): string {
  const toknes: Token[] = tokenizer(input);
  const ast: AstNode = parser(toknes);
  const newAst: AstNode = transformer(ast);
  const output: string = codeGenerator(newAst);

  return output;
}
