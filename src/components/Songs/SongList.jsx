import React from "react";
import { Loader, Icon, Table } from "semantic-ui-react";
import { map, size } from "lodash";
import { Link } from "react-router-dom";
import "./SongList.scss";

export function SongList({ songs }) {
	if (size(songs) === 0) {
		return (
			<Loader active inline="centered" size="large">
				Cargando
			</Loader>
		);
	}

	//render
  return (
    <Table inverted className="song-list">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Titulo</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {map(songs, (song) => (
          <Table.Row key={song.id}>
            <Table.Cell collapsing>
              <Icon name="play circle outline" />
            </Table.Cell>
            <Table.Cell>{song.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
	);
}
