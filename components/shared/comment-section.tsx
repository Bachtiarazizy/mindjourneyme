"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, Send, User, Calendar, Heart, Loader2 } from "lucide-react";

interface Comment {
  _id: string;
  _createdAt: string;
  name: string;
  email: string;
  comment: string;
  approved: boolean;
  replies?: Reply[];
}

interface Reply {
  _id: string;
  _createdAt: string;
  name: string;
  comment: string;
  isAuthor: boolean;
}

interface CommentsProps {
  postId: string;
  postSlug: string;
}

export default function CommentsSection({ postId, postSlug }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?postId=${postId}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Nama wajib diisi";
    }

    if (!formData.email.trim()) {
      errors.email = "Email wajib diisi";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Format email tidak valid";
    }

    if (!formData.comment.trim()) {
      errors.comment = "Komentar tidak boleh kosong";
    } else if (formData.comment.trim().length < 10) {
      errors.comment = "Komentar minimal 10 karakter";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          postId,
          postSlug,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", comment: "" });
        setFormErrors({});

        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } else {
        throw new Error("Failed to submit comment");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setFormErrors({ submit: "Gagal mengirim komentar. Silakan coba lagi." });
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <section className="mt-16 pt-12 border-t-2 border-border">
      <div className="mb-12">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
          <MessageCircle className="w-8 h-8 text-primary" />
          Komentar ({comments.length})
        </h2>
        <p className="text-muted-foreground">Bagikan pemikiran dan pengalamanmu tentang artikel ini 💬</p>
      </div>

      <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 shadow-md mb-12">
        <h3 className="font-bold text-xl text-foreground mb-6 flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Tulis Komentar
        </h3>

        {submitSuccess && (
          <div className="bg-primary/10 border-2 border-primary/20 rounded-lg p-4 mb-6 animate-fade-in-up">
            <p className="text-primary font-bold">✨ Terima kasih! Komentarmu telah dikirim dan sedang menunggu persetujuan.</p>
          </div>
        )}

        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block font-bold text-foreground mb-2">
                Nama <span className="text-primary">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.name ? "border-destructive" : "border-border"} bg-background text-foreground font-bold focus:border-primary focus:outline-none transition-colors`}
                placeholder="Nama kamu"
                disabled={submitting}
              />
              {formErrors.name && <p className="text-destructive text-sm mt-2 font-bold">{formErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block font-bold text-foreground mb-2">
                Email <span className="text-primary">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.email ? "border-destructive" : "border-border"} bg-background text-foreground font-bold focus:border-primary focus:outline-none transition-colors`}
                placeholder="email@example.com"
                disabled={submitting}
              />
              {formErrors.email && <p className="text-destructive text-sm mt-2 font-bold">{formErrors.email}</p>}
              <p className="text-muted-foreground text-sm mt-2">Email tidak akan dipublikasikan</p>
            </div>
          </div>

          <div>
            <label htmlFor="comment" className="block font-bold text-foreground mb-2">
              Komentar <span className="text-primary">*</span>
            </label>
            <textarea
              id="comment"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={5}
              className={`w-full px-4 py-3 rounded-lg border-2 ${formErrors.comment ? "border-destructive" : "border-border"} bg-background text-foreground font-bold focus:border-primary focus:outline-none transition-colors resize-none`}
              placeholder="Bagikan pemikiranmu..."
              disabled={submitting}
            />
            {formErrors.comment && <p className="text-destructive text-sm mt-2 font-bold">{formErrors.comment}</p>}
          </div>

          {formErrors.submit && (
            <div className="bg-destructive/10 border-2 border-destructive/20 rounded-lg p-4">
              <p className="text-destructive font-bold">{formErrors.submit}</p>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-bold border-2 border-primary-border shadow-primary transition-all hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Mengirim...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Kirim Komentar
              </>
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-card border-2 border-border rounded-xl p-12 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-bold">Belum ada komentar. Jadilah yang pertama berkomentar! 🌟</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-card border-2 border-border rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-foreground">{comment.name}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(comment._createdAt)}</span>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-4">{comment.comment}</p>

              {comment.replies && comment.replies.length > 0 && (
                <div className="mt-6 pl-6 border-l-2 border-primary/20 space-y-4">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="bg-primary/5 rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-foreground">{reply.name}</h5>
                            {reply.isAuthor && <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-bold">Author</span>}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(reply._createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">{reply.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
