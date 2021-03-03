import $ from 'jquery';

import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

function connectPlayer(token, playlistID) {
  window.onSpotifyWebPlaybackSDKReady = () => {

    // Define the Spotify Connect device, getOAuthToken has an actual token 
    // hardcoded for the sake of simplicity
    var player = new window.Spotify.Player({
      name: 'A Spotify Web SDK Player',
      getOAuthToken: callback => {
        callback(token);
      },
    });

    // Called when connected to the player created beforehand successfully
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);

      const play = ({
        spotify_uri,
        playerInstance: {
          _options: {
            getOAuthToken,
            id
          }
        }
      }) => {
        getOAuthToken(access_token => {
          fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${access_token}`
            },
          });
        });
      };

      play({
        playerInstance: player,
        spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
      });
    });

    // Connect to the player created beforehand, this is equivalent to 
    // creating a new device which will be visible for Spotify Connect
    player.connect();
  };
}

// function connectPlayer(token, playlistID) {
//   window.onSpotifyWebPlaybackSDKReady = async () => {
//     spotifyApi.setAccessToken(token);
//     const userURI = (await spotifyApi.getPlaylist(playlistID)).owner.uri;

//     const player = new window.Spotify.Player({
//       name: 'Our Power Hour',
//       getOAuthToken: cb => { cb(token); }
//     });

//     // Error handling
//     player.on('initialization_error', e => console.error(e));
//     player.on('authentication_error', e => console.error(e));
//     player.on('account_error', e => console.error(e));
//     player.on('playback_error', e => console.error(e));

//     // Playback status updates
//     player.on('player_state_changed', state => {
//       // console.log(state)
//       // $('#current-track').attr('src', state.track_window.current_track.album.images[0].url);
//       // $('#current-track-name').text(state.track_window.current_track.name);
//     });

//     // Ready
//     player.on('ready', data => {
//       console.log('Ready with Device ID', data.device_id);

//       // Play a track using our new device ID
//       play({ playerInstance: player, spotify_uri: 'spotify:playlist:' + playlistID })
//       // play(token, userURI, playlistID, data.device_id);
//     });

//     // Connect to the player!
//     player.connect();
//   }
// }

// // Play a specified track on the Web Playback SDK's device ID
// function play(token, userURI, playlistID, device_id) {
//   $.ajax({
//     url: "https://api.spotify.com/v1/me/player/play?device_id=" + device_id,
//     type: "PUT",
//     data: `{"context_uri": "spotify:playlist:${playlistID}"}`,
//     beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + token); },
//     success: function (data) {
//       console.log(data)
//     },
//     error: function (data) {
//       console.log(data)
//     }
//   });
// }

export { connectPlayer };