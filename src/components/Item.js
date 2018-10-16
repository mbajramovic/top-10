import React, {Component} from 'react';
import {connect} from 'react-redux';

const imageUrl = require('../scripts/config.json').image_url;

 class Item extends Component {
    constructor(props) {
        super(props);
    }
    
    selectedItem = () => {
        const data = this.props.item;
        this.props.dispatch({
            type : 'SELECTED_ITEM',
            data
        });
    };
    render() {
        return(
            <div className="m-2">
                <div className="view overlay zoom">
                    <img className="image img-fluid" alt="No image" src={"https://image.tmdb.org/t/p/w500/"+ this.props.item.poster_path}/>
                </div>
                {this.props.item.title != null ?
                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Show details" onClick={this.selectedItem.bind(this)}>{this.props.item.title}</a>
                :   
                    <a href="#" data-toggle="tooltip" data-placement="bottom" title="Show details" onClick={this.selectedItem.bind(this)}>{this.props.item.original_name}</a>
                }
            </div>
        );
    }
 };

export default connect()(Item);

