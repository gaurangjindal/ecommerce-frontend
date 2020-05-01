import React, { useState ,useEffect} from 'react'



// here in check box whenever a user click on check box single or multiple pick that id store it in an array and display accordingly
// for that we need state 
// defination -> indexOf()
//The indexOf() method returns the position of the first occurrence of a specified value in a string.
//This method returns -1 if the value to search for never occurs.

// although this is child component of shop so we need to pass this value to parent component in shop 


const CheckBox =({categories,handleFilters} )=>{

    const [ checked,SetChecked] = useState([]);


    const handToggle = c => ()=>{
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        // if currently checked was not already in checked state ->push
        // else pull/ take off
        if(currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.splice(currentCategoryId,1)
        }
        //console.log(newCheckedCategoryId);
        SetChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    } 


    return categories.map((c,i)=>(
        <li key={i} className="list-unstyled">
            <input onChange={handToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default CheckBox;