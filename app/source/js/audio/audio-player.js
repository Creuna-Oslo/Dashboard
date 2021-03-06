import AudioContext from './audio-context';
import addDelay from './add-delay';
import noteFrequencies from './note-frequencies';
import playSound from './play-sound';

class AudioPlayer {
  constructor() {
    const context = new AudioContext();
    const outNode = context.createGain();

    addDelay.pingPong(context, outNode, 0.6, 0.3, 0.2);
    outNode.connect(context.destination);

    this.context = context;
    this.outNode = outNode;
  }

  play(volume = 50) {
    const { context, outNode } = this;
    const time = context.currentTime;

    playSound(context, noteFrequencies.g4, time, outNode, volume);
    playSound(context, noteFrequencies.a4, time + 0.15, outNode, volume);
    playSound(context, noteFrequencies.d5, time + 0.3, outNode, volume);
  }
}

export default AudioPlayer;
