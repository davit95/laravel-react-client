import React from 'react'
import { Table } from 'semantic-ui-react'

const { Header, Row, HeaderCell } = Table;

const HeaderItems = [
    'Id',
    'Title',
    'Text',
    'Image',
    'Author'
];

const Items =  HeaderItems.map(item => (
    <HeaderCell key={item}>{ item }</HeaderCell>
));

export default () => (
    <Header>
        <Row>
            { Items }
        </Row>
    </Header>
)
