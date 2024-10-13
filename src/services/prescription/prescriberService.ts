import authPool from "../../config/db/authPool";

export const register = async (
  email: string,
  password: string,
  role: string

) => {
  const authConnection = await authPool.getConnection();
  try{
    await authConnection.beginTransaction()
  }catch(error){

  }
};
