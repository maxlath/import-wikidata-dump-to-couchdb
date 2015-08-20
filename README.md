a tool to transfer an extract of a [wikidata dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29) into a [CouchDB](couchdb.org) database

### How to

* download [Wikidata latest dump](https://www.wikidata.org/wiki/Wikidata:Database_download#JSON_dumps_.28recommended.29)
* extract a subset of it fitting your needs, as you might not want to throw ~40Go at your database's face

For instance, for the needs of the [authors-birthday bot](https://github.com/inventaire/inventaire-authors-birthday), I wanted to keep only Wikidata entities of writers:

As each line of the dump is an entity, grep is your best friend
```
cat dump.json |grep '36180\,' > isWriter.json
```

Here the trick is that every entity with occupation-> writer (P106->Q36180) will have 36180 somewhere in the line (as a claim `numeric-id`). And tadaa, you went from a 39Go dump to a way nicer 384Mo subset

* transfer it in the database
This new file isnt valid json, but every new line is, once you remove the coma at the end of the line, so here is the plan: take every line, remove the coma, PUT it in your database:
```
node ./build/couch-wikidata-dump-importer.js ./isWriter.json
```

There is probably more efficient ways to do that (using batches maybe?), but well, that one solution


### License

MIT