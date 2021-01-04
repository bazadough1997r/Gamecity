import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {getChats, afterPostMessage}  from '../../actions';
import moment from 'moment';
import io from "socket.io-client"
import jwt_decode from "jwt-decode";
import { MDBRow, MDBCol } from "mdbreact";
import Chat from "./register2"



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
            <div style = {{backgroundImage: `url(${process.env.PUBLIC_URL + './Images/chatRoom.jpg'})`}}>
                <br/><br/><br/>
                <div className= "container p-10" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
                <form onSubmit={this.onSubmitMessage} >
                    <br></br>
                    <p style = {{color: "#fff", fontSize: "32px", fontFamily: "Century Gothic"}}>Chat Room</p>
                    <p style = {{color: "#666666", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold"}}>At Gamesity, communication is our top interest. Enjoy chatting, meeting new people, and planning!</p>                    
                    <input 
                    style = {{width: "100%"}}
                    className= "form-control"
                    id = "message"
                    prefix = {<icon type="message"/>}
                    placeholder ="Type here..."
                    type= "text"
                    value= {this.state.chatMessage}
                    onChange= {this.handleMessage}
                    />
                    <button
                    style = {{width: "95%", align: "center"}}
                    className="btn btn-dark text-center"
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
                                <p style = {{color: "#d5d6d7", fontFamily: "Century Gothic", fontSize: "16px"}}>@{chat.sender.username}:</p>
                                <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "20px", fontWeight: "bold"}}>{chat.message}</p>
                                </div>
                            )
                        })}
                    </div>
                </form>
                </div> 
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