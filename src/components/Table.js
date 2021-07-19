// import styled from "styled-components";
import { Link } from '@reach/router';
import ButtonIcon from "./ButtonIcon";

const Table = ({ rows, handleSelect }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Playlist</th>
          <th>Sound</th>
          <th>Theme</th>
          <th># Plays</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) =>
          <tr key={idx}>
            <td>{row.name}</td>
            <td>{row.playlist_name}</td>
            <td>{row.name}</td>
            <td>{row.sound}</td>
            <td>{row.theme}</td>
            <td>
              <Link to="/drink">
                <ButtonIcon onClick={() => handleSelect(row)} icon="play_circle" active={true} />
              </Link>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;