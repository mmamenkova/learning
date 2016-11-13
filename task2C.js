import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2C', (req, res) => {
  const username = req.query.username;
  const re = new RegExp('@?(https?:)?(\/\/)?([a-zA-Z.0-9-]*(?=/))?(/)?(?:@)?([a-zA-Z._]*)?');
  var results = username.match(re);

  if (results != null) {
    res.send('@' + results[5]);
  } else {
    res.send('Invalid username');
  }

})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
