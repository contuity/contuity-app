import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AllJotsScreen from './AllJotsScreen';
import PeopleScreen from './PeopleScreen';
import { h3 } from '../../assets/style/common.style';

import jotUnselectedIcon from '../../assets/img/jots_outline.png';
import spacesUnselectedIcon from '../../assets/img/spaces_outline.png';
import peopleUnselectedIcon from '../../assets/img/people_outline.png';

import jotSelectedIcon from '../../assets/img/jots_filled.png';
import spacesSelectedIcon from '../../assets/img/spaces_filled.png';
import peopleSelectedIcon from '../../assets/img/people_filled.png';

let showingPage = {
  JOTS: 'jots',
  SPACES: 'spaces',
  PEOPLE: 'people',
};

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showingPage: showingPage.JOTS,
      isShowingNavBar: true,
    };

    this.jotSelected = this.jotSelected.bind(this);
    this.spacesSelected = this.spacesSelected.bind(this);
    this.peopleSelected = this.peopleSelected.bind(this);
    this.setNavBarDisplay = this.setNavBarDisplay.bind(this);
  }

  setNavBarDisplay(show) {
    // Convert input to boolean
    this.setState({
      isShowingNavBar: !!show,
    });
  }

  jotSelected() {
    this.setState({
      showingPage: showingPage.JOTS,
    });
  }

  spacesSelected() {
    this.setState({
      showingPage: showingPage.SPACES,
    });
  }

  peopleSelected() {
    this.setState({
      showingPage: showingPage.PEOPLE,
    });
  }

  getButton(src, text, onPress) {
    let leftButton = {
      flex: 1,
      flexDirection: 'row',
      padding: 'auto',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    };

    let imageStyle = {
      width: 32,
      height: 32,
      marginBottom: -4,
    };

    let middleContainer = {
      justifyContent: 'center',
      alignItems: 'center',
    };

    let iconSubtitleText = {
      ...h3,
      color: 'white',
      fontSize: 14,
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <TouchableOpacity style={leftButton} onPress={onPress}>
        <View style={middleContainer}>
          <Image source={src} style={imageStyle} />
          <Text style={iconSubtitleText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    let viewStyle = {
      flexDirection: 'column',
      height: '100%',
      width: '100%',
      position: 'relative',
    };

    let navBarStyle = {
      height: 72,
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'rgba(54, 50, 60, 0.82)',
      backdropFilter: 'blur(4px)',
      zIndex: 2,
    };

    if (!this.state.isShowingNavBar) {
      navBarStyle.display = 'none';
    }

    let contentView = {
      zIndex: 1,
      height: '100%',
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    };

    let currentPage = null;

    // Figure out which icons to use and which page to show.
    let jotIcon;
    if (this.state.showingPage == showingPage.JOTS) {
      jotIcon = jotSelectedIcon;
      currentPage = (
        <AllJotsScreen
          user={this.state.user}
          setNavBarDisplay={this.setNavBarDisplay}
        />
      );
    } else {
      jotIcon = jotUnselectedIcon;
    }

    let spacesIcon;
    if (this.state.showingPage == showingPage.SPACES) {
      spacesIcon = spacesSelectedIcon;
    } else {
      spacesIcon = spacesUnselectedIcon;
    }

    let peopleIcon;
    if (this.state.showingPage == showingPage.PEOPLE) {
      peopleIcon = peopleSelectedIcon;
      currentPage = <PeopleScreen setNavBarDisplay={this.setNavBarDisplay} />;
    } else {
      peopleIcon = peopleUnselectedIcon;
    }

    return (
      <View style={viewStyle}>
        <View style={contentView}>{currentPage}</View>
        <View style={navBarStyle}>
          {this.getButton(jotIcon, 'Jots', this.jotSelected)}
          {this.getButton(spacesIcon, 'Spaces', this.spacesSelected)}
          {this.getButton(peopleIcon, 'People', this.peopleSelected)}
        </View>
      </View>
    );
  }
}

export default NavBar;
