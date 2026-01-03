import { useState } from 'react';
import { MessageSquare, User, Calendar, Send, Plus } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  created_at: string;
  replies: Reply[];
}

interface Reply {
  id: string;
  content: string;
  author_name: string;
  created_at: string;
}

export default function Forum() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Best practices for wheat cultivation in winter',
      content: 'I am planning to sow wheat this season. What are the best practices for getting a good yield? Any suggestions on seed varieties and fertilizer application?',
      author_name: 'Ramesh Kumar',
      category: 'Crop Management',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: 'r1',
          content: 'PBW-343 and HD-2967 are excellent varieties for winter wheat. Make sure to apply DAP at the time of sowing.',
          author_name: 'Suresh Patel',
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    },
    {
      id: '2',
      title: 'Organic pest control methods',
      content: 'Looking for organic alternatives to chemical pesticides. What has worked well for you?',
      author_name: 'Anjali Sharma',
      category: 'Pest Control',
      created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      replies: [
        {
          id: 'r2',
          content: 'Neem oil spray has been very effective for me against aphids and whiteflies. Mix 5ml neem oil per liter of water.',
          author_name: 'Prakash Singh',
          created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'r3',
          content: 'I use a mixture of garlic and chili spray. Works great and completely natural!',
          author_name: 'Meena Devi',
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
        }
      ]
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author_name: '',
    category: 'Crop Management'
  });
  const [newReply, setNewReply] = useState({ content: '', author_name: '' });
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'Crop Management', 'Pest Control', 'Fertilizers', 'Weather', 'Equipment', 'Market Prices', 'Other'];

  const filteredPosts = filterCategory === 'All'
    ? posts
    : posts.filter(post => post.category === filterCategory);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.title && newPost.content && newPost.author_name) {
      const post: Post = {
        id: Date.now().toString(),
        ...newPost,
        created_at: new Date().toISOString(),
        replies: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '', author_name: '', category: 'Crop Management' });
      setShowNewPostForm(false);
    }
  };

  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPost && newReply.content && newReply.author_name) {
      const reply: Reply = {
        id: Date.now().toString(),
        ...newReply,
        created_at: new Date().toISOString()
      };

      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, replies: [...post.replies, reply] }
          : post
      ));

      setSelectedPost({
        ...selectedPost,
        replies: [...selectedPost.replies, reply]
      });

      setNewReply({ content: '', author_name: '' });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Discussion Forum</h1>
            <p className="text-gray-600">Connect with farmers and share knowledge</p>
          </div>
          <button
            onClick={() => setShowNewPostForm(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            New Post
          </button>
        </div>

        {showNewPostForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Create New Post</h2>
              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newPost.author_name}
                    onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {categories.filter(cat => cat !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    required
                    rows={6}
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                      {selectedPost.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedPost.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {selectedPost.author_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(selectedPost.created_at)}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 whitespace-pre-wrap">{selectedPost.content}</p>

                <div className="border-t pt-4">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Replies ({selectedPost.replies.length})
                  </h3>

                  <div className="space-y-4 mb-6">
                    {selectedPost.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-medium text-gray-800">{reply.author_name}</span>
                          <span className="text-sm text-gray-500">{formatDate(reply.created_at)}</span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleAddReply} className="space-y-3">
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      value={newReply.author_name}
                      onChange={(e) => setNewReply({ ...newReply, author_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <textarea
                      placeholder="Write your reply..."
                      required
                      rows={3}
                      value={newReply.content}
                      onChange={(e) => setNewReply({ ...newReply, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      Reply
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 line-clamp-2">{post.content}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author_name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.created_at)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-green-600">
                  <MessageSquare className="h-4 w-4" />
                  {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No posts in this category yet.</p>
            <p className="text-gray-400">Be the first to start a discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
}
