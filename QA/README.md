# QA

## [compare.bash](compare.bash)

The script allows to compare two HomeBank files.

The aim is to compare the HomeBank original file to the same one loaded and saved by homebank-app.

At the end, it must be same.

### How it works

For each file, the [standardize.xsl](standardize.xsl) is applied.
It allows to :
- Transform each decimal number with a precision of only 2 digits
- Resolve XML entities
- Sort tags by `key` attribute

At the end, transformed files are compared.
