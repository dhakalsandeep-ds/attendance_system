import expressAsyncHandler from "express-async-handler"

export let compareDate=expressAsyncHandler(async(someDate)=>{
    let dateNow=new Date()
    let yearNow=dateNow.getFullYear()
    let monthNow=dateNow.getMonth()+1
    let dayNow=dateNow.getDate()
    let Today=`${yearNow}-${monthNow}-${dayNow}`
    let year=someDate.getFullYear()
    let month=someDate.getMonth()+1
    let day=someDate.getDate()
    let someDate=`${year}-${month}-${day}`
    if(Today===someDate)
    return true
    else
    return false
  })