gpub.book.latex.defaultTemplate = [
'{{=<% %>=}}', // Change the tag-type to ERB
'\\documentclass[letterpaper,12pt]{memoir}',
'\\usepackage{color}',
'\\usepackage{wrapfig}',
'\\usepackage{setspace}',
'\\usepackage[cmyk]{xcolor}',
'\\usepackage{graphicx}',
'<%^pdfx1a%>',
'\\usepackage{hyperref}',
'<%/pdfx1a%>',
'\\usepackage{xmpincl}',
'<%#frontmatter.copyright.showPermanenceOfPaper%>',
'\\usepackage{tikz}',
'<%/frontmatter.copyright.showPermanenceOfPaper%>',
'',
'\\usepackage[margin=1in]{geometry}',
'',
'<%#pdfx1a%>',
'%%% PDF/X-1a Header',
'<%&pdfxHeader%>',
'<%/pdfx1a%>',
'',
'%%% Define any extra packages %%%',
'<%init%>',
'',
'\\setlength{\\parskip}{0.5em}',
'\\setlength{\\parindent}{0pt}',
'',
'%%% Diagram Figure defs.',
'% Must expose two commands',
'%  \\gofigure  (mainline diagrams)',
'%  \\godiagram (variation diagrams)',
'% Mainline Diagrams. reset at parts',
'\\newcounter{GoFigure}[part]',
'',
'\\newcommand{\\gofigure}{%',
' \\stepcounter{GoFigure}',
' \\centerline{\\textit{\\textbf{Diagram \\arabic{GoFigure}}}}',
'}',
'',
'% Variation Diagrams. reset at parts.',
'\\newcounter{GoVariation}[part]',
'',
'\\newcommand{\\govariation}{%',
' \\stepcounter{GoVariation}',
' \\textit{Variation \\arabic{GoVariation}}',
'}',
'',
'\\newcommand{\\subtext}[1]{\\centerline{\\textit{#1}}}',
'',
'%%% Define the main title %%%',
'\\definecolor{light-gray}{gray}{0.55}',
'\\newcommand*{\\mainBookTitle}{\\begingroup',
'  \\raggedleft',
'  <%#authors%>',
'     {\\Large{<%.%>}} \\\\',
'     \\vspace*{1 em}',
'  <%/authors%>',
'  \\vspace*{5 em}',
'  {\\textcolor{light-gray}{\\Huge{<%title%>}}}\\\\',
'  \\vspace*{\\baselineskip}',
'  <%#subtitle%>',
'  {\\small \\bfseries <%subtitle%> }\\par',
'  <%/subtitle%>',
'  \\vfill',
'  <%#publisher%>',
'  {\\Large{<%publisher%>}}\\par',
'  \\vspace*{2\\baselineskip}',
'  <%/publisher%>',
'  <%#year%>',
'  {\\large{<%year%>}}\\par',
'  \\vspace*{2\\baselineskip}',
'  <%/year%>',
'\\endgroup}',

' %%% Chapter settings %%%',
//'\\pagestyle{empty}',
//'\\chapterstyle{section}', -- the old style
//'\\chapterstyle{demo2}', -- 2 hrules
// other options for chapter styles:
// bringhurst,crosshead,default,dowding,memman,komalike,ntglike,tandh,wilsondob
'\\chapterstyle{madsen}',
// Muck with the chapter number. The standard madsen style has the numbers off
// the edge of the header box. That works fine until you want to print at
// smaller sizes (e.g., 6x9).
'\\renewcommand*{\\printchapternum}{%',
'  \\resizebox{!}{3ex}{%',
'      {\\hspace{0.2em}\\chapnamefont\\bfseries\\sffamily\\thechapter}%',
'  }%',
'}%',

// openany, openright, openleft
'\\openany',
'\\makepagestyle{headings}',
'\\setlength{\\headwidth}{\\textwidth}',
'\\makeevenhead{headings}{\\thepage}{}{\\slshape\\leftmark}',
'\\makeoddhead{headings}{\\slshape\\rightmark}{}{\\thepage}',
'\\makerunningwidth{headings}[\\textwidth]{\\textwidth}',
'',
'\\pagestyle{companion}',
'\\makerunningwidth{companion}{\\headwidth}',
//'\\renewcommand{\\printchapternum}{\\space}', -- Force no chapter nums

'',
////////////////////////
// Start the document //
////////////////////////
'\\begin{document}',
'%%% The Frontmatter. %%%',
'\\pagestyle{empty}',
'\\mainBookTitle',
'\\cleartoverso',
'',
'<%#frontmatter.copyright%>',
'% Copyright Page',
'\\begin{vplace}[0.7]',
'\\footnotesize{',
'\\textcopyright\\ <%frontmatter.copyright.publishYear%> by <%frontmatter.copyright.publisher%> \\\\',
'<%frontmatter.copyright.license%> Published <%frontmatter.copyright.publishYear%> \\\\',
'First edition published <%frontmatter.copyright.firstEditionYear%>.\\\\',
'\\\\',
'<%&frontmatter.copyright.constructedAddress%>\\\\',
'\\\\',
'<%#frontmatter.copyright.constructedPrintingRun%>',
'<%frontmatter.copyright.constructedPrintingRun%>\\\\',
'<%/frontmatter.copyright.constructedPrintingRun%>',
'\\\\',
'<%#frontmatter.copyright.isbn%>',
'ISBN: <%frontmatter.copyright.isbn%> \\\\',
'<%/frontmatter.copyright.isbn%>',
'<%#frontmatter.copyright.issn%>',
'ISSN: <%frontmatter.copyright.issn%> \\\\',
'<%/frontmatter.copyright.issn%>',
'<%#frontmatter.copyright.lccn%>',
'Library of Congress Control Number: <%frontmatter.copyright.lccn%> \\\\',
'<%/frontmatter.copyright.lccn%>','\\\\',
'\\\\',
'<%#frontmatter.copyright.showPermanenceOfPaper%>',
'\\tikz\\node[circle,draw,inner sep=.1ex] {\\tiny{$\\infty$}};',
'This paper meets or exceeds the requirements',
'of \\textsc{ansi/niso z39.48-1992} \\\\',
'(Permanence of Paper). \\\\',
'<%/frontmatter.copyright.showPermanenceOfPaper%>',
'\\\\',
'\\\\',
'\\\\',
'Created using \\LaTeX\\ generated by GPub.js.',
'}\\\\',
'\\end{vplace}',
'<%/frontmatter.copyright%>',
'\\cleartorecto',
//'\\cleartoverso',
'',
'<%#frontmatter.generateToc%>',
'\\tableofcontents*',
'<%/frontmatter.generateToc%>',
'\\pagestyle{companion}',
'\\frontmatter',
'',
'<%#frontmatter.foreword%>',
'\\chapter{Foreword}',
'<%frontmatter.foreword.text%>',
'<%/frontmatter.foreword%>',
'',
'<%#frontmatter.preface%>',
'\\chapter{Preface}',
'<%frontmatter.preface.text%>',
'<%/frontmatter.preface%>',
'',
'<%#frontmatter.acknowledgements%>',
'\\chapter{Acknowledgments}',
'<%frontmatter.acknowledgements.text%>',
'<%/frontmatter.acknowledgements%>',
'',
'<%#frontmatter.introduction%>',
'\\chapter{Introduction}',
'<%frontmatter.introduction.text%>',
'<%/frontmatter.introduction%>',
'',
'%%% The content. %%%',
'\\mainmatter',
'<%&content%>',
'',
'\\end{document}'].join('\n');
