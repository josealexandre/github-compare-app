import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-content: center;

    margin-top: 30px;
`;

export const RepositoryContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ActionContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;

    button#delete {
        height: 55px;
        width: 110px;
        padding: 0 20px;
        margin: 0 10px;
        background: #f00;
        color: #fff;
        border: 0;
        font-size: 16px;
        font-weight: bold;
        border-radius: 3px;

        &:hover {
            background: #a00;
        }
    }

    button#update {
        height: 55px;
        width: 110px;
        padding: 0 20px;
        margin: 0 10px;
        background: #0bf;
        color: #fff;
        border: 0;
        font-size: 16px;
        font-weight: bold;
        border-radius: 3px;

        &:hover {
            background: #08f;
        }
    }
`;

export const Repository = styled.div`
    display: flex;
    flex-direction: column;

    width: 250px;
    background: #fff;
    border-radius: 3px;
    margin: 0 10px;

    header {
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 30px;

        img {
            width: 64px;
        }

        strong {
            font-size: 24px;
            margin-top: 10px;
        }

        small {
            font-size: 14px;
            color: #666;
        }
    }

    ul {
        list-style: none;

        li {
            font-weight: bold;
            padding: 12px 20px;

            small {
                font-weight: normal;
                font-size: 12px;
                color: #999;
                font-style: italic;
            }

            &:nth-child(2n - 1) {
                background: #f5f5f5;
            }
        }
    }
`;
