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
      movie: {title, overview, id, vote_average, poster_path, backdrop_path},
      removeMovie,
      addMoviesToWillWatch,
      removeMoviesFromWillWatch,
      movie
    } = this.props;

    return (
      <Card style={{width: '100%', marginBottom: '20px'}}>
        <Card.Img
          variant="top"
          className="movie__img"
          src={
            poster_path || backdrop_path
              ? `https://image.tmdb.org/t/p/w300/${poster_path || backdrop_path}`
              : '/img/film-poster-placeholder.png'
          }
          alt={title}
        />
        <Card.Body>
          <Card.Title>
            {title}
            <Badge pill variant="warning" className="ml-1">
              {vote_average}
            </Badge>
          </Card.Title>
          <Card.Text>{this.state.showDescription ? overview || 'No description' : null}</Card.Text>
          <Button variant="dark" size="sm" className="mr-1 mb-1" onClick={this.toogleDescription}>
            {' '}
            {this.state.showDescription ? 'Hide description' : 'Show description'}
          </Button>
          {this.state.willWatch ? (
            <Button
              variant="light"
              size="sm"
              className="mr-1 mb-1"
              onClick={() => {
                this.setState({willWatch: false});
                removeMoviesFromWillWatch(id);
              }}
            >
              Won't watch
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              className="mr-1 mb-1"
              onClick={() => {
                this.setState({willWatch: true});
                addMoviesToWillWatch(movie);
              }}
            >
              Will watch
            </Button>
          )}
          <Button
            variant="outline-danger"
            size="sm"
            className="mb-1"
            onClick={removeMovie.bind(null, id)}
          >
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
