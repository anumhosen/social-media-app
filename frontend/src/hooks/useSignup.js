import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({ fullname, username, email, password, confirmPassword, gender }) => {
    const success = handleInputErrors({ fullname, username, email, password, confirmPassword, gender });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, username, email, password, confirmPassword, gender }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      // Save inLocalStorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      // Update context
      setAuthUser(data);
      toast.success("Signup successful! You can now login.");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
}

export default useSignup;

function handleInputErrors({ fullname, username, email, password, confirmPassword, gender }) {
  if (!fullname || !username || !email || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }
  return true;
}
