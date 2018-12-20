// Converts firebase snapshot (object) to array
export default snapshot => {
  if (!snapshot.val || !snapshot.val()) {
    return [];
  }

  const values = [];

  snapshot.forEach(notification => {
    values.push(notification.val());
  });

  return values;
};
