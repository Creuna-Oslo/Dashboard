import * as firebase from 'firebase/app';
import 'firebase/database';

import firebaseInit from '../../../firebase-init.json';
import firebaseToArray from './firebase-to-array';
import time from 'js/time-helper';

firebase.initializeApp(firebaseInit);
const database = firebase.database();

const onNotification = callback => {
  database
    .ref('notifications')
    .orderByChild('time')
    .limitToFirst(30)
    .on('value', snapshot => {
      callback(firebaseToArray(snapshot));
    });
};

const onNotificationByMonth = callback => {
  database
    .ref('notifications')
    .orderByChild('time')
    .endAt(-time.thisMonth()) // Notifications have a negative timestamp in the database
    .on('value', snapshot => {
      callback(firebaseToArray(snapshot));
    });
};

const onProjectUpdate = callback => {
  database.ref('projects').on('value', snapshot => {
    callback(firebaseToArray(snapshot));
  });
};

export default {
  onNotification,
  onNotificationByMonth,
  onProjectUpdate
};
