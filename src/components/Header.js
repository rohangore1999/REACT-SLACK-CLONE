import { Avatar } from '@material-ui/core';
import React from 'react'
import styled from 'styled-components';
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import SearchIcon from '@material-ui/icons/Search'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function Header() {
    // we are pulling the user data using the firebase hooks
    const [user] = useAuthState(auth)

    console.log("user is ", user)
    return (
        <HeaderContainer>
            {/* header left */}
            <HeaderLeft>
                <HeaderAvatar
                // onClick on avatar for logout
                onClick={()=>auth.signOut()}
                src={user?.photoURL}
                alt={user?.displayName}
                />
                <AccessTimeIcon />
            </HeaderLeft>

            {/* header search */}
            <HeaderSearch>
                <SearchIcon />
                <input placeholder="Clone-Fam" />
            </HeaderSearch>

            {/* header right */}
            <HeaderRight>
                <HelpOutlineIcon />
            </HeaderRight>
        </HeaderContainer>
    )
}

export default Header;

// style using STYLED
/* 
here HeaderContainer will act as div => styled.div
*/
const HeaderContainer = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    background-color: var(--slack-color);
    color:white;

    `;

const HeaderLeft = styled.div`
    display: flex;
    flex: 0.3; //it will take 30%
    align-items: center;
    margin-left: 20px;

    /* as that mui icon is inside of HeaderLeft so we use > */
    /* to target AccessTimeIcon we use default MUI class for Icons "MuiSvgIcon-root" */
    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 30px;
    }
`

// here we user HeaderAvatar
const HeaderAvatar = styled(Avatar)`
    cursor: pointer;

    :hover{
        opacity: 0.8  ;
    }
`

const HeaderSearch = styled.div`
    flex: 0.4;
    opacity: 1;
    border-radius: 6px;
    text-align: center;
    display: flex;
    padding: 0 50px;
    color: gray;
    border: 1px gray solid;

    > input{
        background-color: transparent;
        border:none;
        text-align:center;
        min-width: 30vw;
        outline: 0;
        color: white;
    }
    `

const HeaderRight = styled.div`
    flex: 0.3;
    display:flex;
    align-items: flex-end;

    > .MuiSvgIcon-root{
        margin-left: auto;
        margin-right: 20px;
    }
`