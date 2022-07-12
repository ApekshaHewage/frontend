import React from 'react'

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';
import clsx from 'clsx';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Button, Drawer } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Contacts from '@material-ui/icons/Contacts';
import { useNavigate } from 'react-router-dom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


export const SideNavigation = () => {
    let navigate = useNavigate()
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });
    
  const classes = useStyles();
//   const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const theme = useTheme();

  return (
    <div>
        <div
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          style={{width:"30%"}}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </div>
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? [<ChevronLeftIcon />, <Typography variant='h6' color='primary'> Hide </Typography>] : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem>
                <ListItemIcon> <Contacts/> </ListItemIcon>
                <ListItemText> 
                    <Button onClick={()=>{ navigate('/get-all-customers') }} > <Typography variant='h6' color='primary'> Customer Management </Typography> </Button>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Typography variant='h7' color='default'> View and manage all existing customers </Typography>
                </ListItemText>
            </ListItem>
            <Divider/>
            <ListItem>
            <ListItemIcon> <SupervisorAccountIcon/> </ListItemIcon>
                <ListItemText> 
                    <Button onClick={()=>{ navigate('/get-all-employees') }} > <Typography variant='h6' color='primary'> Employee Management </Typography> </Button>
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemText>
                    <Typography variant='h7' color='default'> View and manage all existing employees </Typography>
                </ListItemText>
            </ListItem>
        </List>
      </Drawer>
    </div>
  )
}
