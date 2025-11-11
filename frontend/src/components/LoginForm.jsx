import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Validation email simple
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Email et mot de passe requis');
      return;
    }
    if (!validateEmail(email)) {
      setError('Email invalide');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit avoir au moins 8 caractères');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sophie@example.com"
          className="input-field"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="input-field"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="btn-primary w-full disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>

      <p className="text-center text-sm">
        Pas encore inscrit ? <a href="/register" className="text-primary hover:underline">S'inscrire</a>
      </p>
    </form>
  );
};