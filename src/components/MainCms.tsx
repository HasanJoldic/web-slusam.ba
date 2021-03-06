import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  InputGroup,
  Glyphicon
} from "react-bootstrap";
import {
  Link
} from "react-router-dom";
import axios from "axios";

import "./MainCms.less";

import { changeCmsSearchText } from "../reducers/cms/actions";

interface IMainCmsProps {
  searchText: string;
  changeCmsSearchText: (string) => {};
}

interface IMainCmsState {
  
}

class MainCms extends Component<any, any> {
  state = {
    artists :[]
  }
  constructor(props) {
    super(props);
    axios.get("http://46.101.191.69:3000/api/v1/all-artists").then(res => {
      this.setState({
        artists: res.data.response
      });
    });
  }

  handleSearchTextChange(e) {
    this.props.changeCmsSearchText(e.target.value);
  }

  renderArtistList() {
    //let _artists = [...artists.slice(0, 100)];
    return this.state.artists.map((artist, index) => {
      return (
        <Link to={"/izvodjac/"+artist.name}
          className="single-artist-list-item"
          key={"artist_key_" + artist + "_" + index }>
        <div className="single-artist-list-item-img-container">
          <img
            src="https://scontent.fsjj2-1.fna.fbcdn.net/v/t1.0-1/p200x200/19366557_10155417839028664_6812495168446774538_n.png?_nc_cat=0&oh=c4bab0f5cc97094001afc002fcba0262&oe=5B93A48A" 
          />
        </div>
        <div className="single-artist-list-item-text">
          <span style={{fontSize:"22px"}}>{artist.name}</span>
        </div>
        </Link>
      );
    });
  }

  render() {
    console.log("this.props.searchText", this.props.changeCmsSearchText)
    return (
      <div className="container" style={{marginTop:"30px"}}>
        <div className="col-md-10 col-md-offset-1">
          <div className="col-md-7 search-artists-form-container">
            <form className="search-artists-form">
              <FormGroup bsSize="large" controlId="formControlsText">
                <FormControl 
                  type="text"
                  placeholder="Trazi pjevaca..."
                  value={this.props.searchText}
                  onChange={this.handleSearchTextChange.bind(this)}
                />
              </FormGroup>
            </form>
          </div>
          <div className="add-artist-padding add-artist-left-padding col-md-1">
            <div className="add-artist-padding-inside add-artist-left-padding-inside"></div>
          </div>
          <div className="add-artist-button-container col-md-4">
            <Link to="/novi-izvodjac" className="add-artist-button-container-inside">
              Dodaj pjevaca
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{height:"30px"}}><path d="M436 228H252V44c0-6.6-5.4-12-12-12h-32c-6.6 0-12 5.4-12 12v184H12c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h184v184c0 6.6 5.4 12 12 12h32c6.6 0 12-5.4 12-12V284h184c6.6 0 12-5.4 12-12v-32c0-6.6-5.4-12-12-12z"/></svg>
            </Link>
          </div>
          <div className="cms-list">
            {this.renderArtistList()}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    searchText: state.cms.searchText
  };
};

export default connect(mapStateToProps, {changeCmsSearchText})(MainCms);