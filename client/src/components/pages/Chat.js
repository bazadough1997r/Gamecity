import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUser } from '../../actions';
import moment from 'moment';
// import io  from 'socket.io-client';;

 class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    // componentDidMount(){
    //     let server ="http://localhost:3001"
    //     this.socket = io(server);
    // }

    handleMessage = (event)=>{
        this.setState({
            chatMessage: event.target.value
        })
    }

    onSubmitMessage = (event)=>{
       event.preventDefault()
       console.log("submitted")
    //    let username = this.props.user.username
    //    let nowTime = moment();
    //    console.log(username," user name")
    }

    render() {
        return (
            <div>
                HI FROM CHAT COMPONENT
                <form onSubmit={this.onSubmitMessage}>
                    <input 
                    id = "message"
                    prefix = {<icon type="message"/>}
                    placeholder ="type here"
                    type= "text"
                    value= {this.state.chatMessage}
                    onChange= {this.handleMessage}
                    />
                    {/* <button
                    onClick= {(e)=> this.onSubmitMessage(e)}
                    >
                        Send
                    </button> */}
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state,"statefrom CHAT")
    return {
        user: state.user.user,
    }
}

export default connect(mapStateToProps, {loadUser} )(ChatPage);