import React from 'react';
import MovieItem from './components/MovieItem';
import './App.css';



class App extends React.Component{
  state = {
    movies: []
  };

  getMoviesData = () =>{
    fetch('http://my-json-server.typicode.com/moviedb-tech/movies/list')
      .then(response => response.json())
      .then(data => this.setState({movies: data})
      )
  }

  removeMovie = id => {
    const updatedMovies = this.state.movies.filter(item => {
      return item.id !== id;
    });
    this.setState({movies: updatedMovies})
  }

  componentWillMount(){
    this.getMoviesData();
  }

  render(){
    const {movies} = this.state;
    return (
      <div className="movies-list">
        {movies.map((movie, index) => <MovieItem key={index} data={movie} removeMovie={this.removeMovie}/>)}
      </div>
    );
  }

}

export default App;
