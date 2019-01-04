import React from 'react';
import FlipMotion from 'react-flip-motion';

import AudioControls from '../audio-controls';
import AudioPlayer from 'js/audio/audio-player';
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
    notifications: [],
    volume: 20
  };

  audioPlayer = undefined;

  handleChangeVolume = volume => {
    this.setState({ volume });
  };

  play = () => {
    if (this.audioPlayer) {
      this.audioPlayer.play(this.state.volume);
    }
  };

  toggleMute = () => {
    this.setState(
      previousState => ({ isMuted: !previousState.isMuted }),
      () => {
        if (this.state.isMuted) {
          this.audioPlayer = undefined;
        } else {
          this.audioPlayer = new AudioPlayer();
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
        <AudioControls
          isMuted={this.state.isMuted}
          onChangeVolume={this.handleChangeVolume}
          onClickMute={this.toggleMute}
          onClickPlay={this.play}
          volume={this.state.volume}
        />
      </React.Fragment>
    );
  }
}

export default Notifications;
