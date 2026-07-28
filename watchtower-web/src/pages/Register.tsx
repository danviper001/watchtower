import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Mail,
  Lock,
} from "lucide-react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";

import { register as registerUser } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      });

      login(response.user, response.token);

      toast.success(response.message);

      switch (response.user.role) {
        case "admin":
          navigate("/admin");
          break;

        case "responder":
          navigate("/responder");
          break;

        default:
          navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center py-16">
      <AnimatedBackground />
      <Container className="flex justify-center">

        <Card className="w-full max-w-lg">

          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Shield
                className="text-white"
                size={40}
              />
            </div>
          </div>

          <div className="mt-8 text-center">

            <h1 className="text-4xl font-black">
              Create Account
            </h1>

            <p className="mt-3 text-gray-400">
              Join WatchTower and help build a safer community.
            </p>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >
                        {/* Full Name */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  placeholder="John Doe"
                  className="pl-12"
                />
              </div>

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="john@example.com"
                  className="pl-12"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                  })}
                  placeholder="Enter password"
                  className="pl-12"
                />
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  type="password"
                  {...register("confirmPassword", {
                    required:
                      "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") ||
                      "Passwords do not match",
                  })}
                  placeholder="Confirm password"
                  className="pl-12"
                />
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            >
              {isSubmitting
                ? "Creating Account..."
                : "Create Account"}
            </Button>

          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Already have an account?

              <Link
                to="/login"
                className="ml-2 font-semibold text-cyan-400 hover:text-cyan-300"
              >
                Login
              </Link>
            </p>
          </div>

        </Card>

      </Container>
    </div>
  );
}