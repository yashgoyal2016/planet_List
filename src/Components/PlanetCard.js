import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

function PlanetCard(props) {
   
    return(
        <div>
            <Paper elevation={3}  style={{width:'320px', padding:"15px 30px", marginBottom:"15px"}}>
                <Grid container direction='row' alignItems='center'>
                    <Grid item sm={10} md={10} lg={10} xl={10}>
                        <Typography variant='h6'>{props.planetData.name}</Typography>
                    </Grid>
                    <Grid item sm={2} md={2} lg={2} xl={2} >
                        <Typography component='div' align='right'>
                            {!props.planetData.isFavourite ? <FavoriteBorderIcon onClick={() => props.selectFavorite(props.planetData.id)} /> : <FavoriteIcon style={{color:"green"}} onClick={() => props.removeFavourite(props.planetData.id)} /> }
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default PlanetCard;