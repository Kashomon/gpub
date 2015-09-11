/*
 GPub: A Go publishing platform, built on Glift

 @copyright Josh Hoak
 @license MIT License (see LICENSE.txt)
 --------------------------------------
*/
(function(a){var b=b||a.gpub||{};a&&(a.gpub=b)})(window);gpub.global={version:"0.1.0",debug:!1};gpub.util={};gpub.util.Buffer=function(a){this._maxSize=a||1;this._buffer=[]};gpub.util.Buffer.prototype={add:function(a){null!=a&&this._buffer.push(a);return this},atCapacity:function(){return this._buffer.length>=this._maxSize},flush:function(){var a=this._buffer.slice(0);this._buffer=[];return a}};
gpub.markdown={rendererMethods:{code:function(a,b){},blockquote:function(a){},html:function(a){},heading:function(a,b){},hr:function(){},list:function(a,b){},listitem:function(a){},paragraph:function(a){},table:function(a,b){},tablerow:function(a){},tablecell:function(a,b){},strong:function(a){},em:function(a){},codespan:function(a){},br:function(){},del:function(a){},link:function(a,b,c){},image:function(a,b,c){}}};gpub.mustache={};
(function(){(function(a,b){b(a.Mustache={})})(this,function(a){function b(a){return"function"===typeof a}function c(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function e(b,e){function h(a){"string"===typeof a&&(a=a.split(C,2));if(!t(a)||2!==a.length)throw Error("Invalid tags: "+a);m=RegExp(c(a[0])+"\\s*");r=RegExp("\\s*"+c(a[1]));A=RegExp("\\s*"+c("}"+a[1]))}if(!b)return[];var y=[],k=[],v=[],z=!1,w=!1,m,r,A;h(e||a.tags);for(var n=new g(b),q,l,p,s;!n.eos();){q=n.pos;if(p=n.scanUntil(m)){s=
0;for(var u=p.length;s<u;++s)if(l=p.charAt(s),x.call(D,l)?w=!0:v.push(k.length),k.push(["text",l,q,q+1]),q+=1,"\n"===l){if(z&&!w)for(;v.length;)delete k[v.pop()];else v=[];w=z=!1}}if(!n.scan(m))break;z=!0;l=n.scan(E)||"name";n.scan(F);"="===l?(p=n.scanUntil(B),n.scan(B),n.scanUntil(r)):"{"===l?(p=n.scanUntil(A),n.scan(G),n.scanUntil(r),l="&"):p=n.scanUntil(r);if(!n.scan(r))throw Error("Unclosed tag at "+n.pos);s=[l,p,q,n.pos];k.push(s);if("#"===l||"^"===l)y.push(s);else if("/"===l){l=y.pop();if(!l)throw Error('Unopened section "'+
p+'" at '+q);if(l[1]!==p)throw Error('Unclosed section "'+l[1]+'" at '+q);}else"name"===l||"{"===l||"&"===l?w=!0:"="===l&&h(p)}if(l=y.pop())throw Error('Unclosed section "'+l[1]+'" at '+n.pos);return f(d(k))}function d(a){for(var b=[],c,d,e=0,f=a.length;e<f;++e)if(c=a[e])"text"===c[0]&&d&&"text"===d[0]?(d[1]+=c[1],d[3]=c[3]):(b.push(c),d=c);return b}function f(a){for(var b=[],c=b,d=[],e,f=0,h=a.length;f<h;++f)switch(e=a[f],e[0]){case "#":case "^":c.push(e);d.push(e);c=e[4]=[];break;case "/":c=d.pop();
c[5]=e[2];c=0<d.length?d[d.length-1][4]:b;break;default:c.push(e)}return b}function g(a){this.tail=this.string=a;this.pos=0}function h(a,b){this.view=null==a?{}:a;this.cache={".":this.view};this.parent=b}function k(){this.cache={}}var m=Object.prototype.toString,t=Array.isArray||function(a){return"[object Array]"===m.call(a)},x=RegExp.prototype.test,D=/\S/,H={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;"},F=/\s*/,C=/\s+/,B=/\s*=/,G=/\s*\}/,E=/#|\^|\/|>|\{|&|=|!/;g.prototype.eos=
function(){return""===this.tail};g.prototype.scan=function(a){a=this.tail.match(a);if(!a||0!==a.index)return"";a=a[0];this.tail=this.tail.substring(a.length);this.pos+=a.length;return a};g.prototype.scanUntil=function(a){a=this.tail.search(a);var b;switch(a){case -1:b=this.tail;this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,a),this.tail=this.tail.substring(a)}this.pos+=b.length;return b};h.prototype.push=function(a){return new h(a,this)};h.prototype.lookup=function(a){var c=
this.cache,d;if(a in c)d=c[a];else{for(var e=this,f,h;e;){if(0<a.indexOf("."))for(d=e.view,f=a.split("."),h=0;null!=d&&h<f.length;)d=d[f[h++]];else"object"==typeof e.view&&(d=e.view[a]);if(null!=d)break;e=e.parent}c[a]=d}b(d)&&(d=d.call(this.view));return d};k.prototype.clearCache=function(){this.cache={}};k.prototype.parse=function(a,b){var c=this.cache,d=c[a];null==d&&(d=c[a]=e(a,b));return d};k.prototype.render=function(a,b,c){var d=this.parse(a);b=b instanceof h?b:new h(b);return this.renderTokens(d,
b,c,a)};k.prototype.renderTokens=function(a,b,c,d){for(var e="",f,h,g,k=0,m=a.length;k<m;++k)g=void 0,f=a[k],h=f[0],"#"===h?g=this._renderSection(f,b,c,d):"^"===h?g=this._renderInverted(f,b,c,d):">"===h?g=this._renderPartial(f,b,c,d):"&"===h?g=this._unescapedValue(f,b):"name"===h?g=this._escapedValue(f,b):"text"===h&&(g=this._rawValue(f)),void 0!==g&&(e+=g);return e};k.prototype._renderSection=function(a,c,d,e){function f(a){return h.render(a,c,d)}var h=this,g="",k=c.lookup(a[1]);if(k){if(t(k))for(var m=
0,r=k.length;m<r;++m)g+=this.renderTokens(a[4],c.push(k[m]),d,e);else if("object"===typeof k||"string"===typeof k)g+=this.renderTokens(a[4],c.push(k),d,e);else if(b(k)){if("string"!==typeof e)throw Error("Cannot use higher-order sections without the original template");k=k.call(c.view,e.slice(a[3],a[5]),f);null!=k&&(g+=k)}else g+=this.renderTokens(a[4],c,d,e);return g}};k.prototype._renderInverted=function(a,b,c,d){var e=b.lookup(a[1]);if(!e||t(e)&&0===e.length)return this.renderTokens(a[4],b,c,d)};
k.prototype._renderPartial=function(a,c,d){if(d&&(a=b(d)?d(a[1]):d[a[1]],null!=a))return this.renderTokens(this.parse(a),c,d,a)};k.prototype._unescapedValue=function(a,b){var c=b.lookup(a[1]);if(null!=c)return c};k.prototype._escapedValue=function(b,c){var d=c.lookup(b[1]);if(null!=d)return a.escape(d)};k.prototype._rawValue=function(a){return a[1]};a.name="mustache.js";a.version="1.1.0";a.tags=["{{","}}"];var u=new k;a.clearCache=function(){return u.clearCache()};a.parse=function(a,b){return u.parse(a,
b)};a.render=function(a,b,c){return u.render(a,b,c)};a.to_html=function(c,d,e,f){c=a.render(c,d,e);if(b(f))f(c);else return c};a.escape=function(a){return String(a).replace(/[&<>"'\/]/g,function(a){return H[a]})};a.Scanner=g;a.Context=h;a.Writer=k})}).call(gpub);gpub.book={create:function(a,b){this._validate(a);return this.generator(b.outputFormat,b).generate(a)},_validate:function(a){if(1>a.sgfCollection.length)throw Error("sgfCollection must be non-empty");}};
gpub.book.newDiagramContext=function(a,b,c,e){return{contextType:a,isChapter:b,pdfx1a:c,debug:e}};gpub.book.contextType={NONE:"NONE",DESCRIPTION:"DESCRIPTION",EXAMPLE:"EXAMPLE",VARIATIONS:"VARIATIONS",PROBLEM:"PROBLEM"};gpub.book._headingRegex=/(^|\n)#+\s*\w+/;
gpub.book.getDiagramContext=function(a,b,c,e,d){var f=gpub.book.contextType,g=glift.enums.widgetTypes;c=c.widgetType;a.newTreeRef();a=f.NONE;a=b.comment();var h=gpub.book._headingRegex.test(a);a=c===g.STANDARD_PROBLEM||c===g.STANDARD_PROBLEM?f.PROBLEM:c===g.GAME_VIEWER||c===g.REDUCED_GAME_VIEWER?f.VARIATIONS:c===g.EXAMPLE&&1===b.endingMoveNum()?glift.obj.isEmpty(b.stoneMap())?f.DESCRIPTION:f.EXAMPLE:f.EXAMPLE;return gpub.book.newDiagramContext(a,h,e,d)};
gpub.book.generator=function(a,b){if(!a)throw Error("No output format defined");if(!b)throw Error("Options not defined");var c=gpub.book[a.toLowerCase()];if(!c)throw Error("No package defined for: "+a);if(!c.generator)throw Error("No generator impl for: "+a);var e=new gpub.book._Generator,d;for(d in c.generator)d&&c.generator[d]&&(e[d]=c.generator[d].bind(e));if(!e.defaultOptions||"function"!==glift.util.typeOf(e.defaultOptions))throw Error("No default options-function defined for type: "+a);return e._initOptions(b)};
gpub.book.Gen={generate:function(a){},defaultTemplate:function(){},defaultOptions:function(){}};gpub.book._Generator=function(){this._opts={};this._parseCache={}};
gpub.book._Generator.prototype={view:function(a){if(!a)throw Error("Spec must be defined. Was: "+a);var b=glift.util.simpleClone(this._opts.bookOptions);a=this.manager(a);a=a.loadSgfStringSync(a.getSgfObj(0));var c=this.getMovetree(a);a=this.defaultOptions?this.defaultOptions().bookOptions||{}:{};var c=c.metadata(),e=gpub.defaultOptions.bookOptions;if(c)for(var d in c)void 0===c[d]||void 0!==b[d]&&JSON.stringify(b[d])!==JSON.stringify(e[d])||(b[d]=c[d]);if(a)for(d in a)void 0!==a[d]&&void 0===b[d]&&
(b[d]=a[d]);return b},manager:function(a){if(!a)throw Error("Spec not defined");return glift.widgets.createNoDraw(a)},forEachSgf:function(a,b){for(var c=this.manager(a),e=this.options(),d=e.maxDiagrams?e.maxDiagrams:1E6,f=e.regionRestrictions,e=e.skipDiagrams;e<c.sgfCollection.length&&e<d;e++){var g=c.loadSgfStringSync(c.getSgfObj(e)),h=glift.rules.treepath.parseFragment(g.nextMovesPath),k=this.getSgfId(g),m=this.getMovetree(g,k),t=this._shouldPerformAutoCropOnVar(m,h),x=glift.flattener.flatten(m,
{nextMovesTreepath:h,boardRegion:g.boardRegion,autoBoxCropOnNextMoves:t,regionRestrictions:f}),h=this._getDebugCtx(m,h,g.boardRegion,t,f),g=gpub.book.getDiagramContext(m,x,g,this.usePdfx1a(),h);b(e,m,x,g,k)}},getSgfId:function(a){var b=a.alias;if(b)return b;if(a=this._sgfSignature(a.sgfString))return a;throw Error("SGF Object contains neither alias nor an SGF String. Cannot generate an SGF Id.");},getMovetree:function(a,b){this._parseCache[b]||(this._parseCache[b]=glift.rules.movetree.getFromSgf(a.sgfString));
var c=glift.rules.treepath.parsePath(a.initialPosition);return this._parseCache[b].getTreeFromRoot(c)},template:function(){var a=this._opts;return a.template?a.template:this.defaultTemplate()},options:function(){return this._opts},usePdfx1a:function(){return this._opts.pdfx1a},_getDebugCtx:function(a,b,c,e,d){return gpub.global.debug?{initialPosition:glift.rules.treepath.toInitPathString(a.treepathToHere()),nextMoves:glift.rules.treepath.toFragmentString(b),boardRegion:c,autoBoxCrop:e,regionRestrictions:d}:
{}},_shouldPerformAutoCropOnVar:function(a,b){var c=this.options().autoBoxCropOnVariation;b=b||[];c&&a.onMainline()&&(c=0==b.length?!1:0<b[0]);return c},_initOptions:function(a){if(!a)throw Error("Opts not defined");this._opts=glift.util.simpleClone(a||{});a={};this.defaultOptions&&(a=this.defaultOptions());if(!a)throw Error("Default options not defined");for(var b in a)a[b]&&!this._opts[b]&&(this._opts[b]=a[b]);return this},_sgfSignature:function(a){if(void 0===a)throw Error("Cannot create signature. SGF is undefined!");
if("string"!==typeof a)throw Error("Improper type for SGF: "+a);return 100>=a.length?a:a.substring(0,50)+a.substring(a.length-50,a.length)}};gpub.book.page={ptToIn:function(a){return 1/72*a},ptToMm:function(a){return 0.3528*a},mmToPt:function(a){return 1*a/0.3528},inToPt:function(a){return 72*a},inToMm:function(a){return 25.4*a},mmToIn:function(a){return 1/25.4*a}};gpub.book.page.type={A4:"A4",LETTER:"LETTER",OCTAVO:"OCTAVO",NOTECARD:"NOTECARD",EIGHT_TEN:"EIGHT_TEN",FIVEFIVE_EIGHTFIVE:"FIVEFIVE_EIGHTFIVE"};
gpub.book.page.size={A4:{heightMm:297,widthMm:210,widthIn:8.268,heightIn:11.693},LETTER:{heightMm:280,widthMm:210,heightIn:11,widthIn:8.5},OCTAVO:{heightMm:229,widthMm:152,heightIn:9,widthIn:6},NOTECARD:{heightMm:178,widthMm:127,heightIn:7,widthIn:5},EIGHT_TEN:{heightMm:254,widthMm:203,heightIn:10,widthIn:8},FIVEFIVE_EIGHTFIVE:{heightMm:216,widthMm:140,heightIn:8.5,widthIn:5.3}};gpub.book.ascii={};
gpub.book.ascii.generator={generate:function(a){var b=this.view(a),c=this.options(),e=[];this.forEachSgf(a,function(a,b,g){a=gpub.diagrams.create(b,c.diagramType);gpub.diagrams.createLabel(b);e.push(a)}.bind(this));b.content=e.join("\n");return gpub.Mustache.render(this.template(),b)},defaultTemplate:function(){return gpub.book.ascii._defaultTemplate},defaultOptions:function(a){return{diagramType:gpub.diagrams.diagramType.SENSEIS_ASCII}}};gpub.book.ascii._defaultTemplate="Title: {{title}}\nAuthors: {{#authors}}{{.}}, {{/authors}}\n------------------------------------------------------------------------------\n{{content}}";
gpub.book.htmlpage={};gpub.book.htmlpage._template='<!DOCTYPE html>\n<html>\n  <head>\n    <title> {{title}} </title>\n  <style>\n    * {\n      margin: 0;\n      padding: 0;\n    }\n    #glift_display1 {\n      height:500px;\n      width:100%;\n      position:relative;\n    }\n  </style>\n  <body>\n    <div id="wrap" style="position:relative;">\n      <div id="glift_display1"></div>\n    </div>\n    <script type="text/javascript">\n      var gliftMgr = glift.create({{content}});\n    \x3c/script>\n  </body>\n<html>';
gpub.book.htmlpage.generator={generate:function(a,b){},defaultTemplate:function(){return gpub.book.htmlBook._template},defaultOptions:function(){return{}}};gpub.book.latex={};
gpub.book.latex.context={typeset:function(a,b,c,e,d,f,g){comment=e.comment()||"";label=gpub.diagrams.createLabel(e);var h=comment?gpub.book.latex.renderMarkdown(comment):{preamble:"",text:""};h.text=gpub.diagrams.renderInline(a,h.text);var k=gpub.book.latex.context._createLatexLabel(c,e,g);a=gpub.book.latex.context._processLabel(a,label,c,e,g);(e=gpub.book.latex.context.rendering[c.contextType])||(e=gpub.book.latex.context.rendering[DESCRIPTION]);if(!d)throw Error("Intersection size in points not defined. Was"+
d);h.text+=gpub.book.latex.context._debugInfo(c.debug);return e(b,c,h,a,d,f,k)},_createLatexLabel:function(a,b,c){return b.isOnMainPath()&&c&&!a.pdfx1a?"\\phantomsection\n\\label{"+c+"}":""},_debugInfo:function(a){if(!gpub.global.debug)return"";var b=["","{\\scriptsize"];a.initialPosition&&b.push("ip:"+a.initialPosition);a.nextMoves&&b.push("nm:"+a.nextMoves);if(a.boardRegion||a.autoBoxCrop||a.regionRestrictions){var c=[];a.boardRegion&&c.push("inrg:"+a.boardRegion);a.autoBoxCrop&&c.push("boxcp:"+
a.autoBoxCrop);a.regionRestrictions&&c.push("regres:"+JSON.stringify(a.regionRestrictions));b.push(c.join(";"))}b.push("}");return b.join("\n")},_processLabel:function(a,b,c,e,d){c="\\gofigure";var f=e.mainlineMove();if(!e.isOnMainPath()&&null!==f){c="\\centerline{\\govariation";e=e.mainlineMoveNum();var g=null,g="BLACK"===f.color?"Black":"White";f&&(d&&(c+="\\hyperref["+d+"]{"),c=c+"\\textit{from} "+(g+" "+e+""),d&&(c+="}"));c+="}"}if(b)for(b=b.split("\n"),d=0;d<b.length;d++)c=0==d?c+("\n\\subtext{"+
b[d]+"}"):c+("\n\n\\subtext{"+b[d]+"}");return c=gpub.diagrams.renderInline(a,c)},rendering:{EXAMPLE:function(a,b,c,e,d,f,g){if(!f)throw Error("Page size must be defined. Was:"+f);b=gpub.book.page.inToPt(f.widthIn);return c.preamble?[c.preamble,g,"{\\centering",a,"}",e,"",c.text,"\\vfill"].join("\n"):["\n\\rule{\\textwidth}{0.5pt}\n","\\begin{minipage}[t]{"+20*d+"pt}",g,a,e,"\\end{minipage}","\\begin{minipage}[t]{"+(0.85*b-21*d)+"pt}","\\setlength{\\parskip}{0.5em}",c.text,"\\end{minipage}\n\\vfill"].join("\n")},
DESCRIPTION:function(a,b,c,e,d,f,g){return[c.preamble,c.text,"\\vfill"].join("\n")},PROBLEM:function(a,b,c,e,d,f,g){}}};
gpub.book.latex.generator={generate:function(a){var b=this.view(a),c=this.options(),e={size:c.gnosFontSize},d=new gpub.book.latex.Paging(c.pageSize,e.size);b.init=[gpub.diagrams.getInit(c.diagramType,"LATEX"),d.pagePreamble()].join("\n");this.usePdfx1a()&&(b.pdfx1a=this.usePdfx1a(),b.pdfxHeader=gpub.book.latex.pdfx.header(b.title,c.colorProfileFilePath,c.pageSize));this.forEachSgf(a,function(a,b,h,k,m){a=gpub.diagrams.create(h,c.diagramType,e);d.addDiagram(c.diagramType,a,k,h,m)}.bind(this));b.content=
d.flushAll();this._processFrontmatter(b.frontmatter);return gpub.Mustache.render(this.template(),b)},_processFrontmatter:function(a){var b=function(a){return a.replace(/([${%}&#\\])/g,function(a,b){return"\\"+b})},c;for(c in a)if(a[c]&&"copyright"!==c&&"generateToc"!==c)a[c]=gpub.book.latex.renderMarkdown(a[c]);else if("copyright"===c)for(var e in a.copyright){var d=a.copyright[e];if("addressLines"===e){var f=(a.copyright.publisher?[a.copyright.publisher]:[]).concat(d);a.copyright.constructedAddress=
f.map(b).join("\n\\\\")}else if("printingRunNum"===e&&"number"===glift.util.typeOf(d)){var f=[],g=10;for(5>g-d&&(g=d+5);d<=g;d++)f.push(d);a.copyright.constructedPrintingRun=f.join(" ")}else"string"===glift.util.typeOf(d)&&(a.copyright[e]=b(d))}},defaultTemplate:function(){return gpub.book.latex.defaultTemplate},defaultOptions:function(){return gpub.book.latex.options()}};gpub.book.latex.defaultTemplate="{{=<% %>=}}\n\\documentclass[letterpaper,12pt]{memoir}\n\\usepackage{color}\n\\usepackage{wrapfig}\n\\usepackage{setspace}\n\\usepackage[cmyk]{xcolor}\n\\usepackage{graphicx}\n<%^pdfx1a%>\n\\usepackage{hyperref}\n<%/pdfx1a%>\n\\usepackage{xmpincl}\n<%#frontmatter.copyright.showPermanenceOfPaper%>\n\\usepackage{tikz}\n<%/frontmatter.copyright.showPermanenceOfPaper%>\n\\usepackage[margin=1in]{geometry}\n\n<%#pdfx1a%>\n%%% PDF/X-1a Header\n<%&pdfxHeader%>\n\n<%/pdfx1a%>\n%%% Define any extra packages %%%\n<%init%>\n\n\\setlength{\\parskip}{0.5em}\n\\setlength{\\parindent}{0pt}\n\n%%% Diagram Figure defs.\n% Must expose two commands\n%  \\gofigure  (mainline diagrams)\n%  \\godiagram (variation diagrams)\n% Mainline Diagrams. reset at parts\n\\newcounter{GoFigure}[part]\n\n\\newcommand{\\gofigure}{%\n \\stepcounter{GoFigure}\n \\centerline{\\textit{Diagram \\arabic{GoFigure}}}\n}\n% Variation Diagrams. reset at parts.\n\\newcounter{GoVariation}[part]\n\n\\newcommand{\\govariation}{%\n \\stepcounter{GoVariation}\n \\textit{Variation \\arabic{GoVariation}}\n}\n\n\\newcommand{\\subtext}[1]{\\centerline{\\textit{#1}}}\n\n%%% Define the main title %%%\n\\definecolor{light-gray}{gray}{0.55}\n\\newcommand*{\\mainBookTitle}{\\begingroup\n  \\raggedleft\n  <%#authors%>\n     {\\Large{<%.%>}} \\\\\n     \\vspace*{1 em}\n  <%/authors%>\n  \\vspace*{5 em}\n  {\\textcolor{light-gray}{\\Huge{<%title%>}}}\\\\\n  \\vspace*{\\baselineskip}\n  <%#subtitle%>\n  {\\small \\bfseries <%subtitle%> }\\par\n  <%/subtitle%>\n  \\vfill\n  <%#publisher%>\n  {\\Large{<%publisher%>}}\\par\n  \\vspace*{2\\baselineskip}\n  <%/publisher%>\n  <%#year%>\n  {\\large{<%year%>}}\\par\n  \\vspace*{2\\baselineskip}\n  <%/year%>\n\\endgroup}\n %%% Chapter settings %%%\n\\chapterstyle{madsen}\n\\openany\n\\makepagestyle{headings}\n\\setlength{\\headwidth}{\\textwidth}\n\\makeevenhead{headings}{\\thepage}{}{\\slshape\\leftmark}\n\\makeoddhead{headings}{\\slshape\\rightmark}{}{\\thepage}\n\\makerunningwidth{headings}[\\textwidth]{\\textwidth}\n\\pagestyle{companion}\n\\makerunningwidth{companion}{\\headwidth}\n\n\\begin{document}\n%%% The Frontmatter. %%%\n\\begin{titlingpage}\n\\mainBookTitle\n\\end{titlingpage}\n\n<%#frontmatter.copyright%>\n% Copyright Page\n\\begin{titlingpage}\n\\begin{vplace}[0.7]\n\\footnotesize{\n\\textcopyright\\ <%frontmatter.copyright.publishYear%> by <%frontmatter.copyright.publisher%> \\\\\n<%frontmatter.copyright.license%> Published <%frontmatter.copyright.publishYear%> \\\\\nFirst edition published <%frontmatter.copyright.firstEditionYear%>.\\\\\n\\\\\n<%frontmatter.copyright.constructedAddress%>\\\\\n\\\\\n<%#frontmatter.copyright.constructedPrintingRun%>\n<%frontmatter.copyright.constructedPrintingRun%>\\\\\n<%/frontmatter.copyright.constructedPrintingRun%>\n\\\\\n<%#frontmatter.copyright.isbn%>\nISBN: <%frontmatter.copyright.isbn%> \\\\\n<%/frontmatter.copyright.isbn%>\n<%#frontmatter.copyright.issn%>\nISSN: <%frontmatter.copyright.issn%> \\\\\n<%/frontmatter.copyright.issn%>\n\\\\\n\\\\\n<%#frontmatter.copyright.showPermanenceOfPaper%>\n\\tikz\\node[circle,draw,inner sep=.1ex] {\\tiny{$\\infty$}};\nThis paper meets or exceeds the requirements\nof \\textsc{ansi/niso z39.48-1992} \\\\\n(Permanence of Paper). \\\\\n<%/frontmatter.copyright.showPermanenceOfPaper%>\n\\\\\n\\\\\n\\\\\nCreated using LaTeX generated by GPub.js.\n}\\\\\n\\end{vplace}\n\\end{titlingpage}\n<%/frontmatter.copyright%>\n\n\\newpage\n\\frontmatter\n\n<%#frontmatter.generateToc%>\n\\tableofcontents*\n<%/frontmatter.generateToc%>\n\n<%#frontmatter.foreward%>\n\\chapter{Foreward}\n<%frontmatter.foreward.text%>\n<%/frontmatter.foreward%>\n\n<%#frontmatter.preface%>\n\\chapter{Preface}\n<%frontmatter.preface.text%>\n<%/frontmatter.preface%>\n\n<%#frontmatter.acknowledgements%>\n\\chapter{Acknowledgments}\n<%frontmatter.acknowledgements.text%>\n<%/frontmatter.acknowledgements%>\n\n<%#frontmatter.introduction%>\n\\chapter{Introduction}\n<%frontmatter.introduction.text%>\n<%/frontmatter.introduction%>\n\n%%% The content. %%%\n\\mainmatter\n<%&content%>\n\n\\end{document}";
gpub.book.latex.renderer=function(){if(gpub.book.latex._rendererInstance)return gpub.book.latex._rendererInstance;var a=new glift.marked.Renderer,b;for(b in gpub.book.latex.markdown)a[b]=gpub.book.latex.markdown[b].bind(a);a._preamble=[];return a};gpub.book.latex.renderMarkdown=function(a){var b=gpub.book.latex.renderer();a=gpub.book.latex.sanitize(a);a=glift.marked(a,{renderer:b,silent:!0});a=a.replace(/#/g,"\\#");return{preamble:b.extractPreamble(),text:a}};
gpub.book.latex.markdown={extractPreamble:function(){return this._preamble.join("\n")},heading:function(a,b){1===b?this._preamble.push("\\book{"+a+"}"):2===b?this._preamble.push("\\part{"+a+"}"):3===b?this._preamble.push("\\chapter{"+a+"}"):4===b?this._preamble.push("\\section{"+a+"}"):this._preamble.push("\\section*{"+a+"}");return""},hr:function(){return"\\hrule"},list:function(a,b){return ordererd?["\\begin{enumerate}",a,"\\end{enumerate}"].join("\n"):["\\begin{itemize}",a,"\\end{itemize}"].join("\n")},
listitem:function(a){return"\\item "+a},paragraph:function(a){return a+"\n\n"},strong:function(a){return"\\textbf{"+a+"}"},em:function(a){return"\\textit{"+a+"}"},br:function(){return"\\newline"},link:function(a,b,c){return a},code:function(a,b){return a},blockquote:function(a){return a},html:function(a){return a},codespan:function(a){return a},del:function(a){return a}};gpub.book.latex.options=function(){return{diagramType:gpub.diagrams.diagramType.GNOS,bookOptions:{}}};
gpub.book.latex.Paging=function(a,b,c,e){this.buffer=[];this.pageSize=a||gpub.book.page.type.LETTER;if(!gpub.book.page.type[this.pageSize]||!gpub.book.page.size[this.pageSize])throw Error("Unknown page size: "+this.pageSize);this.margins=c||gpub.book.latex.defaultMargins;this.intSize=b;this.bleed=e||0;this.currentPage=null;this.pages=[];this._diagramRefMap={}};
gpub.book.latex.Paging.prototype={addDiagram:function(a,b,c,e,d){this._populateRefMap(e,d,c);d=this._getReference(e,c);a=gpub.book.latex.context.typeset(a,b,c,e,this.intSize,gpub.book.page.size[this.pageSize],d);this.buffer.push(a)},_populateRefMap:function(a,b,c){b=gpub.book.latex.sanitize(b);if(c.contextType===gpub.book.contextType.EXAMPLE&&a.isOnMainPath())for(b=b+":mainmove-"+a.startingMoveNum(),c=a.startingMoveNum();c<=a.endingMoveNum();c++)this._diagramRefMap[c]=b},_getReference:function(a,
b){if(b.pdfx1a||b.contextType!==gpub.book.contextType.EXAMPLE)return null;var c=a.mainlineMove();return a.isOnMainPath()||null===c?a.isOnMainPath()?this._diagramRefMap[a.startingMoveNum()]||null:null:this._diagramRefMap[a.mainlineMoveNum()]||null},flushAll:function(){return this.buffer.join("\n")},pagePreamble:function(){var a=gpub.book.page.size[this.pageSize];return["%%% Page Settings Preamble %%%","\\setstocksize{"+a.heightIn+"in}{"+a.widthIn+"in}","\\settrimmedsize{\\stockheight}{\\stockwidth}{*}\n\\settypeblocksize{0.85\\stockheight}{0.85\\stockwidth}{*}\n\\setulmargins{*}{*}{1.618}\n\\setlrmargins{*}{*}{1}\n\\setheaderspaces{*}{*}{1.618}\n\\checkandfixthelayout\n%%% End Page Settings Preamble %%%"].join("\n")},
_pageSizeSetting:function(){var a=gpub.book.page.size[this.pageSize];return"\\setstocksize{"+a.heightIn+"in}{"+a.widthIn+"in}"},_marginSetting:function(){return"\\setlrmarginsandblock{"+this.margins+"in}{"+this.margins+"in}{*}"},_trimSetting:function(){return"\\settrims{"+this.bleed+"in}{"+this.bleed+"in}"},_calculateUnits:function(){var a=initPt/72,b=gpub.book.page.sizeMapping[this.pageSize];return{cols:(b.widthIn-2*this.margins)/a,rows:(b.heightIn-2*this.margins)/a}}};
gpub.book.latex.defaultMargins=0.5;gpub.book.latex.standardBleed=0.125;
gpub.book.latex.pdfx={compressLevel:"\\pdfobjcompresslevel=0",pdfMinorVersion:"\\pdfminorversion=3",outputIntent:function(a){return["\\immediate\\pdfobj stream attr{/N 4} file{"+(a||"ISOcoated_v2_300_eci.icc")+"}","\\pdfcatalog{%","/OutputIntents [ <<","/Type /OutputIntent","/S/GTS_PDFX","/DestOutputProfile \\the\\pdflastobj\\space 0 R","/OutputConditionIdentifier (ISO Coated v2 300 (ECI))","/Info(ISO Coated v2 300 (ECI))","/RegistryName (http://www.color.org/)",">> ]","}"]},pdfInfo:function(a){return["\\pdfinfo{%",
"/Title("+a+")%","/GTS_PDFXVersion (PDF/X-1:2001)%","/GTS_PDFXConformance (PDF/X-1a:2001)%","}"]},pageBoxes:function(a){var b=gpub.book.page.size[a];a=gpub.book.page.mmToPt(b.heightMm);b=gpub.book.page.mmToPt(b.widthMm);return["\\pdfpageattr{/MediaBox[0 0 "+b+" "+a+"]","              /BleedBox[0 0 "+b+" "+a+"]","              /TrimBox[0 0 "+b+" "+a+"]}"]},header:function(a,b,c){var e=gpub.book.latex.pdfx;if(!b)throw Error("Color profile file path not specified:"+b);if(!c||!gpub.book.page.size[c])throw Error("Pagesize not defined or invalid:"+
c);return[e.pdfMinorVersion,e.compressLevel].concat(e.pageBoxes(c)).concat(e.pdfInfo(a)).concat(e.outputIntent(b)).join("\n")}};gpub.book.latex.sanitize=function(a){return a.replace(/\\/g,"\\textbackslash").replace(/[$}{%&]/g,function(a){return"\\"+a})};
gpub.spec={_defaultSpec:{divId:null,sgfCollection:[],sgfMapping:{},sgfDefaults:{},metadata:{}},_getSpecProcessor:function(a){switch(a){case "GAME_COMMENTARY":return gpub.spec.gameBook;case "PROBLEM_SET":return gpub.spec.problemSet;case "PROBLEM_BOOK":return gpub.spec.problemBook;default:throw Error("Unsupported book purpose: "+a);}},create:function(a,b){var c=glift.util.simpleClone(gpub.spec._defaultSpec);if(!b.bookPurpose)throw Error("Book Purpose must be defined");var e=gpub.spec._getSpecProcessor(b.bookPurpose);
c.sgfDefaults=glift.util.simpleClone(glift.widgets.options.baseOptions.sgfDefaults);e.setHeaderInfo(c);for(var d=0;a&&d<a.length;d++){var f=a[d],g=glift.parse.fromString(f),h="sgf:"+d;g.properties().contains("GN")&&(h=g.properties().getOneValue("GN")+":"+d);c.sgfMapping[h]||(c.sgfMapping[h]=f);c.sgfCollection=c.sgfCollection.concat(e.processOneSgf(g,h,b))}c.metadata.bookPurpose=b.bookPurpose;return c},_createExample:function(a,b,c,e){if(!a)throw Error("No SGF Alias");if(!b)throw Error("No Initial Position");
if(!c)throw Error("No Next Moves");if(!glift.enums.boardRegions[e])throw Error("Unknown board region: "+e);var d=glift.rules.treepath.toInitPathString,f=glift.rules.treepath.toFragmentString;return{alias:a,initialPosition:d(b),nextMovesPath:f(c),boardRegion:e,widgetType:"EXAMPLE"}}};
gpub.spec.gameBook={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.EXAMPLE;return a},processOneSgf:function(a,b,c){for(var e=[],d=[],f=a.node();f;){if(!a.properties().getComment()&&0<f.numChildren())f=a.node(),d=d.concat(gpub.spec.gameBook.variationPaths(a));else{var g=glift.rules.treepath.findNextMovesPath(a);e.push(gpub.spec._createExample(b,g.treepath,g.nextMoves,c.boardRegion));d=d.concat(gpub.spec.gameBook.variationPaths(a));for(g=0;g<d.length;g++){var h=a.getTreeFromRoot(d[g]),
h=glift.rules.treepath.findNextMovesPath(h);e.push(gpub.spec._createExample(b,h.treepath,h.nextMoves,c.boardRegion))}d=[]}f=f.getChild(0);a.moveDown()}return e},variationPaths:function(a){a=a.newTreeRef();var b=[];if(!a.node().getParent())return b;a.moveUp();for(var c=1;c<a.node().numChildren();c++){var e=a.newTreeRef();e.moveDown(c);e.recurse(function(a){a.properties().getOneValue("C")&&b.push(a.treepathToHere())})}return b}};
gpub.spec.problemBook={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.EXAMPLE;return a},processOneSgf:function(a,b,c){},processProblemDef:function(a,b,c){},processCorrect:function(a,b,c){},processIncorrect:function(a,b,c){}};gpub.spec.problemSet={setHeaderInfo:function(a,b){a.sgfDefaults.widgetType=glift.enums.widgetTypes.STANDARD_PROBLEM;return a},processOneSgf:function(a,b,c){b={alias:b,boardRegion:c.boardRegion};a.getTreeFromRoot().node().numChildren();return[b]}};
gpub.spec.processor={setHeaderInfo:function(a,b){},processOneSgf:function(a,b,c){}};
gpub.diagrams={diagramType:{ASCII:"ASCII",SENSEIS_ASCII:"SENSEIS_ASCII",GOOE:"GOOE",GNOS:"GNOS",IGO:"IGO",PDF:"PDF",SVG:"SVG"},create:function(a,b,c){c=c||{};return this._getPackage(b).create(a,c)},renderInline:function(a,b){return this._getPackage(a).renderInline(b)},_getPackage:function(a){if(!a||!gpub.diagrams.diagramType[a])throw Error("Unknown diagram type: "+a);var b=glift.enums.toCamelCase(a),b=gpub.diagrams[b];if(!b)throw Error("No package for diagram type: "+a);if(!b.create)throw Error("No create method for diagram type: "+
a);return b},getInit:function(a,b){var c=this._getPackage(a);if(!c.init||"object"!=typeof c.init)throw Error("No init obj");return(c=c.init[b])?"function"===typeof c?c():"string"===typeof c?c:"":""},flatten:function(a,b,c,e){b=b||[];c=c||[];a=glift.rules.movetree.getFromSgf(a,b);return glift.flattener.flatten(a,{nextMovesTreepath:c,boardRegion:e})},createLabel:function(a){return gpub.diagrams._constructLabel(collisions=a.collisions(),isOnMainline=a.isOnMainPath(),startNum=a.startingMoveNum(),endNum=
a.endingMoveNum())},_constructLabel:function(a,b,c,e){var d="";b&&(b=[c],c!==e&&b.push(e),d+="("+(1<b.length?"Moves: ":"Move: ")+b.join("-")+")");if(null==a||0===a.length)return d;c={};e=[];for(b=0;b<a.length;b++){var f=a[b];c[f.label]||(e.push(f.label),c[f.label]=[]);c[f.label].push(f)}a=[];for(var g=0;g<e.length;g++){var h=e[g],k=c[h],m=[];for(b=0;b<k.length;b++)f=k[b],m.push((f.color===glift.enums.states.BLACK?"Black":"White")+" "+f.mvnum);b=m.join(", ")+" at "+h;a.push(b)}d&&(d+="\n");return d+=
a.join(",\n")+"."}};gpub.diagrams.creator={create:function(a,b){},renderInline:function(a,b){}};
gpub.diagrams.senseisAscii={create:function(a,b){for(var c=glift.flattener.symbolStr,e=gpub.diagrams.senseisAscii.symbolMap,d=[],f=0,g=a.board().transform(function(a,b,d){b=c(a.base());a.textLabel()&&a.mark()&&a.mark()===glift.flattener.symbols.TEXTLABEL?a.textLabel():a.mark()&&a.stone()?b=c(a.stone())+"_"+c(a.mark()):a.stone()?b=c(a.stone()):a.mark()&&(b=c(a.mark()));(a=e[b])||console.log("Could not find symbol str for : "+b);return a}).boardArray();f<g.length;f++)d.push(g[f].join(" "));return d.join("\n")},
renderInline:function(a){return a}};gpub.diagrams.senseisAscii.symbolMap={EMPTY:"_",TL_CORNER:".",TR_CORNER:".",BL_CORNER:".",BR_CORNER:".",TOP_EDGE:".",BOT_EDGE:".",LEFT_EDGE:".",RIGHT_EDGE:".",CENTER:".",CENTER_STARPOINT:"+",BSTONE:"X",WSTONE:"O",BSTONE_TRIANGLE:"Y",WSTONE_TRIANGLE:"Q",TRIANGLE:"T",BSTONE_SQUARE:"#",WSTONE_SQUARE:"@",SQUARE:"S",BSTONE_CIRCLE:"B",WSTONE_CIRCLE:"W",CIRCLE:"C",BSTONE_XMARK:"Z",WSTONE_XMARK:"P",XMARK:"M",BSTONE_TEXTLABEL:"%s",WSTONE_TEXTLABEL:"%s",TEXTLABEL:"%s"};
gpub.diagrams.gooe={sizes:{NORMAL:"NORMAL",LARGE:"LARGE"},create:function(a,b){return gpub.diagrams.gooe.gooeStringArray(a,b).join("\n")},renderInline:function(a){return a},gooeStringArray:function(a,b){for(var c="LARGE"===b?"{\\bgoo":"{\\goo",e=gpub.diagrams.gooe.gooeBoard(a,b),c=[c],d=0,e=e.boardArray();d<e.length;d++)c.push(e[d].join(""));c.push("}");return c},gooeBoard:function(a,b){var c=glift.flattener.symbolStr,e=gpub.diagrams.gooe.symbolMap;return a.board().transform(function(a,f,g){f=c(a.base());
a.mark()&&a.stone()?f=c(a.stone())+"_"+c(a.mark()):a.stone()?f=c(a.stone()):a.mark()&&(f=c(a.mark()));g=f+"_"+b;var h="",h=e[g]?e[g]:e[f]?e[f]:e.EMPTY;a.textLabel()&&(h=h.replace("%s",a.textLabel()));return h})}};
gpub.diagrams.gooe.init={LATEX:function(){return"\\usepackage{gooemacs}\n \\\\\n"+gpub.diagrams.gooe.init.extraDefs()},defs:{sizeDefs:"% Size definitions;\\newdimen\\bigRaise;\\bigRaise=4.3pt;\\newdimen\\smallRaise;\\smallRaise=3.5pt;\\newdimen\\inlineRaise;\\inlineRaise=3.5pt".split(";"),bigBoardDefs:["% Big-sized board defs","\\def\\eLblBig#1{\\leavevmode\\hbox to \\goIntWd{\\hss\\raise\\bigRaise\\hbox{\\tenpointeleven{#1}}\\hss}}","\\def\\goWsLblBig#1{\\leavevmode\\setbox0=\\hbox{\\0??!}\\rlap{\\0??!}\\raise\\bigRaise\\hbox to \\wd0{\\hss\\tenpointeleven{#1}\\hss}}",
"\\def\\goBsLblBig#1{\\leavevmode\\setbox0=\\hbox{\\0??@}\\rlap{\\0??@}\\raise\\bigRaise\\hbox to \\wd0{\\hss\\color{white}\\tenpointeleven{#1}\\color{white}\\hss}}"],normalBoardDefs:["% Normal-sized board defs","\\def\\eLbl#1{\\leavevmode\\hbox to \\goIntWd{\\hss\\raise\\smallRaise\\hbox{\\tenpoint{#1}}\\hss}}","\\def\\goWsLbl#1{\\leavevmode\\setbox0=\\hbox{\\0??!}\\rlap{\\0??!}\\raise\\smallRaise\\hbox to \\wd0{\\hss\\eightpointnine{#1}\\hss}}","\\def\\goBsLbl#1{\\leavevmode\\setbox0=\\hbox{\\0??@}\\rlap{\\0??@}\\raise\\smallRaise\\hbox to \\wd0{\\hss\\color{white}\\eightpointnine{#1}\\color{white}\\hss}}"]},
extraDefs:function(a){var b=gpub.diagrams.gooe.init.defs;a=a||"cmss";return["% Gooe font definitions","\\font\\tenpoint="+a+"10","\\font\\tenpointeleven="+a+"10 at 11pt","\\font\\eightpoint="+a+"8","\\font\\eightpointnine="+a+"8 at 9pt"].concat(b.sizeDefs).concat(b.bigBoardDefs).concat(b.normalBoardDefs).join("\n")}};
gpub.diagrams.gooe.symbolMap={EMPTY:"\\eLbl{_}",TL_CORNER:"\\0??<",TR_CORNER:"\\0??>",BL_CORNER:"\\0??,",BR_CORNER:"\\0??.",TOP_EDGE:"\\0??(",BOT_EDGE:"\\0??)",LEFT_EDGE:"\\0??[",RIGHT_EDGE:"\\0??]",CENTER:"\\0??+",CENTER_STARPOINT:"\\0??*",BSTONE:"\\0??@",WSTONE:"\\0??!",BSTONE_TRIANGLE:"\\0??T",WSTONE_TRIANGLE:"\\0??t",TRIANGLE:"\\0??3",BSTONE_SQUARE:"\\0??S",WSTONE_SQUARE:"\\0??s",SQUARE:"\\0??2",BSTONE_CIRCLE:"\\0??C",WSTONE_CIRCLE:"\\0??c",CIRCLE:"\\0??1",BSTONE_XMARK:"\\0??X",WSTONE_XMARK:"\\0??x",
XMARK:"\\0??4",BSTONE_TEXTLABEL:"\\goBsLbl{%s}",WSTONE_TEXTLABEL:"\\goWsLbl{%s}",TEXTLABEL:"\\eLbl{%s}",BSTONE_TEXTLABEL_LARGE:"\\goBsLblBig{%s}",WSTONE_TEXTLABEL_LARGE:"\\goWsLblBig{%s}",TEXTLABEL_LARGE:"\\eLblBig{%s}"};
gpub.diagrams.gnos={sizes:{8:"8",9:"9",10:"10",11:"11",12:"12",14:"14",16:"16",20:"20"},singleCharSizeAtTen:{8:1,9:2,10:2,11:3,12:3,14:4,16:5,20:6},sizeArray:"tiny scriptsize footnotesize small normalsize large Large LARGE huge Huge".split(" "),create:function(a,b){b.size=b.size||gpub.diagrams.gnos.sizes["12"];return gpub.diagrams.gnos.gnosStringArr(a,b.size).join("\n")},_inlineWrapper:"{\\raisebox{-.17em}{\\textnormal{%s}}}",renderInline:function(a,b){b=b||{};var c=b.size||gpub.diagrams.gnos.sizes["12"];
return a.replace(/((Black)|(White)) (([A-Z])|([0-9]+))(?=([^a-z]|$))/g,function(a,b,f,g,h){f=null;if("Black"===b)f=glift.flattener.symbols.BSTONE;else if("White"===b)f=glift.flattener.symbols.WSTONE;else return a;a=gpub.diagrams.gnos.getLabelDef(h,f,c);h=gpub.diagrams.gnos._processTextLabel(a,gpub.diagrams.gnos.symbolMap[a],h,c);return gpub.diagrams.gnos._inlineWrapper.replace("%s",h)})},gnosStringArr:function(a,b){for(var c=["\\gnosfontsize{"+b+"}","{\\gnos"],e=0,d=gpub.diagrams.gnos.gnosBoard(a,
b).boardArray();e<d.length;e++)c.push(d[e].join("")+"\\\\");c.push("}");return c},gnosBoard:function(a,b){b=b||"12";var c=glift.flattener.symbolStr,e=gpub.diagrams.gnos.symbolMap;return a.board().transform(function(d,f,g){f=c(d.base());d.textLabel()&&d.mark()&&d.mark()===glift.flattener.symbols.TEXTLABEL?f=gpub.diagrams.gnos.getLabelDef(a.autoTruncateLabel(d.textLabel()),d.stone(),b):d.mark()&&d.stone()?f=c(d.stone())+"_"+c(d.mark()):d.stone()?f=c(d.stone()):d.mark()&&(f=c(d.mark()));out=e[f]?e[f]:
e.EMPTY;(g=a.autoTruncateLabel(d.textLabel()))?out=gpub.diagrams.gnos._processTextLabel(f,out,g,b,!0):d.mark()&&!d.stone()&&(out=gpub.diagrams.gnos.symbolMap.markOverlap(e[c(d.base())],out));return out})},getLabelDef:function(a,b,c){var e=glift.flattener.symbolStr;c+="";return a&&/^\d+$/.test(a)&&b&&("8"===c||3<=a.length)?(a=parseInt(a),c=e(b),0<a&&100>a?c+"_NUMLABEL_1_99":100<=a&&200>a?c+"_NUMLABEL_100_199":200<=a&&299>a?c+"_NUMLABEL_200_299":300<=a&&399>a?c+"_NUMLABEL_300_399":e(b)+"_TEXTLABEL"):
b&&a?e(b)+"_TEXTLABEL":"TEXTLABEL"},_processTextLabel:function(a,b,c,e){if(/^\d+$/.test(c)&&/NUMLABEL/.test(a))return lbl=parseInt(c)%100,b.replace("%s",lbl);a=gpub.diagrams.gnos.singleCharSizeAtTen[e]||3;1<c.length&&a--;return b.replace("%s","\\"+(gpub.diagrams.gnos.sizeArray[a]||"tiny")+"{"+c+"}")}};gpub.diagrams.gnos.init={LATEX:"\\usepackage{gnos}"};
gpub.diagrams.gnos.symbolMap={EMPTY:"\\gnosEmptyLbl{_}",TL_CORNER:"<",TR_CORNER:">",BL_CORNER:",",BR_CORNER:".",TOP_EDGE:"(",BOT_EDGE:")",LEFT_EDGE:"\\char91",RIGHT_EDGE:"]",CENTER:"+",CENTER_STARPOINT:"*",BSTONE:"@",WSTONE:"!",BSTONE_TRIANGLE:"T",WSTONE_TRIANGLE:"t",TRIANGLE:"3",BSTONE_SQUARE:"S",WSTONE_SQUARE:"s",SQUARE:"2",BSTONE_CIRCLE:"C",WSTONE_CIRCLE:"c",CIRCLE:"1",BSTONE_XMARK:"X",WSTONE_XMARK:"x",XMARK:"4",BSTONE_TEXTLABEL:"\\gnosOverlap{@}{\\color{white}%s}",WSTONE_TEXTLABEL:"\\gnosOverlap{!}{%s}",
TEXTLABEL:"\\gnosEmptyLbl{%s}",BSTONE_NUMLABEL_1_99:"{\\gnosb\\char%s}",BSTONE_NUMLABEL_100_199:"{\\gnosbi\\char%s}",BSTONE_NUMLABEL_200_299:"{\\gnosbii\\char%s}",BSTONE_NUMLABEL_300_399:"{\\gnosbiii\\char%s}",WSTONE_NUMLABEL_1_99:"{\\gnosw\\char%s}",WSTONE_NUMLABEL_100_199:"{\\gnoswi\\char%s}",WSTONE_NUMLABEL_200_299:"{\\gnoswii\\char%s}",WSTONE_NUMLABEL_300_399:"{\\gnoswiii\\char%s}",markOverlap:function(a,b){return"\\gnosOverlap{"+a+"}{\\gnos"+b+"}"}};
gpub.diagrams.igo={create:function(a,b){},renderInline:function(a){return a}};gpub.diagrams.pdf={create:function(a,b){},renderInline:function(a){return a}};gpub.api={};gpub.create=function(a){gpub._validateInputs(a);var b=a.sgfs;a=gpub.processOptions(a);gpub.global.debug=!!a.debug;b=gpub.spec.create(b,a);return gpub.book.create(b,a)};
gpub._validateInputs=function(a){if(!a)throw Error("No options defined");a=a.sgfs;if(!a||"array"!==glift.util.typeOf(a)||!a.length)throw Error("SGF array must be defined and non-empty");if(!glift)throw Error("GPub depends on Glift, but Glift was not defined");};
gpub.defaultOptions={outputFormat:"LATEX",bookPurpose:"GAME_COMMENTARY",boardRegion:"AUTO",diagramType:"GNOS",pageSize:"LETTER",skipDiagrams:0,maxDiagrams:0,template:null,autoBoxCropOnVariation:!1,regionRestrictions:[],gnosFontSize:"12",pdfx1a:!1,colorProfileFilePath:null,bookOptions:{init:"",title:"My Book",subtitle:null,publisher:"GPub",authors:[],year:null,frontmatter:{foreward:null,preface:null,acknowledgements:null,introduction:null,generateToc:!0,copyright:null}},debug:!1};
gpub.bookPurpose={GAME_COMMENTARY:"GAME_COMMENTARY",PROBLEM_SET:"PROBLEM_SET",PROBLEM_BOOK:"PROBLEM_BOOK"};gpub.outputFormat={LATEX:"LATEX",HTMLPAGE:"HTMLPAGE",ASCII:"ASCII"};
gpub.processOptions=function(a){var b={};a=a||{};var c=function(a,c,d){for(var e in d)"sgfs"!==e&&void 0===b[e]&&(a[e]=void 0!==c[e]?c[e]:d[e]);return a},e=a.bookOptions||{},d=e.frontmatter||{},f=gpub.defaultOptions;c(b,a,f);c(b.bookOptions,e,f.bookOptions);c(b.bookOptions.frontmatter,d,f.bookOptions.frontmatter);if(0>b.skipDiagrams)throw Error("skipDiagrams cannot be less than 0");if(0>b.maxDiagrams)throw Error("maxDiagrams cannot be less than 0");gpub.validateOptions(b);return b};
gpub.validateOptions=function(a){var b=["outputFormat","bookPurpose","boardRegion","diagramType","pageSize"],c=[gpub.outputFormat,gpub.bookPurpose,glift.enums.boardRegions,gpub.diagrams.diagramType,gpub.book.page.type];if(b.length!==c.length)throw Error("Programming error! Keys and parent objs not same length");for(var e=0;e<b.length;e++){var d=b[e],f=a[d];if(!c[e].hasOwnProperty(f))throw Error("Value: "+f+" for property "+d+" unrecognized");}return a};
