#! /usr/bin/python

# To get this script working for yourself, you'll need the following:
#
# export a CLOSURE var pointing to the closure jar
#
# That should be basically it!

import glob
import os
import sys
import re
import subprocess

FILES_TO_AUTOGEN = {
  # Name / Add Tests to Imports
  'htmltests/GPubQunitTest.html': True,
  }

DIR_ORDER = [
  '.',
  'util',
  'markdown',
  'book',
  'spec',
  'diagrams',
  'diagrams/gooe',
  'diagrams/gnos',
  'diagrams/igo',
  'diagrams/pdf',
  'diagrams/latex',
  'templates',
]

COMBINED_LOC = 'compiled/gpub_combined.js'
COMPILED_LOC = 'compiled/gpub.js'

HEADER = '<!-- AUTO-GEN-DEPS -->'
FOOTER = '<!-- END-AUTO-GEN-DEPS -->'

# Need a closure alias, e.g.,: export CLOSURE="java -jar ~/closure.jar"
# --compilation_level ADVANCED_OPTIMIZATIONS"
CLOSURE = ("${CLOSURE} --js " + COMBINED_LOC + " --js_output_file " + COMPILED_LOC)

def CreateImport(name):
  return '<script type="text/javascript" src="../' + name + '"></script>'

def AppendImports(out):
  """ Concatenates a list of imports together """
  import_str = ''
  for section in out:
    for line in section:
      import_str += line
    import_str += '\n'
  return import_str

def AddImports(src, tests):
  for fname in FILES_TO_AUTOGEN.viewkeys():
    addtests = FILES_TO_AUTOGEN[fname]
    fd = open(fname, 'r')
    contents = fd.read()
    fd.close()
    imps = src
    if addtests:
      imps += tests
    imps = HEADER + '\n' + imps + '\n' + FOOTER
    contents = re.sub(HEADER+'((.|\n)*)'+FOOTER, imps, contents)
    fd = open(fname, 'w')
    fd.write(contents)
    fd.close

def GetFileList(scriptPath):
  """ Gets list of files to be used in import/binary import creation.

  """
  curdir = os.path.realpath(os.path.dirname(scriptPath))
  os.chdir(curdir)
  out = []
  for direct in DIR_ORDER:
    os.chdir(direct)
    files = glob.glob('*.js')
    files.insert(0, direct)
    out.append(files)
    os.chdir(curdir)
  return out

def SeparateFiles(flist):
  """ Separates a grouping of files into tests and non-tests.
  """
  out = []
  out_test = []
  for grouping in flist:
    direct = grouping.pop(0)
    tailname = re.sub('.*/', '', direct)
    if direct == '.':
      tailname = 'otre'
    section = []
    test_files = []
    for f in grouping:
      if re.match(".*test\.js", f) != None:
        test_files.append(f)
      elif re.match(tailname + '\.js', f):
        section.insert(0, f)
      else:
        section.append(f)
    section.insert(0, direct)
    test_files.insert(0, direct)
    out.append(section)
    out_test.append(test_files)
  return (out, out_test)


def CreateHtmlImports(srcs, suffix):
  """
  Create the literal HTML import strings.

  srcs: List of List of filenames.  The inner list is grouped by directory.
  suffix: String suffix to append onto comment string. Right now, this is just
      used to display tests.
  """
  out = []
  for grouping in srcs:
    if len(grouping) > 1:
      direct = grouping.pop(0)
      out.append('<!-- ' + direct.replace('/', ' ').replace(
          '.', 'Otre').capitalize() + suffix + '-->')
      for fname in grouping:
        out.append(CreateImport(os.path.join(direct, fname)))
  return out

def Replacer(filename, transform):
  """
  Utility method to take a function (transform) and apply that to the contents
  """
  in_file = open(filename, "r")
  in_con = in_file.read()
  in_file.close()
  out_con = transform(in_con)
  out_file = open(filename, "w")
  out_file.write(out_con)
  out_file.close()

def CombineSourceFiles(srcs):
  """
  Concatenate all the files in srcs together and return the string.
  """
  outString = ''
  for group in srcs:
    directory = group.pop(0)
    for fname in group:
      relfname = os.path.join(directory, fname)
      fd = open(relfname)
      outString += fd.read()
      fd.close()
  return outString

def main(argv=None):
  """
  Generate imports for the HTML test files and, optionally concatenate and
  compile the JavaScript.
  """
  print ' '.join(sys.argv)
  flags = set(sys.argv[1:])
  flist = GetFileList(sys.argv[0])

  srcs, tests = SeparateFiles(flist)

  if '--debug_full' in flags or '--full' in flags:
    combined = CombineSourceFiles(srcs)
    fd = open(COMBINED_LOC, 'w')
    fd.write(combined)
    fd.close()

    if '--full' in flags:
      print CLOSURE
      out, err = subprocess.Popen(CLOSURE, shell=True).communicate()
      if err != None:
        print err
        return -1
      # TODO(kashomon): either make gzipping work, or remove this:
      # -----------------
      #if os.path.exists(GZIPPED_LOC):
      #  os.remove(GZIPPED_LOC)
      #gzip = 'gzip ' + COMPILED_LOC
      #print gzip
      #out, err = subprocess.Popen(gzip, shell=True).communicate()
      #------------------
      srcs = [['compiled', COMPILED_LOC.replace('compiled/', '')]]
    else:
      srcs = [['compiled', COMBINED_LOC.replace('compiled/', '')]]

  srcImps = CreateHtmlImports(srcs, ' ')
  testImps = CreateHtmlImports(tests, ' Tests ')

  importStr = AppendImports(srcImps)
  testStr = AppendImports(testImps)

  AddImports(importStr, testStr)

if __name__ == "__main__":
  main()
