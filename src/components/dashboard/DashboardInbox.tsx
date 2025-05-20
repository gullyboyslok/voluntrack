import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, StarOff, Send, Trash2, Plus, X, RefreshCw } from 'lucide-react';
import * as Tabs from '@radix-ui/react-tabs';
import { clsx } from 'clsx';
import { useAuth } from '../../hooks/useAuth';
import { useMessages } from '../../hooks/useMessages';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  content?: string;
  bookmarked?: boolean;
  deleted?: boolean;
  sent?: boolean;
}

function DashboardInbox() {
  const { user } = useAuth();
  const { messages, loading, error, sendMessage, markAsRead, toggleBookmark, deleteMessage, restoreMessage, reloadMessages } = useMessages(user?.id || 0);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [newMessage, setNewMessage] = useState({
    to: '',
    subject: '',
    content: ''
  });
  const [activeTab, setActiveTab] = useState<'inbox' | 'trash' | 'sent'>('inbox');
  const [advancedCompose, setAdvancedCompose] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

  const handleReload = async () => {
    setIsReloading(true);
    await reloadMessages();
    setTimeout(() => setIsReloading(false), 1000); // Minimum 1s feedback
  };

  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    const newMsg: Message = {
      id: Date.now(),
      sender: 'You',
      subject: `Re: ${selectedMessage.subject}`,
      preview: replyText.substring(0, 100) + '...',
      date: new Date().toISOString(),
      unread: false,
      content: replyText,
      sent: true
    };

    sendMessage(newMsg);
    setReplyText('');
    alert('Reply sent!');
  };

  const handleSelectMessage = (message: Message) => {
    // Mark as read when opening
    if (message.unread) {
      markAsRead(message.id);
      message = { ...message, unread: false };
    }
    setSelectedMessage(message);
  };

  const handleSendNewMessage = () => {
    if (!newMessage.to.trim() || !newMessage.subject.trim() || !newMessage.content.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newMsg: Message = {
      id: Date.now(),
      sender: 'You',
      subject: newMessage.subject,
      preview: newMessage.content.substring(0, 100) + '...',
      date: new Date().toISOString(),
      unread: false,
      content: newMessage.content,
      sent: true
    };

    sendMessage(newMsg);
    setNewMessage({ to: '', subject: '', content: '' });
    setShowCompose(false);
    alert('Message sent!');
  };

  const handleDeleteMessage = (messageId: number) => {
    deleteMessage(messageId);
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleRestoreMessage = (messageId: number) => {
    restoreMessage(messageId);
  };

  const handlePermanentDelete = (messageId: number) => {
    deleteMessage(messageId, true); // Assuming deleteMessage takes a second parameter for permanent deletion
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'inbox') return !msg.deleted && !msg.sent;
    if (activeTab === 'trash') return msg.deleted;
    return msg.sent;
  });

  if (showCompose) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">New Message</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setAdvancedCompose(!advancedCompose)}
                className="text-sm text-indigo-600 hover:text-indigo-500"
              >
                {advancedCompose ? 'Simple Mode' : 'Advanced Mode'}
              </button>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                To:
              </label>
              <input
                type="email"
                id="to"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newMessage.to}
                onChange={(e) => setNewMessage({ ...newMessage, to: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Subject:
              </label>
              <input
                type="text"
                id="subject"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message:
              </label>
              {advancedCompose ? (
                <div className="mt-1 space-y-2">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setNewMessage({ ...newMessage, content: newMessage.content + '**Bold**' })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Bold
                    </button>
                    <button
                      onClick={() => setNewMessage({ ...newMessage, content: newMessage.content + '*Italic*' })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Italic
                    </button>
                    <button
                      onClick={() => setNewMessage({ ...newMessage, content: newMessage.content + '\n\n---\n\n' })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      Divider
                    </button>
                    <button
                      onClick={() => setNewMessage({ ...newMessage, content: newMessage.content + '\n- List item' })}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      List
                    </button>
                  </div>
                  <textarea
                    id="content"
                    rows={12}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm font-mono"
                    value={newMessage.content}
                    onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                  />
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
                    <h4 className="text-sm font-medium mb-2">Preview:</h4>
                    <div className="prose dark:prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: newMessage.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em>$1</em>')
                          .replace(/---/g, '<hr>')
                          .replace(/- (.*)/g, '<li>$1</li>')
                          .replace(/\n/g, '<br>')
                      }}
                    />
                  </div>
                </div>
              ) : (
                <textarea
                  id="content"
                  rows={8}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  value={newMessage.content}
                  onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                />
              )}
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowCompose(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSendNewMessage}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedMessage) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedMessage(null)}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Inbox
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => toggleBookmark(selectedMessage.id)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                {selectedMessage.bookmarked ? (
                  <Star className="h-5 w-5 text-yellow-400" />
                ) : (
                  <StarOff className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={() => handleDeleteMessage(selectedMessage.id)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedMessage.subject}</h2>
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            From: {selectedMessage.sender}
            <br />
            Date: {new Date(selectedMessage.date).toLocaleString()}
          </div>
          <div className="mt-6 text-gray-900 dark:text-white whitespace-pre-wrap">{selectedMessage.content}</div>
          
          {/* Reply Section */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Reply</h3>
            <div className="mt-4">
              <textarea
                rows={4}
                className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleReply}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-700 sm:px-6">
        <div className="flex justify-between items-center">
          <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as 'inbox' | 'trash' | 'sent')}>
            <Tabs.List className="flex space-x-4">
              <Tabs.Trigger
                value="inbox"
                className={clsx(
                  'text-sm font-medium focus:outline-none',
                  activeTab === 'inbox'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                Inbox
              </Tabs.Trigger>
              <Tabs.Trigger
                value="sent"
                className={clsx(
                  'text-sm font-medium focus:outline-none',
                  activeTab === 'sent'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                Sent
              </Tabs.Trigger>
              <Tabs.Trigger
                value="trash"
                className={clsx(
                  'text-sm font-medium focus:outline-none',
                  activeTab === 'trash'
                    ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                )}
              >
                Trash
              </Tabs.Trigger>
            </Tabs.List>
          </Tabs.Root>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReload}
              className={`p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full transition-all ${
                isReloading ? 'animate-spin' : ''
              }`}
              disabled={isReloading}
            >
              <RefreshCw className="h-5 w-5" />
            </button>
            <button
              onClick={() => setShowCompose(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </button>
          </div>
        </div>
      </div>
      
      {filteredMessages.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          {activeTab === 'inbox' ? 'Your inbox is empty.' : activeTab === 'sent' ? 'No sent messages.' : 'No messages in trash.'}
        </div>
      ) : (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredMessages.map((message) => (
            <li key={message.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between cursor-pointer">
                <div className="flex-1 min-w-0" onClick={() => handleSelectMessage(message)}>
                  <div className="flex items-center">
                    {message.unread && (
                      <div className="w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full mr-2"></div>
                    )}
                    <p className={`text-sm font-medium ${message.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                      {message.sender}
                    </p>
                  </div>
                  <p className={`text-sm ${message.unread ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                    {message.subject}
                  </p>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 truncate">
                    {message.preview}
                  </p>
                </div>
                <div className="ml-6 flex-shrink-0 flex items-center space-x-4">
                  {activeTab === 'inbox' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(message.id);
                        }}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      >
                        {message.bookmarked ? (
                          <Star className="h-5 w-5 text-yellow-400" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteMessage(message.id);
                        }}
                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </>
                  ) : activeTab === 'trash' ? (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestoreMessage(message.id);
                        }}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500"
                      >
                        Restore
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePermanentDelete(message.id);
                        }}
                        className="text-sm text-red-600 dark:text-red-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(message.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardInbox;