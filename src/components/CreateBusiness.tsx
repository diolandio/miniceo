import React, { useState } from 'react';
import { Store, UtensilsCrossed } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BUSINESS_TYPES = [
  {
    id: 'toys',
    name: 'Loja de Brinquedos',
    icon: Store,
    description: 'Venda brinquedos e faça as crianças felizes!',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'food',
    name: 'Lanchonete',
    icon: UtensilsCrossed,
    description: 'Prepare lanches deliciosos para seus clientes!',
    color: 'from-orange-500 to-red-500'
  }
];

export function CreateBusiness() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('businesses')
        .insert([
          {
            user_id: user.id,
            name,
            type,
            theme: type === 'toys' ? 'blue' : 'orange'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      
      // Redirecionar para a loja após criar
      navigate(`/loja/${data.id}`);
    } catch (error) {
      console.error('Erro ao criar negócio:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Crie seu Negócio
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do seu negócio
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de negócio
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {BUSINESS_TYPES.map((businessType) => (
                  <button
                    key={businessType.id}
                    type="button"
                    onClick={() => setType(businessType.id)}
                    className={`p-6 rounded-xl text-white transition-all ${
                      type === businessType.id
                        ? `bg-gradient-to-br ${businessType.color} scale-105`
                        : 'bg-gray-400 hover:scale-105'
                    }`}
                  >
                    <businessType.icon className="w-12 h-12 mb-4 mx-auto" />
                    <h3 className="text-xl font-bold mb-2">
                      {businessType.name}
                    </h3>
                    <p className="text-sm opacity-90">
                      {businessType.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !name || !type}
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? 'Criando...' : 'Criar Negócio'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}