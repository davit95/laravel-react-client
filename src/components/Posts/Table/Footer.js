import React from 'react';
import { Menu, Table, Pagination } from 'semantic-ui-react';

const { Row, HeaderCell } = Table;

class Footer extends React.PureComponent {

    onPageChange = async (event, data) => {
        this.props.setActivePage(data.activePage);
    };

    render() {
        return (
            <Table.Footer>
                <Row>
                    <HeaderCell colSpan='5'>
                        <Menu floated='right' pagination>
                            <Pagination
                                boundaryRange={1}
                                defaultActivePage={1}
                                firstItem={null}
                                lastItem={null}
                                siblingRange={1}
                                totalPages={this.props.pageCount}
                                onPageChange={this.onPageChange}
                            />
                        </Menu>
                    </HeaderCell>
                </Row>
            </Table.Footer>
        );
    }
}

export default Footer;
