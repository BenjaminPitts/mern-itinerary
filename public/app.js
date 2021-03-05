class App extends React.Component {
state = {
  name: '',
  activity1: '',
  activity2: '',
  activity3: '',
  activity4: '',
  activity5: '',
  activity6: '',
  lunch: '',
  dinner: '',
  image: '',
  itinerary: []
}
// getRide = () => {
//         // axios get request to jservice
//         axios('https://touringplans.com/magic-kingdom/attractions.json')
//             .then(ride => {
//                 console.log(ride)
//                 // set the trivia state equal to the received data and set showAnswer to false again
//                 this.setState({
//                     ride: ride.name,
//                     showAnswer: false
//                 })
//             })
//     }

change=(event)=>{
  this.setState({
    [event.target.id]: event.target.value
  })
}
submit=(event)=>{
  event.preventDefault()
  axios.post('/itinerary', this.state).then((response)=>
  this.setState({
    itinerary: response.data,
    name: '',
    activity1: '',
    activity2: '',
    activity3: '',
    activity4: '',
    activity5: '',
    activity6: '',
    lunch: '',
    dinner: '',
    image: '',
    })
  )
}
delete=(event)=>{
  axios.delete('/itinerary/' + event.target.value).then((response)=>{
    this.setState({
      itinerary: response.data
    })
  })
}
update=(event)=>{
  event.preventDefault()
  const id = event.target.id
  axios.put('/itinerary/' + id, this.state).then(response=>{
    this.setState({
      itinerary: response.data,
      name: '',
      activity1: '',
      activity2: '',
      activity3: '',
      activity4: '',
      activity5: '',
      activity6: '',
      lunch: '',
      dinner: '',
      image: '',
    })
  })
}
componentDidMount=()=>{
  axios.get('/itinerary').then((response)=>{
    this.setState({
      itinerary: response.data
    })
  })
}


render=()=>{
  return (
<div className='main'>
<div className='header'>
  <h1>Magic Kingdom <br />Itinerary Planner</h1><br /><br /><br /><br />
  <h2>Create a New Adventure:</h2>
    <form onSubmit={this.submit}>
  <label htmlFor='name'>Name: </label>
  <input type='text' id='name' value={this.state.name} onChange={this.change} />
  <br />
  <label htmlFor='activity1'>Activity1:</label>
  <input type='text' id='activity1' value={this.state.activity1} onChange={this.change} />
  <br />
  <label htmlFor='activity2'>Activity2:</label>
  <input type='text' id='activity2' value={this.state.activity2} onChange={this.change} />
  <br />

  <label htmlFor='activity3'>Activity3:</label>
  <input type='text' id='activity3' value={this.state.activity3} onChange={this.change} />
  <br />
  <label htmlFor='lunch'>Lunch:</label>
  <input type='text' id='lunch' value={this.state.lunch} onChange={this.change} />
  <br />
  <label htmlFor='activity4'>Activity4:</label>
  <input type='text' id='activity4' value={this.state.activity4} onChange={this.change} />
  <br />
  <label htmlFor='activity5'>Activity5:</label>
  <input type='text' id='activity5' value={this.state.activity5} onChange={this.change} />
  <br />
  <label htmlFor='activity6'>Activity6:</label>
  <input type='text' id='activity6' value={this.state.activity6} onChange={this.change} />
  <br />
  <label htmlFor='dinner'>Dinner:</label>
  <input type='text' id='dinner' value={this.state.dinner} onChange={this.change} />
  <br />
  <label htmlFor='image'>Image URL:</label>
  <input type='text' id='image' value={this.state.image} onChange={this.change} />
  <br />
  <input id='create' type='submit' value='Create Itinerary' />
  <br />
    </form>
    <br /><br />
    </div>
  <br />
  <a href='/activities.html'>Activities and Attractions</a><br />
  <br />

  <div className='mainCage'>
  {this.state.itinerary.map((list, i)=>{
    return (
      <div className='cage' key={i}>
      <details>
      <summary>{list.name}'s Itinerary</summary>
      <ul>
        <img src={list.image} />
        <li>Park opens at 10:00am</li>
        <li>Activity1: {list.activity1} 10:00-10:45</li>
        <li>Activity2: {list.activity2} 11:00-11:45</li>
        <li>Activity3: {list.activity3} 12:00-12:45</li>
        <li>Lunch: {list.lunch} 1:00-2:00</li>
        <li>Activity4: {list.activity4} 2:15-3:00</li>
        <li>Activity5: {list.activity5} 3:15-4:00</li>
        <li>Activity6: {list.activity6} 4:15-5:00</li>
        <li>Dinner: {list.dinner} 5:15-6:30</li>
        <li>Park closes at 7:00pm</li>
      </ul>
      <br />
      <details>
        <summary>Edit Itinerary:</summary>
        <form id={list._id} onSubmit={this.update}>
        <i>(Must fill out all fields)</i><br />
          <label htmlFor='name'>Name:</label>
            <input type='text' id='name' value={list.name} onChange={this.change} />
            <br />
            <label htmlFor='activity1'>Activity1:</label>
            <input type='text' id='activity1' value={list.activity1} onChange={this.change} />
            <br />
            <label htmlFor='activity2'>Activity2:</label>
            <input type='text' id='activity2' value={list.activity2} onChange={this.change} />
            <br />
            <label htmlFor='activity3'>Activity3:</label>
            <input type='text' id='activity3' value={list.activity3} onChange={this.change} />
            <br />
            <label htmlFor='lunch'>Lunch:</label>
            <input type='text' id='lunch' value={list.lunch} onChange={this.change} />
            <br />
            <label htmlFor='activity4'>Activity4:</label>
            <input type='text' id='activity4' value={list.activity4} onChange={this.change} />
            <br />
            <label htmlFor='activity5'>Activity5:</label>
            <input type='text' id='activity5' value={list.activity5} onChange={this.change} />
            <br />
            <label htmlFor='activity6'>Activity6:</label>
            <input type='text' id='activity6' value={list.activity6} onChange={this.change} />
            <br />
            <label htmlFor='dinner'>Dinner:</label>
            <input type='text' id='dinner' value={list.dinner} onChange={this.change} />
            <br />
            <input id='update' type='submit' value='Update Itinerary' />
        </form>
      </details><br />
      <button id='delete' value={list._id} onClick={this.delete}>Delete Itinerary</button>
      </details>
      <br />
      </div>
    )
  })}

    </div>
    <br /><br /><br /><br />
</div>
    )
  }
}


ReactDOM.render(
  <App></App>,
  document.querySelector('main')
)
