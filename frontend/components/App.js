// ❗ IMPORTANT
// The ✨ tasks found inside this component are not in order.
// Check the README for the appropriate sequence to follow.
import React, { useState, useEffect } from 'react'

let id = 0
const getId = () => ++id




let teamMembers = [
  {
    id: getId(), fname: "Alice", lname: "Smith",
    bio: "Passionate about front-end development and user experience. \
I love creating intuitive and visually appealing web interfaces."
  },
  {
    id: getId(), fname: "Bob", lname: "Johnson",
    bio: "Aspiring web developer with a background in graphic design. \
I enjoy bringing creativity and aesthetics to the digital world."
  },
]

const initialValue = { fname: '', lname: '', bio: '' }


export default function App() {
  const [members, setMembers] = useState(teamMembers)
  const [editing, setEditing] = useState(null)
  // ✨ Create a third state to track the values of the inputs
  const [values, setValues] = useState(initialValue)

  useEffect(() => {
    // ✨ If the `editing` state changes from null to the number 2 (for example)
    // this means we need to populate the inputs of the form
    // with the data belonging to the member with id 2.
    // On the other hand, if the `editing` state changes back to null
    // then we need to reset the form back to empty values
    //console.log(editing)

    if (editing > 0) {
      const found = members.find(m => m.id === editing)
      setValues(found)

    }

    
  }, [editing])

  const onChange = evt => {
    // ✨ This is the change handler for your text inputs and your textarea.
    // You can check `evt.target.id` to know which input changed
    // and then you can use `evt.target.value` to update the state of the form
    
    const {id, value} = evt.target
    setValues({...values, [id]: value})

  }
  const edit = id => {
    // ✨ Put this function inside a click handler for the <button>Edit</button>.
    // It should change the value of `editing` state to be the id of the member
    // whose Edit button was clicked
    setEditing(id)
    
    
  }
  const submitNewMember = (values) => {
    // This takes the values of the form and constructs a new member object,
    // which is then concatenated at the end of the `members` state
    setMembers(members.concat({id: getId(), ...values}))
  
  }
  const editExistingMember = () => {
    // ✨ This takes the values of the form and replaces the data of the
    // member in the `members` state whose id matches the `editing` state
  
  
    setMembers(members.map(m => {
        if (m.id === editing) {
          return { ...m, ...values}
        }
        return m
        }
      )
    )  
  }

  

  const onSubmit = evt => {
    // ✨ This is the submit handler for your form element.
    // It will call either `submitNewMember` or `editExistingMember`
    // depending on whether the `editing` state is null or has an id in it.
    // Don't allow the page to reload! Prevent the default behavior
    // and clean up the form after submitting
    evt.preventDefault()
    if (editing > 0){editExistingMember(values); setValues(initialValue); return}
    else {submitNewMember(values); setValues(initialValue)}
  }
  return (
    <div>{/* ✨ Fix the JSX by wiring the necessary values and event handlers */}
      <div id="membersList">
        <h2>Team Members</h2>
        <div>
          {
            members.map(mem => (
              <div key={mem.id} className="member">
                <div>
                  <h4>{mem.fname} {mem.lname}</h4>
                  <p>{mem.bio}</p>
                </div>
                <button onClick={() => edit(mem.id)}>Edit</button>
              </div>
            ))
          }
        </div>
      </div>
      <div id="membersForm">
        <h2>{editing ? 'Edit' : 'Add'} a Team Member</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name </label>
            <input 
              id="fname" 
              name = 'fname' 
              type="text" 
              placeholder="Type First Name" 
              onChange ={onChange}
              value = {values.fname}
            />
              
          </div>

          <div>
            <label htmlFor="lname">Last Name </label>
            <input 
              id="lname" 
              name = 'lname' 
              type="text" 
              placeholder="Type Last Name" 
              onChange={onChange} 
              value = {values.lname}
            />
          </div>

          <div>
            <label htmlFor="bio">Bio </label>
            <textarea 
              id="bio" 
              name='bio' 
              placeholder="Type Bio" 
              onChange={onChange}
              value={values.bio}
            />
          </div>

          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
