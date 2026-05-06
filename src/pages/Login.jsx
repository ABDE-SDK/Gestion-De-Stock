import { useDispatch } from 'react-redux';
import { login } from '../Slices/authSlice';
import { useNavigate } from 'react-router-dom';

// 1. ضروري تجمع كلشي وسط function
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Kanchoufou ghi wach dakhhal ay 7aja
    dispatch(login({ name: "Abderrahmane" }));
    navigate('/'); // Siftu l-Dashboard
  };

  // 2. ضروري دير return للديزاين باش متبقاش الصفحة بيضا
  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <form 
        onSubmit={handleLogin} 
        className="p-8 bg-white rounded-xl shadow-md w-96 flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-slate-800">Connexion</h2>
        
        <p className="text-sm text-slate-500 text-center mb-4">
          Cliquez sur le bouton pour tester Redux et entrer au Dashboard.
        </p>

        <button 
          type="submit" 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Se Connecter
        </button>
      </form>
    </div>
  );
}