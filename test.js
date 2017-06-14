var DiffText = require('./');
var expect = require('expect');

describe('diff-text', function() {
  it('1. input null', function() {
    // expect(DiffText(null, null)).toThrow('Text should not be null.');
    // expect(DiffText(undefined, undefined)).toThrow('Text should not be null.');
    // expect(DiffText(null, undefined)).toThrow('Text should not be null.');
    // expect(DiffText(undefined, null)).toThrow('Text should not be null.');
    // expect(DiffText(null, '12')).toThrow('Text should not be null.');
    // expect(DiffText('12', undefined)).toThrow('Text should not be null.');
  });

  it('2. input empty', function() {
    expect(DiffText('', '')).toEqual([]);
  });

  it('3. input same', function() {
    expect(DiffText('difftext', 'difftext')).toEqual([
      [0, 'difftext']
    ]);
    expect(DiffText('123', '123')).toEqual([
      [0, '123']
    ]);
  });

  it('4. input just one edit.', function() {
    expect(DiffText('difftext', 'diff-text')).toEqual([
      [0, 'diff'],
      [1, '-'],
      [0, 'text']
    ]);

    expect(DiffText('diff-text', 'difftext')).toEqual([
      [0, 'diff'],
      [-1, '-'],
      [0, 'text']
    ]);
  });

  it('5. input just two edit.', function() {
    expect(DiffText('diff12345text', 'diff234text')).toEqual([
      [0, 'diff'],
      [-1, '1'],
      [0, '234'],
      [-1, '5'],
      [0, 'text']
    ]);

    expect(DiffText('diff234text', 'diff12345text')).toEqual([
      [0, 'diff'],
      [1, '1'],
      [0, '234'],
      [1, '5'],
      [0, 'text']
    ]);

    expect(DiffText('diff+text', 'diff-text')).toEqual([
      [0, 'diff'],
      [-1, '+'],
      [1, '-'],
      [0, 'text']
    ]);

    expect(DiffText('diff---text', 'diff+++text')).toEqual([
      [0, 'diff'],
      [-1, '---'],
      [1, '+++'],
      [0, 'text']
    ]);
  });
});