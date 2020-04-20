import React from 'react'
import weed from '../../img/canalol.gif';

const PageNotfound = () => {
    return (
        <div>
            <br/> 
            <h1 className="large text-primary">
            &nbsp;&nbsp;&nbsp; Page Not found :( 
            </h1>
            <img  src={weed} alt="404 page not found :("/>
        </div>
    )
}

export default PageNotfound;