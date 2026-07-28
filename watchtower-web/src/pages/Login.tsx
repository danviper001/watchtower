import { Link, useNavigate } from "react-router-dom";
import { Shield, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AnimatedBackground from "../components/ui/AnimatedBackground";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Container from "../components/ui/Container";
import Input from "../components/ui/Input";

import { login } from "../api/authApi";
import { useAuth } from "../contexts/AuthContext";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();

  const { login: saveLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data);

      saveLogin(response.user, response.token);

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
          "Login failed"
      );

    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center py-16">
      <AnimatedBackground />
      <Container className="flex justify-center">

        <Card className="w-full max-w-md">

          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600">
              <Shield className="text-white" size={40} />
            </div>
          </div>

          <div className="mt-8 text-center">

            <h1 className="text-4xl font-black">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-400">
              Login to your WatchTower account
            </p>

          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
          >

            <div>

              <label className="mb-2 block">
                Email
              </label>

              <div className="relative">

                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  {...register("email")}
                  type="email"
                  placeholder="Email Address"
                  className="pl-12"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block">
                Password
              </label>

              <div className="relative">

                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                />

                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Password"
                  className="pl-12"
                />

              </div>

            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
            >
              {isSubmitting
                ? "Logging in..."
                : "Login"}
            </Button>

          </form>

          <div className="mt-8 text-center">

            <p className="text-gray-400">

              Don't have an account?

              <Link
                className="ml-2 text-cyan-400"
                to="/register"
              >
                Register
              </Link>

            </p>

          </div>

        </Card>

      </Container>
    </div>
  );
}