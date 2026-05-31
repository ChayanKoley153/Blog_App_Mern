import React, { useState, useEffect } from "react";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { OtpCom } from "../../../components/authCom/otpCom";
import endPoints from "../../../../api/endpoints";
import { useOtpApi } from "../../../../customHooks/authhooks/auth.otp";

export default function VerifyOTP() {
    const navigate = useNavigate();
    const location = useLocation();

    const userId = location.state?.userId;

    const { loading, postData, error: apiError, data: apiData } = useOtpApi(endPoints.auth.verify_otp);

    const [data, setData] = useState({
        otp: "",
    });

    const [error, setError] = useState({});


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (name === "otp") {
            if (value.length !== 6) {
                setError((prev) => ({
                    ...prev,
                    otp: "OTP must be 6 digits",
                }));
            } else {
                setError((prev) => ({
                    ...prev,
                    otp: "",
                }));
            }
        }
    };


    const validate = () => {
        const newError = {};

        if (!data.otp) {
            newError.otp = "OTP is required";
        } else if (data.otp.length !== 6) {
            newError.otp = "OTP must be 6 digits";
        }

        setError(newError);

        return Object.keys(newError).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        await postData({
            userId,
            otp: data.otp,
        });
    };

    useEffect(() => {
        if (apiData?.status) {
            navigate("/auth/login");
        }
    }, [apiData, navigate]);

    return (
        <div className="container">
            <OtpCom
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data={data}
                apiError={apiError}
                error={error}
                loading={loading}
            />
        </div>
    );
}