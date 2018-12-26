const AudioContext = () => {
  if (!window.AudioContext && !window.webkitAudioContext) {
    return;
  }

  return new (window.AudioContext || window.webkitAudioContext)();
};

export default AudioContext;
