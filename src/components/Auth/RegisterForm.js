import React, { Component } from 'react';
import http from '../../http';
import { Form, Grid, Button } from 'semantic-ui-react';
import { client } from '../../Client';

class RegisterForm extends Component {

    state = {
        password: '',
        password_confirmation: '',
        avatar: null,
        file: null,
        email: '',
        name: '',
        user: {}
    };

    handleChange = (e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = async () => {
        const { password, email, name, password_confirmation, file } = this.state;
        try {
            const avatar = await this.fileUpload(file);
            const response = await http.post('register', {
                email, password, name, password_confirmation, avatar
            });
            client.setToken(response.data.token)
            Object.assign(http.defaults, { headers: { 'Authorization': `Bearer ${localStorage.token}` } })
            this.props.handleSetUser();
        } catch (error) {
            console.error(error);
        }
    };

    fileInputRef = React.createRef();

    fileChange = e => {
        this.setState({ file: e.target.files[0] });
    };

    fileUpload = async file => {
        const url = "/image/upload";
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                "Content-type": "multipart/form-data"
            }
        };
        const response = await http.post(url, formData, config);
        return response.data.avatar;
    };

    render() {
        const { password, email, name, password_confirmation } = this.state;
        return (
            <Grid>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                placeholder='Name'
                                name='name'
                                value={name}
                                onChange={this.handleChange}
                            />
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
                            <Form.Input
                                placeholder='Confirm Password'
                                name='password_confirmation'
                                value={password_confirmation}
                                type='password'
                                onChange={this.handleChange}
                            />
                            <Form.Field>
                                <Button
                                    content="Avatar"
                                    labelPosition="left"
                                    icon="file"
                                    type={'button'}
                                    onClick={() => this.fileInputRef.current.click()}
                                />
                                <input
                                    ref={this.fileInputRef}
                                    type="file"
                                    hidden
                                    onChange={this.fileChange}
                                />
                            </Form.Field>
                            <Form.Button content={'submit'} />
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default RegisterForm;
