import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "sonner";
import { useSetCookie } from "cookies-next"



export const useLoginApi = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setCookie = useSetCookie();


    const postData = async (payload) => {
        setLoading(true);
        setError(null);


        try {
            const response = await axiosInstance.post(url, payload);
            const payloadData = response?.data;

            if (payloadData) {
                setData(payloadData);
                toast.success(response.data.message || "Success");
                setCookie("accesstoken", payloadData.token);
            }


        } catch (err) {
            const message = err.response?.data?.message || "Something went wrong";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, postData };
};

