import { useState, useEffect } from 'react';
import { MessageSquare, Send, User, Calendar, CheckCircle2, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${API_BASE}/comments/post/${postId}`);
        const data = await response.json();

        if (response.ok) {
          setComments(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch(`${API_BASE}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          postId
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', comment: '' });

        // Add new comment to the list
        setComments([data.data, ...comments]);

        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert(data.message || 'Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* Comment Form */}
      <Card className="border-2 border-purple-100 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <MessageSquare className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
              Leave a Comment
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {success && (
            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-green-700 text-sm animate-in fade-in">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              <p className="font-medium">Comment submitted successfully!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="h-10 text-sm border-gray-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>
            </div>

            <div>
              <textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                rows="3"
                required
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition-all h-10 text-sm"
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Comment
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments Display */}
      <Card className="border-2 border-gray-100 shadow-md">
        <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-slate-50">
          <CardTitle className="flex items-center gap-2 text-lg">
            <MessageSquare className="h-5 w-5 text-purple-600" />
            <span className="font-bold text-gray-900">Comments ({comments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2 text-gray-600 text-sm">Loading comments...</span>
            </div>
          ) : comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-10 w-10 mx-auto mb-3 text-gray-300" />
              <p className="font-medium text-sm">No comments yet</p>
              <p className="text-xs mt-1">Be the first to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map((comment) => (
                <div
                  key={comment._id}
                  className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-100 hover:border-purple-200 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1 flex-wrap">
                        <h4 className="font-semibold text-gray-900 text-sm">{comment.name}</h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed break-words">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
