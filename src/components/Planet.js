import React from 'react';

export default function Planet(props) {
    let fontSize = 12 + props.sortOrder * 4;
    let style = { "font-size": fontSize }
    return (<div className="planet" style={style}>
        {props.name}
        {/* {props.population}{props.sortOrder} */}
    </div>)
}