import React from 'react';
import PropTypes from 'prop-types';

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
        <button className="audio-button" onClick={onClickMute}>
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
      <div className="audio-action">
        <button
          className="audio-button"
          disabled={isMuted}
          onClick={() => {
            if (isMuted) {
              return;
            }

            onClickPlay();
          }}
        >
          Play sound
        </button>
      </div>
      <div className="audio-action audio-volume">
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
