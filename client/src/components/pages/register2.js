import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {getChats, afterPostMessage}  from '../../actions';
import moment from 'moment';
import io from "socket.io-client"
import jwt_decode from "jwt-decode";



 class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount(){
        let server ="/"

       this.props.dispatch(getChats())

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackend => {
            console.log(messageFromBackend)
            this.props.dispatch(afterPostMessage(messageFromBackend))
        })
    }

    handleMessage = (event)=>{
        this.setState({
            chatMessage: event.target.value
        })
    }


    onSubmitMessage = (event)=>{
       event.preventDefault()
       

           let token = localStorage.getItem("token")
           var decoded = jwt_decode(token);
           let userId = decoded._id
           let chatMessage = this.state.chatMessage
           let username = localStorage.getItem("username")
           let nowTime = moment();
           let type = "Text"
           this.socket.emit("Input Chat Message", {
               chatMessage,
               userId,
               username,
               nowTime,
               type
           });
           console.log(this.socket)
           this.setState({
               chatMessage: ""
           })
    }

    render() {
        
        return (
            <div>
                <br/>
                <form onSubmit={this.onSubmitMessage} >
                    <br></br>
                    <h3>Join the forum!</h3>
                    <input 
                    id = "message"
                    prefix = {<icon type="message"/>}
                    placeholder ="type here"
                    type= "text"
                    value= {this.state.chatMessage}
                    onChange= {this.handleMessage}
                    />
                    <button
                    onClick= {(e)=> this.onSubmitMessage(e)}
                    >
                        Send
                    </button>
                    
                    <div>
                    <br></br>
                           {this.props.chats.chats &&
                        this.props.chats.chats.map((chat,i) => {
                            return (
                                <div key={i}>
                                <h5><b>{chat.sender.username}: </b> {chat.message}</h5>
                               
                                </div>
                            )
                        })}
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        chats: state.chat
    }
}

export default connect(mapStateToProps)(ChatPage);