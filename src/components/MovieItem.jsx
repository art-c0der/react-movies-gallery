import React, {Component} from 'react';
import {Card, Button} from 'react-bootstrap';

export default class MovieItem extends Component {
  state = {
    showDescription: false
  };

  toogleDescription = () => {
    this.setState({showDescription: !this.state.showDescription});
  };

  render() {
    const {
      data: {name, description, id, img},
      removeMovie
    } = this.props;

    return (
      <Card style={{width: '100%', marginBottom: '20px'}}>
        <Card.Img variant="top" src={img} alt={name} thumbnail />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{this.state.showDescription ? <p>{description}</p> : null}</Card.Text>
          <Button variant="primary" onClick={this.toogleDescription}>
            {' '}
            {this.state.showDescription ? 'Hide description' : 'Show description'}
          </Button>
          <Button variant="danger" onClick={removeMovie.bind(null, id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
