import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Button, Loader, Form } from 'semantic-ui-react';
import http from "../../http";

class InfinitePostsEdit extends React.PureComponent {
    state = {
        post: {},
        loading: false,
        shouldRedirect: false
    };

    handleChange = (e, { name, value }) => this.setState({ post: { ...this.state.post, [name]: value  } } );

    handleSubmit = async () => {
        const { id } = this.props.match.params;
        const { post } = this.state;
        try {
            if (id) {
                const response = await http.put(`posts/${id}`, {
                    ...post
                });
                this.setState({ shouldRedirect: true, post: response.data.post })
            } else {
                const response = await http.post(`posts`, {
                    ...post
                });
                this.setState({ shouldRedirect: true, post: response.data.post })
            }


        } catch (error) {
            console.error(error);
        }
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
        if (id) {
            this.getPostById(id);
        }

    }

    render() {
        const { loading, post, shouldRedirect } = this.state;
        return (
            loading ? (
                <Loader active inline='centered' />
            ) : (
                shouldRedirect ? <Redirect to={'/posts'} /> :
                <Grid>
                    <Grid.Row centered>
                        <Grid.Column width={8}>
                            <Form ref="form" onSubmit={this.handleSubmit}>
                                <Form.Input
                                    placeholder='Title'
                                    name='title'
                                    defaultValue={post.title}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder='Text'
                                    name='text'
                                    defaultValue={post.text}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    placeholder='Author'
                                    name='author'
                                    defaultValue={post.author}
                                    type='text'
                                    onChange={this.handleChange}
                                />
                                <Button content={'submit'} />
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        )
    }
}

export default InfinitePostsEdit;
