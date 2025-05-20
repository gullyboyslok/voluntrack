import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Message = Database['public']['Tables']['messages']['Row'];

export function useMessages(userId: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMessages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      console.error('Error loading messages:', err);
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadMessages();

    // Subscribe to realtime messages
    const subscription = supabase
      .channel('messages')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages',
          filter: `sender_id=eq.${userId},recipient_id=eq.${userId}` 
        }, 
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setMessages(prev => [payload.new as Message, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setMessages(prev => prev.map(msg => 
              msg.id === payload.new.id ? payload.new as Message : msg
            ));
          } else if (payload.eventType === 'DELETE') {
            setMessages(prev => prev.filter(msg => msg.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [loadMessages, userId]);

  const sendMessage = async (recipientId: number, subject: string, content: string) => {
    try {
      // First check if recipient exists
      const { data: recipient, error: recipientError } = await supabase
        .from('users')
        .select('id')
        .eq('id', recipientId)
        .single();

      if (recipientError || !recipient) {
        throw new Error('Recipient not found');
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: userId,
          recipient_id: recipientId,
          subject,
          content,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error sending message:', error);
      return { data: null, error };
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error marking message as read:', error);
      return { data: null, error };
    }
  };

  const toggleBookmark = async (messageId: string) => {
    try {
      const message = messages.find(m => m.id === messageId);
      if (!message) throw new Error('Message not found');

      const { data, error } = await supabase
        .from('messages')
        .update({ bookmarked: !message.bookmarked })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      return { data: null, error };
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ deleted: true })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error deleting message:', error);
      return { data: null, error };
    }
  };

  const restoreMessage = async (messageId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .update({ deleted: false })
        .eq('id', messageId)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error restoring message:', error);
      return { data: null, error };
    }
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
    toggleBookmark,
    deleteMessage,
    restoreMessage,
    reloadMessages: loadMessages
  };
}