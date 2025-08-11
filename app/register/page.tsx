"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, Globe, User, Phone, MapPin, FileText } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", city: "", country: "",
    additionalInfo: "", password: "", confirmPassword: ""
  });

  const handleInputChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Register attempt:", formData);
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
      {/* Animated Background Elements */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', top: '10%', left: '10%', width: '120px', height: '120px',
          borderRadius: '50%', backgroundColor: '#FFD700', opacity: 0.1
        }}
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: 'absolute', bottom: '15%', right: '15%', width: '80px', height: '80px',
          borderRadius: '50%', backgroundColor: '#5BC0BE', opacity: 0.1
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: '100%', maxWidth: '450px', backgroundColor: '#F8F9FA', borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)', overflow: 'hidden',
          position: 'relative', zIndex: 10, margin: '20px'
        }}
      >
        {/* Header */}
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
              display: 'inline-flex', padding: '12px', borderRadius: '50%',
              backgroundColor: '#0A192F', marginBottom: '12px', cursor: 'pointer'
            }}
          >
            <Globe size={32} style={{ color: '#FFD700' }} />
          </motion.div>
          <h1 style={{
            fontSize: '28px', fontWeight: '700', color: '#0A192F', margin: '0 0 8px 0'
          }}>Join GlobeTrotter</h1>
          <p style={{
            fontSize: '14px', color: '#343A40', margin: 0
          }}>Start your journey with us today</p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ padding: '0 32px 32px' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Name Fields */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', zIndex: 1
                }}>
                  <User size={20} style={{ color: '#5BC0BE' }} />
                </div>
                <input
                  type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                  placeholder="First Name" required
                  style={{
                    width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                    borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                    fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#5BC0BE';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', zIndex: 1
                }}>
                  <User size={20} style={{ color: '#5BC0BE' }} />
                </div>
                <input
                  type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                  placeholder="Last Name" required
                  style={{
                    width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                    borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                    fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#5BC0BE';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', zIndex: 1
              }}>
                <Mail size={16} style={{ color: '#5BC0BE' }} />
              </div>
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                placeholder="Email Address" required
                style={{
                  width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                  borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                  fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#5BC0BE';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', zIndex: 1
              }}>
                <Phone size={16} style={{ color: '#5BC0BE' }} />
              </div>
              <input
                type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                placeholder="Phone Number" required
                style={{
                  width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                  borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                  fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#5BC0BE';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
            >
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', zIndex: 1
                }}>
                  <MapPin size={16} style={{ color: '#5BC0BE' }} />
                </div>
                <input
                  type="text" name="city" value={formData.city} onChange={handleInputChange}
                  placeholder="City" required
                  style={{
                    width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                    borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                    fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#5BC0BE';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                  pointerEvents: 'none', zIndex: 1
                }}>
                  <MapPin size={16} style={{ color: '#5BC0BE' }} />
                </div>
                <input
                  type="text" name="country" value={formData.country} onChange={handleInputChange}
                  placeholder="Country" required
                  style={{
                    width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                    borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                    fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#FFD700';
                    e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#5BC0BE';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '10px', top: '12px',
                pointerEvents: 'none', zIndex: 1
              }}>
                <FileText size={16} style={{ color: '#5BC0BE' }} />
              </div>
              <textarea
                name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange}
                placeholder="Additional Information (Optional)" rows={2}
                style={{
                  width: '100%', padding: '10px 12px 10px 32px', border: '2px solid #5BC0BE',
                  borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                  fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box',
                  resize: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#5BC0BE';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', zIndex: 1
              }}>
                <Lock size={16} style={{ color: '#5BC0BE' }} />
              </div>
              <input
                type={showPassword ? "text" : "password"} name="password"
                value={formData.password} onChange={handleInputChange}
                placeholder="Password" required
                style={{
                  width: '100%', padding: '10px 36px 10px 32px', border: '2px solid #5BC0BE',
                  borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                  fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#5BC0BE';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px'
                }}
              >
                {showPassword ? <EyeOff size={16} style={{ color: '#5BC0BE' }} /> : <Eye size={16} style={{ color: '#5BC0BE' }} />}
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                pointerEvents: 'none', zIndex: 1
              }}>
                <Lock size={16} style={{ color: '#5BC0BE' }} />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"} name="confirmPassword"
                value={formData.confirmPassword} onChange={handleInputChange}
                placeholder="Confirm Password" required
                style={{
                  width: '100%', padding: '10px 36px 10px 32px', border: '2px solid #5BC0BE',
                  borderRadius: '6px', backgroundColor: '#F8F9FA', color: '#343A40',
                  fontSize: '13px', outline: 'none', transition: 'all 0.3s ease', boxSizing: 'border-box'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#FFD700';
                  e.target.style.boxShadow = '0 0 0 2px rgba(255, 215, 0, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#5BC0BE';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: '4px'
                }}
              >
                {showConfirmPassword ? <EyeOff size={16} style={{ color: '#5BC0BE' }} /> : <Eye size={16} style={{ color: '#5BC0BE' }} />}
              </motion.button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(255, 215, 0, 0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                width: '100%', padding: '12px', backgroundColor: '#FFD700', color: '#0A192F',
                border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600',
                cursor: 'pointer', transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)'
              }}
            >
              Create Account
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}
            >
              <div style={{
                position: 'absolute', top: '50%', left: 0, right: 0, height: '1px',
                backgroundColor: '#5BC0BE', opacity: 0.3
              }} />
              <span style={{
                backgroundColor: '#F8F9FA', color: '#343A40', padding: '0 12px',
                fontSize: '12px', position: 'relative'
              }}>Or continue with</span>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              whileHover={{ scale: 1.02, borderColor: '#FFD700' }}
              whileTap={{ scale: 0.98 }}
              type="button"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                width: '100%', padding: '10px', border: '2px solid #5BC0BE', borderRadius: '6px',
                backgroundColor: '#F8F9FA', color: '#343A40', fontSize: '13px', fontWeight: '500',
                cursor: 'pointer', transition: 'all 0.3s ease'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign up with Google
            </motion.button>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              style={{ textAlign: 'center', fontSize: '12px', marginTop: '8px' }}
            >
              <span style={{ color: '#343A40' }}>Already have an account? </span>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/login"
                style={{ color: '#5BC0BE', fontWeight: '600', textDecoration: 'none' }}
              >
                Sign in
              </motion.a>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
      </div>
    </>
  );
};

export default RegisterPage;