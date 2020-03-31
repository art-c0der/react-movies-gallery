import React from 'react';
import {Pagination} from 'react-bootstrap';

const PaginationList = props => {
  const {sortBy, activePage, refreshMoviesData} = props;

  const handleClick = (sortBy, number) => () => {
    refreshMoviesData(sortBy, number);
  };
  let active = activePage;
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={handleClick(sortBy, number)}
      >
        {number}
      </Pagination.Item>
    );
  }
  return <Pagination>{items}</Pagination>;
};

export default PaginationList;
