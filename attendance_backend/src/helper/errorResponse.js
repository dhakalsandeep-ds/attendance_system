export let errorResponse = ({res,message,statusCode})=>{
    res.status(statusCode).json({
        success:true,
        message,
       
    })
}