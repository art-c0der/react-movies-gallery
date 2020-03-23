import React, { Component } from 'react';

const Image = props => {
	return <img src={props.src} alt={props.alt} width="100%"/>;
}

export default class MovieItem extends Component {
	state = {
		showDescription: false
	};

	toogleDescription = () => {
		this.setState({showDescription: !this.state.showDescription})
	}

	render() {
		const { movie: {name, description, img} } = this.props;
		return (
			<div className="movie">
				<Image src={img}/>
				<p>{name}</p>
				<div>
					<button className="btn btn--show" onClick={this.toogleDescription}>
						{this.state.showDescription? 'Hide' : 'Show'}
					</button>
				</div>
				{this.state.showDescription? <p>{description}</p> : null}
			</div>
		)
	}
}
