import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db } from '../firebase'

//to set firebase timestamp
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ channelId, channelName, chatRef }) {

    // we are pulling the user data using the firebase hooks
    const [user] = useAuthState(auth)

    // useState hook to store messages
    const [input, setinput] = useState("")

    const sendMessage = (e) => {
        e.preventDefault(); //prevent refresh

        if (!channelId) {
            // if no channelId then return false
            return false
        }

        // if we have channel then...
        // we will add the message which user has entered in the input field.

        //FLOW to add MESSAGE [Collection - Document - Collection ] structure
        // in DB we have rooms, in rooms we go to the particular channel which user selected and then we go the message of that channel
        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input, // which we got from user
            timestamp: firebase.firestore.FieldValue.serverTimestamp(), //it will give firebase time
            user: user?.displayName,
            userImage: user?.photoURL
        })

        // after sending message from input field we need to set input field empty
        setinput("")

        // when user hit enter i.e. submit the message then also chatRef will point to ChatBottom
        chatRef?.current?.scrollIntoView({
            behavior: 'smooth',
        });

    }
    return (

        <ChatInputContainer>
            <form>
                <input value={input} onChange={(e) => { setinput(e.target.value) }} placeholder={`Message #${channelName}`} />
                {/* type submit because we want to hide button and when user press enter then the message will sent */}
                <Button type="submit" onClick={sendMessage}>
                    {channelName}
                </Button>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput

const ChatInputContainer = styled.div`
border-radius: 20px;

> form {
    position:relative;
    display: flex;
    justify-content:center;
}

>form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
}

>form > button {
    display: none !important;
}
`