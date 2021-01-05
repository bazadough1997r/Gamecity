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

        this.props.dispatch(getChats(this.props.location.state.postId));

        this.socket = io(server);

        this.socket.on("Output Chat Message", messageFromBackend => {
            // console.log(messageFromBackend)
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
           var postId = this.props.location.state.postId; //it will be something dynamic

           this.socket.emit("Input Chat Message", {
               postId,
               chatMessage,
               userId,
               username,
               nowTime,
               type
           });
          //  console.log(this.socket)
           this.setState({
               chatMessage: ""
           })
    }

    render() {
        // console.log(this.props.chats.chats,"this.props.chats.chats")//array of objects
        return (
            <div>
                <form  onSubmit={this.onSubmitMessage} >
                    <br></br>

                    <input 
                    id = "message"
                    prefix = {<icon type="message"/>}
                    placeholder ="type here"
                    type= "text"
                    value= {this.state.chatMessage}
                    onChange= {this.handleMessage}
                    />
                    <button
                     type="submit"
                    >
                        Send
                    </button>
                    
                    <div>
                    <br></br>
                           {this.props.chats.chats &&
                        this.props.chats.chats.filter((cha)=> cha.postId === this.props.location.state.postId).map((chat,i) => {
                            console.log(chat,"chat")
                            return (
                                <div key={i}>
                                <h5>
                                   <img src={chat.sender.url} width= "50px" alt="profile icon"/>
                                    <b>{chat.sender.username}: </b> {chat.message}</h5>
                                    <h6>{chat.createdAt}</h6>
                               
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
