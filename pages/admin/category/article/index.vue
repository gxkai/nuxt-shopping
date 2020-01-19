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
        <b-button v-b-modal.modal-1 variant="primary">Add</b-button>
        <b-modal
          id="modal-1"
          ref="modal"
          @show="resetModal"
          @ok="handleOk"
          title="Submit Your Name"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              :state="nameState"
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
            >
              <b-form-input
                id="name-input"
                v-model="form.name"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
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
      show-empty
      small
      stacked="md"
    >
      <template v-slot:cell(actions)="row">
        <b-button
          @click="info(row.item, row.index, $event.target)"
          size="sm"
          class="mr-1"
        >
          Info modal
        </b-button>
        <b-button @click="row.toggleDetails" size="sm">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
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
    <b-modal :id="infoModal.id" :title="infoModal.title" @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
import { pageMixin } from '../../../../mixins'
export default {
  mixins: [pageMixin],
  async asyncData(context) {
    const items = await context.store.dispatch('admin/getArticleList', {
      categoryId: context.route.query.categoryId
    })
    return {
      items,
      form: {
        name: ''
      },
      nameState: null,
      fields: [
        {
          key: 'id',
          label: 'id',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'title',
          label: 'title',
          sortable: true,
          sortDirection: 'desc'
        },
        { key: 'actions', label: 'Actions' }
      ]
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.form.name = ''
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      await this.$axios.post('/categories', this.form)
      this.items = await this.$store.dispatch('admin/getArticleList')
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('modal-1')
      })
    }
  }
}
</script>
