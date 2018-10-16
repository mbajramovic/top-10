import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

// components
import Item from './Item';
import Details from './Details';

//scripts
import TheMovieDB from '../scripts/TheMovieDB';


class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value : '',
            suggestions : [],
            topTen : [],
            items : [],

            searchForMovies : false
        }

        this.getMovies = this.getMovies.bind(this);
        this.getTvShows = this.getTvShows.bind(this);
    }
    
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
      };

    onSuggestionsFetchRequested = ({ value }) => {
        if (value.length >= 3) {
            if (this.state.searchForMovies) 
                TheMovieDB.searchForMovies(value.trim().toLowerCase())
                .then(results => {
                    this.setState({
                        suggestions : results,
                        items : results
                    });
                });
            else
                TheMovieDB.searchForTvShows(value.trim().toLowerCase())
                .then(results => {
                    this.setState({
                        suggestions : results,
                        items : results
                    });
                });
        }
        else
            this.setState({
                suggestions : [],
                items : this.state.topTen
            });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    componentDidMount() {
        this.getTvShows();
       
    }

    getMovies() {
        TheMovieDB.getTopTenMovies()
        .then(topTen => {
            this.setState({
                topTen : topTen,
                items : topTen,
                searchForMovies : true
            });
        });
    }

    getTvShows() {
        TheMovieDB.getTopTenTvShows()
        .then(topTen => {
            this.setState({
                items : topTen,
                topTen : topTen,
                searchForMovies : false
            })
        });
    }

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search',
            value,
            onChange: this.onChange
        };

        var items = renderItems(this.state.items);

        return(
            <div className="w-100">
                {this.props.appState.items && this.props.appState.items.length !== 0 ? //if it is selected show details... :)
                    <Details /> : 
                    <div className="w-100 h-100 text-center">
                        <div className="btn-group btn-group-toggle mt-4" data-toggle="buttons">
                            <label className={this.state.searchForMovies  ? "btn btn-secondary active" : "btn btn-secondary"}  onClick={this.getMovies.bind(this)}>
                                <input type="radio" name="options" id="movies" autoComplete="off"  checked/>Movies
                            </label>
                            <label className={!this.state.searchForMovies  ? "btn btn-secondary active" : "btn btn-secondary"}  onClick={this.getTvShows.bind(this)}>
                                <input type="radio" name="options" id="tv-shows" autoComplete="off" />TV shows
                            </label>
                        </div>
        
                        <div className="mt-2 w-100">
                            <form className="form-inline w-100">
                                <i className="fa fa-search"></i>
                                <Autosuggest
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={getSuggestionValue}
                                    renderSuggestion={renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </form>
                        </div>
        
                        <div className="border border-secondary rounded">
                            <table className="w-100 table-responsive-lg"><tbody>
                                {items}
                            </tbody></table>
                        </div>
                    </div>    
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appState : state
    }
}

function renderSuggestion(suggestion) {
    return (
        <div>
            {suggestion.title != null ? suggestion.title : suggestion.original_name}
        </div>
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.title != null ? suggestion.title : suggestion.original_name
}

function renderItems(items) {
    var renderedItems = [];
    var limit = items.length;
    for (var i = 0; i < limit; i+=2) {
        renderedItems.push(
        <tr className="border-bottom">
            <td className="text-center w-50">
                <Item key={i} item={items[i]}/>
            </td>
            <td className="text-center w-50">
                {i + 1 < limit ?
                    <Item key={i} item={items[i+1]}/>
                : 
                    null
                }
            </td>
        </tr>
        );
    }

    return renderedItems;
}

export default connect(mapStateToProps)(Header);