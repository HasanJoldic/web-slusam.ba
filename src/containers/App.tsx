import React, { Component } from 'react';
import {
	Grid,
	Row,
	Col,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import reducers from "../reducers";

import Navbar from "./Navbar";
import AppContent from "./AppContent";
import Footer from "./Footer";
import StatusWrapper from "./StatusWrapper";
import MainCms from "../components/MainCms";
import AddArtist from "../components/AddArtist";
import ArtistDetail from "../components/ArtistDetail";
import AddSong from "../components/AddSong";

import "./App.less";

interface IAppProps {
	match: any;
  cmsSearchValue: string;
}

interface IAppState {
	showMobileNavButtons: boolean;
}

const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(ReduxThunk)
);



class App extends Component<IAppProps, IAppState> {

	state = {
		showMobileNavButtons: false
	}

	handleMobileNavMenuClick = () => {
		this.setState({
			showMobileNavButtons: !this.state.showMobileNavButtons
		});
	}

  render() {
  	const { match, cmsSearchValue } = this.props;
    let content = null;
    console.log(match)
    switch (match.path) {
      case "/":
        content = <div><Link to='/izvodjaci'>Izvodjaci</Link></div>;
        break;
      case "/izvodjaci":
        content = <MainCms />;
        break;
      case "/novi-izvodjac":
        content = <AddArtist />;
        break;
      case "/dodaj-pjesme/:izvodjac":
        content = <AddArtist />;
        break;
      case "/izvodjac/:artist":
        content = <ArtistDetail artist={this.props.match.params.artist} />;
        break;
      case "/izvodjac/:artist/nova-pjesma":
        content = <AddSong artist={this.props.match.params.artist} />;
        break;
    }
    console.log(content);
    return (
      <Provider store={store}>
        <StatusWrapper>
          <Navbar onMobileNavMenuClick={this.handleMobileNavMenuClick.bind(this)} />
          <AppContent showMobileNavButtons={this.state.showMobileNavButtons} >
            {content}
          </AppContent>
          <Footer />
        </StatusWrapper>
      </Provider>
    );
  }
} 

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

export default connect(mapStateToProps)(App);