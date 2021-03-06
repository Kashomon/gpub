/**
 * The GPub Ascii format. Note the similarity to SGF specification.
 *
 * Note that the board is indexed from 1,1, from the upper left.
 *
 * ___________
 * |.........|
 * |......*..|
 * |...%.....|
 * |.....%...|
 * |..@.+....|
 * |......X..|
 * |....OOX..|
 * |....OX...|
 * |.........|
 * -----------
 *
 * (3,5):Triangle
 * (4,3),(6,4):A
 * (7,1):Square
 * C: A balanced 9x9 game!
 *
 * Note that coords are indexed from the top left (maybe it should be bottom
 * left?)
 *
 * Legend
 * . :: Board
 * + :: Starpoint (optional).
 * O :: White Stone
 * X :: Black Stone
 * @ :: White Stone + label or mark
 * % :: Black Stone + label or mark
 * * :: Empty Intersection + label or mark
 */
gpub.diagrams.gpubAscii = {
  create: function(flattened, opts) {
    var toStr = glift.flattener.symbolStr;
    var symbolMap = gpub.diagrams.gpubAscii.symbolMap;

    var marks = {};
    var outStr = '';
    var newBoard = flattened.board().transform(function(i, x, y) {
      var symbol = toStr(i.base()); // Default
      if (i.stone()) {
        var stoneSym = toStr(i.stone());
        if (i.mark()) {
          symbol = stoneSym + '_MARK';
        } else {
          symbol = stoneSym;
        }
      } else if (i.mark()) {
        symbol = 'EMPTY_MARK';
      }

      if (i.mark()) {
        var pt = x + ',' + y;
        var obj = {
          mark: toStr(i.mark())
        };
        if (i.textLabel()) {
          obj['label'] = i.textLabel();
        }
        marks[pt] = obj;
      }

      var out = symbolMap[symbol];
      if (!out) {
        throw new Error('Could not find symbol str for : ' + symbol);
      }
      return out;
    });

    for (var i = 0; i < newBoard.boardArray; i++) {
      if (outStr) {
        outStr += '\n' + newBoard.join('');
      } else {
        outStr = newBoard.join('');
      }
    }
    return outStr;
  },

  /** Render go stones that exist in a block of text. */
  renderInline: function(text) {
    // We probably don't want to modifify inline go stones for ascii rendering.
    return text;
  }
};
