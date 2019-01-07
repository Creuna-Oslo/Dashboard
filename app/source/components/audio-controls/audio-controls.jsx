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
      {isMuted ? null : (
        <React.Fragment>
          <div className="audio-action">
            <IconButton icon="triangle-right" onClick={onClickPlay} />
          </div>
          <div className="audio-action audio-volume">
            <Icon className="audio-volume-icon" name="volume" />
            <input
              className="audio-volume-input"
              onChange={e => {
                onChangeVolume(Number(e.target.value));
              }}
              type="range"
              value={volume}
            />
          </div>
        </React.Fragment>
      )}
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
