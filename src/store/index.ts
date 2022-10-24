import { EstadoProjeto, projeto } from './models/projeto/index';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "./tipo-acoes";
import { INotificacao } from "@/interfaces/INotificacao";

import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import {
  NOTIFICAR,
  DEFINE_TAREFAS,
  ADD_TAREFA,
  EDIT_TAREFA,
} from "./tipo-mutacoes";

import http from "@/http";
import ITarefa from "@/interfaces/ITarefa";

export interface Estado {
  tarefas: ITarefa[];
  notificacoes: INotificacao[];
  projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol();

export const store = createStore<Estado>({
  state: {
    tarefas: [],
    notificacoes: [],
    projeto:{
      projetos: []
    }
  },
  mutations: {
    [DEFINE_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas;
    },
    [ADD_TAREFA](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [EDIT_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex((t) => t.id == tarefa.id);
      state.tarefas[index] = tarefa;
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = new Date().getTime();
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          (notificacao) => notificacao.id != novaNotificacao.id
        );
      }, 3000);
    },
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http
        .get("tarefas")
        .then((response) => commit(DEFINE_TAREFAS, response.data));
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .post("/tarefas", tarefa)
        .then((response) => commit(ADD_TAREFA, response.data));
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      return http
        .put(`/tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERAR_TAREFA, tarefa));
    },
  },
  modules:{
    projeto
  }
});

export function useStore(): Store<Estado> {
  return vuexUseStore(key);
}
