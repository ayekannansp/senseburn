import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SearchIcon from './icon/SearchIcon';

function SearchBox() {
  return (
    <InputGroup className="search">
        <InputGroup.Text id="basic-addon1"><SearchIcon/></InputGroup.Text>
        <Form.Control
          placeholder="Search.."
          type='search'
        />
      </InputGroup>
  )
}

export default SearchBox