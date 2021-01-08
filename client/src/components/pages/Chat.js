import React, { Component } from 'react';
import { connect } from 'react-redux';
import  {getChats, afterPostMessage}  from '../../actions';
import moment from 'moment';
import io from "socket.io-client"
import jwt_decode from "jwt-decode";
import FooterPage from "../pages/Footer";

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
           let nowTime = moment().format("h:mm:ss");
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

        return (
                <div style = {{backgroundImage: `url(${process.env.PUBLIC_URL + '../../Images/chatRoom.jpg'})`, height: "100vh"}}>
                    <br/><br/><br/>
                    <div className= "container p-10" style = {{width: "60%", background: "#070d13", opacity: "85%", borderRadius:"1rem"}}>
                        <p style = {{color: "#fff", fontSize: "32px", fontFamily: "Century Gothic"}}>Chat Room</p>
                        <p style = {{color: "#666666", fontSize: "14px", fontFamily: "Century Gothic", fontWeight: "bold", marginTop: "-15px"}}>At Gamesity, communication is our top interest. Enjoy chatting, meeting new people, and planning!</p>                    
                        <div style = {{overflowY: "scroll", height: "250px"}}>
                        <div>
                            {this.props.chats.chats &&
                                this.props.chats.chats.filter((cha)=> cha.postId === this.props.location.state.postId).map((chat,i) => {
                                    console.log(chat,"chat")
                                    return (
                                        <div key={i}>
                                        <img src={chat.sender.url} width= "40px" height = "40px" alt="profile icon" className = "rounded-circle"/>
                                            <b style = {{color: "#aaaaaa", fontFamily: "Century Gothic", fontSize: "16px", marginLeft: "5px"}}>{chat.sender.username}: </b> 
                                            <p style = {{color: "#aaaaaa", fontFamily: "Century Gothic", fontSize: "12px", marginLeft: "45px", marginTop: "-10px"}}>{chat.nowTime}</p>
                                            <p style = {{color: "#fff", fontFamily: "Century Gothic", fontSize: "18px", fontWeight: "bold", marginLeft: "45px", marginTop: "-15px", marginBottom: "15px"}}>{chat.message}</p>
                                        </div>
                                    )
                                })}
                            </div>   
                        </div>
                        <br></br>
                        <div>
                        <hr color= "white"></hr>
                        <form onSubmit={this.onSubmitMessage} style={{ display:"flex"}}>
                            <input 
                                style = {{width: "80%"}}
                                className= "form-control"
                                id = "message"
                                prefix = {<icon type="message"/>}
                                placeholder ="Type here..."
                                type= "text"
                                value= {this.state.chatMessage}
                                onChange= {this.handleMessage}
                            />
                            {/* <br/> */}
                            <button
                                style = {{ margin: "-1px", width: "20%", align: "center", height: "40px", marginLeft: "5px"}}
                                className="btn btn-dark text-center"
                            >
                                Send
                            </button>              
                        </form>
                        <br/>
                        </div>
                    </div> 
                    <br/><br/><br/>
                        <FooterPage />
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
