"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Globe, ArrowLeft } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reset password for:", email);
    setIsSubmitted(true);
  };

  return (
    <>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
      `}</style>
      <div style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: '20px 16px',
        backgroundColor: '#0A192F',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        overflowX: 'hidden',
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        left: 0
      }}>

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#FFD700',
          opacity: 0.1
        }}
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#5BC0BE',
          opacity: 0.1
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: '100%',
          maxWidth: '450px',
          backgroundColor: '#F8F9FA',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
          margin: '20px'
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ padding: '32px 32px 24px', textAlign: 'center' }}
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex',
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: '#0A192F',
              marginBottom: '16px',
              cursor: 'pointer'
            }}
          >
            <Globe size={32} style={{ color: '#FFD700' }} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#0A192F',
              margin: '0 0 8px 0'
            }}
          >
            Reset Password
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '14px',
              color: '#343A40',
              margin: 0
            }}
          >
            {isSubmitted ? "Check your email for reset instructions" : "Enter your email to reset your password"}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ padding: '0 32px 32px' }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  zIndex: 1
                }}>
                  <Mail size={20} style={{ color: '#5BC0BE' }} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 44px',
                    border: '2px solid #5BC0BE',
                    borderRadius: '8px',
                    backgroundColor: '#F8F9FA',
                    color: '#343A40',
                    fontSize: '14px',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 215, 0, 0.1)';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#5BC0BE';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
                  required
                />
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#FFD700',
                  color: '#0A192F',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)'
                }}
              >
                Send Reset Link
              </motion.button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#5BC0BE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                opacity: 0.8
              }}>
                <Mail size={24} style={{ color: '#F8F9FA' }} />
              </div>
              <p style={{ color: '#343A40', fontSize: '14px', marginBottom: '20px' }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ textAlign: 'center', fontSize: '12px', marginTop: '20px' }}
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#5BC0BE',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;