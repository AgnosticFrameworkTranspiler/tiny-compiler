import transformer from '../src/transformer';
import { AstNode, AstNodeType } from '../src/parser';

describe(transformer, () => {
  it('should be converted correctly', () => {
    const ast: AstNode = {
      type: AstNodeType.PROGRAM,
      body: [
        {
          type: AstNodeType.CALL,
          name: 'add',
          params: [
            {
              type: AstNodeType.NUM,
              value: '2',
            },
            {
              type: AstNodeType.CALL,
              name: 'subtract',
              params: [
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
      ],
    };

    const newAst: AstNode = {
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

    expect(transformer(ast)).toEqual(newAst);
  });
});
