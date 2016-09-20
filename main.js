const App = React.createClass({
  getInitialState(){
      return{
        player0: [],
        player1: [],
        play: false,
        t0:'', t1:'', t2:'', t3:'', t4:'', t5:'', t7:'', t8:'',
        currPlayer: 0,
        info: ''
      }
  },

  startNewGame(){

    this.setState({
      player0: [],
      player1: [],
      info: 'GO player0',
      currPlayer: 0,
      play: true,
      t0:'', t1:'', t2:'', t3:'', t4:'', t5:'', t6:'', t7:'', t8:''
    })
  },

  renderBoard(){
    let {play} = this.state;
    const rows = [0,1,2];
    if(play){
      return rows.map(currRow => <tr key={uuid()}>{this.renderRow(currRow)}</tr>);
    }
  },

  renderRow(currRow){
    let columns;
    let ids;
    const {t0,t1,t2,t3,t4,t5,t6,t7,t8} = this.state;

    switch(currRow){
      case 0:
        columns = [t0,t1,t2];
        ids = [0,1,2];
        break;
      case 1:
        columns = [t3,t4,t5];
        ids = [3,4,5];
        break;
      case 2:
        columns = [t6,t7,t8];
        ids = [6,7,8];
        break;
    }

    return columns.map((currItem,index) => <td id={ids[index]} onClick={this.markTile} key={uuid()}>{currItem}</td>);
  },

  markTile(e){
    let {currPlayer,player0,player1,t0, t1, t2, t3, t4, t6, t5, t7, t8} = this.state;
    let mark = '';
    let change = false;
    let nextPlayer;

    if(currPlayer === 0){
      mark = 'X';
      nextPlayer = 1;
    }else{
      mark = 'O';
      nextPlayer = 0;
    }

    switch(e.currentTarget.id){
      case '0':
        if(t0.length < 1){
          t0 = mark;
          change = true;
        }
        break;
      case '1':
        if(t1.length < 1){
          t1 = mark;
          change = true;
        }
        break;
      case '2':
        if(t2.length < 1){
          t2 = mark;
          change = true;
        }
        break;
      case '3':
        if(t3.length < 1){
          t3 = mark;
          change = true;
        }
        break;
      case '4':
        if(t4.length < 1){
          t4 = mark;
          change = true;
        }
        break;
      case '5':
        if(t5.length < 1){
          t5 = mark;
          change = true;
        }
        break;
      case '6':
        if(t6.length < 1){
          t6 = mark;
          change = true;
        }
        break;
      case '7':
        if(t7.length < 1){
          t7 = mark;
          change = true;
        }
        break;
      case '8':
        if(t8.length < 1){
          t8 = mark;
          change = true;
        }
        break;
    }

    if(change){
      this.setState({
        t0, t1, t2, t3, t4, t6, t5, t7, t8,
        currPlayer: nextPlayer,
        info: `GO player${nextPlayer}`
      })

      if(currPlayer === 0){
        this.setState({
          player0: [...player0,e.currentTarget.id]
        })

        this.checkWin([...player0,e.currentTarget.id],0);

        console.log('player0');
        console.log([...player0,e.currentTarget.id]);

      }else{
        this.setState({
          player1: [...player1,e.currentTarget.id]
        })

        this.checkWin([...player1,e.currentTarget.id],1);

        console.log('player1');
        console.log([...player1,e.currentTarget.id]);
      }
    }
  },

  checkWin(lastPlay,player){
    let wins = ['123','159','147','213','258','321','369','357',
                '417','456','519','537','546','528','639','654',
                '741','789','753','879','852','987','951','963'];

    let found = 0;

    wins.forEach(curr => {

      curr.split('').forEach(num => {

        lastPlay.forEach(playerNum => {
          if(playerNum == parseInt(num)-1){
            found++;
          }
        });

        if(found == 3){
          this.setState({
            info: `WIN player${player}`
          })

        }

      });

      found = 0;
    });

  },

  render(){
    let {info} = this.state;

    return(
      <div className='container'>
        <h1>Tic Tac Toe</h1>
        <hr/>
        <button className='btn btn-default' onClick={this.startNewGame}>Start Game/Resart</button>
        <br/><br/>
        <input value={info} type="text" placeholder="click button to start"/>
        <hr/>

        <table>
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
      </div>
    )
  }
});

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
