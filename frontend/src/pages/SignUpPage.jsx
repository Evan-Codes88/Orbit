import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    
    if (isValid) signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1E1D2D]">
      <div className="w-full max-w-md p-8 bg-[#2A293A] shadow-lg rounded-lg">
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="size-12 rounded-xl bg-[#4C4A73]/10 flex items-center justify-center group-hover:bg-[#4C4A73]/20 transition-colors">
              <MessageSquare className="size-6 text-[#BB86FC]" />
            </div>
            <h1 className="text-2xl font-bold mt-2 text-white">Create Account</h1>
            <p className="text-[#BB86FC]">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="form-control">
            <label className="label" htmlFor="fullName">
              <span className="label-text font-medium pb-2 text-white">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="size-5 z-10 text-[#BB86FC]" />
              </div>
              <input
                type="text"
                id="fullName"
                className="input border-none w-full pl-10 text-white bg-[#3E3C4B]"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                aria-invalid={errors.fullName ? "true" : "false"}
                aria-describedby="fullNameError"
              />
            </div>
            {errors.fullName && (
              <p id="fullNameError" className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </fieldset>

          <fieldset className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text font-medium pb-2 text-white">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 z-10 text-[#BB86FC]" />
              </div>
              <input
                type="email"
                id="email"
                className="input border-none w-full pl-10 text-white bg-[#3E3C4B]"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="emailError"
              />
            </div>
            {errors.email && (
              <p id="emailError" className="text-sm text-red-500">{errors.email}</p>
            )}
          </fieldset>

          <fieldset className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text font-medium pb-2 text-white">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 z-10 text-[#BB86FC]" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input border-none w-full pl-10 text-white bg-[#3E3C4B]"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby="passwordError"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="size-5 text-[#BB86FC]" />
                ) : (
                  <Eye className="size-5 text-[#BB86FC]" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="passwordError" className="text-sm text-red-500">{errors.password}</p>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn w-full bg-[#BB86FC] text-white hover:bg-[#9E6BDF] transition-colors duration-300"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-[#BB86FC]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="link text-[#BB86FC] no-underline hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
