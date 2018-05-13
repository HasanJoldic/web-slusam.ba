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

import "./AddArtist.less";

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
    imageUploaded: null
  }

  handleSubmit(e) {
    e.preventDefault();
    const { artistName, artistLastName, imageUploaded, isPerson } = this.state;
    const image = {
      uri: imageUploaded.preview,
      type: "image/jpeg",
      name: "newImage"
    }
    const isGroup = !isPerson;
    const body:any = new FormData();
    body.append("artistName", artistName);
    body.append("artistLastName", artistLastName);
    body.append("isGroup", isPerson ? "" : "true");
    body.append("image", imageUploaded);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    }
    axios.post("http://46.101.191.69:3000/api/v1/add-artist/", body, config);
  }

  render() {
    console.log(this.state);
    return (
      <div className="container new-artist-form-container" style={{marginTop:"30px"}}>
        <div style={{textAlign:"center",marginBottom:"50px"}}><h1>Dodaj novog izvodjaca</h1></div>
        <div className="col-md-8 col-md-offset-2">
          <form >
            <FormGroup bsSize="large" controlId="formControlsText">
              <FormControl 
                type="text"
                placeholder="Ime..."
                value={this.state.artistName}
                onChange={(e) => this.setState({artistName: e.target.value})}
              />
            </FormGroup>
            <FormGroup >
              <Radio name="radioGroup" inline checked={this.state.isPerson} onChange={(e) => this.setState({isPerson: true})}>
                Pjevac
              </Radio>{' '}
              <Radio name="radioGroup" inline checked={!this.state.isPerson} onChange={(e) => this.setState({isPerson: false})}>
                Grupa
              </Radio>{' '}
            </FormGroup>
            {this.state.isPerson &&
              <FormGroup bsSize="large" controlId="formControlsText">
                <FormControl 
                  type="text"
                  placeholder="Prezime..."
                  value={this.state.artistLastName}
                  onChange={(e) => this.setState({artistLastName: e.target.value})}
                />
              </FormGroup>
            }
            <Dropzone
              style={{display:"flex",alignItems:"flex-end"}}
              className="add-artist-dropzone"
              accept="image/jpeg"
              multiple={false}
              maxSize={5000*5000}
              onDropAccepted={(files) => this.setState({imageUploaded: files[0]})}
            > 
              <span className="add-artist-dropzone-button">Ubaci sliku
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" style={{height:"30px"}}><path d="M528 288H384v-32h64c42.6 0 64.2-51.7 33.9-81.9l-160-160c-18.8-18.8-49.1-18.7-67.9 0l-160 160c-30.1 30.1-8.7 81.9 34 81.9h64v32H48c-26.5 0-48 21.5-48 48v128c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V336c0-26.5-21.5-48-48-48zm-400-80L288 48l160 160H336v160h-96V208H128zm400 256H48V336h144v32c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48v-32h144v128zm-40-64c0 13.3-10.7 24-24 24s-24-10.7-24-24 10.7-24 24-24 24 10.7 24 24z"/></svg>
              </span>
              {this.state.imageUploaded && this.state.imageUploaded.preview &&
                <img style={{width:"200px",height:"200px",objectFit:"cover",marginLeft:"50px",padding:"10px",border:"1px dashed rgba(128, 128, 128, 0.3)"}} 
                src={this.state.imageUploaded.preview} />
              }
            </Dropzone>
            <div className="add-artist-submit-button-container">
            <Button 
              onClick={this.handleSubmit.bind(this)}
              className="add-artist-submit-button" type="submit">
              Zapamti
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style={{height:"30px"}}><path d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"/></svg>
            </Button></div>
          </form>
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