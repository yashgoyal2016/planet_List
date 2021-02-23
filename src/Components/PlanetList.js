import React from 'react';
import PlanetCard from './PlanetCard';
import Typography from '@material-ui/core/Typography'



function PlanetList(props) {

    return (
        <div>
            {props.planetData.length ?  props.planetData.map((planet, i) => {
            return (<PlanetCard planetData={planet} key={i} selectFavorite={props.selectFavorite} removeFavourite={props.removeFavourite} /> 
                )})
            :<Typography variant='h6' align='center'>Loading....</Typography>
            }
        </div>
    )
}

export default PlanetList;