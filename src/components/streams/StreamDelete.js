import React, { useEffect } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';

const StreamDelete = (props) => {
    console.log(props);
    const { fetchStream } = props;
    const id = props.match.params.id;

    useEffect(() => {
        fetchStream(id);
    }, [fetchStream, id]);

    const onSubmit = () => {
        props.deleteStream(id);
    }

    const renderActions = () => (
        <React.Fragment>
            <button onClick={() => { onSubmit() }} className="ui button negative">Delete</button>
            <Link to="/" className="ui button">Cancle</Link>
        </React.Fragment>
    );

    const renderContent = () => {
        if (!props.stream) {
            return "Are you sure you want to delete this stream?"
        }
        return `Are you sure you want to delete the stream with title: "${props.stream.title}" ?`
    };

    return (
        <Modal
            title="Delete Stream"
            content={renderContent()}
            actions={renderActions()}
            onDismiss={() => { history.push('/') }}
        />
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);