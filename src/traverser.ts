import { AstNode, AstNodeType } from './parser';

// 访问者
export type Visitor = {
  [key: string]: {
    enter?: (node: AstNode, parent?: AstNode) => void;
    exit?: (node: AstNode, parent?: AstNode) => void;
  };
};

/**
 * 导线机
 * @param ast 抽象语法树
 * @param visitor 访问者
 */
export default function traverser(ast: AstNode, visitor: Visitor) {
  function traverseArray(array: AstNode[], parent?: AstNode) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  function traverseNode(node: AstNode, parent?: AstNode) {
    const methods = visitor[node.type];

    // 调用访问器入口
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case AstNodeType.PROGRAM:
        traverseArray(node.body ?? [], parent);
        break;
      case AstNodeType.CALL:
        traverseArray(node.params ?? [], node);
        break;
      case AstNodeType.NUM:
      case AstNodeType.STR:
        break;
      default:
        throw new TypeError(node.type);
    }

    // 调用访问期器出口
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, ast);
}
