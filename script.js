
const containEvents = document.querySelector('.events-container')
const addEventsPopup = document.querySelector('.add-events-popup')
const closePopup = document.querySelector('.close')
const addBtn = document.querySelector('#add-btn')

addBtn.addEventListener('click',()=>{
  addEventsPopup.classList.add('active')
})
closePopup.addEventListener('click',()=>{
  addEventsPopup.classList.remove('active')
})



const url = "https://zealous-jennings-bae45b.netlify.app/.netlify/functions/hello-world"

// get request
fetch(url)
  .then(async (res) => {
    // console.log(res.json())
    const events =await res.json()
    console.log(events)
    events.forEach(event =>{
      const divParent = document.createElement('div')
      const msg = event.msg? event.msg : 'no description'
      const newElement = `<div>Event Name: ${event.name}</div>
      <div>Date: ${event.date.slice(0,10)}</div>
      <div>Timing: ${event.time}</div>
      <div>More info: ${msg}</div>
      <div style="margin-top:20px;"><a class="register-btns btn" href=${event.registrationLink}>Register Now</a></div>
      <br>
      `
      divParent.innerHTML = newElement
      
      const mainContainer = document.createElement('div')
      mainContainer.classList.add('event-card')
      mainContainer.innerHTML = divParent.innerHTML
      containEvents.append(mainContainer) 

    })

  })
  .catch(err => console.log(err))



const submitBtn = document.querySelector('#btn-submit')
const form = document.querySelector('form')
submitBtn.addEventListener('click',()=>{
  //POST REQUEST 
  formd = new FormData(form);
  fetch(API_URL,{
    method: 'POST',
    body: JSON.stringify({
      name: formd.get("name"),
      date: formd.get("date"),
      time: formd.get("time"),
      registrationLink: formd.get("link"),
      msg: formd.get("msg")
    }),
    headers:{
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }
  })
})


