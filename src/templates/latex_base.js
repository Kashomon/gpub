/**
 * Basic latex template. Generally, these should be defined as the relevant
 * filetype (e.g., .tex).  However, this is defined within javascript for
 * convenience.
 */
gpub.templates.latexBase = [
'\\documentclass[letterpaper,12pt]{memoir}',
'\\usepackage{color}',
'\\usepackage{wrapfig}',
'\\usepackage{setspace}',
'\\usepackage{unicode}',
'\\usepackage[margin=1in]{geometry}',
'%%% Define any extra packages %%%',
'{{ extraPackages }}',
'',
'\\setlength{\\parskip}{0.5em}',
'\\setlength{\\parindent}{0pt}',
'',
'%%% Extra defs',
'% Necessary for the particular digaram type.',
'{{ diagramTypeDefs }}',
'',
'%%% Diagram Figure defs.',
'% Must expose two commands',
'%  \\gofigure  (mainline diagrams)',
'%  \\godiagram (variation diagrams)',
'{{ diagramWrapperDefs }}',
'',
'%%% Define the main title %%%',
'{{ mainBookTitleDef }}',
'',
'\\begin{document}',
'',
'\\pagestyle{empty}',
'\\mainBookTitle',
'\\newpage',
'\\tableofcontents',
'',
'\\chapterstyle{section}',
'\\pagestyle{companion}',
'\\makepagestyle{headings}',
'\\renewcommand{\\printchapternum}{\\space}',
'\\makeevenhead{headings}{\\thepage}{}{\\slshape\\leftmark}',
'\\makeoddhead{headings}{\\slshape\\rightmark}{}{\\thepage}',
'',
'%%% The content. %%%',
'{{ content }}',
'',
'\\end{document}'].join('\n');
