import axios from 'axios';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { toast } from 'react-toastify';

export interface Price {
  price_id: number;
  price: number;
  is_active: boolean;
}

interface PriceContextType {
  price: Price | null;
  setPrice: React.Dispatch<React.SetStateAction<Price | null>>;
}

const PriceContext = createContext<PriceContextType | undefined>(undefined);

export const PriceProvider = ({ children }: { children: ReactNode }) => {
  const [price, setPrice] = useState<Price | null>(null);

  useEffect(() => {
    const loadPrice = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/price`
        );
        const activePrice = response.data;

        setPrice(activePrice);
      } catch (error) {
        console.error('Erreur lors du chargement du prix', error);
        toast.warning("Désolé il n'y a plus de place disponible", {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          className: 'bg-redZombie text-white text-2xl',
          style: { fontFamily: 'League Gothic', top: '104px' },
        });
      }
    };

    loadPrice();
  }, []);

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {children}
    </PriceContext.Provider>
  );
};

export const usePrice = () => {
  const context = useContext(PriceContext);
  if (context === undefined) {
    throw new Error('usePrice must be used within a PriceProvider');
  }
  return context;
};
