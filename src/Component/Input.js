import React, { Component } from 'react';
  
class Input extends Component{
    state = {
      name : '',
      date : '',
      isCompleted: false
    }
  
    nameChamge(e){
      this.setState({
        name : e.target.value
      })
    }
  
    dateChamge(e){
      this.setState({
        date : e.target.value
      })
    }
  
    addbtn(){
      this.props.fromInput(this.state)
      this.setState({
        name : '',
      date : '',
      isCompleted: false
      })
    }
  
    // To edit todos
    componentDidUpdate(prevProp, prevState){
      if(prevProp.editName !== this.props.editName && prevProp.editDate !== this.props.editDate){
        this.setState({
          name : this.props.editName,
          date : this.props.editDate,
          isCompleted: false
        })
      }
    }
  
    render(){
      return (
        <div className='row'>
          <div className='col-2'></div>
          <div className='col-6'>
        <h2>ToDo app using React</h2>
        <br></br>
            <input 
              placeholder="what i want to do...?"
              type = "text"
              value = {this.state.name}
              onChange = {(e) => {this.nameChamge(e)}}></input>
            <input 
              placeholder="Deadline..."
              type = "date"
              value = {this.state.date}
              onChange = {(e) => {this.dateChamge(e)}}></input>
            {this.props.edit && <button type="button" class="btn btn-secondary" onClick = {() => {this.addbtn()}}>Edit</button>}
            {!this.props.edit && <button type="button" class="btn btn-secondary" onClick = {() => {this.addbtn()}}>Add</button>}
          </div>
          <div className='col-4'>
            <button type="button" class="btn btn-outline-info" onClick={()=>{this.props.all()}}>ALL</button>
            <button type="button" class="btn btn-outline-danger" onClick={()=>{this.props.commpleted()}}>COMPLETED</button>
            <button type="button" class="btn btn-outline-success" onClick={()=>{this.props.active()}}>ACTIVE</button>
          </div>
        </div>
      )
     
    }
}

export default Input