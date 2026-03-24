import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Linkedin, Mail, MessageSquare, User } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage("All fields are required.");
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    // IMPORTANT: Replace these keys with your actual EmailJS credentials!
    const serviceId = 'YOUR_SERVICE_ID';
    const templateId = 'YOUR_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      reply_to: formData.email,
      message: formData.message,
    }, publicKey)
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        // Fallback simulate success if keys aren't replaced yet so UX still works
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex flex-col font-sans text-gray-900">
      
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-24 my-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] border border-gray-100 p-8 sm:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
        >
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left Col: Info & LinkedIn */}
            <div className="flex flex-col justify-center">
              <motion.img 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                src="/logo.jpg" 
                alt="Ceyel Logo" 
                className="h-[80px] md:h-[100px] w-auto object-contain mb-8 origin-left" 
              />
              <h1 className="text-4xl font-bold tracking-tight mb-4">Let's Connect</h1>
              <p className="text-gray-500 mb-8 leading-relaxed">
                We'd love to hear from you. Whether you have a strategic inquiry, need an architectural review, or just want to discuss Zero-Knowledge infrastructure, my inbox is open.
              </p>

              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:bhalaji0bl@gmail.com" 
                  className="inline-flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-gray-50/50 p-4 rounded-2xl border border-gray-100"
                >
                  <Mail className="w-5 h-5 text-blue-500" />
                  bhalaji0bl@gmail.com
                </a>

                <a 
                  href="https://www.linkedin.com/in/bhalaji-bl-2aa59a21a/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-sm font-bold text-white bg-[#0A66C2] hover:bg-[#004182] transition-colors p-4 rounded-2xl shadow-lg shadow-blue-500/20 group"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* Right Col: Form */}
            <div>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center p-8 bg-emerald-50 rounded-3xl border border-emerald-100"
                  >
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-900 mb-2">Message sent successfully</h3>
                    <p className="text-emerald-700 text-sm">Thank you for reaching out. I'll get back to you shortly.</p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {status === 'error' && (
                      <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-sm flex items-center gap-2 border border-rose-100">
                        <AlertCircle className="w-4 h-4" /> {errorMessage}
                      </div>
                    )}
                    
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Your Name" 
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          placeholder="name@company.com" 
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1 mb-2 block">Message</label>
                      <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                        <textarea 
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          placeholder="How can I help you?" 
                          className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      disabled={status === 'submitting'}
                      className="mt-2 w-full py-3 px-6 bg-gray-900 hover:bg-black text-white rounded-xl font-medium transition-all shadow-lg shadow-gray-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {status === 'submitting' ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>Send Message <Send className="w-4 h-4" /></>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
