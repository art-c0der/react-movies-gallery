import React from 'react';
import Header from './Header';
import MovieItem from './MovieItem';
import PaginationList from './PaginationList';
import {API_URL, API_KEY_3} from '../utils/api';
import {Container, Row, Col, ListGroup, Badge} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

class App extends React.Component {
  state = {
    movies: [],
    moviesWillWatch: [],
    sortBy: 'popularity.desc',
    activePage: 1
  };

  getMoviesData = () => {
    fetch(`${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sortBy}&page=${this.state.activePage}`)
      .then(response => response.json())
      .then(data => this.setState({movies: data.results}));
  };

  updateSortBy = sortBy => {
    this.setState({sortBy: sortBy});
  };

  updatePage = page => {
    this.setState({activePage: page});
  };

  removeMovie = id => {
    const updatedMovies = this.state.movies.filter(movie => {
      return movie.id !== id;
    });

    const updatedMoviesWillWatch = this.state.moviesWillWatch.filter(movie => {
      return movie.id !== id;
    });
    this.setState({movies: updatedMovies, moviesWillWatch: updatedMoviesWillWatch});
  };

  addMoviesToWillWatch = movie => {
    const updatedMovies = [...this.state.moviesWillWatch, movie];
    this.setState({moviesWillWatch: updatedMovies});
  };

  removeMoviesFromWillWatch = id => {
    const updatedMovies = this.state.moviesWillWatch.filter(movie => {
      return movie.id !== id;
    });
    this.setState({moviesWillWatch: updatedMovies});
  };

  componentWillMount() {
    this.getMoviesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sortBy !== this.state.sortBy || prevState.activePage !== this.state.activePage) {
      this.getMoviesData();
    }
  }

  render() {
    console.log('test');
    return (
      <Container>
        <Row className="border-top-0 border-primary my-3">
          <Header updateSortBy={this.updateSortBy} />
        </Row>
        <Row>
          <Col sm="9">
            <Row>
              {this.state.movies.map(movie => (
                <Col lg="4" sm="6" key={movie.id}>
                  <MovieItem
                    movie={movie}
                    removeMovie={this.removeMovie}
                    addMoviesToWillWatch={this.addMoviesToWillWatch}
                    removeMoviesFromWillWatch={this.removeMoviesFromWillWatch}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm="3">
            <div className="favorites">
              <h4 className="favorites__label">
                Will watch movies: {this.state.moviesWillWatch.length}
              </h4>
              <ListGroup variant="flush" className="favorites__list">
                {this.state.moviesWillWatch.map(movie => (
                  <ListGroup.Item key={movie.id}>
                    {movie.title}
                    <Badge pill variant="success" className="ml-2">
                      {movie.vote_average}
                    </Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <PaginationList activePage={this.state.activePage} updatePage={this.updatePage} />
        </Row>
      </Container>
    );
  }
}

export default App;
