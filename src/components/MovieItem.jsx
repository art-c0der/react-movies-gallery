import React, {Component} from 'react';
import {Card, Button, Badge} from 'react-bootstrap';

export default class MovieItem extends Component {
  state = {
    showDescription: false,
    willWatch: false
  };

  toogleDescription = () => {
    this.setState({showDescription: !this.state.showDescription});
  };

  render() {
    const {
      movie: {title, overview, id, poster_path, backdrop_path},
      removeMovie,
      addMoviesToWillWatch,
      removeMoviesFromWillWatch,
      movie
    } = this.props;

    return (
      <Card style={{width: '100%', marginBottom: '20px'}}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w300/${poster_path || backdrop_path}`}
          alt={title}
        />
        <Card.Body>
          <Card.Title>
            {title}
            <Badge pill variant="warning" className="ml-1">
              {movie.vote_average}
            </Badge>
          </Card.Title>
          <Card.Text>{this.state.showDescription ? <p>{overview}</p> : null}</Card.Text>
          <Button variant="success" size="sm" className="mr5" onClick={this.toogleDescription}>
            {' '}
            {this.state.showDescription ? 'Hide description' : 'Show description'}
          </Button>
          {this.state.willWatch ? (
            <Button
              variant="default"
              size="sm"
              onClick={() => {
                this.setState({willWatch: false});
                removeMoviesFromWillWatch(id);
              }}
            >
              Won't watch
            </Button>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                this.setState({willWatch: true});
                addMoviesToWillWatch(movie);
              }}
            >
              Will watch
            </Button>
          )}
          <Button variant="outline-danger" size="sm" onClick={removeMovie.bind(null, id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
