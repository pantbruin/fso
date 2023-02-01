const Notification = ({ message, code }) => {

    let output;

    const successStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10      
    }

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10      
    }

    if (message === null){
        return null;
    }

    if (message.includes('success')){
        return (
            <div style={successStyle}>
                {message}
            </div>
        )
    } else {
        return (
            <div style={errorStyle}>
                {message}
            </div>
        )
    }

}

export default Notification;