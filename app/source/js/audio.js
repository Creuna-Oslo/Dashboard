import noteFrequencies from './note-frequencies';
import Sound from './sound';

const play = (context, frequency = noteFrequencies.gSharp3) => {
  if (!context || isNaN(frequency)) {
    return;
  }

  const sound = new Sound(context);
  sound.play(frequency);
  sound.stop();
};

export default {
  frequencies: noteFrequencies,
  play
};
