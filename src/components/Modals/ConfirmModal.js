import React from 'react'
import { Icon, Confirm } from 'semantic-ui-react'

class ConfirmModal extends React.PureComponent {
    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => {
        this.setState({ open: false })
    };

    confirm = () => {
        const { postId } = this.props;
        this.props.onRemove(postId);
        this.close();
    };

    render() {
        return (
            <div>
                <Icon style={{ cursor: 'pointer' }} name='trash alternate outline' color={'red'} onClick={this.open} />
                <Confirm
                    open={this.state.open}
                    onCancel={this.close}
                    onConfirm={this.confirm}
                />
            </div>
        )
    }
}

export default ConfirmModal
