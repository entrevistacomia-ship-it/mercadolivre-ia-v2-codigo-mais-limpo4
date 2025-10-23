import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, Agent, CartItem } from '@/lib/supabase';
import { useAuth } from './AuthContext';

type CartContextType = {
  items: (CartItem & { agent: Agent })[];
  itemCount: number;
  loading: boolean;
  addToCart: (agentId: string) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<(CartItem & { agent: Agent })[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    if (!user) {
      setItems([]);
      return;
    }

    setLoading(true);
    try {
      const { data: cartItems, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          agent:agents(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedItems = (cartItems || []).map(item => ({
        ...item,
        agent: item.agent as unknown as Agent
      }));

      setItems(formattedItems);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user]);

  const addToCart = async (agentId: string) => {
    if (!user) {
      throw new Error('Must be logged in to add to cart');
    }

    const { error } = await supabase
      .from('cart_items')
      .insert({
        user_id: user.id,
        agent_id: agentId,
      });

    if (error && error.code !== '23505') {
      throw error;
    }

    await loadCart();
  };

  const removeFromCart = async (cartItemId: string) => {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId);

    if (error) throw error;

    await loadCart();
  };

  const clearCart = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);

    if (error) throw error;

    await loadCart();
  };

  const refreshCart = async () => {
    await loadCart();
  };

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount: items.length,
        loading,
        addToCart,
        removeFromCart,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
