import React from 'react';
import {Card, Icon, Grid } from 'semantic-ui-react';
import NavBarMenu from "./NavBarMenu";
import InfiniteScroll from 'react-infinite-scroller';
import http from "../http";

class Friends extends React.PureComponent {
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

    extra = (
        <a href={'/#'}>
            <Icon name='user' />
            16 Friends
        </a>
    );

    postCards = (posts) => (
        posts.map((post, key) => (
            <Grid.Column key={key} width={4}>
                <Card
                    header={`${post.author} - ${post.id}`}
                    meta={post.title}
                    description={post.text}
                    extra={this.extra}
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
                <NavBarMenu match={this.props.match} />
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

export default Friends;
