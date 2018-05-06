import React, { Component } from "react";
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
import { Circle } from 'rc-progress';
import axios from "axios";

import "./SingleSongUpload.less";

class SingleSongUpload extends Component<any, any> {

	constructor(props) {
		super(props);
		this.state = {
			songName: props.song.name.substring(0, props.song.name.length-4),
			isUploaded: false,
			isError: false,
			uploadProgress: 0,
			isUploading: false
		};
	}

	renderIcon() {
		const { isUploaded, isUploading, isError, uploadProgress } = this.state;
		if (isError) {
			return <div style={{width:"48px",height:"64px",marginLeft:"10px"}}><svg style={{fill:"red"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M231.6 256l130.1-130.1c4.7-4.7 4.7-12.3 0-17l-22.6-22.6c-4.7-4.7-12.3-4.7-17 0L192 216.4 61.9 86.3c-4.7-4.7-12.3-4.7-17 0l-22.6 22.6c-4.7 4.7-4.7 12.3 0 17L152.4 256 22.3 386.1c-4.7 4.7-4.7 12.3 0 17l22.6 22.6c4.7 4.7 12.3 4.7 17 0L192 295.6l130.1 130.1c4.7 4.7 12.3 4.7 17 0l22.6-22.6c4.7-4.7 4.7-12.3 0-17L231.6 256z"/></svg></div>;
		} else if (isUploaded) {
			return <div style={{width:"64px",height:"64px",marginLeft:"10px"}}><svg style={{fill:"green"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"/></svg></div>;
		} else if (isUploading) {
			return <Circle style={{height:"64px",marginLeft:"10px"}} percent={uploadProgress} strokeWidth="10" strokeColor="blue" />
		} else if (!isUploading) {
			return <div className="upload-button" onClick={this.handleSubmit.bind(this)} style={{width:"80px",height:"64px",marginLeft:"10px"}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M543.7 200.1C539.7 142.1 491.4 96 432 96c-7.6 0-15.1.8-22.4 2.3C377.7 58.3 328.1 32 272 32c-84.6 0-155.5 59.7-172.3 139.8C39.9 196.1 0 254.4 0 320c0 88.4 71.6 160 160 160h336c79.5 0 144-64.5 144-144 0-61.8-39.2-115.8-96.3-135.9zM496 432H160c-61.9 0-112-50.1-112-112 0-56.4 41.7-103.1 96-110.9V208c0-70.7 57.3-128 128-128 53.5 0 99.3 32.8 118.4 79.4 11.2-9.6 25.7-15.4 41.6-15.4 35.3 0 64 28.7 64 64 0 11.8-3.2 22.9-8.8 32.4 2.9-.3 5.9-.4 8.8-.4 53 0 96 43 96 96s-43 96-96 96zM296.5 150.5c-4.7-4.7-12.3-4.7-17 0l-104 104c-4.7 4.7-4.7 12.3 0 17l16.9 16.9c4.7 4.7 12.4 4.7 17.1-.1l54.5-55.8V372c0 6.6 5.4 12 12 12h24c6.6 0 12-5.4 12-12V232.5l54.5 55.8c4.7 4.8 12.3 4.8 17.1.1l16.9-16.9c4.7-4.7 4.7-12.3 0-17l-104-104z"/></svg></div>;
		}  
	};

	handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("song", this.props.song);
    formData.append("songName", this.state.songName);
    const self = this;
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: function( progressEvent ) {
        self.setState({uploadProgress: (Math.round((progressEvent.loaded * 100 ) / progressEvent.total))});
      }
    }
    this.setState({isUploading: true});
    axios.post(`http://46.101.191.69:3000/api/v1/add-song/${this.props.artist}`, formData, config).then(res => {
    	this.setState({isUploaded: true, isUploading:false});
    });
  }

	render() {
		return (
			<div className="SingleSongUpload">
				<form style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
					<FormGroup bsSize="large" controlId="formControlsText">
	          <FormControl 
	            type="text"
	            placeholder="Ime..."
	            value={this.state.songName}
	            onChange={(e) => this.setState({songName: e.target.value})}
	          />
	        </FormGroup>
	        <div style={{display:"flex",alignItems:"center",height:"100%"}}>
		        {Math.round(this.props.song.size/1024/1024*10)/10 + " MB"}
		        {this.renderIcon.call(this)}
	        </div>
				</form>
			</div>
		);
	}
}

export default SingleSongUpload;