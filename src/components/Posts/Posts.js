import React from 'react';
import { Table } from 'semantic-ui-react';
import http from '../../http';
import Header from './Table/Header';
import Body from './Table/Body';
import Footer from './Table/Footer';

class Posts extends React.PureComponent {
    state = {
        posts: [],
        loading: false,
        pageCount: 1,
        currentPage: 1,
        activePage: 1,
        fetchedPosts: [],
    };

    async getPosts(activePage = this.state.activePage) {
        if (!this.state.fetchedPosts[activePage-1]) {
            try {
                this.setState({ loading: true });
                const response = await http.get(`posts/paginate?page=${activePage}`);
                if (response.data.status === 'success') {
                    this.setState(prevState => ({
                        loading: false,
                        posts: response.data.posts.data,
                        currentPage: response.data.posts.current_page,
                        pageCount: response.data.posts.last_page,
                        fetchedPosts: [...prevState.fetchedPosts, response.data.posts.data]
                    }));
                }
            } catch (e) {
                this.setState({ loading: false });
                console.log('posts fetch failed');
                return Promise.reject(e)
            }
        } else {
            this.setState(prevState => ({
                posts: this.state.fetchedPosts[activePage-1]
            }));
        }

    }

    componentDidMount() {
        this.getPosts();
    }

    setActivePage = (newActivePage) => {
        this.setState({ activePage: newActivePage })
        this.getPosts(newActivePage);
    };

    render() {
        return (
            <Table celled>
                <Header />
                <Body posts={this.state.posts} />
                <Footer
                    pageCount={this.state.pageCount}
                    activePage={this.state.activePage}
                    setActivePage={this.setActivePage}
                />
            </Table>
        )
    }
}

export default Posts;
