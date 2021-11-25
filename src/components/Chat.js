import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { selectRoomId } from '../features/appSlice';
import { useSelector } from 'react-redux';
import ChatInput from './ChatInput';
import { db } from '../firebase';

import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import Message from './Message';

function Chat() {
    // useRef will act as a pointer which will pointing to the chatbottom
    const chatRef = useRef(null)

    // with the help of useSelector we will pull the data from appSlice > enterRoom() function
    const roomId = useSelector(selectRoomId)

    //to get room details from firebase with the help of firebase-hooks
    //room details are in the DOCUMENT section
    const [roomDetails] = useDocument(
        // if room id present then give the details for the particular roomid
        roomId && db.collection('rooms').doc(roomId)
    )

    //to get the messages from firebase with the help of firebase-hooks
    //room messgaes are in the COLLECTION section

    // also we need loading state so that we will know when it will load roomMessage
    const [roomMessages, loading] = useCollection(
        //if roomid present then it will go to inside given roomid then pull the message which is orderby timestamp ascending order
        roomId && db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc')
    )

    console.log(roomDetails?.data())

    // roomMessages is the collections 
    console.log(roomMessages)


    useEffect(() => {
        // get the chatRef -->> go to the current pointing (which is ChatBottom) -->> and scroll it to View
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [roomId, loading]) //when the roomId or loading changes then run useEffect


    return (
        <ChatContainer>
            {/* if we have roomDetails(i.e. when user click on Channels then only) or we have  roomMessages then only show the chat Section */}
            {roomDetails && roomMessages && (
                // we use fragment becuase it was giving error
                <>
                    {/* header */}
                    <Header>

                        <HeaderLeft>
                            <h4><strong>#{roomDetails?.data().name}</strong></h4>
                            <StarBorderOutlinedIcon />
                        </HeaderLeft>

                        <HeaderRight>
                            <p>
                                <InfoOutlinedIcon />
                                Details
                            </p>
                        </HeaderRight>

                    </Header>

                    <ChatMessages >
                        {/* Fetching all messages and listing them */}
                        {roomMessages?.docs.map((doc) => {
                            console.log(doc.data())
                            // these are the field which we store in Messages section with the help of ChatInput.js Component
                            const { message, timestamp, user, userImage } = doc.data();

                            // and returning these var as a props to Message component
                            return (
                                <Message key={doc.id} message={message} timestamp={timestamp} user={user} userImage={userImage} />
                            )
                        })}

                        {/* chatBottom div is present at the bottom of the ChatMessages div */}
                        {/* useRef will now pointing to ChatBottom */}
                        <ChatBottom ref={chatRef} />

                    </ChatMessages>

                    {/* Input box where user will write messages */}
                    {/* passing roomId which we pull from Redux store (appSlice) using useSelectore to ChatInput */}
                    <ChatInput chatRef={chatRef} channelId={roomId} channelName={roomDetails?.data().name} />

                </>
            )}
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    flex: 0.7; //70% of screen
    flex-grow: 1;
    overflow-y: scroll;
    margin-top: 60px;
`

const Header = styled.div`
display: flex;
justify-content: space-between;
padding: 20px;
border-bottom: 1px solid lightgray;
`

const HeaderLeft = styled.div`
display: flex;
align-items: center;

> h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
}

> h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
}
`

const HeaderRight = styled.div`
>p {
    display: flex;
    align-items: center;
    font-size: 14px;
}

> p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
}
`
const ChatMessages = styled.div``


const ChatBottom = styled.div`
padding-bottom:200px;
`
