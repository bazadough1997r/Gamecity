import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {getChats}  from '../../actions';
import  ChatCard  from './ChatCard';
import moment from 'moment';
import io from "socket.io-client"
// import Axios from 'axios';
import jwt_decode from "jwt-decode";



 class ChatPage extends Component {
    state = {
        chatMessage: "",
    }

    componentDidMount(){
        let server ="http://localhost:3001"

       console.log(this.props.dispatch(getChats()),"this.props.dispatch(getChats())")
       this.props.dispatch(getChats())

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackend => {
            console.log(messageFromBackend,"messageFromBackend")
        })
    }

    handleMessage = (event)=>{
        this.setState({
            chatMessage: event.target.value
        })
    }

    // renderCards = () =>{
    //     console.log(this.props.chats.chats,"this.props.chats.chats")
    //     this.props.chats.chats &&
    //     this.props.chats.chats.map((chat,i) => {
    //        return 
    //            (
    //            <div></div>
    //        )
    //     })
    // }



    onSubmitMessage = (event)=>{
       event.preventDefault()
       console.log("submitted")
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
                    <button
                    onClick= {(e)=> this.onSubmitMessage(e)}
                    >
                        Send
                    </button>
                    <div>
                           {this.props.chats.chats &&
                        this.props.chats.chats.map((chat,i) => {
                            return (
                                <div>
                                <h3>{chat.sender.username}</h3>
                                <h6>{chat.message}</h6>
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
    console.log(state,"statefrom CHAT")
    return {
        user: state.user.user,
        chats: state.chat
    }
}

export default connect(mapStateToProps)(ChatPage);