import findPairs from '../logic/findPairs';
import nbaPlayers from '../__mocks__/nbaPlayers';

describe('testing findPairs function', () => {
  test('testing input of 139', () => {
    expect(findPairs(nbaPlayers, '139')).toHaveLength(2);
  });

  test('testing input of 141', () => {
    expect(findPairs(nbaPlayers, '141')).toHaveLength(17);
  });

  test('testing input of 143', () => {
    expect(findPairs(nbaPlayers, '143')).toHaveLength(73);
  });

  test('testing input of 145', () => {
    expect(findPairs(nbaPlayers, '145')).toHaveLength(298);
  });

  test('testing input of 147', () => {
    expect(findPairs(nbaPlayers, '147')).toHaveLength(852);
  });

  test('testing input of 149', () => {
    expect(findPairs(nbaPlayers, '149')).toHaveLength(1513);
  });

  test('testing input of 151', () => {
    expect(findPairs(nbaPlayers, '151')).toHaveLength(2403);
  });

  test('testing input of 153', () => {
    expect(findPairs(nbaPlayers, '153')).toHaveLength(4037);
  });

  test('testing input of 155', () => {
    expect(findPairs(nbaPlayers, '155')).toHaveLength(5522);
  });

  test('testing input of 157', () => {
    expect(findPairs(nbaPlayers, '157')).toHaveLength(6447);
  });

  test('testing input of 159', () => {
    expect(findPairs(nbaPlayers, '159')).toHaveLength(6965);
  });

  test('testing input of 161', () => {
    expect(findPairs(nbaPlayers, '161')).toHaveLength(6736);
  });

  test('testing input of 163', () => {
    expect(findPairs(nbaPlayers, '163')).toHaveLength(5882);
  });

  test('testing input of 165', () => {
    expect(findPairs(nbaPlayers, '165')).toHaveLength(4086);
  });

  test('testing input of 167', () => {
    expect(findPairs(nbaPlayers, '167')).toHaveLength(1818);
  });

  test('testing input of 169', () => {
    expect(findPairs(nbaPlayers, '169')).toHaveLength(426);
  });

  test('testing input of 171', () => {
    expect(findPairs(nbaPlayers, '171')).toHaveLength(107);
  });

  test('testing input of 173', () => {
    expect(findPairs(nbaPlayers, '173')).toHaveLength(41);
  });

  test('testing input of 175', () => {
    expect(findPairs(nbaPlayers, '175')).toHaveLength(8);
  });

  test('testing input of 177', () => {
    expect(findPairs(nbaPlayers, '177')).toHaveLength(1);
  });
});
