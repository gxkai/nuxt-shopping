<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label=""
          label-cols-sm="0"
          label-align-sm="left"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col lg="12" class="my-2">
        <b-button
          @click="
            info({
              mode: 'Add',
              item: {},
              index: undefined,
              button: $event.target
            })
          "
          variant="primary"
          >Add</b-button
        >
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
      :tbody-transition-props="transProps"
      show-empty
      small
      stacked="md"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          @click="
            info({
              mode: 'Edit',
              item: row.item,
              index: row.index,
              button: $event.target
            })
          "
          size="sm"
          class="mr-1"
        >
          Edit modal
        </b-button>
        <b-button @click="row.toggleDetails" size="sm">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button @click="handleDelete(row)" size="sm" class="mr-1">
          Delete
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}:
              <div v-html="value" v-if="key === 'html'"></div>
              <span v-else>{{ value }}</span>
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>
    <b-row class="d-flex justify-content-center">
      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      @hide="resetInfoModal(infoModal)"
      @ok="handleOk({ infoModal, bvModalEvt: $event })"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit({ infoModal })">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <b-form-input
            id="name-input"
            v-model="infoModal.form.title"
            required
          ></b-form-input>
        </b-form-group>
        <!-- bidirectional data binding（双向数据绑定） -->
        <div
          v-model="infoModal.form.html"
          v-quill:myQuillEditor="editorOption"
          class="quill-editor"
        ></div>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import { pageMixin } from '../../../mixins'
export default {
  mixins: [pageMixin],
  async asyncData(context) {
    const items = await context.store.dispatch('admin/getArticleList')
    return {
      items,
      nameState: null,
      fields: [
        {
          key: 'id',
          label: 'Id',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'title',
          label: 'Title',
          sortable: true,
          sortDirection: 'desc'
        },
        { key: 'actions', label: 'Actions' }
      ],
      editorOption: {},
      transProps: {
        // Transition name
        name: 'flip-list'
      }
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    async handleSubmit({ infoModal }) {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      if (infoModal.mode === 'Edit') {
        await this.$axios.put(`/articles/${infoModal.form.id}`, infoModal.form)
      } else {
        await this.$axios.post('/articles', infoModal.form)
      }
      this.items = await this.$store.dispatch('admin/getArticleList', {
        categoryId: infoModal.categoryId
      })
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(infoModal.id)
      })
    },
    handleDelete(row) {
      this.$bvModal
        .msgBoxConfirm('Confirm delete?')
        .then(async () => {
          await this.$axios.delete(`/articles/${row.item.id}`)
          this.items = await this.$store.dispatch('admin/getArticleList')
        })
        .catch((err) => {
          console.log(err)
          // An error occurred
        })
    }
  }
}
</script>
<style scoped>
table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
