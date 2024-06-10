# kicad-mod-converter

This module converts kicad files into a [tscircuit soup json](https://docs.tscircuit.com/quickstart), an easy-to-use JSON format for electronics.

## CLI Usage

```
npm install -g kicad-mod-converter

kicad-mod-converter # interactive usage

# Convert a directory ./my-footprints.pretty to a typescript directory
kicad-mod-converter convert-kicad-directory --input-dir ./my-footprints.pretty --output-dir ./my-tscircuit-footprints
```


## Development

You should read about the [kicad sexpr syntax](https://dev-docs.kicad.org/en/file-formats/sexpr-intro/) to understand how to read the footprint files.

There are tests in this repo, take a look in the `tests` directory to see how they work.
