import $ from 'jquery';
import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

import ReactPlayer from 'react-player';

const ChoosePlaylist = (props) => {
  const [url, setURL] = useState("");
  const [title, setTitle] = useState();

  const getPlaylistID = (text) => {
    if (ReactPlayer.canPlay(text)) {
      let i = text.indexOf("list=") + "list=".length;
      let id = text.slice(i, text.length);
      if (id.includes("&index")) {
        id = id.substring(0, id.indexOf("&index"));
      }
      return id;
    }
    return null;
  }

  const validatePlaylistID = (id) => {
    const onError = _ => {
      setTitle("");
      setURL("");
    }

    $.ajax({
      url: "https://www.googleapis.com/youtube/v3/playlists",
      type: "get",
      data: {
        key: "AIzaSyCX4XsTjApcjNbPZ8pMXdG-VU4aQVnZsag",
        part: "snippet",
        id: id,
        maxResults: 1,
      },
      success: data => {
        if (data.items.length > 0) {
          const snippet = data.items[0].snippet;
          setTitle(snippet.title);

          setURL(id);
          localStorage.setItem("powerHourPlaylistID", id);
          props.setPlaylistID(id);
        } else {
          onError("")
        }
      },
      error: onError,
    });
  }

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption="Enter the URL of a YouTube playlist"
      helpText="This will contain the songs you'll drink to"
      step={stepNum}
    >
      <div>
        <Input onChange={x => {
          const id = getPlaylistID(x.target.value);
          id ? validatePlaylistID(id) : setURL("");
        }}
          placeholder="Enter a playlist URL"
        />
        <p>{title}</p>
      </div>
      <ButtonLink
        to={"/" + (stepNum + 1)}
        text="Next"
        enabled={url ? 1 : 0}
        errorMsg="Enter a valid playlist URL"
      />
    </PageTemplate >
  );
};

export default ChoosePlaylist;