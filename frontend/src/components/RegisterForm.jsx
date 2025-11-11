import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Tous les champs sont requis');
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
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    const result = await register(email, password, name);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erreur lors de l\'inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Inscription</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Nom</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Sophie Dupont"
          className="input-field"
          disabled={loading}
        />
      </div>

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

      <div>
        <label className="block text-sm font-medium mb-1">Confirmer mot de passe</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? 'Inscription...' : 'S\'inscrire'}
      </button>

      <p className="text-center text-sm">
        Déjà inscrit ? <a href="/login" className="text-primary hover:underline">Se connecter</a>
      </p>
    </form>
  );
};