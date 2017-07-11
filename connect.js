const monk = require('monk');
const url = 'localhost:27017/library';

const db = monk(url);

const collection = db.get('document')

collection.insert([{a: 1}, {a: 2}, {a: 3}])
  .then((docs) => {
      console.log(docs);
    // docs contains the documents inserted with added **_id** fields
    // Inserted 3 documents into the document collection
  }).catch((err) => {
      console.log(err);
    // An error happened while inserting
  }).then(() => db.close())