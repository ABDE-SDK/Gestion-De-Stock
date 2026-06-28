import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register, login } from "../app/Slices/authSlice";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*?])(?=.*\d).{8,}$/;

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const usernameRegex =
    /^[a-zA-Z0-9_]{3,20}$/;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [invalidUsername, setInvalidUsername] = useState("");
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPass, setInvalidPass] = useState("");
  const [inequalPass, setInequalPass] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword,
    setShowConfirmPassword] =
    useState(false);

  const validateUsername = (value) => {
    setUsername(value);

    if (
      value &&
      !usernameRegex.test(value)
    ) {
      setInvalidUsername(
        "Username doit contenir 3-20 caractères (lettres, chiffres, _)"
      );
    } else {
      setInvalidUsername("");
    }
  };

  const validateEmail = (value) => {
    setEmail(value);

    if (
      value &&
      !emailRegex.test(value)
    ) {
      setInvalidEmail(
        "Email non valide"
      );
    } else {
      setInvalidEmail("");
    }
  };

  const validatePassword = (value) => {
    setPassword(value);

    if (
      value &&
      !passRegex.test(value)
    ) {
      setInvalidPass(
        "Minimum 8 caractères avec majuscule, minuscule, chiffre et caractère spécial."
      );
    } else {
      setInvalidPass("");
    }

    if (
      confirmPass &&
      value !== confirmPass
    ) {
      setInequalPass(
        "Les mots de passe ne correspondent pas"
      );
    } else {
      setInequalPass("");
    }
  };

  const validateConfirmPassword =
    (value) => {
      setConfirmPass(value);

      if (
        value &&
        value !== password
      ) {
        setInequalPass(
          "Les mots de passe ne correspondent pas"
        );
      } else {
        setInequalPass("");
      }
    };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      invalidUsername ||
      invalidEmail ||
      invalidPass ||
      inequalPass
    ) {
      return;
    }

    try {
      await dispatch(
        register({
          username,
          email,
          password,
        })
      ).unwrap();

      await dispatch(
        login({
          email,
          password,
        })
      ).unwrap();

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">
          Inscription
        </h1>

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) =>
            validateUsername(
              e.target.value
            )
          }
          className={`border rounded-xl px-4 py-3 ${
            invalidUsername
              ? "border-red-500"
              : "border-gray-300"
          }`}
          required
        />

        {invalidUsername && (
          <p className="text-red-500 text-sm">
            {invalidUsername}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            validateEmail(
              e.target.value
            )
          }
          className={`border rounded-xl px-4 py-3 ${
            invalidEmail
              ? "border-red-500"
              : "border-gray-300"
          }`}
          required
        />

        {invalidEmail && (
          <p className="text-red-500 text-sm">
            {invalidEmail}
          </p>
        )}

        <div className="relative">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Mot de passe"
            value={password}
            onChange={(e) =>
              validatePassword(
                e.target.value
              )
            }
            className={`border rounded-xl px-4 py-3 w-full pr-12 ${
              invalidPass
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {invalidPass && (
          <p className="text-red-500 text-sm">
            {invalidPass}
          </p>
        )}

        <div className="relative">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirmer le mot de passe"
            value={confirmPass}
            onChange={(e) =>
              validateConfirmPassword(
                e.target.value
              )
            }
            className={`border rounded-xl px-4 py-3 w-full pr-12 ${
              inequalPass
                ? "border-red-500"
                : "border-gray-300"
            }`}
            required
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        {inequalPass && (
          <p className="text-red-500 text-sm">
            {inequalPass}
          </p>
        )}

        <button
          className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          S'inscrire
        </button>

        <p className="text-center text-sm text-slate-600">
          Déjà un compte ?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Se connecter
          </Link>
        </p>

      </form>
    </div>
  );
}