import * as firebase from 'firebase/app';
import 'firebase/database';

import firebaseInit from '../../../firebase-init.json';
import firebaseToArray from './firebase-to-array';

firebase.initializeApp(firebaseInit);
const database = firebase.database();

const onBuildStatus = callback => {
  database.ref('builds').on('value', snapshot => {
    callback(firebaseToArray(snapshot));
  });
};

const onNotification = callback => {
  database
    .ref('notifications')
    .orderByChild('time')
    .limitToFirst(30)
    .on('value', snapshot => {
      callback(firebaseToArray(snapshot));
    });
};

const onPackageUpdate = callback => {
  database.ref('packages').on('value', snapshot => {
    callback(firebaseToArray(snapshot));
  });
};

const onProjectUpdate = callback => {
  database.ref('projects').on('value', snapshot => {
    callback(firebaseToArray(snapshot));
  });
};

module.exports = {
  onBuildStatus,
  onNotification,
  onPackageUpdate,
  onProjectUpdate
};
