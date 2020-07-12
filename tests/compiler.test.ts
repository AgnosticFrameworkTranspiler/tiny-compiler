import compiler from '../src/compiler';

describe(compiler, () => {
  it('should be return "add(2,subtract(4,2));"', () => {
    const input: string = '(add 2 (subtract 4 2))';
    const output: string = 'add(2,subtract(4,2));';

    expect(compiler(input)).toEqual(output);
  });
});
