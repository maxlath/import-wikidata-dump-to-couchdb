a tool to transfer an extract of a [wikidata dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29) into a [CouchDB](couchdb.org) database

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [How to](#how-to)
  - [Download dump](#download-dump)
  - [Extract subset](#extract-subset)
  - [Import](#import)
  - [See also](#see-also)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Dependency
* [NodeJS](https://nodejs.org)

## How to
### Download dump
Download [Wikidata latest dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)

### Extract subset
Extract the subset of the dump fitting your needs, as you might not want to throw ~40Go at your database's face.

For instance, for the needs of the [authors-birthday bot](https://github.com/inventaire/inventaire-authors-birthday), I wanted to keep only Wikidata entities of writers:

As each line of the dump is an entity, you could do something like this with grep
```sh
cat dump.json | grep '36180\,' > isWriter.json
```

Here the trick is that every entity with occupation-> writer (P106->Q36180) will have 36180 somewhere in the line (as a claim `numeric-id`). And tadaa, you went from a 39Go dump to a way nicer 384Mo subset.

**But** now, we can do something cleaner using [wikidata-filter](https://github.com/maxlath/wikidata-filter):
```sh
cat dump.json | wikidata-filter --claim P106:Q36180' > isWriter.json
```

### Import
This new file isnt valid json (it's [line-delimited JSON](https://en.wikipedia.org/wiki/JSON_Streaming#Line_delimited_JSON)), but every new line is, once you remove the coma at the end of the line, so here is the plan: take every line, remove the coma, PUT it in your database:
```sh
./import.js ./isWriter.json
# OR
npm run import ./isWriter.json
```

There are probably more efficient ways to do that (using batches maybe?), but well, that's one solution

### See also
* [wikidata-filter](https://github.com/maxlath/wikidata-filter)
* [wikidata-subset-search-engine](https://github.com/inventaire/wikidata-subset-search-engine)

### License

MIT
