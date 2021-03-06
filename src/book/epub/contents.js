/**
 * Genenerate epub content.
 *
 * For more details, see:
 * - http://www.idpf.org/epub/301/spec/epub-contentdocs.html
 * - http://www.idpf.org/epub/30/spec/epub30-contentdocs.html
 * - http://www.hxa.name/articles/content/epub-guide_hxa7241_2007.html
 * @param {string} filename
 * @param {string} contents
 * @param {string=} opt_title
 * @return {!gpub.book.File}
 */
gpub.book.epub.contentDoc = function(filename, contents, opt_title) {
  var id = filename.replace(/\..*$/, '');
  if (!/.(xhtml|html|xml)$/.test(filename)) {
    throw new Error('Extension must be xhtml, html, or xml. ' +
        'Filename was: ' + filename);
  }
  var opts = {
    contents: contents,
    id: id,
    mimetype: 'application/xhtml+xml',
    // Path is relative to the OEBPS directory.
    path: 'OEBPS/' + filename,
  };
  if (opt_title) {
    opts.title = opt_title;
  }
  return opts;
};
