import React, { Component } from 'react';
import http from '../../http';
import { Form, Grid } from 'semantic-ui-react';
import { client } from '../../Client';

class LoginForm extends Component {

    state = {
        password: '',
        email: '',
        user: {}
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = async () => {
        const { password, email } = this.state;
        try {
            const response = await http.post('login', {
                email, password
            });
            client.setToken(response.data.token)
            Object.assign(http.defaults, { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
            this.props.handleSetUser();
        } catch (error) {
            console.error(error);
        }
    };
    render() {
        const { password, email } = this.state;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                placeholder='Email'
                                name='email'
                                value={email}
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                placeholder='Password'
                                name='password'
                                value={password}
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Form.Button content={'submit'} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default LoginForm;
