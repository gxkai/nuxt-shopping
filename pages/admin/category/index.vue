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
        <b-button @click="article(row)" size="sm" class="mr-1">
          To ArticleList
        </b-button>
        <b-button @click="handleDelete(row)" size="sm" class="mr-1">
          Delete
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
            v-model="infoModal.form.name"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group label="IconUrl" invalid-feedback="IconUrl is required">
          <b-form-file
            v-model="infoModal.form.file"
            @input="updateFile(infoModal)"
            accept="image/*"
          ></b-form-file>
          <b-img :src="infoModal.form.iconUrl" v-bind="mainProps"></b-img>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import { pageMixin, libMixin } from '../../../mixins'
export default {
  mixins: [pageMixin, libMixin],
  data() {
    return {
      infoModal: {
        id: 'info-modal',
        form: {
          iconUrl: '',
          file: '',
          name: ''
        }
      }
    }
  },
  async asyncData(context) {
    const items = await context.store.dispatch('admin/getCategoryList')
    return {
      items,
      nameState: null,
      fields: [
        {
          key: 'id',
          label: 'id',
          sortable: true,
          sortDirection: 'desc'
        },
        {
          key: 'name',
          label: 'name',
          sortable: true,
          sortDirection: 'desc'
        },
        { key: 'actions', label: 'Actions' }
      ],
      mainProps: {
        left: true,
        fluidGrow: false,
        blank: false,
        blankColor: '#bbb',
        width: 50,
        height: 50,
        class: 'my-5'
      }
    }
  },
  methods: {
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      return valid
    },
    async handleSubmit({ infoModal }) {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      if (infoModal.mode === 'Edit') {
        await this.$axios.put(
          `/categories/${infoModal.form.id}`,
          infoModal.form
        )
      } else {
        await this.$axios.post('/categories', infoModal.form)
      }
      this.items = await this.$store.dispatch('admin/getCategoryList')
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide(infoModal.id)
      })
    },
    article(row) {
      this.$router.push(`/admin/category/${row.item.id}`)
    },
    handleDelete(row) {
      this.$bvModal
        .msgBoxConfirm('Confirm delete?')
        .then(async () => {
          await this.$axios.delete(`/categories/${row.item.id}`)
          this.items = await this.$store.dispatch('admin/getCategoryList')
        })
        .catch((err) => {
          console.log(err)
          // An error occurred
        })
    },
    async updateFile(infoModal) {
      if (!infoModal.form.file) {
        return
      }
      const a = await this.getFileBase64(infoModal.form.file)
      console.log(a)
      this.$set(infoModal.form, 'iconUrl', a)
    }
  }
}
</script>
<style scoped>
fieldset {
  padding: 0;
}
</style>
