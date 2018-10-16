import React, { Component } from 'react';
import { connect } from 'react-redux';
import TheMovieDb from '../scripts/TheMovieDB';

class Details extends Component {
    constructor(props){
        super(props);

        this.state = {
            item : this.props.appState.items[0]
        };

        if (this.state.item.title) // only for movies :)
            this.getVideo();
    }


    goBack() {
        this.props.dispatch({
            type : 'GO_BACK'
        });
    }

    getVideo() {
        TheMovieDb.getVideo(this.state.item.id)
        .then(key => {
            var item = this.state.item;
            item.key = key;
            this.setState({item});
        });
    }

    render() {
        var item = this.state.item;
        
        return(
            <div className="d-flex flex-wrap justify-content-left position-absolute w-100 h-100 align-items-left align-content-left"> 
                <div className="w-100 ml-4 mt-4">
                    <a href="#" onClick={this.goBack.bind(this)}>
                        <i className="fa fa-arrow-left text-dark">  Back</i>
                    </a>
                    <div className="text-center">
                        {item.key != null ? 
                        <iframe className="video" src={"https://www.youtube.com/embed/" + item.key + "?autoplay=1"}></iframe>
                        :
                        <img  className="big-image img-fluid border border-dark p-4" alt="No image" src={"https://image.tmdb.org/t/p/w500/"+ item.poster_path}></img>
                        }
                    </div>
                    <div className="mt-4 border border-dark m-2 p-1">
                        {item.title != null ? 
                            <h2>{item.title}</h2>
                        :
                            <h2>{item.original_name}</h2>
                        }
                        <p className="mt-2">{item.overview}</p>
                    </div>
                </div>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        appState : state
    }
}
export default connect(mapStateToProps)(Details);
