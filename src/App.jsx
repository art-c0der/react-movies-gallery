import React from 'react';
import MovieItem from './components/MovieItem';
import {Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    movies: []
  };

  getMoviesData = () => {
    fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
      .then(response => response.json())
      .then(data =>
        this.setState({
          movies: data
        })
      );
  };

  removeMovie = id => {
    const updatedMovies = this.state.movies.filter(item => {
      return item.id !== id;
    });
    this.setState({
      movies: updatedMovies
    });
  };

  componentWillMount() {
    this.getMoviesData();
  }

  render() {
    const {movies} = this.state;
    return (
      <Container>
        <Row>
          <Col sm="9">
            <Row>
              {movies.map((movie, index) => (
                <Col lg="4" key={index}>
                  <MovieItem data={movie} removeMovie={this.removeMovie} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm="3">Will watch: 0</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
