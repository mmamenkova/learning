import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

function HEXcolor(x) {
  var output = [1, 18, 243, 3240, 43254, 577368, 7706988, 102876480, 1373243544, 18330699168, 244686773808, 3266193870720, 43598688377184, 581975750199168, 7768485393179328, 103697388221736960, 1384201395738071424, 18476969736848122368, 246639261965462754048];
  for (var i = 0; i <= 18; i++) {
    const mmm = output[i];
    if (x == i) {
      return mmm;
    }
    console.log(i + ' ' + x + ' ' + output[i] + ' ' + mmm);
  }
};

app.get('/2X', (req, res) => {
  const x = req.query.i;
  const result = String(HEXcolor(x));
  res.send(result);
  console.log(result);
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
