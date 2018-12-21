const noteFrequencies = {
  c0: 16.35,
  cSharp0: 17.32,
  d0: 18.35,
  dSharp0: 19.45,
  e0: 20.6,
  f0: 21.83,
  fSharp0: 23.12,
  g0: 24.5,
  gSharp0: 25.96,
  a0: 27.5,
  aSharp0: 29.14,
  b0: 30.87,
  c1: 32.7,
  cSharp1: 34.65,
  d1: 36.71,
  dSharp1: 38.89,
  e1: 41.2,
  f1: 43.65,
  fSharp1: 46.25,
  g1: 49,
  gSharp1: 51.91,
  a1: 55,
  aSharp1: 58.27,
  b1: 61.74,
  c2: 65.41,
  cSharp2: 69.3,
  d2: 73.42,
  dSharp2: 77.78,
  e2: 82.41,
  f2: 87.31,
  fSharp2: 92.5,
  g2: 98,
  gSharp2: 103.83,
  a2: 110,
  aSharp2: 116.54,
  b2: 123.47,
  c3: 130.81,
  cSharp3: 138.59,
  d3: 146.83,
  dSharp3: 155.56,
  e3: 164.81,
  f3: 174.61,
  fSharp3: 185,
  g3: 196,
  gSharp3: 207.65,
  a3: 220,
  aSharp3: 233.08,
  b3: 246.94,
  c4: 261.63,
  cSharp4: 277.18,
  d4: 293.66,
  dSharp4: 311.13,
  e4: 329.63,
  f4: 349.23,
  fSharp4: 369.99,
  g4: 392,
  gSharp4: 415.3,
  a4: 440,
  aSharp4: 466.16,
  b4: 493.88,
  c5: 523.25,
  cSharp5: 554.37,
  d5: 587.33,
  dSharp5: 622.25,
  e5: 659.25,
  f5: 698.46,
  fSharp5: 739.99,
  g5: 783.99,
  gSharp5: 830.61,
  a5: 880,
  aSharp5: 932.33,
  b5: 987.77,
  c6: 1046.5,
  cSharp6: 1108.73,
  d6: 1174.66,
  dSharp6: 1244.51,
  e6: 1318.51,
  f6: 1396.91,
  fSharp6: 1479.98,
  g6: 1567.98,
  gSharp6: 1661.22,
  a6: 1760,
  aSharp6: 1864.66,
  b6: 1975.53,
  c7: 2093,
  cSharp7: 2217.46,
  d7: 2349.32,
  dSharp7: 2489.02,
  e7: 2637.02,
  f7: 2793.83,
  fSharp7: 2959.96,
  g7: 3135.96,
  gSharp7: 3322.44,
  a7: 3520,
  aSharp7: 3729.31,
  b7: 3951.07,
  c8: 4186.01,
  cSharp8: 4434.92,
  d8: 4698.63,
  dSharp8: 4978.03,
  e8: 5274.04,
  f8: 5587.65,
  fSharp8: 5919.91,
  g8: 6271.93,
  gSharp8: 6644.88,
  a8: 7040,
  aSharp8: 7458.62,
  b8: 7902.13
};

export default noteFrequencies;

// NOTE: Used on http://pages.mtu.edu/~suits/notefreqs.html to extract frequencies
const scrape = () => {
  const frequencies = Array.from(document.querySelectorAll('tr'))
    .filter(row => Array.from(row.querySelectorAll('td')).length === 3)
    .map(row => {
      const cells = Array.from(row.querySelectorAll('td'));
      const identifier = cells[0].textContent
        .split('/')[0]
        .toLowerCase()
        .trim()
        .replace('#', 'Sharp');
      const frequency = cells[1].textContent;

      return {
        name: identifier,
        frequency: Number(frequency)
      };
    })
    .reduce(
      (accumulator, note) =>
        Object.assign({}, accumulator, {
          [note.name]: note.frequency
        }),
      {}
    );
};
