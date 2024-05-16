import formatCurrency from "../../scripts/utils/money.js"

// describe('test suite name', () => {test case}) to create the test suite 
describe('test suite: formatCurrency', () => {
  // it('test name', () => {code for testing}) create test
  it('converts cents into dollars', () => {
    // 'expect' and .toEqual is use to compare
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to nearest cents',() => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  })

  it('rounds down to nearesr cents', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00');
  });
});