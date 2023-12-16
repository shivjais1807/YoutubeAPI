// src/App.js
import { useState } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';

function App() {
  const [videoId, setVideoId] = useState('');
  const [error, setError] = useState(null);
  const [videos, setVideos] = useState([]);

  const handleFetchVideo = async () => {
    try {
      const apiKey = 'AIzaSyBw_yIRMVrQPegeMhSw4j45AiUZ9OfWuXo'; // Replace with your actual YouTube API key
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${apiKey}&q=${videoId}`
      );

      if (response.data.items.length > 0) {
        setVideos(response.data.items);
        setError(null);
      } else {
        setError('No videos found');
      }
    } catch (err) {
      setError('Error fetching videos');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">YouTube Video Player</h1>
      <div className="flex justify-center items-center mb-8">
        <input
          type="text"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
          placeholder="Enter YouTube Video ID"
          className="border border-gray-300 w-64 rounded p-4 focus:outline-none"
        />
        <button
          onClick={handleFetchVideo}
          className="bg-blue-500 text-white p-4 ml-2 rounded hover:bg-blue-600"
        >
          Fetch Videos
        </button>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 w-4/5 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video.id.videoId} className="bg-white p-4 rounded-md shadow-md">
            <VideoPlayer videoId={video.id.videoId} />
            <p className="mt-3 text-center text-lg font-semibold">{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
