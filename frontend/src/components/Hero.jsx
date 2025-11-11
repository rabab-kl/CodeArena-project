import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-indigo-900 text-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">CodeArena</h1>
        <p className="text-xl md:text-2xl mb-4 text-gray-200">
          Compétitions de code en temps réel avec des devs du monde entier
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Relève des défis, code en direct, grimpe le classement. Prêt(e) à prouver tes compétences ?
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate('/login')}
                className="btn-primary"
              >
                Se connecter
              </button>
              <button
                onClick={() => navigate('/register')}
                className="btn-secondary"
              >
                S'inscrire
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/challenges')}
              className="btn-primary text-lg px-8 py-3"
            >
              Commencer un défi
            </button>
          )}
        </div>
      </div>

      <div className="absolute bottom-10 text-center text-sm text-gray-300">
        <p>🚀 Développé avec React, Socket.io et ❤️</p>
      </div>
    </div>
  );
};