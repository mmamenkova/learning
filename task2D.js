import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

function RGBtoHEX(rgbcolor) {
  const re = new RegExp('^rgb\\((\\d{1,3}[%]?),(\\d{1,3}[%]?),(\\d{1,3}[%]?)\\)');
  const recolor = rgbcolor.match(re);
  console.log(recolor);
  if (recolor) {
    let color = '';
    for (var i = 1; i <= 3; i++) {
      if (recolor[i] == 0) {
        const it = parseInt(recolor[i], 10).toString(16).repeat(2);
        color += it;
      } else {
        color += parseInt(recolor[i], 10).toString(16);
      }
    }
    if (color.length !== 6) {
      return ('Invalid color');
    } else {
      return ('#' + color);
    }
  } else {
    return ('Invalid color');
  }
};

function HEXcolor(hexcolor) {
  const mes = 'Invalid color';
  const re = new RegExp('(?:#)?([a-f0-9]*)');
  const recolor = hexcolor.match(re);
  if (recolor) {
    if (recolor[1].length != 3 && recolor[1].length != 6) {
      return mes;
    } else {
      const col = recolor[1];
      if (col.length == 3) {
        let stringOne = '';
        let stringTwo = '';
        for (var i = 0; i <= 2; i++) {
          stringTwo = col[i].repeat(2);
          stringOne += stringTwo;
        }
        return ('#' + stringOne);
      } else {
        return ('#' + recolor[1]);
      }
    }
  } else {
    return mes;
    //console.log('Invalid color');
  }
  //return (color);
};

app.get('/2D', (req, res) => {
  if (req.query.color == null || req.query.color == '') {
    res.send('Invalid color');
  } else {
    const reqcolor = req.query.color.toLowerCase();
    const notspace = reqcolor.replace(/\s/g,'');
    const re_rgb = new RegExp('^rgb');
    const rgb_color = notspace.match(re_rgb);
    if (rgb_color) {
      const color = RGBtoHEX(notspace);
      res.send(color);
    } else {
      const color = HEXcolor(notspace);
      res.send(color); 
    }
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
