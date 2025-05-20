import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, Send } from 'lucide-react';

interface BookmarkedItem {
  id: number;
  sender?: string;
  subject?: string;
  preview?: string;
  date: string;
  type: 'message' | 'opportunity';
  title?: string;
  organization?: string;
  location?: string;
  content?: string;
  bookmarked: boolean;
}

function DashboardBookmarks() {
  const [bookmarkedItems, setBookmarkedItems] = useState<BookmarkedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<BookmarkedItem | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    // Load bookmarked messages from localStorage
    const storedBookmarks = localStorage.getItem('bookmarkedMessages');
    if (storedBookmarks) {
      try {
        const bookmarks = JSON.parse(storedBookmarks);
        setBookmarkedItems(bookmarks.map((item: any) => ({
          ...item,
          type: 'message',
          bookmarked: true
        })));
      } catch (error) {
        console.error('Error parsing bookmarked items:', error);
      }
    }
  }, []);

  const handleReply = () => {
    if (!selectedItem || !replyText.trim()) return;
    
    // In a real app, this would send the reply to a server
    alert('Reply sent!');
    setReplyText('');
  };

  const removeBookmark = (itemId: number) => {
    // Update state
    const updatedItems = bookmarkedItems.filter(item => item.id !== itemId);
    setBookmarkedItems(updatedItems);
    
    // Update localStorage
    localStorage.setItem('bookmarkedMessages', JSON.stringify(updatedItems));
    
    // If we're viewing the item that was unbookmarked, go back to the list
    if (selectedItem && selectedItem.id === itemId) {
      setSelectedItem(null);
    }
  };

  if (selectedItem && selectedItem.type === 'message') {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setSelectedItem(null)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Bookmarks
            </button>
            <button
              onClick={() => removeBookmark(selectedItem.id)}
              className="text-gray-600 hover:text-gray-900"
            >
              <Star className="h-5 w-5 text-yellow-400" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900">{selectedItem.subject}</h2>
          <div className="mt-2 text-sm text-gray-600">
            From: {selectedItem.sender}
            <br />
            Date: {new Date(selectedItem.date).toLocaleString()}
          </div>
          <div className="mt-6 text-gray-900 whitespace-pre-wrap">{selectedItem.content}</div>
          
          {/* Reply Section */}
          <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900">Reply</h3>
            <div className="mt-4">
              <textarea
                rows={4}
                className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleReply}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Bookmarked Items</h3>
      </div>
      {bookmarkedItems.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          You haven't bookmarked any items yet. Star messages or opportunities to save them here.
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {bookmarkedItems.map((item) => (
            <li key={item.id} className="hover:bg-gray-50 cursor-pointer">
              <div className="px-4 py-4 sm:px-6" onClick={() => setSelectedItem(item)}>
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-2" />
                      <p className="text-sm font-medium text-gray-900">
                        {item.type === 'message' ? item.sender : item.title}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.type === 'message' ? item.subject : `${item.organization} - ${item.location}`}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.type === 'message' ? item.preview : `Date: ${item.date}`}
                    </p>
                  </div>
                  <div className="ml-6 flex-shrink-0">
                    <p className="text-sm text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DashboardBookmarks;