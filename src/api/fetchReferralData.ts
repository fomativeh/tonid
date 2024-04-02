import axios from "axios";

export const fetchReferralData = async (link: string) => {
    try {
        const headers = {
            "Access-Control-Allow-Origin": "*", // Add any additional headers here
            "Content-Type": "application/json"
        };

        const response = await axios.post(`https://ton-id-referral-server.onrender.com/referUser/${link}`, { headers },);
        // console.log(response)
        // return response.data.data
        if (response.status == 200) {
            return { status: 200, data: response.data.data }
        } else if (response.status == 404) {
            return { status: 404 }
        } else {
            return { status: 500 }
        }
    } catch (error) {
        // console.log(error);
    }
}
