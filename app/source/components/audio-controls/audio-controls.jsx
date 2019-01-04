import React from 'react';
import PropTypes from 'prop-types';

import Icon from '../icon';
import IconButton from '../icon-button';

const AudioControls = ({
  isMuted,
  onChangeVolume,
  onClickMute,
  onClickPlay,
  volume
}) => (
  <div className="audio-controls">
    <div className="audio-actions">
      <div className="audio-action">
        <IconButton icon={isMuted ? 'mute' : 'unmute'} onClick={onClickMute} />
      </div>
      <div className="audio-action">
        <IconButton
          disabled={isMuted}
          icon="triangle-right"
          onClick={() => {
            !isMuted && onClickPlay();
          }}
        />
      </div>
      <div className="audio-action audio-volume">
        <Icon className="audio-volume-icon" name="volume" />
        <input
          className="audio-volume-input"
          disabled={isMuted}
          onChange={e => {
            if (isMuted) {
              return;
            }

            onChangeVolume(Number(e.target.value));
          }}
          type="range"
          value={volume}
        />
      </div>
    </div>
  </div>
);

AudioControls.propTypes = {
  isMuted: PropTypes.bool,
  onChangeVolume: PropTypes.func.isRequired,
  onClickMute: PropTypes.func.isRequired,
  onClickPlay: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired
};

export default AudioControls;
