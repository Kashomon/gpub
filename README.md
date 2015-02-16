# GPub: A Go Publishing Utility

## Overview

_Note: GPub is under active development and users may find unexpected API-breaking
changes until a 1.0.0 release occurs_

GPub is a book-generating platform that relies on [Glift](www.gliftgo.com).
Generally speaking, Glift is responsible for providing an understanding of Go
files and generated a flattened representation of a go position, while GPub is
responsible for generating an intermediate representation and for the ultimate
rendering.

The JavaScript API for book generation is:

```javascript
gpub.create([sgf1, sgf2, ...], {...options...});
```

This returns the string output of the book.

### Options

Structure of the options object in the API

```javascript
{
  // The goal of book generation.  This specifies how we generate the Glift
  // spec.
  bookPurpose: <gpub.bookPurpose, default='GAME_COMMENTARY'>,

  // The format of the book generated.
  outputFormat: <gpub.outputFormat, default='LATEX'>,

  // The default board region to display.
  boardRegion: <glift.enums.boardRegion, default='AUTO'>,

  // The type of diagrams to generate within the book.
  diagramType: <gpub.diagrams.diagramType, default='GNOS'>,

  // Override the template to use. By default, gpub uses a default template
  // based on the output format
  template: null,

  // Options specificaly for book processors.  These options are generally
  // specified within the template.
  bookOptions: {}
};
```

### Installation

For font-installation instructions, [Kashomon/go-type1](www.github.com/Kashomon/go-type1). The recommended font is gnos.

_TODO(kashomon): Discuss how to install GPub once it is more stable._

### The Glift Spec

The Glift Spec is an options definition that is consumable by Glift, and is the
intermediate form of the book. Thus, all specs generated by GPub should be
consumable by Glift directly (modulo the addition of a HTML element ID).

The output of spec-generation is configured by the __`Book Purpose`__ option.
Currently gpub supports two book purposes:

  * `GAME_COMMENTARY`: An SGF that has been processed into examples to display commentary in a book form.
  * `PROBLEM_SET`: A set of problems, used to create a book problems (with or without answers).

###  Book Generation

Once we have generated the Glift Spec, we can proceed with the task of generating a book.   Book generation is configured by the following parameters:

#### Output Format

The __`Output Format`__ represents type of data that GPub produces.  Some currently supported output formats:

  * `LATEX`: The orginal target for GPub. LaTeX itself is an intermediate
    format that uses the TeX compiler to ultimately produce PDF. Diagrams may
    be of multiple types
  * `HTMLPAGE`: Since all Glift Specs are required to be renderable by Glift, we
    can simple create an HTML page embedded with Glift and the glift spec. This
    output type is primarily used for testing. Diagrams don't require any
    processing since Glift is responsible for generating the UI in this case.
  * `ASCII`: A simple ASCII format, possibly RTF, used for testing and editing.
    Diagrams are intended to be generated as ASCII diagrams, or perhaps as
    rasterized images.
  * `SMART_GO`: A book in the Smart Go format. Not currently supported

#### Diagram Type
__`Diagram Type`__ indicates how diagrams should be rendered. Note that most diagrams
have an intended target output format. It is left as future work to indicate to
the user how the diagram types are restricted.

Various diagram types:

  * `ASCII`: Generate ASCII Images.
  * `GNOS`: Uses the Gnos LaTeX font.
  * `GOOE`: Uses the GOOE LaTeX font
  * `IGO`: Uses the IGO LaTeX font (\*not currently supported).
  * `PDF`: Generate raw PDFs (\*not currently supported).

#### Styling via Markdown
By default, GPub uses
[Markdown](http://daringfireball.net/projects/markdown/syntax) to add styling to
diagram comments via [Marked.js](https://github.com/chjj/marked). In the near
future, all the major output formats will support
custom renderers. See the [Markdown Page](http://daringfireball.net/projects/markdown/syntax)
for more details about the supported syntax.

GPub also uses Markdown to gather diagram-level Metadata. The following headers will be used to generate chapter-data.

    # Foo Bar => Book Foo Bar
    ## Foo Bar => Part Foo Bar
    ### Foo Bar => Chapter Foo Bar

#### Templating and Templating Variables
The basic structure of the output file generated is provided by a template, that
is ultimately rendered by [Mustache.js](https://github.com/janl/mustache.js/).
See the Mustache docs for more information about what is supported.

To override the default template (for the particular output type), set the
options.template variable.

__Caveat__: We use special tags for LaTeX `<% %>` rather than the default
`{{ }}` brackets. The standard curly brackets are used for all other output
formats.

Generally, the structure of a template looks like:

```latex
\documentclass[letterpaper,12pt]{article}
\begin{document}

\title{<%title%>}
\author{<%author%>}

\maketitle

<%content%>

\end{document}
```

This allows the user to specify `title`, and `author`, which is discussed below.
The `content` variable is reserved.

__Reserved Template Variables__

  * `content`

#### Templating Variables

A user may specify template variables in one of two ways:

  1. As JSON within the 0th-node comment of the first SGF.
  2. As keys to the `bookOptions` option.

As per 1., template parameters may be provided embedded with an SGF's first comment with the following format:

```
METADATA
{
  "title": "My Book!",
  "author": "Kashomon"
}
END_METADATA
This was the second game in a ten game match between Fujisawa Hosai 9p and Go Seigen 9p. It was played on February 25 and 26, 1943.
...
```

As per 2., template prameters may also be provided via the gpub API:

```javascript
gpub.create([sgf1, sgf2, ...], {
  bookOptions: {
    title: 'My Book',
    author: 'Kashomon'
  }
});
```
