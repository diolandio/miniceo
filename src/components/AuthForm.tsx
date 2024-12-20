import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stars, Rocket, Heart } from 'lucide-react';
import { signIn, signUp } from '../lib/auth';
import { FloatingShape } from './ui/FloatingShape';
import { Logo } from './ui/Logo';

export function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { user, error } = isLogin 
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        let mensagemErro = 'Ocorreu um erro. Tente novamente.';
        
        if (error.message.includes('Email not confirmed')) {
          mensagemErro = 'Por favor, confirme seu email antes de fazer login.';
        } else if (error.message.includes('Invalid login credentials')) {
          mensagemErro = 'Email ou senha incorretos.';
        } else if (error.message.includes('User already registered')) {
          mensagemErro = 'Este email já está cadastrado.';
        }
        
        throw new Error(mensagemErro);
      }

      if (user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative floating shapes */}
      <FloatingShape Icon={Stars} color="text-yellow-400" position="top-20 left-20" />
      <FloatingShape Icon={Heart} color="text-pink-400" position="top-40 right-32" />
      <FloatingShape Icon={Rocket} color="text-purple-400" position="bottom-20 left-32" />
      
      <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md relative">
        <div className="flex flex-col items-center mb-8">
          <Logo />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mt-4">
            {isLogin ? 'Bem-vindo de volta!' : 'Vamos começar!'}
          </h1>
          <p className="text-gray-600 mt-2 text-center">
            {isLogin
              ? 'Continue sua jornada empreendedora'
              : 'Crie sua conta e comece a empreender'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha secreta"
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-xl font-bold hover:from-pink-600 hover:to-purple-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}
          </button>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-purple-600 text-sm hover:text-purple-700 font-medium"
          >
            {isLogin
              ? 'Não tem uma conta? Cadastre-se'
              : 'Já tem uma conta? Entre'}
          </button>
        </form>
      </div>
    </div>
  );
}