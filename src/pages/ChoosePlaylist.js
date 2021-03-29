import { useState } from 'react';
import PageTemplate from './PageTemplate';
import ButtonLink from '../components/ButtonLink';
import Input from '../styles/Input';

const ChoosePlaylist = (props) => {
  const [url, setURL] = useState("");

  const getPlaylistID = () => {
    let validID = null;

    const i = url.indexOf("list=") + "list=".length;
    const id = url.slice(i, url.length);
    // if (id.length === 18) {
    validID = id;
    // }
    if (validID) {
      localStorage.setItem("powerHourPlaylistID", validID);
      props.setPlaylistID(validID);
    }
  }

  const stepNum = Number(props.path.substring(1));

  return (
    <PageTemplate
      title={"Step " + stepNum}
      caption={`Enter the URL of a YouTube playlist`}
      step={stepNum}
    >
      <Input onChange={x => setURL(x.target.value)} />
      <ButtonLink
        to={"/" + (stepNum + 1)}
        text="Next"
        onClick={getPlaylistID}
        enabled={url ? 1 : 0}
        errorMsg="Enter a valid playlist URL"
      />
    </PageTemplate >
  );
};

export default ChoosePlaylist;