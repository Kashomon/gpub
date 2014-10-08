gpub.book.managerTest = function() {
  test("Test no exceptions", function() {
    var sgf = testdata.sgfs.complexproblem;
    var options = {
      sgfList: [{
        sgfString: sgf
      }],
    };
    var manager = glift.widgets.createNoDraw(options);
    ok(manager !== undefined);

    gpub.book.manager.toBook(manager, function(output) {
      deepEqual(glift.util.typeOf(output), 'string');
    });
  });
};
