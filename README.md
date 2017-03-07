# import-wikidata-dump-to-couchdb

A tool to transfer an extract of a [wikidata dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29) into a [CouchDB](couchdb.org) database

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Dependency](#dependency)
- [Installation](#installation)
- [How to](#how-to)
  - [Download dump](#download-dump)
  - [Extract subset](#extract-subset)
  - [Import](#import)
    - [Specify start and end line numbers:](#specify-start-and-end-line-numbers)
    - [Behavior on conflict](#behavior-on-conflict)
  - [See also](#see-also)
  - [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Dependency
* [NodeJS](https://nodejs.org) **>= v6**. If your distribution doesn't provide an recent version of NodeJS, you might want to uninstall NodeJS and reinstall it using [NVM](https://github.com/xtuple/nvm)

## Installation
```sh
git clone https://github.com/maxlath/import-wikidata-dump-to-couchdb
cd import-wikidata-dump-to-couchdb
npm install
```

Now you can customize `./config/default.js` to your needs.

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
cat dump.json | wikidata-filter --claim P106:Q36180 > isWriter.json
```

### Import
This new file isnt valid json (it's [line-delimited JSON](https://en.wikipedia.org/wiki/JSON_Streaming#Line_delimited_JSON)), but every new line is, once you remove the coma at the end of the line, so here is the plan: take every line, remove the coma, PUT it in your database:
```sh
./import.js ./isWriter.json
```

#### Specify start and end line numbers:
```sh
startline=5
# the line 10 will be included
endline=10
./import.js ./isWriter.json $startline $endline
```

#### Behavior on conflict
In the config file (`./config/default.js`), you can set the behavior on conflict, that is, when the importers tries to add an entity that was already previously added to CouchDB:

* `update` (default): update document if there is a change, otherwise pass.
* `pass`: always pass
* `exit`: exit process at first conflict

### See also
* [wikidata-filter](https://github.com/maxlath/wikidata-filter): a command-line tool to filter a Wikidata dump by claim
* [wikidata-subset-search-engine](https://github.com/inventaire/wikidata-subset-search-engine): tools to setup an ElasticSearch instance fed with subsets of Wikidata
* [wikidata-sdk](https://github.com/maxlath/wikidata-sdk): a javascript tool-suite to query Wikidata and simplify its results
* [wikidata-cli](https://github.com/maxlath/wikidata-cli): read and edit Wikidata from the command line

### License

MIT
