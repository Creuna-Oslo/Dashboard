// Connects any number of provided audio nodes from left to right
function chain(...nodes) {
  nodes.forEach((node, index) => {
    const prev = nodes[index - 1];

    if (prev) {
      prev.connect(node);
    }
  });
}

export default chain;
