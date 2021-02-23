import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {Grid, Typography, AppBar, Tabs, Tab} from '@material-ui/core';
import PlanetList from './PlanetList';
import FavouritePlanetList from './FavouritePlanetList';
import PublicIcon from '@material-ui/icons/Public';
import FavoriteIcon from '@material-ui/icons/Favorite';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
  };

function Home() {
    const [planetData, setplanetData] = useState([]);  //planetData use for API response
    const [favplanetData, setfavplanetData] = useState([]); // favplanetData will show the list of favourite planets 
    const [open, setOpen] = useState(false); // open use for success message
    const [message, setMessage] = useState(''); // message used for showing planet name in snackbar
    const [removFavOpen, setremoveFavOpen] = useState(false); // open used for remove favourite planet 

    useEffect(() => {
        axios.get('https://assignment-machstatz.herokuapp.com/planet').then((res) => {
            setplanetData(res.data) // response added to planetData
        })
    }, [])

    useEffect(() => {
        setfavplanetData(planetData.filter((planet) => planet.isFavourite )) // here filter all the favourite planets to show in favourite planet list
    }, [planetData])

   function selectFavorite(id) {
       setplanetData(prevplanetData => prevplanetData.map((planet) => {
        return {...planet, isFavourite: planet.id === id || planet.isFavourite ? true : false}
       }))
       setOpen(true)
       setMessage(id)
    }

    const removeFavourite = (id) => {
        setplanetData(prevplanetData => prevplanetData.map((planet) => {
            return {...planet, isFavourite: planet.id === id ? false : planet.isFavourite}
        }))
        setremoveFavOpen(true)
        setMessage(id)
    }

    const handleClose = () => {
        setOpen(false)
        setremoveFavOpen(false)
    }

    const [value, setValues] = useState(0);

    function handleChange(event, value) {
        setValues(value)
    }

    return (
        <div>
            <Grid container justify='center'>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab label="Planets List" icon={<PublicIcon />} />
                        <Tab label="Your Favorites" icon={<FavoriteIcon />} />
                    </Tabs>
                </AppBar>
                    {value === 0 && 
                        <TabContainer>
                            <PlanetList planetData={planetData} selectFavorite={selectFavorite} removeFavourite={removeFavourite} />      
                        </TabContainer>
                    }
                    {value === 1 && 
                        <TabContainer>
                            <FavouritePlanetList planetData={favplanetData} removeFavourite={removeFavourite} />
                        </TabContainer>
                    }
            </Grid>

            {/* Add Favourite planet */}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {message} added to favourites!
                </Alert>
            </Snackbar>

            {/* Remove Favourite planet */}
            <Snackbar open={removFavOpen} autoHideDuration={1000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {message} remove from favourites!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default Home;