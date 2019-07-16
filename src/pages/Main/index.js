import React, { Component } from "react";
import moment from "moment";
import api from "../../services/api";

import { Container, Form } from "./styles";

import logo from "../../assets/logo.png";

import CompareList from "../../components/CompareList";

export default class Main extends Component {
    state = {
        respositoryInput: "",
        repositories: [],
        repositoryError: false
    };

    handleAddRepository = async e => {
        e.preventDefault();

        const { repositories, respositoryInput } = this.state;

        try {
            const { data } = await api.get(`repos/${respositoryInput}`);
            data.lastCommit = moment(data.pushed_at).fromNow();

            this.setState({
                respositoryInput: "",
                repositories: [...repositories, data],
                repositoryError: false
            });
        } catch (err) {
            this.setState({ repositoryError: true, respositoryInput: "" });
        }
    };

    render() {
        const { respositoryInput, repositories, repositoryError } = this.state;

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
                        value={respositoryInput}
                        onChange={e =>
                            this.setState({ respositoryInput: e.target.value })
                        }
                    />
                    <button type="submit">OK</button>
                </Form>
                <CompareList repositories={repositories} />
            </Container>
        );
    }
}
