# Oficina Conexão

Aplicação demonstrativa em React + Vite para testar gravação de um nome no Supabase.

## Stack
- React 19.3.1
- TypeScript
- Vite 8.3.5
- Supabase JS 2.119.0
- Vercel

## Configuração local
1. Instale Node.js 22.12+.
2. Execute `npm install`.
3. Copie `.env.example` para `.env.local`.
4. Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. Execute `npm run dev`.

## Banco de dados
A aplicação grava apenas o campo `name` na tabela `public.oficina_test_names`. O UUID e a data são gerados pelo banco.

A tabela tem RLS habilitado. A role `anon` possui apenas INSERT, limitado por uma política que exige nome entre 2 e 120 caracteres. Não há política de leitura pública.

## Deploy
Conecte este repositório à Vercel e configure as variáveis:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

A chave publishable pode estar no bundle do navegador; nunca use a `service_role` ou secret key no frontend.
