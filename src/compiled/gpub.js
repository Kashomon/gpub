/*
 GPub: A Go publishing platform, built on Glift

 @copyright Josh Hoak
 @license MIT License (see LICENSE.txt)
 --------------------------------------
*/
(function(a){var b=b||a.gpub||{};a&&(a.gpub=b)})(window);gpub.global={version:"0.1.0"};gpub.util={};gpub.util.Buffer=function(a){this._maxSize=a||1;this._buffer=[]};gpub.util.Buffer.prototype={add:function(a){null!=a&&this._buffer.push(a);return this},atCapacity:function(){return this._buffer.length>=this._maxSize},flush:function(){var a=this._buffer.slice(0);this._buffer=[];return a}};
gpub.markdown={rendererMethods:{code:function(a,b){},blockquote:function(a){},html:function(a){},heading:function(a,b){},hr:function(){},list:function(a,b){},listitem:function(a){},paragraph:function(a){},table:function(a,b){},tablerow:function(a){},tablecell:function(a,b){},strong:function(a){},em:function(a){},codespan:function(a){},br:function(){},del:function(a){},link:function(a,b,c){},image:function(a,b,c){}}};gpub.mustache={};
(function(){(function(a,b){b(a.Mustache={})})(this,function(a){function b(a){return"function"===typeof a}function c(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function d(b,d){function y(a){"string"===typeof a&&(a=a.split(B,2));if(!w(a)||2!==a.length)throw Error("Invalid tags: "+a);k=RegExp(c(a[0])+"\\s*");p=RegExp("\\s*"+c(a[1]));z=RegExp("\\s*"+c("}"+a[1]))}if(!b)return[];var h=[],t=[],u=[],x=!1,v=!1,k,p,z;y(d||a.tags);for(var m=new g(b),r,l,n,s;!m.eos();){r=m.pos;if(n=m.scanUntil(k)){s=
0;for(var q=n.length;s<q;++s)if(l=n.charAt(s),C.call(D,l)?v=!0:u.push(t.length),t.push(["text",l,r,r+1]),r+=1,"\n"===l){if(x&&!v)for(;u.length;)delete t[u.pop()];else u=[];v=x=!1}}if(!m.scan(k))break;x=!0;l=m.scan(E)||"name";m.scan(F);"="===l?(n=m.scanUntil(A),m.scan(A),m.scanUntil(p)):"{"===l?(n=m.scanUntil(z),m.scan(G),m.scanUntil(p),l="&"):n=m.scanUntil(p);if(!m.scan(p))throw Error("Unclosed tag at "+m.pos);s=[l,n,r,m.pos];t.push(s);if("#"===l||"^"===l)h.push(s);else if("/"===l){l=h.pop();if(!l)throw Error('Unopened section "'+
n+'" at '+r);if(l[1]!==n)throw Error('Unclosed section "'+l[1]+'" at '+r);}else"name"===l||"{"===l||"&"===l?v=!0:"="===l&&y(n)}if(l=h.pop())throw Error('Unclosed section "'+l[1]+'" at '+m.pos);return f(e(t))}function e(a){for(var b=[],c,d,e=0,f=a.length;e<f;++e)if(c=a[e])"text"===c[0]&&d&&"text"===d[0]?(d[1]+=c[1],d[3]=c[3]):(b.push(c),d=c);return b}function f(a){for(var b=[],c=b,d=[],e,f=0,h=a.length;f<h;++f)switch(e=a[f],e[0]){case "#":case "^":c.push(e);d.push(e);c=e[4]=[];break;case "/":c=d.pop();
c[5]=e[2];c=0<d.length?d[d.length-1][4]:b;break;default:c.push(e)}return b}function g(a){this.tail=this.string=a;this.pos=0}function h(a,b){this.view=null==a?{}:a;this.cache={".":this.view};this.parent=b}function k(){this.cache={}}var H=Object.prototype.toString,w=Array.isArray||function(a){return"[object Array]"===H.call(a)},C=RegExp.prototype.test,D=/\S/,I={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},F=/\s*/,B=/\s+/,A=/\s*=/,G=/\s*\}/,E=/#|\^|\/|>|\{|&|=|!/;g.prototype.eos=
function(){return""===this.tail};g.prototype.scan=function(a){a=this.tail.match(a);if(!a||0!==a.index)return"";a=a[0];this.tail=this.tail.substring(a.length);this.pos+=a.length;return a};g.prototype.scanUntil=function(a){a=this.tail.search(a);var b;switch(a){case -1:b=this.tail;this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,a),this.tail=this.tail.substring(a)}this.pos+=b.length;return b};h.prototype.push=function(a){return new h(a,this)};h.prototype.lookup=function(a){var c=
this.cache,d;if(a in c)d=c[a];else{for(var e=this,f,h;e;){if(0<a.indexOf("."))for(d=e.view,f=a.split("."),h=0;null!=d&&h<f.length;)d=d[f[h++]];else"object"==typeof e.view&&(d=e.view[a]);if(null!=d)break;e=e.parent}c[a]=d}b(d)&&(d=d.call(this.view));return d};k.prototype.clearCache=function(){this.cache={}};k.prototype.parse=function(a,b){var c=this.cache,e=c[a];null==e&&(e=c[a]=d(a,b));return e};k.prototype.render=function(a,b,c){var d=this.parse(a);b=b instanceof h?b:new h(b);return this.renderTokens(d,
b,c,a)};k.prototype.renderTokens=function(a,b,c,d){for(var e="",f,h,g,k=0,p=a.length;k<p;++k)g=void 0,f=a[k],h=f[0],"#"===h?g=this._renderSection(f,b,c,d):"^"===h?g=this._renderInverted(f,b,c,d):">"===h?g=this._renderPartial(f,b,c,d):"&"===h?g=this._unescapedValue(f,b):"name"===h?g=this._escapedValue(f,b):"text"===h&&(g=this._rawValue(f)),void 0!==g&&(e+=g);return e};k.prototype._renderSection=function(a,c,d,e){function f(a){return h.render(a,c,d)}var h=this,g="",k=c.lookup(a[1]);if(k){if(w(k))for(var q=
0,p=k.length;q<p;++q)g+=this.renderTokens(a[4],c.push(k[q]),d,e);else if("object"===typeof k||"string"===typeof k)g+=this.renderTokens(a[4],c.push(k),d,e);else if(b(k)){if("string"!==typeof e)throw Error("Cannot use higher-order sections without the original template");k=k.call(c.view,e.slice(a[3],a[5]),f);null!=k&&(g+=k)}else g+=this.renderTokens(a[4],c,d,e);return g}};k.prototype._renderInverted=function(a,b,c,d){var e=b.lookup(a[1]);if(!e||w(e)&&0===e.length)return this.renderTokens(a[4],b,c,d)};
k.prototype._renderPartial=function(a,c,d){if(d&&(a=b(d)?d(a[1]):d[a[1]],null!=a))return this.renderTokens(this.parse(a),c,d,a)};k.prototype._unescapedValue=function(a,b){var c=b.lookup(a[1]);if(null!=c)return c};k.prototype._escapedValue=function(b,c){var d=c.lookup(b[1]);if(null!=d)return a.escape(d)};k.prototype._rawValue=function(a){return a[1]};a.name="mustache.js";a.version="1.1.0";a.tags=["{{","}}"];var q=new k;a.clearCache=function(){return q.clearCache()};a.parse=function(a,b){return q.parse(a,
b)};a.render=function(a,b,c){return q.render(a,b,c)};a.to_html=function(c,d,e,f){c=a.render(c,d,e);if(b(f))f(c);else return c};a.escape=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return I[a]})};a.Scanner=g;a.Context=h;a.Writer=k})}).call(gpub);gpub.book={create:function(a,b){this._validate(a);return this.generator(b.outputFormat,b).generate(a)},_validate:function(a){if(1>a.sgfCollection.length)throw Error("sgfCollection must be non-empty");}};
gpub.book.newDiagramContext=function(a,b){return{contextType:a,isChapter:b}};gpub.book.contextType={NONE:"NONE",DESCRIPTION:"DESCRIPTION",EXAMPLE:"EXAMPLE",VARIATIONS:"VARIATIONS",PROBLEM:"PROBLEM"};gpub.book._headingRegex=/(^|\n)#+\s*\w+/;
gpub.book.getDiagramContext=function(a,b,c){var d=gpub.book.contextType,e=glift.enums.widgetTypes;c=c.widgetType;a.newTreeRef();a=d.NONE;a=b.comment();var f=gpub.book._headingRegex.test(a);a=c===e.STANDARD_PROBLEM||c===e.STANDARD_PROBLEM?d.PROBLEM:c===e.GAME_VIEWER||c===e.REDUCED_GAME_VIEWER?d.VARIATIONS:c===e.EXAMPLE&&1===b.endingMoveNum()?glift.obj.isEmpty(b.stoneMap())?d.DESCRIPTION:d.EXAMPLE:d.EXAMPLE;return gpub.book.newDiagramContext(a,f)};
gpub.book.generator=function(a,b){if(!a)throw Error("No output format defined");if(!b)throw Error("Options not defined");var c=gpub.book[a.toLowerCase()];if(!c)throw Error("No package defined for: "+a);if(!c.generator)throw Error("No generator impl for: "+a);var d=new gpub.book._Generator,e;for(e in c.generator)e&&c.generator[e]&&(d[e]=c.generator[e].bind(d));if(!d.defaultOptions||"function"!==glift.util.typeOf(d.defaultOptions))throw Error("No default options-function defined for type: "+a);return d._initOptions(b)};
gpub.book.Gen={generate:function(a){},defaultTemplate:function(){},defaultOptions:function(){}};gpub.book._Generator=function(){this._opts={};this._parseCache={}};
gpub.book._Generator.prototype={view:function(a){if(!a)throw Error("Spec must be defined. Was: "+a);var b=glift.util.simpleClone(this._opts.bookOptions);a=this.manager(a);a=a.loadSgfStringSync(a.getSgfObj(0));var c=this.getMovetree(a);a=this.defaultOptions?this.defaultOptions().bookOptions||{}:{};if(c=c.metadata())for(var d in c)void 0!==c[d]&&void 0===b[d]&&(b[d]=c[d]);if(a)for(d in a)void 0!==a[d]&&void 0===b[d]&&(b[d]=a[d]);return b},manager:function(a){if(!a)throw Error("Spec not defined");return glift.widgets.createNoDraw(a)},
forEachSgf:function(a,b){for(var c=this.manager(a),d=this.options(),e=d.maxDiagrams?d.maxDiagrams:1E6,d=d.skipDiagrams;d<c.sgfCollection.length&&d<e;d++){var f=c.loadSgfStringSync(c.getSgfObj(d)),g=this.getMovetree(f),h=glift.flattener.flatten(g,{nextMovesTreepath:f.nextMovesPath,boardRegion:f.boardRegion}),f=gpub.book.getDiagramContext(g,h,f);b(d,g,h,f)}},getMovetree:function(a){var b=this._sgfSignature(a.sgfString);this._parseCache[b]||(this._parseCache[b]=glift.rules.movetree.getFromSgf(a.sgfString));
a=glift.rules.treepath.parsePath(a.initialPosition);return this._parseCache[b].getTreeFromRoot(a)},template:function(){var a=this._opts;return a.template?a.template:this.defaultTemplate()},_initOptions:function(a){if(!a)throw Error("Opts not defined");this._opts=glift.util.simpleClone(a||{});a={};this.defaultOptions&&(a=this.defaultOptions());if(!a)throw Error("Default options not defined");for(var b in a)a[b]&&!this._opts[b]&&(this._opts[b]=a[b]);return this},options:function(){return this._opts},
_sgfSignature:function(a){if("string"!==typeof a)throw Error("Improper type for SGF: "+a);return 100>=a.length?a:a.substring(0,50)+a.substring(a.length-50,a.length)}};gpub.book.ascii={};
gpub.book.ascii.generator={generate:function(a){var b=this.view(a),c=this.options(),d=[];this.forEachSgf(a,function(a,b,g){a=gpub.diagrams.create(b,c.diagramType);gpub.diagrams.createLabel(b);d.push(a)}.bind(this));b.content=d.join("\n");return gpub.Mustache.render(this.template(),b)},defaultTemplate:function(){return gpub.book.ascii._defaultTemplate},defaultOptions:function(a){return{diagramType:gpub.diagrams.diagramType.SENSEIS_ASCII}}};gpub.book.ascii._defaultTemplate="Title: {{title}}\nAuthors: {{#authors}}{{.}}, {{/authors}}\n------------------------------------------------------------------------------\n{{content}}";
gpub.book.htmlpage={};gpub.book.htmlpage._template='<!DOCTYPE html>\n<html>\n  <head>\n    <title> {{title}} </title>\n  <style>\n    * {\n      margin: 0;\n      padding: 0;\n    }\n    #glift_display1 {\n      height:500px;\n      width:100%;\n      position:relative;\n    }\n  </style>\n  <body>\n    <div id="wrap" style="position:relative;">\n      <div id="glift_display1"></div>\n    </div>\n    <script type="text/javascript">\n      var gliftMgr = glift.create({{content}});\n    \x3c/script>\n  </body>\n<html>';
gpub.book.htmlpage.generator={generate:function(a,b){},defaultTemplate:function(){return gpub.book.htmlBook._template},defaultOptions:function(){return{}}};gpub.book.latex={};
gpub.book.latex.context={typeset:function(a,b,c,d){comment=d.comment()||"";label=gpub.diagrams.createLabel(d);var e=comment?gpub.book.latex.renderMarkdown(comment):{preamble:"",text:""};e.text=gpub.diagrams.renderInline(a,e.text);a=gpub.book.latex.context._processLabel(a,label,c,d);(d=gpub.book.latex.context.rendering[c.contextType])||(d=gpub.book.latex.context.rendering[DESCRIPTION]);return d(b,c,e,a)},_processLabel:function(a,b,c,d){c="\\gofigure";var e=d.mainlineMove();if(!d.isOnMainPath()&&null!==
e){c="\\govariation";d=d.mainlineMoveNum();var f=null,f="BLACK"===e.color?"Black":"White";e&&(c+="[ from "+f+" "+d+"]")}if(b)for(b=b.split("\n"),e=0;e<b.length;e++)c+="\n\n\\subtext{"+b[e]+"}";return c=gpub.diagrams.renderInline(a,c)},rendering:{EXAMPLE:function(a,b,c,d){return c.preamble?[c.preamble,"{\\centering",a,"}",d,"",c.text,"\\vfill"].join("\n"):["\n\\rule{\\textwidth}{0.5pt}\n\n\\begin{minipage}[t]{0.5\\textwidth}",a,d,"\\end{minipage}\n\\begin{minipage}[t]{0.5\\textwidth}\n\\setlength{\\parskip}{0.5em}",
c.text,"\\end{minipage}\n\\vfill"].join("\n")},DESCRIPTION:function(a,b,c,d){return[c.preamble,c.text,"\\vfill"].join("\n")},PROBLEM:function(a,b,c,d){}}};
gpub.book.latex.generator={generate:function(a){var b=this.view(a),c=this.options();b.init=gpub.diagrams.getInit(c.diagramType,"LATEX");var d=[];this.forEachSgf(a,function(a,b,g,h){a=gpub.diagrams.create(g,c.diagramType);g=gpub.book.latex.context.typeset(c.diagramType,a,h,g);d.push(g)}.bind(this));b.content=d.join("\n");return gpub.Mustache.render(this.template(),b)},defaultTemplate:function(){return gpub.book.latex.defaultTemplate},defaultOptions:function(){return gpub.book.latex.options()}};
gpub.book.latex.defaultTemplate="{{=<% %>=}}\n\\documentclass[letterpaper,12pt]{memoir}\n\\usepackage{color}\n\\usepackage{wrapfig}\n\\usepackage{setspace}\n\\usepackage{graphicx}\n\\usepackage[margin=1in]{geometry}\n%%% Define any extra packages %%%\n<%init%>\n<%={{ }}=%>\n\n\\setlength{\\parskip}{0.5em}\n\\setlength{\\parindent}{0pt}\n\n%%% Diagram Figure defs.\n% Must expose two commands\n%  \\gofigure  (mainline diagrams)\n%  \\godiagram (variation diagrams)\n% Mainline Diagrams. reset at parts\n\\newcounter{GoFigure}[part]\n\n\\newcommand{\\gofigure}{%\n \\stepcounter{GoFigure}\n \\centerline{\\textit{Diagram.\\thinspace\\arabic{GoFigure}}}\n}\n% Variation Diagrams. reset at parts.\n\\newcounter{GoVariation}[part]\n\n\\newcommand{\\govariation}[1][]{%\n \\stepcounter{GoVariation}\n \\centerline{\\textit{Variation.\\thinspace\\arabic{GoVariation}#1}}\n}\n\n\\newcommand{\\subtext}[1]{\\centerline{\\textit{#1}}}\n\n%%% Define the main title %%%\n\\definecolor{light-gray}{gray}{0.55}\n\\newcommand*{\\mainBookTitle}{\\begingroup\n  \\raggedleft\n  {{#authors}}\n     {\\Large {{.}} } \\\\\n     \\vspace*{1 em}\n  {{/authors}}\n  \\vspace*{5 em}\n  {\\textcolor{light-gray}{\\Huge {{title}} }}\\\\\n  \\vspace*{\\baselineskip}\n  {{#subtitle}}\n  {\\small \\bfseries {{subtitle}} }\\par\n  {{/subtitle}}\n  \\vfill\n  {{#publisher}}\n  {\\Large {{publisher}} }\\par\n  \\vspace*{2\\baselineskip}\n  {{/publisher}}\n  {{#year}}\n  {\\large {{year}} }\\par\n  \\vspace*{2\\baselineskip}\n  {{/year}}\n\\endgroup}\n %%% Chapter settings %%%\n\\chapterstyle{madsen}\n\\pagestyle{companion}\n\\openany\n\\makepagestyle{headings}\n\\makeevenhead{headings}{\\thepage}{}{\\slshape\\leftmark}\n\\makeoddhead{headings}{\\slshape\\rightmark}{}{\\thepage}\n\n\\begin{document}\n%%% The Frontmatter. %%%\n\\begin{titlingpage}\n\\mainBookTitle\n\\end{titlingpage}\n\\frontmatter*\n\n{{#frontmatter.copyright}}\n{{/frontmatter.copyright}}\n\n\n\\newpage\n\\tableofcontents\n\n\n%%% The content. %%%\n\\mainmatter\n{{&content}}\n\n\\end{document}";
gpub.book.latex.renderer=function(){if(gpub.book.latex._rendererInstance)return gpub.book.latex._rendererInstance;var a=new glift.marked.Renderer,b;for(b in gpub.book.latex.markdown)a[b]=gpub.book.latex.markdown[b].bind(a);a._preamble=[];return a};gpub.book.latex.renderMarkdown=function(a){var b=gpub.book.latex.renderer();a=gpub.book.latex.sanitize(a);a=glift.marked(a,{renderer:b,silent:!0});return{preamble:b.extractPreamble(),text:a}};
gpub.book.latex.markdown={extractPreamble:function(){return this._preamble.join("\n")},heading:function(a,b){1===b?this._preamble.push("\\book{"+a+"}"):2===b?this._preamble.push("\\part{"+a+"}"):3===b?this._preamble.push("\\chapter{"+a+"}"):4===b?this._preamble.push("\\section{"+a+"}"):this._preamble.push("\\section*{"+a+"}");return""},hr:function(){return"\\hrule"},list:function(a,b){return ordererd?["\\begin{enumerate}",a,"\\end{enumerate}"].join("\n"):["\\begin{itemize}",a,"\\end{itemize}"].join("\n")},
listitem:function(a){return"\\item "+a},paragraph:function(a){return a+"\n\n"},strong:function(a){return"\\textbf{"+a+"}"},em:function(a){return"\\textit{"+a+"}"},br:function(){return"\\newline"},code:function(a,b){return a},blockquote:function(a){return a},html:function(a){return a},codespan:function(a){return a},del:function(a){return a}};gpub.book.latex.options=function(){return{diagramType:gpub.diagrams.diagramType.GNOS,bookOptions:{}}};gpub.book.latex.Page=function(){this.buffer=[]};
gpub.book.latex.Page.prototype={addDiagram:function(a,b,c,d,e){},flush:function(){var a=this.buffer.join("\n");this.buffer=[];return a}};gpub.book.latex.pageSize={A4:"A4",A5:"A5",LETTER:"LETTER",QUARTO:"QUARTO",OCTAVO:"OCTAVO",TWELVEMO:"TWELVEMO"};gpub.book.latex.sanitize=function(a){return a.replace(/\\/g,"\\textbackslash").replace(/[$}{%&]/g,function(a){return"\\"+a})};
gpub.spec={_defaultSpec:{divId:null,sgfCollection:[],sgfMapping:{},sgfDefaults:{},metadata:{}},_getSpecProcessor:function(a){switch(a){case "GAME_COMMENTARY":return gpub.spec.gameBook;case "PROBLEM_SET":return gpub.spec.problemSet;case "PROBLEM_BOOK":return gpub.spec.problemBook;default:throw Error("Unsupported book purpose: "+a);}},create:function(a,b){var c=glift.util.simpleClone(gpub.spec._defaultSpec),d=gpub.spec._getSpecProcessor(b.bookPurpose);c.sgfDefaults=glift.util.simpleClone(glift.widgets.options.baseOptions.sgfDefaults);
d.setHeaderInfo(c);for(var e=0;a&&e<a.length;e++){var f=a[e],g=glift.parse.fromString(f),h=g.properties().getOneValue("GN")||"sgf:"+e;c.sgfMapping[h]||(c.sgfMapping[h]=f);c.sgfCollection=c.sgfCollection.concat(d.processOneSgf(g,h,b))}c.metadata.bookPurpose=b.bookPurpose;return c},_createExample:function(a,b,c,d){if(!a)throw Error("No SGF Alias");if(!b)throw Error("No Initial Position");if(!c)throw Error("No Next Moves");if(!glift.enums.boardRegions[d])throw Error("Unknown board region: "+d);var e=
glift.rules.treepath.toInitPathString,f=glift.rules.treepath.toFragmentString;return{alias:a,initialPosition:e(b),nextMovesPath:f(c),boardRegion:d,widgetType:"EXAMPLE"}}};
gpub.spec.gameBook={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.EXAMPLE;return a},processOneSgf:function(a,b,c){for(var d=[],e=[],f=a.node();f;){if(!a.properties().getComment()&&0<f.numChildren())f=a.node(),e=e.concat(gpub.spec.gameBook.variationPaths(a));else{var g=glift.rules.treepath.findNextMovesPath(a);d.push(gpub.spec._createExample(b,g.treepath,g.nextMoves,c.boardRegion));e=e.concat(gpub.spec.gameBook.variationPaths(a));for(g=0;g<e.length;g++){var h=a.getTreeFromRoot(e[g]),
h=glift.rules.treepath.findNextMovesPath(h);d.push(gpub.spec._createExample(b,h.treepath,h.nextMoves,c.boardRegion))}e=[]}f=f.getChild(0);a.moveDown()}return d},variationPaths:function(a){a=a.newTreeRef();var b=[];if(!a.node().getParent())return b;a.moveUp();for(var c=1;c<a.node().numChildren();c++){var d=a.newTreeRef();d.moveDown(c);d.recurse(function(a){a.properties().getOneValue("C")&&b.push(a.treepathToHere())})}return b}};
gpub.spec.problemBook={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.EXAMPLE;return a},processOneSgf:function(a,b,c){},processProblemDef:function(a,b,c){},processCorrect:function(a,b,c){},processIncorrect:function(a,b,c){}};gpub.spec.problemSet={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.STANDARD_PROBLEM;return a},processOneSgf:function(a,b,c){b={alias:b,boardRegion:c.boardRegion};a.getTreeFromRoot().node().numChildren();return[b]}};
gpub.spec.processor={setHeaderInfo:function(a,b){},processOneSgf:function(a,b,c){}};
gpub.diagrams={diagramType:{ASCII:"ASCII",SENSEIS_ASCII:"SENSEIS_ASCII",GOOE:"GOOE",GNOS:"GNOS",IGO:"IGO",PDF:"PDF"},create:function(a,b,c){c=c||{};return this._getPackage(b).create(a,c)},renderInline:function(a,b){return this._getPackage(a).renderInline(b)},_getPackage:function(a){if(!a||!gpub.diagrams.diagramType[a])throw Error("Unknown diagram type: "+a);var b=glift.enums.toCamelCase(a),b=gpub.diagrams[b];if(!b)throw Error("No package for diagram type: "+a);if(!b.create)throw Error("No create method for diagram type: "+
a);return b},getInit:function(a,b){var c=this._getPackage(a);if(!c.init||"object"!=typeof c.init)throw Error("No init obj");return(c=c.init[b])?"function"===typeof c?c():"string"===typeof c?c:"":""},flatten:function(a,b,c,d){b=b||[];c=c||[];a=glift.rules.movetree.getFromSgf(a,b);return glift.flattener.flatten(a,{nextMovesTreepath:c,boardRegion:d})},createLabel:function(a){return gpub.diagrams._constructLabel(collisions=a.collisions(),isOnMainline=a.isOnMainPath(),startNum=a.startingMoveNum(),endNum=
a.endingMoveNum())},_constructLabel:function(a,b,c,d){var e="";b&&(b=[c],c!==d&&b.push(d),e+="("+(1<b.length?"Moves: ":"Move: ")+b.join("-")+")");if(a&&a.length){c=[];for(d=0;d<a.length;d++)if(b=a[d],c.push((b.color===glift.enums.states.BLACK?"Black":"White")+" "+b.mvnum+" at "+b.label),0===(d+1)%3||d===a.length-1)e&&(e+="\n"),e+=c.join(", "),c=[];e+="."}return e}};gpub.diagrams.creator={create:function(a,b){},renderInline:function(a,b){}};
gpub.diagrams.senseisAscii={create:function(a,b){for(var c=glift.flattener.symbolStr,d=gpub.diagrams.senseisAscii.symbolMap,e=[],f=0,g=a.board().transform(function(a,b,e){b=c(a.base());a.textLabel()&&a.mark()&&a.mark()===glift.flattener.symbols.TEXTLABEL?a.textLabel():a.mark()&&a.stone()?b=c(a.stone())+"_"+c(a.mark()):a.stone()?b=c(a.stone()):a.mark()&&(b=c(a.mark()));(a=d[b])||console.log("Could not find symbol str for : "+b);return a}).boardArray();f<g.length;f++)e.push(g[f].join(" "));return e.join("\n")},
renderInline:function(a){return a}};gpub.diagrams.senseisAscii.symbolMap={EMPTY:"_",TL_CORNER:".",TR_CORNER:".",BL_CORNER:".",BR_CORNER:".",TOP_EDGE:".",BOT_EDGE:".",LEFT_EDGE:".",RIGHT_EDGE:".",CENTER:".",CENTER_STARPOINT:"+",BSTONE:"X",WSTONE:"O",BSTONE_TRIANGLE:"Y",WSTONE_TRIANGLE:"Q",TRIANGLE:"T",BSTONE_SQUARE:"#",WSTONE_SQUARE:"@",SQUARE:"S",BSTONE_CIRCLE:"B",WSTONE_CIRCLE:"W",CIRCLE:"C",BSTONE_XMARK:"Z",WSTONE_XMARK:"P",XMARK:"M",BSTONE_TEXTLABEL:"%s",WSTONE_TEXTLABEL:"%s",TEXTLABEL:"%s"};
gpub.diagrams.gooe={sizes:{NORMAL:"NORMAL",LARGE:"LARGE"},create:function(a,b){return gpub.diagrams.gooe.gooeStringArray(a,b).join("\n")},renderInline:function(a){return a},gooeStringArray:function(a,b){for(var c="LARGE"===b?"{\\bgoo":"{\\goo",d=gpub.diagrams.gooe.gooeBoard(a,b),c=[c],e=0,d=d.boardArray();e<d.length;e++)c.push(d[e].join(""));c.push("}");return c},gooeBoard:function(a,b){var c=glift.flattener.symbolStr,d=gpub.diagrams.gooe.symbolMap;return a.board().transform(function(a,f,g){f=c(a.base());
a.mark()&&a.stone()?f=c(a.stone())+"_"+c(a.mark()):a.stone()?f=c(a.stone()):a.mark()&&(f=c(a.mark()));g=f+"_"+b;var h="",h=d[g]?d[g]:d[f]?d[f]:d.EMPTY;a.textLabel()&&(h=h.replace("%s",a.textLabel()));return h})}};
gpub.diagrams.gooe.init={LATEX:function(){return"\\usepackage{gooemacs}\n \\\\\n"+gpub.diagrams.gooe.init.extraDefs()},defs:{sizeDefs:"% Size definitions;\\newdimen\\bigRaise;\\bigRaise=4.3pt;\\newdimen\\smallRaise;\\smallRaise=3.5pt;\\newdimen\\inlineRaise;\\inlineRaise=3.5pt".split(";"),bigBoardDefs:["% Big-sized board defs","\\def\\eLblBig#1{\\leavevmode\\hbox to \\goIntWd{\\hss\\raise\\bigRaise\\hbox{\\tenpointeleven{#1}}\\hss}}","\\def\\goWsLblBig#1{\\leavevmode\\setbox0=\\hbox{\\0??!}\\rlap{\\0??!}\\raise\\bigRaise\\hbox to \\wd0{\\hss\\tenpointeleven{#1}\\hss}}",
"\\def\\goBsLblBig#1{\\leavevmode\\setbox0=\\hbox{\\0??@}\\rlap{\\0??@}\\raise\\bigRaise\\hbox to \\wd0{\\hss\\color{white}\\tenpointeleven{#1}\\color{white}\\hss}}"],normalBoardDefs:["% Normal-sized board defs","\\def\\eLbl#1{\\leavevmode\\hbox to \\goIntWd{\\hss\\raise\\smallRaise\\hbox{\\tenpoint{#1}}\\hss}}","\\def\\goWsLbl#1{\\leavevmode\\setbox0=\\hbox{\\0??!}\\rlap{\\0??!}\\raise\\smallRaise\\hbox to \\wd0{\\hss\\eightpointnine{#1}\\hss}}","\\def\\goBsLbl#1{\\leavevmode\\setbox0=\\hbox{\\0??@}\\rlap{\\0??@}\\raise\\smallRaise\\hbox to \\wd0{\\hss\\color{white}\\eightpointnine{#1}\\color{white}\\hss}}"]},
extraDefs:function(a){var b=gpub.diagrams.gooe.init.defs;a=a||"cmss";return["% Gooe font definitions","\\font\\tenpoint="+a+"10","\\font\\tenpointeleven="+a+"10 at 11pt","\\font\\eightpoint="+a+"8","\\font\\eightpointnine="+a+"8 at 9pt"].concat(b.sizeDefs).concat(b.bigBoardDefs).concat(b.normalBoardDefs).join("\n")}};
gpub.diagrams.gooe.symbolMap={EMPTY:"\\eLbl{_}",TL_CORNER:"\\0??<",TR_CORNER:"\\0??>",BL_CORNER:"\\0??,",BR_CORNER:"\\0??.",TOP_EDGE:"\\0??(",BOT_EDGE:"\\0??)",LEFT_EDGE:"\\0??[",RIGHT_EDGE:"\\0??]",CENTER:"\\0??+",CENTER_STARPOINT:"\\0??*",BSTONE:"\\0??@",WSTONE:"\\0??!",BSTONE_TRIANGLE:"\\0??S",WSTONE_TRIANGLE:"\\0??s",TRIANGLE:"\\0??3",BSTONE_SQUARE:"\\0??S",WSTONE_SQUARE:"\\0??s",SQUARE:"\\0??2",BSTONE_CIRCLE:"\\0??C",WSTONE_CIRCLE:"\\0??c",CIRCLE:"\\0??1",BSTONE_XMARK:"\\0??X",WSTONE_XMARK:"\\0??x",
XMARK:"\\0??4",BSTONE_TEXTLABEL:"\\goBsLbl{%s}",WSTONE_TEXTLABEL:"\\goWsLbl{%s}",TEXTLABEL:"\\eLbl{%s}",BSTONE_TEXTLABEL_LARGE:"\\goBsLblBig{%s}",WSTONE_TEXTLABEL_LARGE:"\\goWsLblBig{%s}",TEXTLABEL_LARGE:"\\eLblBig{%s}"};
gpub.diagrams.gnos={sizes:{8:"8",9:"9",10:"10",11:"11",12:"12",14:"14",16:"16",20:"20"},singleCharSizeAtTen:{8:1,9:2,10:2,11:3,12:3,14:4,16:5,20:6},sizeArray:"tiny scriptsize footnotesize small normalsize large Large LARGE huge Huge".split(" "),create:function(a,b){b.size=b.size||gpub.diagrams.gnos.sizes["12"];return gpub.diagrams.gnos.gnosStringArr(a,b.size).join("\n")},_inlineWrapper:"{\\raisebox{-.17em}{\\textnormal{%s}}}",renderInline:function(a,b){b=b||{};var c=b.size||gpub.diagrams.gnos.sizes["12"];
return a.replace(/((Black)|(White)) (([A-Z])|([0-9]+))(?=([^a-z]|$))/g,function(a,b,f,g,h){f=null;if("Black"===b)f=glift.flattener.symbols.BSTONE;else if("White"===b)f=glift.flattener.symbols.WSTONE;else return a;a=gpub.diagrams.gnos.getLabelDef(h,f,c);h=gpub.diagrams.gnos._processTextLabel(a,gpub.diagrams.gnos.symbolMap[a],h,c);return gpub.diagrams.gnos._inlineWrapper.replace("%s",h)})},gnosStringArr:function(a,b){for(var c=["\\gnosfontsize{"+b+"}","{\\gnos"],d=0,e=gpub.diagrams.gnos.gnosBoard(a,
b).boardArray();d<e.length;d++)c.push(e[d].join("")+"\\\\");c.push("}");return c},gnosBoard:function(a,b){b=b||"12";var c=glift.flattener.symbolStr,d=gpub.diagrams.gnos.symbolMap;return a.board().transform(function(a,f,g){f=c(a.base());a.textLabel()&&a.mark()&&a.mark()===glift.flattener.symbols.TEXTLABEL?f=gpub.diagrams.gnos.getLabelDef(a.textLabel(),a.stone(),b):a.mark()&&a.stone()?f=c(a.stone())+"_"+c(a.mark()):a.stone()?f=c(a.stone()):a.mark()&&(f=c(a.mark()));out=d[f]?d[f]:d.EMPTY;(g=a.textLabel())?
out=gpub.diagrams.gnos._processTextLabel(f,out,g,b,!0):a.mark()&&!a.stone()&&(out=gpub.diagrams.gnos.symbolMap.markOverlap(d[c(a.base())],out));return out})},getLabelDef:function(a,b,c){var d=glift.flattener.symbolStr;c+="";return a&&/^\d+$/.test(a)&&b&&("8"===c||3<=a.length)?(a=parseInt(a),c=d(b),0<a&&100>a?c+"_NUMLABEL_1_99":100<=a&&200>a?c+"_NUMLABEL_100_199":200<=a&&299>a?c+"_NUMLABEL_200_299":300<=a&&399>a?c+"_NUMLABEL_300_399":d(b)+"_TEXTLABEL"):b&&a?d(b)+"_TEXTLABEL":"TEXTLABEL"},_processTextLabel:function(a,
b,c,d){if(/^\d+$/.test(c)&&/NUMLABEL/.test(a))return lbl=parseInt(c)%100,b.replace("%s",lbl);a=gpub.diagrams.gnos.singleCharSizeAtTen[d]||3;1<c.length&&a--;return b.replace("%s","\\"+(gpub.diagrams.gnos.sizeArray[a]||"tiny")+"{"+c+"}")}};gpub.diagrams.gnos.init={LATEX:"\\usepackage{gnos}"};
gpub.diagrams.gnos.symbolMap={EMPTY:"\\gnosEmptyLbl{_}",TL_CORNER:"<",TR_CORNER:">",BL_CORNER:",",BR_CORNER:".",TOP_EDGE:"(",BOT_EDGE:")",LEFT_EDGE:"\\char91",RIGHT_EDGE:"]",CENTER:"+",CENTER_STARPOINT:"*",BSTONE:"@",WSTONE:"!",BSTONE_TRIANGLE:"S",WSTONE_TRIANGLE:"s",TRIANGLE:"3",BSTONE_SQUARE:"S",WSTONE_SQUARE:"s",SQUARE:"2",BSTONE_CIRCLE:"C",WSTONE_CIRCLE:"c",CIRCLE:"1",BSTONE_XMARK:"X",WSTONE_XMARK:"x",XMARK:"4",BSTONE_TEXTLABEL:"\\gnosOverlap{@}{\\color{white}%s}",WSTONE_TEXTLABEL:"\\gnosOverlap{!}{%s}",
TEXTLABEL:"\\gnosEmptyLbl{%s}",BSTONE_NUMLABEL_1_99:"{\\gnosb\\char%s}",BSTONE_NUMLABEL_100_199:"{\\gnosbi\\char%s}",BSTONE_NUMLABEL_200_299:"{\\gnosbii\\char%s}",BSTONE_NUMLABEL_300_399:"{\\gnosbiii\\char%s}",WSTONE_NUMLABEL_1_99:"{\\gnosw\\char%s}",WSTONE_NUMLABEL_100_199:"{\\gnoswi\\char%s}",WSTONE_NUMLABEL_200_299:"{\\gnoswii\\char%s}",WSTONE_NUMLABEL_300_399:"{\\gnoswiii\\char%s}",markOverlap:function(a,b){return"\\gnosOverlap{"+a+"}{\\gnos"+b+"}"}};
gpub.diagrams.igo={create:function(a,b){},renderInline:function(a){return a}};gpub.diagrams.pdf={create:function(a,b){},renderInline:function(a){return a}};gpub.api={};gpub.create=function(a,b){gpub._validateInputs(a,b);b=gpub.processOptions(b);var c=gpub.spec.create(a,b);return gpub.book.create(c,b)};
gpub._validateInputs=function(a,b){if(!a||!a.length||"array"!==glift.util.typeOf(a))throw Error("SGF array must be defined and non-empty");if(!glift)throw Error("GPub depends on Glift, but Glift was not defined");};
gpub.defaultOptions={outputFormat:"LATEX",bookPurpose:"GAME_COMMENTARY",boardRegion:"AUTO",diagramType:"GNOS",skipDiagrams:0,maxDiagrams:0,template:null,bookOptions:{init:"",title:"My Book",subtitle:null,publisher:"GPub",authors:["You!"],year:null,frontmatter:{copyright:null,epigraph:null,generateToc:!0,forward:null,preface:null,acknowledgements:null,introduction:null},backmatter:{glossary:null}}};gpub.bookPurpose={GAME_COMMENTARY:"GAME_COMMENTARY",PROBLEM_SET:"PROBLEM_SET",PROBLEM_BOOK:"PROBLEM_BOOK"};
gpub.outputFormat={LATEX:"LATEX",HTMLPAGE:"HTMLPAGE",ASCII:"ASCII"};gpub.processOptions=function(a){a||(a={});a=glift.util.simpleClone(a);var b=function(a,b){for(var c in b)void 0===a[c]&&(a[c]=b[c])},c=gpub.defaultOptions;b(a,c);b(a.bookOptions,c.bookOptions);b(a.bookOptions.frontmatter,c.bookOptions.frontmatter);if(0>a.skipDiagrams)throw Error("skipDiagrams cannot be less than 0");if(0>a.maxDiagrams)throw Error("maxDiagrams cannot be less than 0");return a};
