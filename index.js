import express from 'express';
import fetch from 'isomorphic-fetch';
import cors from 'cors';
import _ from 'lodash';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

async function getAllPC() {
    const response = await fetch(pcUrl);
    const pc = await response.json();
    return (pc);
};

app.get('/', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results);
  } catch(err) {
      console.log(err);
      return res.json({ err });
  };
});

app.get('/board', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/ram', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.ram);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/os', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.os);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/hdd', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.hdd);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/board/vendor', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board.vendor);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/board/model', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board.model);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/board/cpu', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board.cpu);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/board/image', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board.image);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/board/video', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.board.video);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/ram/vendor', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.ram.vendor);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/ram/volume', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.ram.volume);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.get('/ram/pins', async (req, res) => {
  try {
    const results = await getAllPC();
    return res.json(results.ram.pins);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

async function getSizes(url) {
    const response = await fetch(pcUrl);
    const pc = await response.json();
    const sizes = pc.hdd[0].size + pc.hdd[2].size;
    return (sizes);
};

app.get('/volumes', async (req, res) => {
  try {
    const results = await getAllPC();
    const hdd = results.hdd;
    const c = _.map(_.filter(hdd, ['volume', 'C:']), 'size');
    const d = _.map(_.filter(hdd, ['volume', 'D:']), 'size')+"B";
    const sum = _.sum(c)+"B";
    const com = _.defaults({"C:":sum},{"D:":d});
    return res.json(com);
  } catch(err) {
    console.log(err);
    return res.json({ err });
  };
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});

