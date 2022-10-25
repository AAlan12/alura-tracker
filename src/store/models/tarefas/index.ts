import { Estado } from "@/store";
import { Module } from "vuex";
import  ITarefa  from "@/interfaces/ITarefa";
import { ADD_TAREFA, DEFINE_TAREFAS, EDIT_TAREFA } from "@/store/tipo-mutacoes";
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS } from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoTarefa {
  tarefas: ITarefa[]
}

export const tarefa: Module<EstadoTarefa, Estado> = {
  state: {
    tarefas: [],
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
  },
  actions: {
    [OBTER_TAREFAS]({ commit }, filtro: string) {
      let url = "tarefas";
      if (filtro) {
        url += '?descricao=' + filtro;
      }
      http.get(url).then((response) => commit(DEFINE_TAREFAS, response.data));
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
};
