import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const validateForm = () => {
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      login(formData);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#1E1D2D] p-6">
      <article className="w-full max-w-md bg-[#2A293A] p-8 rounded-lg shadow-lg">
        {/* Logo */}
        <header className="text-center mb-6">
          <div className="flex flex-col items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-[#4C4A73]/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-[#BB86FC]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-[#BB86FC]/80">Sign in to your account</p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <fieldset className="space-y-4">
            <legend className="sr-only">Login Form</legend>

            {/* Email Input */}
            <div className="form-control">
              <label htmlFor="email" className="text-white mb-2 block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 z-10 text-[#BB86FC]" />
                </div>
                <input
                  id="email"
                  type="email"
                  className="input input-bordered w-full pl-10 pr-3 py-2 bg-[#3E3C4B] text-white border-none placeholder:text-white/50"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  required
                />
              </div>
              {errors.email && <p id="email-error" className="text-red-400 text-sm">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="form-control">
              <label htmlFor="password" className="text-white mb-2 block">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 z-10 text-[#BB86FC]" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 pr-3 py-2 bg-[#3E3C4B] text-white border-none placeholder:text-white/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#BB86FC]/60" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#BB86FC]/60" />
                  )}
                </button>
              </div>
              {errors.password && <p id="password-error" className="text-red-400 text-sm">{errors.password}</p>}
            </div>
          </fieldset>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-[#BB86FC] text-white w-full hover:bg-[#9E6BDF] flex justify-center items-center gap-2"
            disabled={isLoggingIn || !formData.email || !formData.password}
          >
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

        {/* Signup Link */}
        <footer className="text-center mt-4">
          <p className="text-[#BB86FC]/80">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[#BB86FC] hover:underline">Create account</Link>
          </p>
        </footer>
      </article>
    </section>
  );
};

export default LoginPage;
