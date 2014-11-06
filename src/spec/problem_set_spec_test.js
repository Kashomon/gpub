gpub.spec.problemSetSpecTest = function() {
  module('gpub.spec.problemSetSpecTest');

  test('Ensure problem generation', function() {
    var sgf = '(;GM[1]C[foo]AB[aa])';
    var mt = glift.sgf.parse(sgf);
    deepEqual(
        gpub.spec.problemSetSpec(mt, 'zed', {region: 'TOP'}),
        {
          alias: 'zed',
          widgetType: 'STANDARD_PROBLEM',
          boardRegion: 'TOP'
        });

    deepEqual(
        gpub.spec.problemSetSpec(mt, 'zed', {}),
        {
          alias: 'zed',
          widgetType: 'STANDARD_PROBLEM',
          boardRegion: 'ALL'
        });
  });
};
