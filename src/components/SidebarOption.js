import React from 'react'
import styled from 'styled-components';
import { db } from '../firebase';

import { useDispatch } from 'react-redux'
import { enterRoom } from '../features/appSlice';

function SidebarOption({ Icon, title, addChannelOption, id }) {
    // dispatch to store data in redux
    const  dispatch = useDispatch()

    const addChannel = () => {
        // it will ask user to enter the channel name through prompt
        const channelName = prompt("Enter the Channel Name");
        

        // if channelName is not empty then add the channelname in collection[rooms] add as a doc[object] name
        // push to database
        if (channelName) {
            db.collection('rooms').add({
                name: channelName
            })
        }
    }

    const selectChannel = () => {
        // when we select existing channel then we have to send that id to redux to store
        if (id) {
            // enterRoom is the function inside appSlice
            dispatch(enterRoom({
                roomId: id
            }))
        }
    }

    return (
        // as we are passing add channel as a props only for AddIcon; so here we are checking that if addChannelOption is true then only use onClick functionality
        <SidebarOptionContainer onClick={addChannelOption ? addChannel : selectChannel}>

            {/* if there is an Icon then we render that Icon */}
            {/* We are taking whole Icon as a component so we use 'I'con */}
            {Icon && <Icon fontSize="small" style={{ padding: 10 }} />}

            {/* if there is an Icon then show title too */}
            {Icon ? (
                <h3>{title}</h3>
            ) :
                // (if no icon passed then )else show channel name
                (
                    <SidebarOptionChannel>
                        {/* here we will show channel name */}
                        <span>#</span> {title}
                    </SidebarOptionChannel>
                )
            }
        </SidebarOptionContainer>
    )
}

export default SidebarOption

const SidebarOptionContainer = styled.div`
    display: flex;
    font-size: 12px;
    align-items: center;
    padding-left: 2px;
    cursor: pointer;

    /* on hover */
    :hover{
        opacity: 0.9;
        background-color: #340e36;
    }

    > h3{
        font-weight: 500;
    }

    /* to style channel name */
    > h3 > span {
        padding: 15px;
    }
`

// as we need SidebarOptionChannel as h3 [because they are just names, so no container needed]
const SidebarOptionChannel = styled.h3`
 padding: 10px;
 font-weight: 300;

`