import * as firebase from 'firebase/app';
import 'firebase/database';

import firebaseInit from '../../../firebase-init.json';
import firebaseToArray from './firebase-to-array';

firebase.initializeApp(firebaseInit);
const database = firebase.database();

const onNotification = callback => {
  const reference = database.ref('notifications');

  reference
    .orderByChild('time')
    .limitToFirst(30)
    .on('value', snapshot => {
      callback(firebaseToArray(snapshot));
    });

  // NOTE: Returning `off` directly and calling it does not work, so we wrap instead of `bind`ing.
  return () => {
    reference.off();
  };
};

const onProjectUpdate = callback => {
  const reference = database.ref('projects');

  reference.on('value', snapshot => {
    callback(firebaseToArray(snapshot));
  });

  // NOTE: Returning `off` directly and calling it does not work, so we wrap instead of `bind`ing.
  return () => {
    reference.off();
  };
};

export default {
  onNotification,
  onProjectUpdate
};
