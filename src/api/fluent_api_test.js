(function() {
  module('gpub.api.fluentApiTest');
  var sgfs = testdata.sgfs;

  test('Spec Creation', function() {
    var veasy = testdata.sgfs.veryeasy;
    var triv = testdata.sgfs.trivialproblem;
    var opt = {
      games: {
        veasy: veasy,
        triv: triv
      },
      grouping: ['veasy', 'triv'],
      specOptions: {
        positionType: 'PROBLEM',
      },
    };
    var id0 = opt.grouping[0];
    var id1 = opt.grouping[1];

    var api = gpub.init(opt);
    ok(api, 'must be defined');
    deepEqual(api.opt_.games, opt.games);
    deepEqual(api.opt_.ids, opt.ids);

    api = api.createSpec();

    var spec = api.spec();
    deepEqual(spec.version, gpub.spec.SpecVersion.V1);
    var expMap = {};
    expMap[id0] = opt.games[id0];
    expMap[id1] = opt.games[id1];
    deepEqual(spec.gameMapping, expMap);
    deepEqual(spec.rootGrouping.positions.length, 2);
    deepEqual(spec.rootGrouping.positionType, 'PROBLEM');
    deepEqual(api.diagrams_, null);

    var expCache = {};
    expCache[id0] = glift.parse.fromString(opt.games[id0]);
    expCache[id1] = glift.parse.fromString(opt.games[id1]);
    deepEqual(api.cache_.gameMap, expMap, 'cache sgf map');
    deepEqual(api.cache_.get(id0).toSgf(), expCache[id0].toSgf(), 'sgf1 text');
    deepEqual(api.cache_.get(id1).toSgf(), expCache[id1].toSgf(), 'sgf2 text');
  });

  test('Spec Creation (options)', function() {
    var veasy = testdata.sgfs.veryeasy;
    var triv = testdata.sgfs.trivialproblem;
    var opt = {
      games: {
        veasy: veasy,
        triv: triv,
      },
      grouping: ['veasy', 'triv'],
      specOptions: {
        positionType: 'PROBLEM',
      },
    };
    var api = gpub.init(opt).createSpec()

    var spec = api.spec();
    var jsonspec = api.jsonSpec();
    ok(spec, 'spec should be defined');
    ok(jsonspec, 'spec should be defined');
    deepEqual(typeof spec, 'object', 'Spec should be an object');
    deepEqual(typeof jsonspec, 'string', 'JSON spec should be a string');

    deepEqual(gpub.init().createSpec(jsonspec).jsonSpec(), jsonspec);
    deepEqual(gpub.init().createSpec(spec).jsonSpec(), jsonspec);
  });

  test('Process Spec +(options)', function() {
    var veasy = testdata.sgfs.veryeasy;
    var api = gpub.init({
          games: {'v1': veasy},
          grouping: ['v1'],
        })
        .createSpec()
        .processSpec({
          positionType: 'PROBLEM'
        });

    deepEqual(api.spec().specOptions.positionType, 'PROBLEM');
  });

  test('Full Diagram Creation', function() {
    var sgf = testdata.gogameguru_commentary;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
        diagramOptions: {
          maxDiagrams: 20,
        }})
      .createSpec()
      .processSpec()
      .renderDiagrams();

    var diag = api.diagrams();
    ok(diag, 'Diagrams must be defined');
    deepEqual(diag.diagrams.length, 20);
    var idmap = {};
    deepEqual(diag.diagrams.length, diag.metadata.length,
        'Diagrams and metadata should have same length');
    for (var i = 0; i < diag.diagrams.length; i++) {
      var d  = diag.diagrams[i];
      ok(d.rendered, 'Must have rendered content');
      ok(d.id, 'Must have id');
      ok(!idmap[d.id], 'Duplicate ID detected: ' + d.id);

      var m  = diag.metadata[i];
      ok(m, 'metadata must be defined');
      ok(m.id, 'metadata must have id');
      ok(m.collisions, 'metadata must have collisions arr, even if empty');
      ok(m.isOnMainPath !== undefined, 'must have isOnMainPath');
      ok(m.startingMoveNum !== undefined, 'must have startingMoveNum');
      ok(m.endingMoveNum !== undefined, 'must have endingMoveNum');
      deepEqual(m.id, d.id, 'metadata id must equal digaram id');
      ok(m.comment, 'Must have a comment because it is game commentary');
    }
  });

  test('Full Diagram Creation :streamed:', function() {
    var sgf = testdata.gogameguru_commentary;
    var numSeen = 0;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
        diagramOptions: {
          maxDiagrams: 20,
        }})
      .createSpec()
      .processSpec()
      .renderDiagramsStream(function(diag, meta) {
        ok(diag, 'diagram must be defined');
        ok(diag.rendered, 'diagram.rendered must be defined');
        ok(meta, 'metadata must be defined');
        deepEqual(meta.extension, 'tex');
        ok(meta.comment !== undefined, 'comment must be defined');
        deepEqual(diag.id, meta.id, 'IDs must be equal')
        numSeen++;
      });
    deepEqual(numSeen, 20, 'Must have seen 20 diagrams');
    ok(api.diagrams(), 'must have diagrams obj');
    ok(api.diagrams().diagrams, 'must have rendered diagrams array');
    deepEqual(api.diagrams().diagrams.length, 0, 'Must have zero diagrams');
    deepEqual(api.diagrams().metadata.length, 20, 'must have 20 metadata items');
  });

  test('Full Diagram Creation +(options)', function() {
    var sgf = testdata.gogameguru_commentary;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
      })
      .createSpec()
      .processSpec()
      .renderDiagrams({
        maxDiagrams: 20,
      })
    var diag = api.diagrams();
    deepEqual(diag.diagrams.length, 20);
  });

  test('Full Diagram Creation streamed +(options)', function() {
    var sgf = testdata.gogameguru_commentary;
    var callCount = 0;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
      })
      .createSpec()
      .processSpec()
      .renderDiagramsStream(function(d) {
        ok(d.id);
        ok(d.rendered);
        callCount++;
      }, {
        maxDiagrams: 20,
      })
    deepEqual(callCount, 20);
  });

  test('Igo Diagram Creation ', function() {
    var sgf = testdata.gogameguru_commentary;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
      })
      .createSpec()
      .processSpec({
        positionType: 'PROBLEM'
      })
      .renderDiagrams({
        diagramType: 'IGO',
        maxDiagrams: 20,
      })
    var diag = api.diagrams();
    deepEqual(diag.diagrams.length, 20);
  });

  test('SmartGo Diagram Creation ', function() {
    var sgf = testdata.gogameguru_commentary;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
      })
      .createSpec()
      .processSpec()
      .renderDiagrams({
        diagramType: 'SMARTGO',
        maxDiagrams: 20,
      })
    var diag = api.diagrams();
    deepEqual(diag.diagrams.length, 20);
  });

  test('SVG Diagram Creation ', function() {
    var sgf = testdata.gogameguru_commentary;
    var api = gpub.init({
        games: {sgf: sgf},
        grouping: ['sgf'],
      })
      .createSpec()
      .processSpec()
      .renderDiagrams({
        diagramType: 'SVG',
        maxDiagrams: 20,
      })
    var diag = api.diagrams();
    deepEqual(diag.diagrams.length, 20);
  });
})();
