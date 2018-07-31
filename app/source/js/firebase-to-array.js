// Converts firebase snapshot (object) to array
module.exports = snapshot => {
  if (!snapshot.val || !snapshot.val()) {
    return [];
  }

  const values = [];

  snapshot.forEach(notification => {
    values.push(notification.val());
  });

  return values;
};
