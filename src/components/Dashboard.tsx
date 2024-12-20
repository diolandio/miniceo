import React from 'react';
import { Store, PiggyBank, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          {/* Mascote e Boas-vindas */}
          <div className="flex items-center justify-center mb-12">
            <div className="text-center">
              <PiggyBank className="w-24 h-24 text-pink-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Olá, Empreendedor!
              </h1>
              <p className="text-gray-600">
                Eu sou o Poupito, seu assistente nos negócios!
              </p>
            </div>
          </div>

          {/* Cards de Ação */}
          <div className="grid md:grid-cols-3 gap-8">
            <Link
              to="/criar-negocio"
              className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6 text-white hover:shadow-lg transition duration-200 transform hover:-translate-y-1"
            >
              <Store className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Criar Negócio</h2>
              <p>Monte seu próprio negócio e comece sua jornada!</p>
            </Link>

            <Link
              to="/minhas-lojas"
              className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-lg transition duration-200 transform hover:-translate-y-1"
            >
              <Store className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Minhas Lojas</h2>
              <p>Veja e gerencie todas as suas lojas!</p>
            </Link>

            <Link
              to="/financas"
              className="bg-gradient-to-br from-pink-500 to-orange-500 rounded-2xl p-6 text-white hover:shadow-lg transition duration-200 transform hover:-translate-y-1"
            >
              <BarChart3 className="w-12 h-12 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Gerenciar Finanças</h2>
              <p>Acompanhe seus lucros e gastos de forma divertida!</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}