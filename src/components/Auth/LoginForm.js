import React, { Component } from 'react';
import http from '../../http';
import { Grid , Button} from 'semantic-ui-react';
import { Form,Input } from 'semantic-ui-react-form-validator';

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
                        <Form ref="form" onSubmit={this.handleSubmit}>
                            <Input
                                placeholder='Email'
                                name='email'
                                value={email}
                                validators={['required', 'isEmail']}
                                onChange={this.handleChange}
                                errorMessages={['this field is required', 'please enter valid email']}
                            />
                            <Input
                                placeholder='Password'
                                name='password'
                                value={password}
                                validators={['required']}
                                type='password'
                                onChange={this.handleChange}
                                errorMessages={['this field is required']}
                            />
                            <Button content={'submit'} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default LoginForm;
