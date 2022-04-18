import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { callApi } from "./callApi";

interface playingDataProps {
  currentlyPlayingData?: {
    item: {
      name: string;
      album: {
        images: any[];
      };
      artists: any[];
      duration_ms: number;
      show: {
        name: string;
        publisher: string;
        images: any[];
      };
    };
    artists: any[];
    album: {};
    is_playing: boolean;
    device: {
      name: string;
    };
  };
}

const App: React.FC<playingDataProps> = (props) => {
  const [token, setToken] = useState(logseq.settings.token);
  const [loaded, setLoaded] = useState(false);
  const [currentlyPlaying, setCurrentPlaying] = useState(
    props.currentlyPlayingData
  );

  useEffect(() => {
    if (
      logseq.settings.token !== "" &&
      props.currentlyPlayingData !== undefined
    ) {
      setCurrentPlaying(props.currentlyPlayingData);
      setLoaded(true);
    } else {
      setToken("");
      setLoaded(false);
    }
  }, []);

  const handleAccessToken = (e: Event) => {
    setToken((e.target as HTMLInputElement).value);
  };

  const getCurrentlyPlaying = () => {
    logseq.updateSettings({
      token: token,
    });

    window.setTimeout(async () => {
      const response = await callApi();

      if (response.status === 204) {
        logseq.hideMainUI();
        logseq.App.showMsg(
          "Please ensure that Spotify is running and a song is playing.",
          "error"
        );
        return;
      } else if (response.status === 200) {
        setCurrentPlaying(response.data);
        setLoaded(true);
      } else {
        logseq.App.showMsg(
          "Your access token has expired. Please login above, grab the access token, and try again",
          "error"
        );
        setLoaded(false);
        setToken("");
        return;
      }
    }, 500);
  };

  return (
    <div
      className=" flex justify-center border border-black font-sans"
      tabIndex={-1}
    >
      <div
        className="absolute top-10 bg-white rounded-lg p-3 border flex flex-col justify-center"
        style={{ width: "28rem" }}
      >
        {/* Insert here */}
        {!loaded && (
          <Login
            getCurrentlyPlaying={getCurrentlyPlaying}
            handleAccessToken={handleAccessToken}
            token={token}
          />
        )}
        {loaded && (
          <Player
            name={currentlyPlaying.item.name}
            artists={currentlyPlaying.item.artists}
            album={currentlyPlaying.item.album}
            isPlaying={currentlyPlaying.is_playing}
            deviceName={currentlyPlaying.device.name}
            songDuration={currentlyPlaying.item.duration_ms}
            show={currentlyPlaying.item.show}
            getCurrentlyPlaying={getCurrentlyPlaying}
          />
        )}
        {/* End here */}
      </div>
    </div>
  );
};

export default App;
