import React from 'react';
import { Table } from 'semantic-ui-react'

const { Body, Cell, Row } = Table;


const postItems = (posts) =>  posts.map(post => (
    <Row key={post.id}>
        <Cell>{ post.id }</Cell>
        <Cell>{ post.title }</Cell>
        <Cell>{ post.text }</Cell>
        <Cell>{ post.image }</Cell>
        <Cell>{ post.author }</Cell>
    </Row>
));

export default ({ posts }) => (
    <Body>
    {  postItems(posts) }
    </Body>
)
