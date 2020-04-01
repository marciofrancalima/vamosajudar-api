const generateHash = require('../../src/utils/generateHash');

describe('Generate Hash for unique ID', () => {
  it('should generate a hash with 4 characters', () => {
    const id = generateHash(2);

    expect(id).toHaveLength(4);
  });

  it('should generate a hash with 8 characters', () => {
    const id = generateHash(4);

    expect(id).toHaveLength(8);
  });

  it('should generate a hash with 16 characters', () => {
    const id = generateHash(8);

    expect(id).toHaveLength(16);
  });

  it('should generate a hash with 8 characters when the size is empty', () => {
    const id = generateHash();

    expect(id).toHaveLength(8);
  });

  it('should generate a hash with 8 characters when the size is equal to zero', () => {
    const id = generateHash(0);

    expect(id).toHaveLength(8);
  });
});
