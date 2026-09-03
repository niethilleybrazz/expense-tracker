export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePassword = (password) => {
  if (!password) return "A senha é obrigatória."
  if (password.length < 8) return "A senha deve ter no mínimo 8 caracteres."
  if (!/[a-zA-Z]/.test(password)) return "A senha deve conter pelo menos uma letra."
  if (!/[0-9]/.test(password)) return "A senha deve conter pelo menos um número."
  return null
};