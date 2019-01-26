import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavDiv = styled.div`
    max-width: 60%;
    margin: 10px auto;
    display: flex;
    justify-content: space-between;
`

const Navigation = () => {
    return(
        <NavDiv>
            <NavLink exact to ='/'>Home</NavLink>
            <NavLink exact to ='/signup'>Sign Up</NavLink>
            <NavLink exact to ='/signin'>Sign In</NavLink>
        </NavDiv>
    );
}

export default Navigation;