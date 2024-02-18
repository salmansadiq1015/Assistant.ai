"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../components/Spinner";

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  // Cheak Auth
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/admin-auth`
        );
        if (data?.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };
    if (auth?.token || auth?.user.role === 1) {
      checkAuth();
    }
  }, [auth?.token]);
  return ok ? { children } : <Spinner />;
}
