let sessaoAtual = null;

export function definirSessao(sessao) {
  sessaoAtual = sessao;
}

export function obterSessao() {
  return sessaoAtual;
}

export function limparSessao() {
  sessaoAtual = null;
}
