function playSound(context, frequency, time, outputNode = context.destination) {
  const gainNode = context.createGain();
  const oscillator = context.createOscillator();

  gainNode.connect(outputNode);
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);

  const { gain } = gainNode;
  gain.setValueAtTime(0, time);
  gain.linearRampToValueAtTime(1, time + 0.1);
  gain.setValueAtTime(1, time + 0.15);
  gain.exponentialRampToValueAtTime(0.001, time + 0.3);

  oscillator.start(time);
  oscillator.stop(time + 1);
}

export default playSound;
