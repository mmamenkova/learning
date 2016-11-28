import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

function HSLtoRGB(hslcolor) {
  const notspace = hslcolor.replace(/%20/g,'');
  const re = new RegExp('^hsl\\((\\d{1,3}),(\\d{1,3})([%])?,(\\d{1,3})([%])?\\)');
  const reer = new RegExp('-');
  const error = notspace.match(reer);
  const recolor = notspace.match(re);

  if (error || recolor[3] == null || recolor[5] == null) {
    return ('Invalid color');
  } else {
    const recolor = notspace.match(re);
    if (recolor[1]/360 > 1 || recolor[2]/100 > 1 || recolor[3]/100 > 1) {
      return ('Invalid color');
    } else {
      const h = recolor[1]/360;
      const s = recolor[2]/100;
      const l = recolor[4]/100;
      var r, g, b;

      if(s === 0){
        r = g = b = l;
      } else {
        var hue2rgb = function hue2rgb(p, q, t){
          if(t < 0) t += 1;
          if(t > 1) t -= 1;
          if(t < 1/6) return p + (q - p) * 6 * t;
          if(t < 1/2) return q;
          if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        }
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
      }

      const rgbcolor = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
      return ('rgb(' + rgbcolor + ')');
    }
  }

};

function RGBtoHEX(rgbcolor) {
  const re = new RegExp('^rgb\\((\\d{1,3}[%]?),(\\d{1,3}[%]?),(\\d{1,3}[%]?)\\)');
  const recolor = rgbcolor.match(re);
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
    console.log('Invalid color');
  } else {
    const reqcolor = req.query.color.toLowerCase();
    const notspace = reqcolor.replace(/\s/g,'');
    const re_rgb = new RegExp('^rgb');
    const re_hsl = new RegExp('^hsl');
    const rgb_color = notspace.match(re_rgb);
    const hsl_color = notspace.match(re_hsl);
    if (rgb_color) {
      const color = RGBtoHEX(notspace);
      res.send(color);
      console.log(color);
    } else {
      if (hsl_color) {
        const rgbcolor = HSLtoRGB(notspace);
        const color = RGBtoHEX(rgbcolor);
        res.send(color);
        console.log(rgbcolor);
      } else {
        const color = HEXcolor(notspace);
        console.log(color);
        res.send(color)
      }
    }
  }
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
