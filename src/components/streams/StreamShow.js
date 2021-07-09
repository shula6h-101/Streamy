import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {
    const { fetchStream } = props
    const { id } = props.match.params

    const videoRef = useRef();
    const update = useRef(true);

    //this is a special useEffect, it prevents loop and works as componentDidUpdate and componentWillUnmount//

    useEffect(() => {
        let player
        if (update.current) {
            update.current = false
            fetchStream(id)
        }
        else {
            const buildPlayer = () => {
                if (!props.stream) {
                    return;
                }

                player = flv.createPlayer({
                    type: 'flv',
                    url: `http://localhost:8000/live/${id}.flv`
                });
                player.attachMediaElement(videoRef.current);
                player.load();
            };
            buildPlayer();

            return () => { player.destroy() }
        };

    });


    if (!props.stream) {
        return <div>Loading...</div>
    };

    const { title, description } = props.stream;
    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }} controls />
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);