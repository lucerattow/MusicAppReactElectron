import React from "react";
import { Grid, Loader } from "semantic-ui-react";
import { map, size } from "lodash";
import { Link } from "react-router-dom";
import "./ListArtists.scss";

export function ListArtists({ artists }) {
	if (size(artists) === 0) {
		return (
			<Loader active inline="centered" size="large">
				Cargando
			</Loader>
		);
	}

	//render
	return (
		<Grid className="list-artists">
			<Grid.Row columns={5}>
				{map(artists, artist => (
					<Grid.Column className="list-artists__artist" key={artist.id} as={Link} to={`/artists/${artist.id}`}>
						<div style={{ backgroundImage: `url(${artist.image})` }} />
						<p>{artist.name}</p>
					</Grid.Column>
				))}
			</Grid.Row>
		</Grid>
	);
}
