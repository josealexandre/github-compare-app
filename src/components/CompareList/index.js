import React from "react";

import PropTypes from "prop-types";

import {
    Container,
    Repository,
    ActionContainer,
    RepositoryContainer
} from "./styles";

const CompareList = ({ repositories, deleteHandler, updateHandler }) => (
    <Container>
        {repositories.map(repository => (
            <RepositoryContainer key={repository.id}>
                <Repository>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <strong>{repository.name}</strong>
                        <small>{repository.owner.login}</small>
                    </header>

                    <ul>
                        <li>
                            {repository.stargazers_count} <small>stars</small>
                        </li>
                        <li>
                            {repository.forks_count} <small>forks</small>
                        </li>
                        <li>
                            {repository.open_issues_count} <small>issues</small>
                        </li>
                        <li>
                            {repository.lastCommit} <small>last commit</small>
                        </li>
                    </ul>
                </Repository>
                <ActionContainer>
                    <div>
                        <button
                            id="delete"
                            onClick={() => deleteHandler(repository.id)}
                        >
                            Remover
                        </button>
                    </div>
                    <div>
                        <button
                            id="update"
                            onClick={() => updateHandler(repository.id)}
                        >
                            Atualizar
                        </button>
                    </div>
                </ActionContainer>
            </RepositoryContainer>
        ))}
    </Container>
);

CompareList.propTypes = {
    repositories: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            owner: PropTypes.shape({
                avatar_url: PropTypes.string,
                login: PropTypes.string
            }),
            stargazers_count: PropTypes.number,
            forks_count: PropTypes.number,
            open_issues_count: PropTypes.number,
            pushed_at: PropTypes.string
        })
    ).isRequired
};

export default CompareList;
