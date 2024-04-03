import axios from "axios";

export const fetchReferralData = async (link: string) => {
    try {
        const headers = {
            "Access-Control-Allow-Origin": "*", // Add any additional headers here
            "Content-Type": "application/json"
        };

        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/referuser/${link}`, { headers },);
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
