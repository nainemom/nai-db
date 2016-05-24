# nai-db
_A collection database using [AlaSQL](https://github.com/agershun/alasql) and JSON for NodeJs._

# Install
```bash
npm install https://github.com/nainemom/nai-db.git
```
```js
var directory = 'database/';
var tables = ['table1', 'table2'];
var db = require('nai-db').init( directory, tables);
```

# Insert Row
```js
var row = {
  name: 'Alessandro Nesta',
  club: 'A.C. Milan'
}
row = db.tables.table1.insert(row);
var insertId = row.id;
```
Note that nai-db automatically create id for that. So dont add 'id' property to 'row' object before inserting.

# Update Row
```js
var rowId = '1464067588543-NTZ';
db.tables.table1.update(rowId, {
  name: 'Alessandro Nesta',
  number: 13
  club: 'A.C. Milan'
});
```

# Get Row
```js
var rowId = '1464067588543-NTZ';
var row = db.tables.table1.get(rowId);
```

# Delete Row
```js
var rowId = '1464067588543-NTZ';
var row = db.tables.table1.delete(rowId);
```

# Find Row
This method using [AlaSQL](https://github.com/agershun/alasql) library. a diffrence is you can use your tables in query like {this}:
```js
var rows1 = db.query('SELECT * FROM {table1}');
var rows2 = db.query('SELECT * FROM {table2} WHERE price < 900');
var rows1 = db.query('SELECT * FROM {table1} t1 INNER JOIN {table2} t2 ON t1.id = t2.player');
```

# Other Queries
```js
db.query('DELETE * FROM {table1} WHERE club = "Juventus"');
db.tables.table1.save();
```
Note that when using this method, no files changes. So after use that with 'UPDATE' or 'DELETE' query, call table save method.
