import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'rsuite';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: this.props.word
    };
  }
  handleSearch = (word) =>{
    this.setState({
      word
    });
    this.props.onChange(word);
  }

  render() {
    return (
      <FormControl
        type="text"
        placeholder="查询关键字"
        value={this.state.word}
        onChange={this.handleSearch}
      />
    );
  }
}

export default SearchInput;
