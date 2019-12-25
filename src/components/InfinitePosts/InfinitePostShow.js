import React from 'react';
import { Loader, Image, Grid } from 'semantic-ui-react';
import http from "../../http";

class InfinitePostShow extends React.PureComponent {
    state = {
        post: {},
        loading: false,
    };

    getPostById = async (id) => {
        try {
            this.setState({ loading: true })
            const response = await http.get(`posts/${id}`);
            if (response.data.status === 'success') {
                this.setState({ post: response.data.post, loading: false })
            }
        } catch (error) {
            console.error(error);
        }
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        this.getPostById(id);
    };

    render() {
        const { loading, post } = this.state;
        return (
            loading ? (
                <Loader active inline='centered' />
            ) : (
                <Grid celled>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Image width={150} src='https://react.semantic-ui.com/images/avatar/large/daniel.jpg' wrapped ui={false} />
                        </Grid.Column>
                        <Grid.Column width={13}>
                            <h3>Author:</h3> { post.author }
                            <h4>About:</h4> { post.text }
                            <h5>Title:</h5> { post.title }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        )
    }
}

export default InfinitePostShow;
