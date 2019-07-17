import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";

import { Container, Form } from "./styles";

import logo from "../../assets/logo.png";

import CompareList from "../../components/CompareList";

export default class Main extends Component {
    state = {
        repositoryInput: "",
        repositories: [],
        repositoryError: false,

        isLoading: false
    };

    formatLastCommit = repository => {
        repository.lastCommit = moment(repository.pushed_at).fromNow();
    };

    getRepository = async repositoryPath => {
        const { data } = await api.get(`repos/${repositoryPath}`);
        this.formatLastCommit(data);

        return data;
    };

    handleAddRepository = async e => {
        e.preventDefault();
        this.setState({ isLoading: true });

        const { repositories, repositoryInput } = this.state;

        try {
            let repositoryData = JSON.parse(
                localStorage.getItem(`@GitCompare:${repositoryInput}`)
            );
            console.log(repositoryData);

            if (!repositoryData) {
                const repository = await this.getRepository(repositoryInput);

                localStorage.setItem(
                    `@GitCompare:${repository.id}`,
                    JSON.stringify(repository)
                );

                repositoryData = repository;
            }

            this.setState({
                repositoryInput: "",
                repositories: [...repositories, repositoryData],
                repositoryError: false
            });
        } catch (err) {
            this.setState({
                repositoryError: true,
                repositoryInput: ""
            });
        } finally {
            this.setState({ isLoading: false });
        }
    };

    handleUpdateRepository = async id => {
        const { repositories } = this.state;

        const {
            owner: { login },
            name
        } = repositories.find(repo => repo.id === id);

        const repoPath = `${login}/${name}`;

        const repository = await this.getRepository(repoPath);

        this.setState({
            repositories: repositories.map(repo => {
                if (repo.id === id) {
                    return repository;
                }
                return repo;
            })
        });

        localStorage.setItem(
            `@GitCompare:${repository.id}`,
            JSON.stringify(repository)
        );
    };

    handleDeleteRepository = id => {
        const { repositories } = this.state;

        this.setState({
            repositories: repositories.filter(repo => id !== repo.id)
        });

        localStorage.removeItem(`@GitCompare:${id}`);
    };

    render() {
        const {
            repositoryInput,
            repositories,
            repositoryError,
            isLoading
        } = this.state;

        return (
            <Container>
                <img src={logo} alt="GitHub Compare" />
                <Form
                    onSubmit={this.handleAddRepository}
                    withError={repositoryError}
                >
                    <input
                        type="text"
                        placeholder="user/repository"
                        value={repositoryInput}
                        onChange={e =>
                            this.setState({ repositoryInput: e.target.value })
                        }
                    />
                    <button type="submit">
                        {isLoading ? (
                            <i className="fa fa-spinner fa-pulse" />
                        ) : (
                            "OK"
                        )}
                    </button>
                </Form>
                <CompareList
                    repositories={repositories}
                    deleteHandler={this.handleDeleteRepository}
                    updateHandler={this.handleUpdateRepository}
                />
            </Container>
        );
    }
}
