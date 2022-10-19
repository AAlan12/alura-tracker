import IProjeto from "@/interfaces/IProjeto";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { ADD_PROJETO, EDIT_PROJETO, DELETE_PROJETO } from "./tipo-mutacoes";

interface Estado{
    projetos: IProjeto[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos:[]
    },
    mutations: {
        [ADD_PROJETO](state, nomeDoProjeto: string){
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto)
        },
        [EDIT_PROJETO](state, projeto: IProjeto){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id)
            state.projetos[index] = projeto
        },
        [DELETE_PROJETO](state, id: string) {
            state.projetos = state.projetos.filter(proj => proj.id != id)
        }
    }
})

export function useStore(): Store<Estado>{
    return vuexUseStore(key)
}