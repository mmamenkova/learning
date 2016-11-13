import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2A', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
})

app.get('/2B', (req, res) => {
  var fullname = req.query.fullname;
  const re = new RegExp('([\u0410-\u044fa-zA-Z\u00C0-\u017F]*)(\u0020)?([\u0410-\u044fa-zA-Z\u00C0-\u017F]*)?(\u0020)?([\u0410-\u044fa-zA-Z\u00C0-\u017F]*)?(\u0020)?([\u0410-\u044fa-zA-Z\u00C0-\u017F]*)?');
  const re2 = new RegExp('[0-9_/]');
  var results = fullname.match(re);
  var results2 = fullname.match(re2);
  var regexp2 = /[\u0410-\u044fa-zA-Z\u00C0-\u017F]/;

  var name = results[1];
  var name3 = results[3];
  var name5 = results[5];
  var name7 = results[7];

  if (fullname == '') {
    res.send('Invalid fullname');
  }
  if (results2 != null) {
    res.send('Invalid fullname');
  }

  if (results[7] != null) {
    res.send('Invalid fullname');
  } else {
      if (results[5] != undefined) {
        name = regexp2.exec(name);
        name3 = regexp2.exec(name3);
        res.send(name5 + ' ' + name + '. ' + name3 + '.');
      } else {
          if (results[3] != undefined ) {
            name = regexp2.exec(name);
            res.send(name3 + ' ' + name + '.');
          } else {
              res.send(name);
          }
      }
  }

})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
