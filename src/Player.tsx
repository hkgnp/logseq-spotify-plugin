import React, { useState } from 'react';
import axios from 'axios';

const Player = (props) => {
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);

  const handlePlayer = async (option: string) => {
    await axios({
      method: option === 'previous' || option === 'next' ? 'post' : 'put',
      url: `https://api.spotify.com/v1/me/player/${option}`,
      headers: {
        Authorization: 'Bearer ' + logseq.settings.token,
      },
    });

    if (option === 'pause') {
      setIsPlaying(false);
    } else if (option === 'play') {
      setIsPlaying(true);
    } else {
      props.getCurrentlyPlaying();
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg flex flex-row">
      {/* IMAGE CONTAINER */}
      <div className="w-1/2">
        <img
          className="w-full rounded  md:block"
          src={props.album.images[0].url}
          alt="Album Pic"
        />
      </div>
      {/* IMAGE CONTAINER */}

      {/* ARTIST AND BUTTONS CONTAINER */}
      <div className="p-4 flex flex-col justify-center w-1/2 items-center">
        <h3 className="text-base text-center text-grey-darkest font-medium">
          {props.name}
        </h3>
        {props.artists
          ? props.artists.map((a) => (
              <p className="text-sm text-grey mt-1">{a.name}</p>
            ))
          : ''}

        {/* BUTTONS CONTAINER */}
        <div className="flex flex-row mt-4 items-center">
          {/* PREV */}
          <div className="text-grey-darker mr-3" id="prev">
            <svg
              onClick={() => handlePlayer('previous')}
              className="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
            </svg>
          </div>
          {/* PREV */}

          {/* PLAY PAUSE */}
          {isPlaying ? (
            <div className="text-green-800 p-2 rounded-full border border-green-800 shadow-lg hover:text-white hover:bg-green-800">
              <svg
                onClick={() => handlePlayer('pause')}
                className="w-5 h-5 m-0 cursor-pointer"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
              </svg>
            </div>
          ) : (
            <div className="text-green-800 p-2 rounded-full border border-green-800 shadow-lg hover:text-white hover:bg-green-800">
              <svg
                onClick={() => handlePlayer('play')}
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 m-0 icon icon-tabler icon-tabler-player-play cursor-pointer"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 4v16l13 -8z"></path>
              </svg>
            </div>
          )}
          {/* PLAY PAUSE */}

          {/* NEXT */}
          <div className="text-grey-darker ml-3">
            <svg
              onClick={() => handlePlayer('next')}
              className="w-8 h-8 cursor-pointer"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
            </svg>
          </div>
          {/* NEXT */}
        </div>
        {/* BUTTONS CONTAINER */}
      </div>
      {/* ARTISTS AND BUTTONS CONTAINER */}
    </div>
  );
};

export default Player;
