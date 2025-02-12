import { useRef, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; 

function Signin() {
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            setError("Please enter both username and password");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, { username, password });

            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            localStorage.setItem("username", username);
            
            navigate("/dashboard");
        } catch (error) {
            console.error("Signin error:", error);
            setError("Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100 px-2">
            <div className="bg-white shadow-lg rounded-xl border border-gray-200 max-w-sm w-full p-6">
                {/* Header */}
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Sign In</h2>

                {/* Error Message */}
                {error && <p className="text-sm text-red-500 text-center mb-3">{error}</p>}

                {/* Input Fields */}
                <div className="space-y-4">
                    <Input ref={usernameRef} placeholder="Username" className="w-full" />

                    {/* Password Input with Toggle */}
                    <div className="relative">
                        <Input
                            ref={passwordRef}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            className="w-full pr-10"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Sign In Button */}
                <div className="mt-4">
                    <Button 
                        variant="primary" 
                        text="Sign In" 
                        size="md" 
                        fullWidth={true} 
                        onClick={signin} 
                        loading={loading} 
                    />
                </div>

                {/* Sign Up Link */}
                <p className="text-sm text-gray-500 text-center mt-3">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

export default Signin;
