import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { signOut, signIn } from '../actions';

const GoogleAuth = (props) => {
    const auth = useRef();

    useEffect(() => {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '315388437504-9ulj0q5t2rpr3uttkr8mfunmesgbibj6.apps.googleusercontent.com',
                scope: 'email'
            })
                .then(() => {
                    auth.current = window.gapi.auth2.getAuthInstance();
                    onAuthChange(auth.current.isSignedIn.get());
                    auth.current.isSignedIn.listen(onAuthChange);
                })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            props.signIn(auth.current.currentUser.get().getId());
        }
        else {
            props.signOut();
        }
    };

    const signOutOnClick = () => {
        return auth.current.signOut();
    };

    const signInOnClick = () => {
        return auth.current.signIn();
    };

    const renderAuthButton = ({ isSignedIn }) => {
        if (isSignedIn === null) {
            return null;
        }
        else if (isSignedIn) {
            return (
                <button className="ui red google button" onClick={() => { signOutOnClick() }}>
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else {
            return (
                <button className="ui red google button" onClick={() => { signInOnClick() }}>
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    };

    return (
        <div>
            {renderAuthButton(props)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
