import React, { Component } from 'react';
import api from '../../services/api';

import { Container, Form } from './styles';

import logo from '../../assets/logo.png';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    respositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();

    const { repositories, respositoryInput } = this.state;

    try {
      const repoData = await api.get(`repos/${respositoryInput}`);
      this.setState({
        respositoryInput: '',
        repositories: [...repositories, repoData.data],
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { respositoryInput, repositories } = this.state;

    return (
      <Container>
        <img src={logo} alt="GitHub Compare" />
        <Form onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="user/repository"
            value={respositoryInput}
            onChange={e => this.setState({ respositoryInput: e.target.value })}
          />
          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}
