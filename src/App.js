import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state={
    rates:{}
  }


  componentDidMount(){
    


     this.ws=new WebSocket('wss://v2cihxqx2i.execute-api.ap-south-1.amazonaws.com/dev')
    //this.ws=new WebSocket('wss://u3fen3k27a.execute-api.us-east-1.amazonaws.com/Final')
    this.ws.onopen=()=>{
      this.ws.send({action:'$default'})
      console.log('connected')
    }

    this.ws.onmessage=evt=>{
      const message=evt.data
      console.log(message)
      const rates=JSON.parse(message)
      console.log(rates)
      console.log("rates",rates[0])
      // console.log(JSON.parse(message)['Items'])
      delete rates[0].Ind
       this.setState({rates:rates[0]})
    }

    this.ws.onclose=()=>{
      console.log('disconnected')
    }

  }


  render() {
    const items=Object.keys(this.state.rates)
    console.log(items)
    return (
      <div style={{display:"flex",flex:1,flexDirection:"column"}}>
        {
          Object.keys(this.state.rates).map((i,index) => {
            return(
            <div key={index} 
            style={{display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
            width:"98%",height:"170px",
            margin:"1%",
            backgroundColor:"#d0efff"}}>

               <div style={{display:"flex",height:"100px",alignItems:"center",justifyContent:"center",width:"98%",backgroundColor:"#03254c"}}>
                  <p style={{fontWeight:"bold",fontSize:"40px",color:"#fff"}}>{i}</p>
                </div>
                <div style={{display:"flex",flex:1}}>
                <p style={{fontSize:"20px"}}>{this.state.rates[i]["N"]}</p>
                </div>

            </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
