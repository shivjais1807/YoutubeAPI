// src/components/VideoPlayer.js
import ReactPlayer from 'react-player/youtube';

const VideoPlayer = ({ videoId }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${videoId}`}
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default VideoPlayer;
