# ICFP 2018

## Last name sorting

Using https://en.wikipedia.org/wiki/Lexicographical_order

Exceptions:

1. Things like `Élagbé` changed to `Elagbé` so it is in the “E” section.
2. Lowercase prefix names liked `van` are ignored. https://www.dutchgenealogy.nl/how-to-capitalize-dutch-names-with-prefixes/  `van Clief` will be in the “C” section.
3. If lastname word(s) is all uppercase it will be passed through `upperFirst`.
4. If lastname is single word is all lowercase then `upperFirst`.
