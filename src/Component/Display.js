import React , { Component } from 'react'

class Display extends Component{

    onDone(index){
      this.props.done(index)
    }
  
    onDelete(index){
      this.props.onDelete(index)
    }
  
    onEdit(index){
      this.props.onEdit(index)
    }
    
    render(){
      return(
        <div  style={{marginTop:'1cm'}}>
          {this.props.toDisplay.map((info, index) => {

            return(
              <div className='row' key ={index}>
                <div className='col-2'></div>
                  <div className='col-8 row'>
                    <div className='col-6'>
                        <ul>
                          <li className={`list-group-item list-group-item-${info.isCompleted ? 'danger' : 'success'}`}>{info.name}</li>
                        </ul>
                    </div>
                    <div className='col-2' style={{marginTop:'10px'}}>
                        {info.date}
                    </div>
                    <div className='col-4'>
                        <button className="btn btn-outline-secondary"  onClick={() => {this.onEdit(index)}}>edit</button>
                        <button className="btn btn-outline-success" onClick={() => {this.onDone(index)}}>done</button> 
                        <button className="btn btn-outline-danger" onClick={() => {this.onDelete(index)}}>delete</button>
                    </div>
                  </div>
                <div className='col-2'></div>
              </div>
            )
          })}
        </div>
    )
    }
}

export default Display