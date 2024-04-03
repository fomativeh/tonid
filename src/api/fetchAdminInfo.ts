import axios from "axios";

export const fetchAdminInfo = async () => {
    try {
        const headers = {
            "Access-Control-Allow-Origin": "*", // Add any additional headers here
            "Content-Type": "application/json"
        };

        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin-info`, { headers },);
        return response.data
        
    } catch (error) {
        // console.log(error);
    }
}
