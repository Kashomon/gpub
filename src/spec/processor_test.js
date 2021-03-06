(function() {
  module('gpub.spec.processorTest');

  var sgfOne = '(;GM[1]GN[Zed];B[aa];W[bb]C[So good!];B[cc])';
  var sgfTwo = '(;GM[1]GN[Zed];B[aa];W[bb]C[Still Cool!];B[cc])';
  var sgfThree = '(;GM[1];B[aa];W[bb]C[Still Cool!];B[cc])';

  test('Process one SGF', function() {
    var cache = new gpub.util.MoveTreeCache();
    var spec = gpub.spec.create(new gpub.Options({
      games: {
        'Zed': sgfOne
      },
      grouping: ['Zed'],
    }), cache);

    var proc = gpub.spec.process(spec, cache);

    var id = 'Zed'
    deepEqual(proc.rootGrouping.positions[0].id, id);
    deepEqual(proc.rootGrouping.positions[0].gameId, id);
    deepEqual(proc.rootGrouping.generated[id].positions.length, 2);
    deepEqual(proc.rootGrouping.generated[id].positions[0].gameId, id);
  });

  test('Process three SGFs', function() {
    var cache = new gpub.util.MoveTreeCache();
    var spec =  gpub.spec.create(new gpub.Options({
      games: {
        one: sgfOne,
        two: sgfTwo,
        three: sgfThree,
      },
      grouping: [
        'one', 'two', 'three',
      ]
    }), cache);

    var proc = gpub.spec.process(spec, cache);

    deepEqual(proc.rootGrouping.positions.length, 3);

    proc.rootGrouping.positions.forEach(function(p) {
      var id = p.id;
      ok(proc.rootGrouping.generated[id], 'should have generated for id: ' + id);
      var gen = proc.rootGrouping.generated[id];
      deepEqual(gen.positions.length, 2);
      for (var i = 0; i < gen.positions.length; i++) {
        var genp = gen.positions[i];
        genp.gameId = gen.gameId;
        genp.id = gen.gameId + '-' + i;
      };
      var genLabels = gen.positionLabels();
      deepEqual(genLabels['MAINLINE'].length, 2);
      deepEqual(genLabels['VARIATION'], undefined);
    });
  });

  test('Process one SGF: no rotate (game)', function() {
    var sgfZed = '(;GM[1]GN[Zed];B[aa];W[bb]C[So good!];B[cc])';
    var cache = new gpub.util.MoveTreeCache();
    var id = 'Zed';
    var spec = gpub.spec.create(new gpub.Options({
      games: {
        'Zed': sgfZed,
      },
      grouping: [id],
      specOptions: {
        positionType: 'PROBLEM',
        autoRotateCropPrefs: {
          corner: 'TOP_RIGHT',
          side: 'RIGHT',
        }
      }
    }), cache);

    var proc = gpub.spec.process(spec, cache);
    var nmt = cache.get(id)
    nmt.moveDown();
    deepEqual(nmt.properties().getOneValue('B'), 'sa');
  });

  test('Process one SGF: no rotate (game)', function() {
    var sgfZed = '(;GM[1]GN[Zed];B[aa];W[bb]C[So good!];B[cc])';
    var cache = new gpub.util.MoveTreeCache();
    var id = 'Zed';
    var spec = gpub.spec.create(new gpub.Options({
      games: {
        'Zed': sgfZed,
      },
      grouping: ['Zed'],
      specOptions: {
        autoRotateCropPrefs: {
          corner: 'TOP_RIGHT',
          side: 'RIGHT',
        }
      }
    }), cache);

    var proc = gpub.spec.process(spec, cache);
    var nmt = cache.get(id)
    nmt.moveDown();
    deepEqual(nmt.properties().getOneValue('B'), 'aa', 'no-change: not problem')
  });
})();
