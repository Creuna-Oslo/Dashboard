import React from 'react';
import FlipMotion from 'react-flip-motion';

import AudioControls from '../audio-controls';
import AudioPlayer from 'js/audio/audio-player';
import firebase from 'js/firebase-helper';
import NotificationComponent from '../notification';
import spawnNativeNotification from '../notification/native-notification';

const newNotification = (previousNotifications, nextNotifications) =>
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
    volume: 20,
    nativeNotificationPermission: Notification.permission
  };

  audioPlayer = undefined;

  handleChangeVolume = volume => {
    this.setState({ volume });
  };

  handleNewNotification = () => {
    this.play();
    if (this.state.nativeNotificationPermission === 'granted') {
      spawnNativeNotification(this.state.notifications[0]);
    }
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

  requestNativeNotificationPermission = () => {
    Notification.requestPermission().then(result =>
      this.setState({ nativeNotificationPermission: result })
    );
  };

  componentDidMount() {
    this.requestNativeNotificationPermission();
    this.unsubscribe = firebase.onNotification(notifications => {
      this.setState(previousState => {
        if (newNotification(previousState.notifications, notifications)) {
          this.handleNewNotification();
        }
        return { notifications };
      });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <React.Fragment>
        <FlipMotion className="notifications">
          {this.state.notifications.map(item => (
            <NotificationComponent key={item.time} {...item} />
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
