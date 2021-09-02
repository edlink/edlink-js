const { Filter } = require('../dist/edlink-js/lib');

test('basic filter construction', async () => {
    const filter = Filter.where('first_name', 'equals', 'Chris');
    expect(filter.toString()).toBe('{"first_name":[{"operator":"equals","value":"Chris"}]}');
});
