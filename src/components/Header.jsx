import React from 'react';
import {Nav} from 'react-bootstrap';

const Header = props => {
  const {updateSortBy} = props;

  const handleClick = value => () => {
    updateSortBy(value);
  };
  return (
    <Nav variant="pills" defaultActiveKey="link-1">
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={handleClick('popularity.desc')}>
          Popular
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2" onClick={handleClick('vote_count.desc')}>
          Most voted
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-3" onClick={handleClick('release_date.desc')}>
          Recent
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
