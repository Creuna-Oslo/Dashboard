import noteFrequencies from './note-frequencies';
import playSound from './play-sound';

const play = context => {
  if (!context) {
    return;
  }

  const outNode = context.createGain();
  const time = context.currentTime;

  playSound(context, noteFrequencies.g4, time, outNode);
  playSound(context, noteFrequencies.a4, time + 0.15, outNode);
  playSound(context, noteFrequencies.d5, time + 0.3, outNode);

  outNode.connect(context.destination);
};

export default {
  frequencies: noteFrequencies,
  play
};
