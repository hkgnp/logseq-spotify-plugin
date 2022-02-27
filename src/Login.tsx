import React from 'react';

function Login(props: any) {
  const login = () => {
    top?.window.open('https://logseq-spotify.herokuapp.com/auth/login');
  };

  const saveToken = () => {
    logseq.updateSettings({
      token: props.token,
    });
  };

  return (
    <div className="flex flex-col">
      <button
        className="bg-green-700 text-white mb-4 rounded-lg p-2"
        onClick={login}
      >
        Step 1: Login with Spotify
      </button>
      <div className="flex flex-row justify-between mb-4">
        <input
          type="search"
          className="text-xs shadow rounded p-3 mr-3 border-purple-700 w-5/6"
          placeholder="Step 2: Key in your access token"
          onChange={props.handleAccessToken}
          value={props.token}
        />
        <button
          className="border-green-700 text-green-700 bg-white"
          onClick={saveToken}
        >
          Save Token
        </button>
        <button
          className="bg-green-700 text-white font-bold w-1/6 rounded-lg text-xs hover:bg-green-300"
          onClick={props.getCurrentlyPlaying}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}

export default Login;
