import React from 'react';
import FlipMotion from 'react-flip-motion';

import audio from 'js/audio';
import AudioContext from 'js/audio-context';
import firebase from 'js/firebase-helper';
import Notification from '../notification';

const shouldPlayAudio = (previousNotifications, nextNotifications) =>
  previousNotifications &&
  nextNotifications &&
  previousNotifications.length > 0 &&
  nextNotifications.length > 0 &&
  previousNotifications[0].time &&
  nextNotifications[0].time &&
  previousNotifications[0].time !== nextNotifications[0].time;

class Notifications extends React.Component {
  state = {
    isMuted: true,
    notifications: []
  };

  audioContext = undefined;

  play = () => {
    audio.play(this.audioContext);
  };

  toggleMute = () => {
    this.setState(
      previousState => ({ isMuted: !previousState.isMuted }),
      () => {
        if (this.state.isMuted) {
          this.audioContext = undefined;
        } else {
          this.audioContext = new AudioContext();
        }
      }
    );
  };

  componentDidMount() {
    firebase.onNotification(notifications => {
      this.setState(previousState => {
        if (shouldPlayAudio(previousState.notifications, notifications)) {
          this.play();
        }

        return { notifications };
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <FlipMotion className="notifications">
          {this.state.notifications.map(item => (
            <Notification key={item.time} {...item} />
          ))}
        </FlipMotion>
        <div className="audio-actions">
          <button className="audio-action" onClick={this.toggleMute}>
            {this.state.isMuted ? 'Unmute' : 'Mute'}
          </button>
          <button className="audio-action" onClick={this.play}>
            Play sound
          </button>
        </div>
      </React.Fragment>
    );
  }
}

export default Notifications;
