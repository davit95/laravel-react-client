import React from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import { Card, Icon, Grid } from 'semantic-ui-react';
import ConfirmModal from '../Modals/ConfirmModal';
import http from '../../http';

class InfinitePosts extends React.PureComponent {
    state = {
        loading: false,
        startFrom : 1,
        pageCount: 1,
        currentPage: 1,
        posts: [],
        fetchedPosts: [],
    };

    componentDidMount() {
        this.getPosts();
    }

    async getPosts() {
        try {
            this.setState({ loading: true });
            const response = await http.get(`posts/paginate?page=${this.state.currentPage}`);
            if (response.data.status === 'success') {
                this.setState(prevState => ({
                    loading: false,
                    posts: [...prevState.posts, ...response.data.posts.data],
                    fetchedPosts: [...prevState.fetchedPosts.concat(response.data.posts)],
                    currentPage: response.data.posts.current_page + 1,
                    pageCount: response.data.posts.last_page,
                }));
            }
        } catch (e) {
            this.setState({ loading: false });
            console.log('posts fetch failed');
            return Promise.reject(e)
        }
    }

    extra = (id) => (
        <Grid columns='equal'>
            <Grid.Row textAlign='center'>
                <Grid.Column>
                    <Link to={`/infinite-posts/${id}/edit`}>
                        <Icon name='edit' color={'blue'} />
                    </Link>
                </Grid.Column>
                <Grid.Column>
                    <Link to={`/infinite-posts/${id}/show`}>
                        <Icon name='eye' color={'blue'} />
                    </Link>
                </Grid.Column>
                <Grid.Column>
                    <ConfirmModal postId={id} onRemove={this.handleRemovePost} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );

    handleRemovePost = async (id) => {
        try {
            const response = await http.delete(`posts/${id}`);
            if (response.data.status === 'success') {
                this.setState(prevState => ({
                    posts: [...prevState.posts.filter(post => post.id !== id)],
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    postCards = (posts) => (
        posts.map((post, key) => (
            <Grid.Column key={key} width={4}>
                <Card
                    id={post.id}
                    header={post.author}
                    meta={post.title}
                    description={post.text}
                    extra={this.extra(post.id)}
                />
            </Grid.Column>

        ))
    );

    loadMore = () => {
        this.getPosts();
    };

    render() {
        return(
            <React.Fragment>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.loadMore}
                    hasMore={this.state.currentPage < this.state.pageCount}
                    loader={ this.state.loading && <div className="loader" key={0}>Loading ...</div> }
                >
                    <Grid>
                        <Grid.Row>
                            { this.postCards(this.state.posts) }
                        </Grid.Row>
                    </Grid>
                </InfiniteScroll>
            </React.Fragment>
        )
    }
}

export default InfinitePosts;
