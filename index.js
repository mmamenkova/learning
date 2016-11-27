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

function HSLtoHEX(hslcolor) {
  const notspace = hslcolor.replace(/%20/g,'');
  const re = new RegExp('^hsl\\((\\d{1,3})[%]?,(\\d{1,3}[%]?),(\\d{1,3}[%]?)\\)');
  const recolor = notspace.match(re);

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
    console.log('Invalid color');
  } else {
    const reqcolor = req.query.color.toLowerCase();
    const notspace = reqcolor.replace(/\s/g,'');
    //const notspace = reqcolor.replace(/%20/g,'');
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
        const color = HSLtoHEX(notspace);
        res.send(color);
        console.log(color);
      } else {
        const color = HEXcolor(notspace);
        console.log(color);
        res.send(color)
      }
    }
  }

/*
  if (req.query.color == null || req.query.color == '') {
      res.send('Invalid color');
  } else {
    if (req.query.color !== /-[g-zG-Z]/) {
      const color = req.query.color.toLowerCase();
      const re = new RegExp('(?:\\s)?(?:#)?([a-f0-9]*)');
      const results = color.match(re);
      if (results[1].length != 3 && results[1].length != 6) {
        res.send('Invalid color');
      } else {
        const col = results[1];
        if (col.length == 3) {
          let stringOne = '';
          let stringTwo = '';
          for (var i = 0; i <= 2; i++) {
            stringTwo = col[i].repeat(2);
            stringOne += stringTwo;
          }
          res.send('#' + stringOne);
        } else {
          res.send('#' + results[1]);
        }
      }
    } else {
      res.send('Invalid color');
      console.log('Invalid color');
    }
  }
  */

  /*
  if (req.query.color == null) {
      res.send('Invalid color');
  } else {
    if (req.query.color !== '' && req.query.color !== /-[g-zG-Z]/ || req.query.colour == '') {
      const color = req.query.color.toLowerCase();
      const re = new RegExp('(?:\\s)?(?:#)?([a-f0-9]*)');
      const results = color.match(re);
      if (results[1].length != 3 && results[1].length != 6) {
        res.send('Invalid color');
      } else {
        const col = results[1];
        if (col.length == 3) {
          let stringOne = '';
          let stringTwo = '';
          for (var i = 0; i <= 2; i++) {
            stringTwo = col[i].repeat(2);
            stringOne += stringTwo;
          }
          res.send('#' + stringOne);
        } else {
          res.send('#' + results[1]);
        }
      }
    } else {
      res.send('Invalid color');
      console.log('Invalid color');
    }
  }
*/

});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
