import { Link } from '@reach/router';
import ButtonIcon from "./ButtonIcon";
import DataTable from "react-data-table-component";

const Table = ({ rows, handleSelect, theme }) => {
  const columns = [
    {
      name: '',
      cell: row => <Link to="/drink">
        <ButtonIcon onClick={() => handleSelect(row)} icon="play_circle" active={true} size={45} />
      </Link>,
      width: '75px',
    },
    {
      name: 'Name',
      selector: row => row.name,
    },
    {
      name: 'Playlist',
      selector: row => row.playlist_name,
    },
    {
      name: 'Sound',
      selector: row => row.sound,
    },
    {
      name: 'Theme',
      selector: row => row.theme,
    },
    {
      name: '# Plays',
      selector: row => row.num_plays,
      width: '100px',
    },
  ];

  const style = {
    headRow: {
      style: {
        backgroundColor: theme.bg,
        borderBottomColor: theme.accent,
        color: theme.text,
      },
    },
    headCells: {
      style: {
        fontWeight: 600,
        color: theme.text,
        fontSize: '18px',
      },
    },
    rows: {
      style: {
        color: theme.text,
        backgroundColor: theme.bg,
        '&:not(:last-of-type)': {
          borderBottomWidth: '0px',
        },
      },
      highlightOnHoverStyle: {
        color: theme.text,
        backgroundColor: theme.medium,
        transitionDuration: '0.15s',
        transitionProperty: 'background-color',
        outlineColor: theme.accent,
        borderBottomColor: theme.accent,
      },
      stripedStyle: {
        color: theme.text,
        backgroundColor: theme.accent,
      }
    },
  };

  return (
    <div style={{ width: '90vw' }}>
      <DataTable
        columns={columns}
        data={rows}
        highlightOnHover
        striped
        customStyles={style}
      />
    </div>
  );
}

export default Table;