import { AstNode, AstNodeType } from './parser';
import traverser from './traverser';

/**
 * 转换器
 * @param ast 目标语法树
 */
export default function transformer(ast: AstNode): AstNode {
  // 创建新的语法树
  const newAst: AstNode = {
    type: AstNodeType.PROGRAM,
    body: [],
  };

  ast._context = newAst.body;

  traverser(ast, {
    [AstNodeType.NUM]: {
      enter(node: AstNode, parent?: AstNode) {
        if (!parent) return;
        if (!parent._context) parent._context = [];
        parent?._context?.push({
          type: AstNodeType.NUM,
          value: node.value,
        });
      },
    },
    [AstNodeType.STR]: {
      enter(node: AstNode, parent?: AstNode) {
        if (!parent) return;
        if (!parent._context) parent._context = [];
        parent?._context?.push({
          type: AstNodeType.STR,
          value: node.value,
        });
      },
    },
    [AstNodeType.CALL]: {
      enter(node: AstNode, parent?: AstNode) {
        if (!parent) return;
        if (!parent._context) parent._context = [];

        // 创建新的表达式
        let expression: AstNode = {
          type: AstNodeType.CALL,
          callee: {
            type: AstNodeType.ID,
            name: node.name,
          },
          arguments: [],
        };

        // 在上下文中记录参数
        node._context = expression.arguments;

        if (parent?.type !== AstNodeType.CALL) {
          expression = {
            type: AstNodeType.EXP,
            expression: expression,
          };
        }

        // 在父上下文中记录表达式
        parent?._context?.push(expression);
      },
    },
  });

  return newAst;
}
