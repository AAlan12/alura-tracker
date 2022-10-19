<template>
    <section>
      <form @submit.prevent="salvar">
        <div class="field">
          <label for="nomeDoProjeto" class="label"> Nome do Projeto </label>
          <input
            type="text"
            class="input"
            v-model="nomeDoProjeto"
            id="nomeDoProjet"
          />
        </div>
        <div class="field">
          <button class="button" type="submit">Salvar</button>
        </div>
      </form>
    </section>
  </template>
  
  <script lang="ts">
  import { useStore } from "@/store";
  import { defineComponent } from "vue";
  
  import { EDIT_PROJETO, ADD_PROJETO, NOTIFICAR } from '@/store/tipo-mutacoes'
  import { TipoNotificacao } from "@/interfaces/INotificacao";
  
  export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Formulario",
    props: {
      id: {
        type: String
      }
    },
    mounted () {
      if(this.id) {
        const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
        this.nomeDoProjeto = projeto?.nome || ''
      }
    },
    data() {
      return {
        nomeDoProjeto: ""
      };
    },
    methods: {
      salvar() {
        if (this.id) {
          this.store.commit(EDIT_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto
          })
        } else {
          this.store.commit(ADD_PROJETO, this.nomeDoProjeto)
        }
        this.nomeDoProjeto = "";
        this.store.commit(NOTIFICAR, {
        titulo: 'Novo projeto foi salvo',
        texto: 'Prontinho ;) seu projeto já está disponível.',
        tipo: TipoNotificacao.SUCESSO
      })
        this.$router.push('/projetos')
      },
    },
    setup () {
      const store = useStore()
      return {
        store
      }
    }
  });
  </script>