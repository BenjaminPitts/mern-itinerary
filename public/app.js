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


render=()=>{
  return (
<div className='main'>
<div className='header'>
  <h1>Disney Itinerary</h1>
  <h2>Create New Adventure:</h2>
    <form onSubmit={this.submit}>
  <label htmlFor='name'>Name:</label>
  <input type='text' id='name' value={this.state.name} onChange={this.change} />
  <br />
  <label htmlFor='breed'>Activity1:</label>
  <input type='text' id='breed' value={this.state.breed} onChange={this.change} />
  <br />
  <label htmlFor='gender'>Activity2:</label>
  <input type='text' id='gender' value={this.state.gender} onChange={this.change} />
  <br />
  <label htmlFor='image'>Image URL:</label>
  <input type='text' id='image' value={this.state.image} onChange={this.change} />
  <br />
  <input type='submit' value='Create' />
  <br />
    </form>
</div>
  <br />
  <br />
  <div className='mainCage'>
  {this.state.animals.map((animal, i)=>{
    return (
      <div className='cage' key={i}>
      <details>
      <summary>{animal.name}'s Itinerary</summary>
      <ul>
        <img src={animal.image} />
        <li>Activity1: {animal.breed}</li>
        <li>Activity2: {animal.gender}</li>
      </ul>
      <br />
      <details>
        <summary>Edit this Post:</summary>
        <form id={animal._id} onSubmit={this.update}>
          <label htmlFor='name'>Name:</label>
            <input type='text' id='name' value={animal.name} onChange={this.change} />
            <br />
            <label htmlFor='name'>Activity1: </label>
            <input type='text' id='breed' onChange={this.change} />
            <br />
            <label htmlFor='name'>Activity2: </label>
            <input type='text' id='gender' onChange={this.change} />
            <br />
            <label htmlFor='name'>Image URL:</label>
            <input type='text' id='image' onChange={this.change} />
            <br />
            <input type='submit' value='Update Post' />
        </form>
      </details>
      <button value={animal._id} onClick={this.delete}>Delete Post</button>
      </details>


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
