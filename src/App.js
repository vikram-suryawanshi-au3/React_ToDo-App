import React, {
  Component
} from 'react';
import './App.css';
import update from 'immutability-helper';
import Input from './Component/Input'
import Display from './Component/Display'
import Active from './Component/Active'
import Completed from './Component/Completed'

class App extends Component {
  state = {
    all : [],
    editName: '',
    editDate: '',
    index : '',
    edit : false,
    displayAll : true,
    displayCompleted : false,
    displayActive: false
  }

  fromInputToApp(info){
    if(this.state.edit === true){
      let index = this.state.index
      let newState = update(this.state, {
        all : {
          [index] : {
            name :{
              $set : info.name
            },
            date : {
              $set : info.date
            }
          }
        },
        index : {
          $set : ''
        },
        editDate : {
          $set : ''
        },
        editName : {
          $set : ''
        },
        edit : {
          $set : false
        },

      })
      this.setState(newState)
    }else{
    this.setState({
      all : [...this.state.all, info]
    })}
  }

  done(index){
    let toggle = this.state.all[index].isCompleted
    let id = index
    let newState = update(this.state, {
      all : {
        [id] :{
          isCompleted : {
            $set : !toggle
          }
        }
      }
    })
    this.setState(newState)
  }

  onDelete(index){
    let id = index
    let newState = update(this.state, {
      all : {
          $splice: [[id, 1]]
      }
    })
    this.setState(newState)
  }
  

  onEdit(index){
    let name = this.state.all[index].name
    let date = this.state.all[index].date
    this.setState({
      editName : name,
      editDate : date,
      edit : true,
      index : index
    })
  }

  completed(){
    this.setState({
      displayAll : false,
      displayCompleted : true,
      displayActive: false
    })
  }
  all(){
    this.setState({
      displayAll : true,
      displayCompleted : false,
      displayActive: false
    })
  }
  active(){
    this.setState({
      displayAll : false,
      displayCompleted : false,
      displayActive: true
    })
  }

  render() {
    return ( 
    <div className = "App" >
      <Input fromInputAfterEdit={(info) => {this.fromInputAfterEdit(info)}} 
        fromInput={(info) => this.fromInputToApp(info)} 
        commpleted={() => {this.completed()}} 
        all={() => {this.all()}} 
        active={() => {this.active()}} 
        edit={this.state.edit} 
        editName={this.state.editName} 
        editDate={this.state.editDate}/>

      {this.state.displayAll && <Display onEdit={(index) => {this.onEdit(index)}} 
                                  onDelete={(index) => {this.onDelete(index)}} 
                                  done = {(index) => {this.done(index)}} 
                                  toDisplay={this.state.all}/>}

      {(this.state.displayCompleted) && <Completed toDisplay={this.state.all}
                                          onEdit={(index) => {this.onEdit(index)}} 
                                          onDelete={(index) => {this.onDelete(index)}} 
                                          done = {(index) => {this.done(index)}}></Completed>}

      {(this.state.displayActive) && <Active toDisplay={this.state.all}
                                          onEdit={(index) => {this.onEdit(index)}} 
                                          onDelete={(index) => {this.onDelete(index)}} 
                                          done = {(index) => {this.done(index)}}></Active>}
    </div>
    ); 
  }
}

export default App;