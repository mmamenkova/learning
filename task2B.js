import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2B', function(req, res) {
  const re = new RegExp('(\\S+)(\u0020+)?(\\S+)?(\u0020+)?(\\S+)?(\u0020+)?(\\S+)?');
  const re2 = new RegExp('[0-9_/]');

  if (req.query.fullname.length === 0) {
    var mes = 'Invalid fullname';
  } else {
    var fullname = req.query.fullname;
    var results = fullname.match(re);
    var results2 = fullname.match(re2);
    if (results2 != null) {
      mes = 'Invalid fullname';
    } else {
      if (results[7] != null) {
        mes = 'Invalid fullname';
      } else {
        if (results[5] != null) {
          var name = results[1];
          var name3 = results[3];
          var name5 = results[5];
          mes = name5 + ' ' + name[0] + '. ' + name3[0] + '.';
        } else {
          if (results[3] != null ) {
            name = results[1];
            name3 = results[3];
            mes = name3 + ' ' + name[0] + '.';
          } else {
            name = results[1];
            mes = name;
          }
        }
      }
    }
  }
res.send(mes);
console.log(mes);
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
