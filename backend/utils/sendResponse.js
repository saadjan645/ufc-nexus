export const ok=(res,data={},message='Success',status=200)=>res.status(status).json({success:true,message,...data});
export const fail=(res,message='Server error',status=500,details=null)=>res.status(status).json({success:false,message,details});
