import React, {Component} from 'react';
import { View, Image, Text, AppRegistry } from 'react-native';
let RNFS = require('react-native-fs');
import shorthash from 'shorthash';


export default class CacheImage extends Component {

  state = { source:null }

  loadFile = ( path )=> {
        this.setState({ source:{uri:path}}) ;
      }

  downloadFile = (uri,path) => {

    RNFS.downloadFile({fromUrl:uri, toFile: path}).promise
        .then(res =>this.loadFile(path));
  }

  componentDidMount(){
    const { uri } = this.props ; 
    const name = shorthash.unique(uri);
    // const extension = (Platform.OS === 'android') ? 'file://' : '' 
    const path =`${RNFS.CachesDirectoryPath}/${name}.mp3`;
    RNFS.exists(path).then( exists => {
          if(exists)this.loadFile(path);
          else this.downloadFile(uri,path);
        })
    }

  render(){
    return(
      <View>
        <Image style={{width: 50, height: 50}} source={this.state.source} />
      </View>
    );
    }
}