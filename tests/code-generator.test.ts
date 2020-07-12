import transformer from '../src/transformer';
import { AstNode, AstNodeType } from '../src/parser';
import codeGenerator from '../src/code-generator';

describe(transformer, () => {
  it('should be return "add(2,subtract(4,2));"', () => {
    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [
        {
          type: AstNodeType.EXP,
          expression: {
            type: AstNodeType.CALL,
            callee: {
              type: AstNodeType.ID,
              name: 'add',
            },
            arguments: [
              {
                type: AstNodeType.NUM,
                value: '2',
              },
              {
                type: AstNodeType.CALL,
                callee: {
                  type: AstNodeType.ID,
                  name: 'subtract',
                },
                arguments: [
                  {
                    type: AstNodeType.NUM,
                    value: '4',
                  },
                  {
                    type: AstNodeType.NUM,
                    value: '2',
                  },
                ],
              },
            ],
          },
        },
      ],
    };

    const exp = 'add(2,subtract(4,2));';

    expect(codeGenerator(ast)).toEqual(exp);
  });

  it('should be return "hello"', () => {
    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [
        {
          type: AstNodeType.STR,
          value: 'hello',
        },
      ],
    };

    const exp = '"hello"';

    expect(codeGenerator(ast)).toEqual(exp);
  });
});
