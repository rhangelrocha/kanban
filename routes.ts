/**
  * Essas rotas não requerem autenticação
  * @type {string[]}
  */
export const publicRoutes = [
    "/"
];

/**
  * Essas rotas redirecionarão usuários logados para /dashboard
  * @type {string[]}
  */
export const authRoutes = [
    "/auth/login",
    "/auth/redefinir-senha",
];

/**
  * Rotas que começam com este prefixo são usadas para fins de autenticação de API
  * @type {string}
  */
export const apiAuthPrefix = "/api/auth";

/**
  * O caminho de redirecionamento padrão após o login
  * @type {string}
  */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";