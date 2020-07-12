import { AstNode, AstNodeType } from './parser';

/**
 * 代码生成器
 * @param node 抽象语法数
 */
export default function codeGenerator(node: AstNode): string {
  switch (node.type) {
    case AstNodeType.PROGRAM:
      return node.body?.map(codeGenerator).join('\n') ?? '';

    case AstNodeType.EXP:
      if (!node.expression) throw new SyntaxError(node.type);
      return codeGenerator(node.expression) + ';';

    case AstNodeType.CALL:
      if (!node.callee) throw new SyntaxError(node.type);
      return `${codeGenerator(node.callee)}(${node.arguments
        ?.map(codeGenerator)
        .join(',')})`;

    case AstNodeType.ID:
      if (!node.name) throw new SyntaxError(node.type);
      return node.name;

    case AstNodeType.NUM:
      if (!node.value) throw new SyntaxError(node.type);
      return node.value;

    case AstNodeType.STR:
      if (!node.value) throw new SyntaxError(node.type);
      return `"${node.value}"`;

    default:
      throw new TypeError(node.type);
  }
}
