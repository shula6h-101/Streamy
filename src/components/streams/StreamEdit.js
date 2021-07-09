import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import StreamForm from './StreamForm';
import { editStream, fetchStream } from '../../actions';

const StreamEdit = (props) => {
    const { fetchStream } = props;
    const id = props.match.params.id;

    useEffect(() => {
        fetchStream(id);
    }, [fetchStream, id]);

    const onSubmit = (formValues) => {
        props.editStream(id, formValues);
    }

    if (!props.stream) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h3>Edit a Stream</h3>
            <StreamForm
                initialValues={_.pick(props.stream, 'title', 'description')}
                onSubmit={onSubmit}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { editStream, fetchStream })(StreamEdit);