import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/Slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Connexion
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-xl px-4 py-3 w-full pr-12"
            required
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-xl"
        >
          {loading
            ? "Connexion..."
            : "Se connecter"}
        </button>
        <p className="text-center text-sm text-slate-600">
          Vous n'avez pas de compte ?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            S'inscrire
          </Link>
        </p>

      </form>
    </div>
  );
}