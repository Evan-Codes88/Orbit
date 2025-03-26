import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1D2D] p-6">
      <div className="w-full max-w-md bg-[#2A293A] p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-[#4C4A73]/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#BB86FC]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-[#BB86FC]/80">Sign in to your account</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="text-white">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#BB86FC]/60" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-[#3E3C4B] text-white border-none"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="text-white">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#BB86FC]/60" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 bg-[#3E3C4B] text-white border-none"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-[#BB86FC]/60" />
                ) : (
                  <Eye className="h-5 w-5 text-[#BB86FC]/60" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="btn bg-[#BB86FC] text-white w-full hover:bg-[#9E6BDF]" disabled={isLoggingIn}>
            {isLoggingIn ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-[#BB86FC]/80">
            Don&apos;t have an account? <Link to="/signup" className="text-[#BB86FC] hover:underline">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
