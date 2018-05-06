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
  Glyphicon,
  Radio,
  Button
} from "react-bootstrap";
import Dropzone from 'react-dropzone'
import axios from "axios";

import "./AddSong.less";
import SingleSongUpload from "./SingleSongUpload";

import { changeCmsSearchText } from "../reducers/cms/actions";
import { getBase64 } from "../utils/utils";

interface IMainCmsProps {
  searchText: string;
  changeCmsSearchText: (string) => {};
}

interface IMainCmsState {
  
}

class AddArtist extends Component<any, any> {
  state = {
    artistName: "",
    artistLastName: "",
    isPerson: true,
    imageUploaded: null,
    songs: []
  }

  handleSubmit(e) {
    e.preventDefault();
    const { artistName, artistLastName, songs } = this.state;
    const formData = new FormData();
    let song = songs[0];
    const blob = song.slice(0, -1, 'audio/mpeg'); 
    const newFile = new File([blob], 'test.mp3', {type: 'audio/mpeg'});
    formData.append("song", song);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: function( progressEvent ) {
        console.log(Math.round((progressEvent.loaded * 100 ) / progressEvent.total));
      }
    }
    axios.post("http://46.101.191.69:3000/api/v1/add-song/Miligram", formData, config);
  }

  renderSongUploads() {
    return this.state.songs && this.state.songs.map((song, index) => {
      return <SingleSongUpload key={"SingleSongUpload_key_"+index} song={song} artist={this.props.artist}/>
    });
  }

  render() {
    return (
      <div className="container new-artist-form-container" style={{marginTop:"30px"}}>
        <div style={{textAlign:"center",marginBottom:"50px"}}><h1>Dodaj novu pjesmu</h1></div>
        <div className="col-md-8 col-md-offset-2">
            <Dropzone
              className="react-dropzone-add-song"
              accept="audio/mpeg"
              multiple={true}
              maxSize={20*1000*1000}
              onDropAccepted={(files) => this.setState({songs: this.state.songs.concat(files)})}
            >
              <Glyphicon className="react-dropzone-plus" glyph="plus" />
            </Dropzone>
            <div className="song-uploads-container">
              {this.renderSongUploads()}
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

export default connect(mapStateToProps, {changeCmsSearchText})(AddArtist);