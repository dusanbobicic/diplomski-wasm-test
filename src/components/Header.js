import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, MenuItem, Toolbar } from '@material-ui/core';
const Header = () => {
    const history = useHistory();
    const navigateTo = useCallback(
        (routeToNavigate) => {
            history.push(routeToNavigate)
        }, [history]);
    return (
        <>
            <AppBar position="relative">
                <Toolbar>
                    <MenuItem onClick={() => navigateTo('/')}>Home</MenuItem>
                    <MenuItem onClick={() => navigateTo('/client-side')}>Client Side Tests</MenuItem>
                    <MenuItem onClick={() => navigateTo('/contact')}>Contact</MenuItem>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header;
