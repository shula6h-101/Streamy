import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';
import { deleteStream } from '../../actions';

const StreamList = (props) => {
    const { fetchStreams } = props

    useEffect(() => {
        fetchStreams();
    }, [fetchStreams]);

    //--------------------Rendering Edit and Delete Button----------------------------------//

    const renderAdmin = ({ userId, id }) => {
        if (props.currentUserId === userId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${id}`} className="ui button negative">Delete</Link>
                </div>
            );
        }
        return null;
    };

    //--------------------------Rendering Streams List------------------------------//

    const renderList = ({ streams }) => {
        return streams.map((stream) => {
            return (
                <div className="item" key={stream.id}>
                    {renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            );
        });
    };

    //----------------------------Rendering Create Stream Button--------------------------------------//

    const renderCreate = ({ isSignedIn }) => {
        if (isSignedIn) {
            return (
                <div style={{ textAlign: 'right' }}>
                    <Link to="/streams/new" className="ui button primary">Create Stream</Link>
                </div>
            );
        };
    };

    return (
        <div className="">
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderList(props)}
            </div>
            {renderCreate(props)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams, deleteStream })(StreamList);