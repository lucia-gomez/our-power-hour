import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

import ReactPlayer from 'react-player';

const ChoosePlaylist = (props) => {
  const [url, setURL] = useState("");

  const checkPlaylistID = (text) => {
    if (ReactPlayer.canPlay(text)) {
      let i = text.indexOf("list=") + "list=".length;
      let id = text.slice(i, text.length);
      if (id.includes("&index")) {
        id = id.substring(0, id.indexOf("&index"));
      }

      setURL(id);
      localStorage.setItem("powerHourPlaylistID", id);
      props.setPlaylistID(id);
    } else {
      setURL("");
    }
  }

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption={`Enter the URL of a YouTube playlist`}
      step={stepNum}
    >
      <Input onChange={x => {
        checkPlaylistID(x.target.value);
      }
      } />
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