import { Estado } from "@/store";
import IProjeto from "@/interfaces/IProjeto";
import { Module } from "vuex";
import { ADD_PROJETO, DEFINE_PROJETOS, DELETE_PROJETO, EDIT_PROJETO } from "@/store/tipo-mutacoes";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoProjeto {
  projetos: IProjeto[];
}

export const projeto: Module<EstadoProjeto, Estado> = {
  mutations: {
    [ADD_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto,
      } as IProjeto;
      state.projetos.push(projeto);
    },
    [EDIT_PROJETO](state, projeto: IProjeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [DEFINE_PROJETOS](state, projetos: IProjeto[]) {
      state.projetos = projetos;
    },
    [DELETE_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http
        .get("projetos")
        .then((response) => commit(DEFINE_PROJETOS, response.data));
    },
    [CADASTRAR_PROJETO](contexto, nomeDoProjeto: string) {
      return http.post("/projetos", {
        nome: nomeDoProjeto,
      });
    },
    [ALTERAR_PROJETO](contexto, projeto: IProjeto) {
      return http.put(`/projetos/${projeto.id}`, projeto);
    },
    [REMOVER_PROJETO]({ commit }, id: string) {
      return http
        .delete(`/projetos/${id}`)
        .then(() => commit(DELETE_PROJETO, id));
    },
  },
  getters: {
    projetos(state){
      return state.projetos
    }
  }
};
