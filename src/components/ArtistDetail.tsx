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

import "./ArtistDetail.less";

import { changeCmsSearchText } from "../reducers/cms/actions";

interface IMainCmsProps {
  searchText: string;
  changeCmsSearchText: (string) => {};
}

interface IMainCmsState {
  
}

const songs = [
  {title: "Zlato, srebro, dukati"},
  {title: "Ne bio ja Mile"},
  {title: "Svaka čaša ispijena"},
  {title: "Gdje si Bože"},
  {title: "Smejem se a plaće mi se"},
  {title: "Pade sneg"},
  {title: "Najbolje je da me nema"},
  {title: "Popij lozu"},
  {title: "Pucaj mi u srce"},
  {title: "Krčma"}
];

class MainCms extends Component<any, any> {

  state = {
    songs: []
  };

  constructor(props) {
    super(props);
    axios.get(`http://46.101.191.69:3000/api/v1/${props.artist}/all-songs`).then(res => {
      this.setState({
        songs: res.data.response
      });
    });
    
  }

  handleSearchTextChange(e) {
    this.props.changeCmsSearchText(e.target.value);
  }

  renderSongList() {
    return this.state.songs.map((song, index) => {
      return (
        <Link to={"/izvodjac/"+song.title}
          className="single-song-list-item"
          key={"song_key_" + song.title + "_" + index }>
        <div className="single-song-list-item-img-container">
          <img
            className="single-song-list-item-inner"
            src="https://scontent.fsjj2-1.fna.fbcdn.net/v/t1.0-1/p200x200/19366557_10155417839028664_6812495168446774538_n.png?_nc_cat=0&oh=c4bab0f5cc97094001afc002fcba0262&oe=5B93A48A" 
          />
        </div>
        <div className="single-song-list-item-img-container single-song-list-item-img-container-second">
          <Glyphicon className="single-song-list-item-inner" glyph="music" />
        </div>
        <div className="single-song-list-item-text">
          <span style={{fontSize:"22px"}}>{song.title}</span>
        </div>
        </Link>
      );
    });
  }

  render() {
    console.log("props",this.props);
    return (
      <div className="container" style={{marginTop:"30px"}}>
        <div className="col-md-10 col-md-offset-1">
          <div className="col-md-7 search-artists-form-container">
            <form className="search-artists-form">
              <FormGroup bsSize="large" controlId="formControlsText">
                <FormControl 
                  type="text"
                  placeholder="Trazi pjesmu..."
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
            <Link to={"/izvodjac/"+ this.props.artist +"/nova-pjesma"} className="add-artist-button-container-inside">
              Dodaj pjesmu
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{height:"30px"}}><path d="M436 228H252V44c0-6.6-5.4-12-12-12h-32c-6.6 0-12 5.4-12 12v184H12c-6.6 0-12 5.4-12 12v32c0 6.6 5.4 12 12 12h184v184c0 6.6 5.4 12 12 12h32c6.6 0 12-5.4 12-12V284h184c6.6 0 12-5.4 12-12v-32c0-6.6-5.4-12-12-12z"/></svg>
            </Link>
          </div>
          <div className="cms-list">
            {this.renderSongList()}
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