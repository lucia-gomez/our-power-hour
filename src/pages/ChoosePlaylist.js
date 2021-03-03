import { useState, useEffect } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';
import Button from '../styles/Button';

const ChoosePlaylist = (props) => {
  useEffect(() => {
    const params = getHashParams();
    const access_token = params.access_token;
    if (access_token) {
      localStorage.setItem('powerHourAccessToken', access_token);
      props.setSpotifyAccessToken(access_token);
    }
  });

  const [url, setURL] = useState("");

  const getPlaylistID = () => {
    let validID = null;
    if (props.mode === "Spotify") {
      const i = url.indexOf("playlist/") + "/playlist".length;
      const id = url.slice(i, i + 22);
      if (id.length === 22) {
        validID = id;
      }
    } else if (props.mode === "YouTube") {
      const i = url.indexOf("list=") + "list=".length;
      const id = url.slice(i, url.length);
      // if (id.length === 18) {
      validID = id;
      // }
    }
    if (validID) {
      localStorage.setItem("powerHourPlaylistID", validID);
      props.setPlaylistID(validID);
    }
  }

  return (
    <PageTemplate
      title="Step 2"
      caption={`Enter the URL of a ${props.mode} playlist`}
      path={props.path}
      step={2}
    >
      {props.mode === "Spotify" ? <a href="http://localhost:8080/login"><Button>Log in</Button></a> : null}
      <Input onChange={x => setURL(x.target.value)} />
      <ButtonLink
        to="/3"
        text="Next"
        onClick={getPlaylistID}
        enabled={url ? 1 : 0}
        errorMsg="Enter a valid playlist URL"
      />
    </PageTemplate >
  );
};

function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

export default ChoosePlaylist;