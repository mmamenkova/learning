import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/2A', (req, res) => {
  const sum = (+req.query.a || 0) + (+req.query.b || 0);
  res.send(sum.toString());
});

app.get('/test',function(req,res) {
  if (req.query.fullname.length === 0) {
    //res.send('Invalid fullname');
    var mes = 'Invalid fullname';
  } else {
    var fullname = req.query.fullname;
  }
  res.send(mes);
  console.log(fullname);
});

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
});

app.get('/2C', (req, res) => {
  const username = req.query.username;
  const re = new RegExp('@?(https?:)?(\/\/)?([a-zA-Z.0-9-]*(?=/))?(/)?(?:@)?([a-zA-Z._]*)?');
  var results = username.match(re);

  if (results != null) {
    res.send('@' + results[5]);
  } else {
    res.send('Invalid username');
  }

});


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
