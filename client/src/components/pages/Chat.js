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
           var postId = this.props.location.state.postId; //it will be something dynamic
           console.log(postId, "postId");
           this.socket.emit("Input Chat Message", {
               postId,
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
        console.log(this.props.chats.chats,"this.props.chats.chats")//array of objects
        return (
            <div>
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
                        this.props.chats.chats.filter((cha, key)=> cha.postId === this.props.location.state.postId).map((chat,i) => {
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

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getChats, afterPostMessage } from "../../actions";
// import moment from "moment";
// import io from "socket.io-client";
// import jwt_decode from "jwt-decode";

// class ChatPage extends Component {
//   state = {
//     chatMessage: "",
//     arrayOfChats: [],
//   };

//   //5ff0d39471c627a308021049 this.props in chat comp
//   //5ff0e52155b9a8bafc62566b this.props in chat comp

//   componentDidMount() {
//     let server = "http://localhost:3001";

//     this.props.dispatch(getChats(this.props.location.state.postId));

//     this.socket = io(server);

//     this.socket.on("Output Chat Message", (messageFromBackend) => {
//       console.log(messageFromBackend, "messageFromBackend");
//       this.props.dispatch(afterPostMessage(messageFromBackend));
//     });
//   }

//   handleMessage = (event) => {
//     this.setState({
//       chatMessage: event.target.value,
//     });
//   };

//   show = () => {
//     if (
//       this.props.chats.chats !== undefined &&
//       Object.keys(this.props.chats.chats).length > 0
//     ) {
//       if(this.props.chats.chats){
//       this.state.arrayOfChats.push(this.props.chats.chats);
//       console.log(this.state.arrayOfChats, "this.state.arrayOfChats");
//       console.log(this.props.chats.chats, "this.props.chats.chats");
// }
     
//     }
//       return true;
//   };


//   onSubmitMessage = (event) => {
//     event.preventDefault();

//     let token = localStorage.getItem("token");
//     var decoded = jwt_decode(token);
//     let userId = decoded._id;
//     let chatMessage = this.state.chatMessage;
//     let username = localStorage.getItem("username");
//     let nowTime = moment();
//     let type = "Text";
//     let postId = this.props.location.state.postId; //it will be something dynamic
//     console.log(postId, "postId");

//     this.socket.emit("Input Chat Message", {
//       postId,
//       chatMessage,
//       userId,
//       username,
//       nowTime,
//       type,
//     });

//     this.setState({
//       chatMessage: ""
//     });
//   };

//   render() {
//     // console.log(this.props.chats.chats,"this.props.chats")
//     return (
//       <div>
//         <form onSubmit={this.onSubmitMessage}>
//           <input
//             id="message"
//             prefix={<icon type="message" />}
//             placeholder="type here"
//             type="text"
//             value={this.state.chatMessage}
//             onChange={this.handleMessage}
//           />
//           <button onClick={(e) => this.onSubmitMessage(e)}>Send</button>
//           <div>

          
//             {this.show() && this.state.arrayOfChats.map((chat, i) => {
//         console.log(chat,"chatchatchat")
//         return (
//           <div key={i}>
//             <h5>
//               hiii
//               <b>{chat.sender.username}: </b>{" "}
//               {chat.message}
//             </h5>
//           </div>
//         );
//       })}
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     user: state.user.user,
//     chats: state.chat,
//   };
// };

// export default connect(mapStateToProps)(ChatPage);
            {/* {if(this.props.chats.chats !== undefined)} beddy a3mel innu  msh defined la te3mal push*/}
            {/* {this.state.chatArray.push(this.props.chats.chats)} */}
            {/* {console.log(this.props.chats.chats,"this.props.chats.chats")} */}
            {/* {this.props.chats.chats &&
              this.props.chats.chats.map((chat, i) => {
                return (
                  <div key={i}>
                 
                    <h5>
                     <b>{chat.sender.username}</b>
                    </h5>
                    <h6>{chat.message}</h6> 
                  </div>
                );
              })}
          </div> */}
            {/* <br></br>
                   {console.log(this.props.location.state.postId, "postIdpost")}
                   {console.log(this.props.chats.chats, "this.props.chats.chats ")} */}
            {/* {console.log("hellooooooooooooo", this.props)} */}
            {/* {this.props.chats.chats &&
                        this.props.chats.chats.map((chat,i) => {
                            return (
                                <div key={i}>
                                <h5><b>{chat.sender.username}: </b> {chat.message}</h5>
                                </div>
                            )
                        })} */}