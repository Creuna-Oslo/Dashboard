function playSound(
  context,
  frequency,
  time,
  outputNode = context.destination,
  volume = 50
) {
  const gainNode = context.createGain();
  const oscillator = context.createOscillator();

  gainNode.connect(outputNode);
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  oscillator.connect(gainNode);

  const { gain } = gainNode;
  const maxVolume = Math.min(volume / 100, 1);
  gain.setValueAtTime(0, time);
  gain.linearRampToValueAtTime(maxVolume, time + 0.1);
  gain.setValueAtTime(maxVolume, time + 0.15);
  gain.exponentialRampToValueAtTime(0.001, time + 0.3);

  oscillator.start(time);
  oscillator.stop(time + 1);
}

export default playSound;
