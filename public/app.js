class App extends React.Component {
state = {
  name: '',
  breed: '',
  gender: '',
  image: '',
  animals: []
}
change=(event)=>{
  this.setState({
    [event.target.id]: event.target.value
  })
}
submit=(event)=>{
  event.preventDefault()
  axios.post('/animal_shelter', this.state).then((response)=>
  this.setState({
    animals: response.data,
    name: '',
    breed: '',
    gender: '',
    image: ''
    })
  )
}
delete=(event)=>{
  axios.delete('/animal_shelter/' + event.target.value).then((response)=>{
    this.setState({
      animals: response.data
    })
  })
}
update=(event)=>{
  event.preventDefault()
  const id = event.target.id
  axios.put('/animal_shelter/' + id, this.state).then(response=>{
    this.setState({
      animals: response.data,
      name: '',
      breed: '',
      gender: '',
      image: ''
    })
  })
}
componentDidMount=()=>{
  axios.get('/animal_shelter').then((response)=>{
    this.setState({
      animals: response.data
    })
  })
}
showStats=(event)=>{
  event.preventDefault()
  let stats = this.state.showStats
  axios.get('/animal_shelter/' + event.target.id).then((response)=>{

      if(stats){
        this.setState({
          showStats:false,
          animals: response.data
        })
      }else{
        this.setState({
          showStats:true,
          animals: response.data
        })
    }
  })
}

render=()=>{
  return (
<div className='main'>
  <h1>Animal Shelter</h1>
  <h2>Create New Post:</h2>
<form onSubmit={this.submit}>
  <label htmlFor='name'>Name:</label>
<input type='text' id='name' value={this.state.name} onChange={this.change} />
  <br />
  <label htmlFor='breed'>Breed:</label>
<input type='text' id='breed' value={this.state.breed} onChange={this.change} />
  <br />
  <label htmlFor='gender'>Gender:</label>
<input type='text' id='gender' value={this.state.gender} onChange={this.change} />
  <br />
  <label htmlFor='image'>Image:</label>
<input type='text' id='image' value={this.state.image} onChange={this.change} />
  <br />
<input type='submit' value='Create New Post' />
  <br />
</form>
  <br />

  <h2>Please Adopt Me!</h2>
  <br />
  <button value={this.state._id} onClick={this.showStats}>Show Stats</button>
  <br />
  <div className='mainCage'>
  {this.state.animals.map((animal, i)=>{
    return (
      <div className='cage' key={i}>
      <h4>Name: {animal.name} </h4>
      <h4>{ this.state.showStats ? 'Breed: ' + animal.breed : null }</h4>
      <h4>{ this.state.showStats ? 'Gender: ' + animal.gender : null }</h4>
      <img src={animal.image} alt={animal.name} />
      <br />
      <details>
        <summary>Edit this Post:</summary>
        <form id={animal._id} onSubmit={this.update}>
          <label htmlFor='name'>Name:</label>
            <input type='text' id='name' value={animal.name} onChange={this.change} />
            <br />
            <label htmlFor='name'>Breed:</label>
            <input type='text' id='breed' onChange={this.change} />
            <br />
            <label htmlFor='name'>Gender:</label>
            <input type='text' id='gender' onChange={this.change} />
            <br />
            <label htmlFor='name'>Image:</label>
            <input type='text' id='image' onChange={this.change} />
            <br />
            <input type='submit' value='Update Post' />
        </form>
      </details>
      <button value={animal._id} onClick={this.delete}>Delete Post</button>
      <br />
      </div>
    )
  })}
    </div>
</div>
    )
  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
