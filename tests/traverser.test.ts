import traverser, { Visitor } from '../src/traverser';
import { AstNode, AstNodeType } from '../src/parser';

describe(traverser, () => {
  it('should travel to all the nodes in the tree and reverse the math', () => {
    const ast: AstNode = {
      type: AstNodeType.CALL,
      name: 'add',
      arguments: [
        { type: AstNodeType.NUM, value: '12' },
        { type: AstNodeType.NUM, value: '6' },
      ],
    };

    const visitor = {
      [AstNodeType.CALL]: {
        enter(node: AstNode) {
          if (node.name === 'add') {
            node.name = 'subtract';
          }
        },
      },
    };

    traverser(ast, visitor);

    expect(ast.name).toBe('subtract');
  });

  it('should travel to all the nodes in the tree and double all of the numbers', () => {
    const ast: AstNode = {
      type: AstNodeType.CALL,
      name: 'add',
      params: [
        { type: AstNodeType.NUM, value: '12' },
        { type: AstNodeType.NUM, value: '6' },
      ],
    };

    const visitor: Visitor = {
      [AstNodeType.NUM]: {
        exit(node: AstNode) {
          node.value = (Number(node.value) * 2).toString();
        },
      },
    };

    traverser(ast, visitor);

    if (ast.params) {
      expect(ast.params[0]?.value).toBe('24');
      expect(ast.params[1]?.value).toBe('12');
    }
  });
});
