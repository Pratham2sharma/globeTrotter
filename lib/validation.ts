// Comprehensive validation utilities

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const getDateValidation = (isAdmin: boolean = false) => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  
  if (isAdmin) {
    return { min: undefined, max: undefined };
  }
  
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split('T')[0];
  
  return { min: todayString, max: maxDateString };
};

export const validateTripDuration = (startDate: string, endDate: string): ValidationResult => {
  if (!startDate || !endDate) {
    return { isValid: false, message: "Please select both start and end dates" };
  }
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (start < today) {
    return { isValid: false, message: "Start date cannot be in the past" };
  }
  
  if (end <= start) {
    return { isValid: false, message: "End date must be after start date" };
  }
  
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays > 28) {
    return { isValid: false, message: "Trip duration cannot exceed 28 days" };
  }
  
  return { isValid: true };
};

export const validateEmail = (email: string): ValidationResult => {
  if (!email.trim()) {
    return { isValid: false, message: "Email address is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  return { isValid: true };
};

export const validateDestination = (destination: string): ValidationResult => {
  if (!destination.trim()) {
    return { isValid: false, message: "Please enter a destination" };
  }
  
  if (destination.trim().length < 2) {
    return { isValid: false, message: "Destination must be at least 2 characters long" };
  }
  
  return { isValid: true };
};

export const validateTravelers = (travelers: number): ValidationResult => {
  if (!travelers || travelers < 1) {
    return { isValid: false, message: "At least 1 traveler is required" };
  }
  
  if (travelers > 20) {
    return { isValid: false, message: "Maximum 20 travelers allowed per booking" };
  }
  
  return { isValid: true };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters long" };
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return { isValid: false, message: "Password must contain uppercase, lowercase, and number" };
  }
  
  return { isValid: true };
};

export const validateName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: "Name is required" };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters long" };
  }
  
  if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
    return { isValid: false, message: "Name can only contain letters and spaces" };
  }
  
  return { isValid: true };
};