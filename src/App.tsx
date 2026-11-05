import { FormEvent, useState } from 'react'
import { isSupabaseConfigured, supabase } from './lib/supabase'

function App() {
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedName = name.trim()

    if (normalizedName.length < 2) {
      setFeedback({ type: 'error', message: 'Informe pelo menos 2 caracteres.' })
      return
    }

    if (!supabase) {
      setFeedback({ type: 'error', message: 'Configure as variáveis do Supabase para conectar o aplicativo.' })
      return
    }

    setSaving(true)
    setFeedback(null)

    const { error } = await supabase
      .from('oficina_test_names')
      .insert({ name: normalizedName })

    if (error) {
      setFeedback({ type: 'error', message: `Não foi possível salvar: ${error.message}` })
    } else {
      setFeedback({ type: 'success', message: 'Nome salvo no Supabase com sucesso!' })
      setName('')
    }

    setSaving(false)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="Oficina Conexão - início">
          <span className="brand-mark">OC</span>
          <span>Oficina <strong>Conexão</strong></span>
        </a>
        <div className="topbar-right">
          <span className="environment"><span className="status-dot" /> Ambiente de teste</span>
          <div className="avatar" aria-label="Usuário de teste">T</div>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="sidebar-label">WORKSPACE</div>
          <a className="nav-item active" href="#cadastro">
            <span className="nav-icon">⌂</span>
            <span>Cadastro</span>
          </a>
          <div className="sidebar-note">
            <span className="note-icon">✳</span>
            <div><strong>Projeto demonstrativo</strong><small>Interface mockada para validar a conexão com o banco.</small></div>
          </div>
          <div className="sidebar-bottom">VERSÃO 1.0.0</div>
        </aside>

        <main className="main-content" id="cadastro">
          <div className="breadcrumb">Workspace <span>/</span> Cadastro</div>
          <section className="page-heading">
            <div>
              <div className="eyebrow">FORMULÁRIO DE TESTE</div>
              <h1>Cadastro de nome</h1>
              <p>Um formulário simples para validar a comunicação com o Supabase.</p>
            </div>
            <span className={`connection-pill ${isSupabaseConfigured ? 'configured' : 'pending'}`}>
              <span className="status-dot" />
              {isSupabaseConfigured ? 'Supabase configurado' : 'Aguardando configuração'}
            </span>
          </section>

          <section className="form-card">
            <div className="card-header">
              <div className="card-icon">✎</div>
              <div><h2>Informações básicas</h2><p>Preencha o campo abaixo para realizar um teste de gravação.</p></div>
            </div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Nome <span>*</span></label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Digite seu nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
                minLength={2}
                maxLength={120}
                required
              />
              <div className="field-hint">Mínimo de 2 e máximo de 120 caracteres.</div>
              {feedback && <div className={`feedback ${feedback.type}`} role="status">{feedback.message}</div>}
              <div className="form-actions">
                <span className="required-note"><span>*</span> Campo obrigatório</span>
                <button type="submit" disabled={saving || !isSupabaseConfigured}>
                  {saving ? 'Salvando...' : 'Salvar nome'} <span aria-hidden="true">→</span>
                </button>
              </div>
              {!isSupabaseConfigured && <p className="config-hint">Adicione as variáveis de ambiente do Supabase na Vercel para habilitar o envio.</p>}
            </form>
          </section>
          <div className="test-caption"><span>◎</span> Os dados enviados são armazenados na tabela <code>oficina_test_names</code>.</div>
        </main>
      </div>

      <footer className="footer">
        <span>© 2026 Oficina Conexão</span>
        <span>Aplicação de demonstração <i /> Conectividade Supabase</span>
      </footer>
    </div>
  )
}

export default App