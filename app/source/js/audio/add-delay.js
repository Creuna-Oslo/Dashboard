function monoDelay(
  context,
  inputNode,
  time = 0.5,
  gain = 0.2,
  feedback = 0.5,
  outputNode = context.destination
) {
  const delayNode = context.createDelay(time); // constructur sets maxDelayTime
  const feedbackNode = context.createGain();
  const gainNode = context.createGain();

  delayNode.delayTime.value = time;
  feedbackNode.gain.value = feedback;
  gainNode.gain.value = gain;

  inputNode.connect(delayNode);
  delayNode.connect(feedbackNode);
  feedbackNode.connect(delayNode);
  delayNode.connect(gainNode);
  gainNode.connect(outputNode);
}

function pingPongDelay(
  context,
  inputNode,
  time = 0.5,
  gain = 0.2,
  feedback = 0.5,
  outputNode = context.destination
) {
  const panLeftNode = context.createStereoPanner();
  const panRightNode = context.createStereoPanner();
  const delayNode = context.createDelay(time); // constructur sets maxDelayTime

  const cycleTime = time * 2;
  const leftGain = gain * feedback;
  const rightGain = gain * Math.pow(feedback, 2);

  panLeftNode.pan.value = -1;
  panRightNode.pan.value = 1;
  delayNode.delayTime.value = time;

  inputNode.connect(delayNode);

  monoDelay(context, inputNode, cycleTime, leftGain, feedback, panLeftNode);
  monoDelay(context, delayNode, cycleTime, rightGain, feedback, panRightNode);

  // Because of the doubling of the delay duration in the L/R channels, there will be a silence of 'time * 2' seconds before the delay effect starts. This adds a single echo in the right channel which fills the gap.
  monoDelay(context, inputNode, time, gain, 0, panRightNode);

  panLeftNode.connect(outputNode);
  panRightNode.connect(outputNode);
}

export default {
  mono: monoDelay,
  pingPong: pingPongDelay
};
