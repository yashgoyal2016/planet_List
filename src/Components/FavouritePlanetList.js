import React from 'react';
import PlanetCard from './PlanetCard';
import Typography from '@material-ui/core/Typography'



function FavouritePlanetList(props) {
    return (
        <div>
            {props.planetData.length ?  props.planetData.map((planet, i) => {
                return (
                    <PlanetCard planetData={planet} key={i} removeFavourite={props.removeFavourite} /> 
                )})
            : <Typography variant='h6' align='center'>No Favourite Planets</Typography>}
        </div>
    )
}

export default FavouritePlanetList;