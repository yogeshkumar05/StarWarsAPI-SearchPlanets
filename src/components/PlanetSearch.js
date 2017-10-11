import React, { Component } from 'react';
import { searchPlanet } from "./../action-creators/starwars_actions";
import { connect } from "react-redux";
import Planet from './Planet';
import constants from '../common/constants';

class PlanetSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
            planets: []
        }
        this.searchCount=0;
        this.startTime="";

        this.searchQueryHandler = this.searchQueryHandler.bind(this);
        this.sortPopulation = this.sortPopulation.bind(this);
    }

    searchQueryHandler(event) {
        let searchString = event.target.value;
        searchString.trim();
        if (searchString.length == 0) {
            this.setState({ searchQuery: searchString, planets: [] })
        }
        if (searchString.length > 0) {
            this.setState({ searchQuery: event.target.value }, this.callSearchAction)
        }
        else {
            this.setState({ searchQuery: searchString })
        }

    }
    callSearchAction() {
        
        let endTime="";
        let seconds=0;

        if(this.searchCount==0)
        {
            this.startTime=new Date();
           
        }
        this.searchCount++;
        if(this.searchCount==15)
        {
            endTime=new Date();
            console.log(endTime)
            seconds=(endTime.getTime()-this.startTime.getTime())/1000;
        }
        console.log(`seconds: ${seconds}
        searchCount: ${this.searchCount}`)
        if((seconds<=60 && this.searchCount<=15)|| this.props.user=="Luke Skywalker")
            searchPlanet(this.state.searchQuery)
        else
        {
            alert("Only User Luke Skywalker can perform more than 15 searches in a minute!! Logging Out...");
            this.props.updateLogin(false);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.planets != undefined) {
            this.setState({ planets: nextProps.planets }, this.sortPopulation)
        }
    }

    sortPopulation() {
        let sortedPlanets = Object.assign([], this.state.planets);
        let planets = Object.assign([], this.state.planets);
        let population = [];
        sortedPlanets.map((item) => {
            if (item.population == undefined || item.population == "unknown") {
                item.population = 0;
            }
        });

        sortedPlanets.sort(function (a, b) {
            return a.population - b.population;
        });

        for (let i = 0; i < planets.length; i++) {
            planets[i].sortOrder = 0;
            for (let j = 0; j < sortedPlanets.length; j++) {
                if (planets[i].name == sortedPlanets[j].name) {
                    planets[i].sortOrder = j;
                    break;
                }
            }

        }
        this.setState({ planets: planets });
    }

    render() {
        let planets = this.state.planets;
        let renderPlanets = [];
        if(this.state.planets.length<=0)
        {
            renderPlanets=<div className="no-planets">{constants.NO_PLANETS}</div>
        }
        planets.map((item, index) => {
            renderPlanets.push(<Planet key={index} name={item.name} population={item.population} sortOrder={item.sortOrder} />)
        })
        return (
            <div className="planet-search">
                <span className="form-label">Search Planet:</span> <input type="text" className="form-input" value={this.state.searchQuery} onChange={this.searchQueryHandler} />
                <h3>{constants.PLANETS}</h3>
                <div className="render-planets">
                    {renderPlanets}
                </div>
            </div>
        )
    }
}
export default connect(state => (
    {
        planets: state.starwarsReducer.planets
    }
))(PlanetSearch);
