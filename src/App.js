import React, { Component } from 'react';
import ShowList from './components/showList/ShowContainer'
import UserNote from './components/userNote/NoteContainer'
import { BackTop,Icon } from 'antd';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { doFetchList,doInitNote,doLoadList } from './actions/ActionCreator'
import './css/App.css';

class App extends Component {
  state={
    isOpen:false,
  }
  componentDidMount(){
    this.props.doFetchList() //載入列表
    this.loadDataToNote() //載入筆記資料
  }
  loadDataToNote = ()=>{
    //從localStorage取得資料
    let data = localStorage.getItem('note');
    
    if(data === null) return false;
    let initData = JSON.parse(data);
    if(data === '[]'){
      initData = {'indie':[],'classic':[]}
      
    }
    //console.log(`loadDataToNote/`,initData)
    this.props.doInitNote(initData); //儲存進state
  }
  handleCloseNote = (isClose)=>{
    this.setState({isOpen:isClose}) //關閉記事
  }
  handleOpenNote = ()=>{
    this.setState({isOpen:true}) //打開記事
  }
  render() {
    return (
      <div className="App">
        <BackTop />
        <div className="btn-open" onClick={this.handleOpenNote}><Icon style={{ fontSize: 30}} type="schedule" /><span>Open Note</span></div>
        <UserNote isOpen={this.state.isOpen} onCloseNote={this.handleCloseNote}></UserNote>
        <ShowList></ShowList>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return bindActionCreators({doFetchList,doInitNote,doLoadList},dispatch)
}
export default connect(null,mapDispatchToProps)(App)
