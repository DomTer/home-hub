<template>
  <v-data-table
    :headers="[...headers, { text: 'Actions', value: 'actions', sortable: false }]"
    :items="items"
    sort-by="date"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Wiederkehrende Zahlung</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row v-for="(val, key) in defaultItem">
                    <v-text-field
                      v-if="typeof val === 'number'"
                      type="number"
                      v-model="editedItem[`${key}`]"
                      :label="key"
                    ></v-text-field>
                    <v-text-field
                      v-else
                      v-model="editedItem[`${key}`]"
                      :label="key"
                    ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="200px">
          <v-card>
            <v-card-title class="ml-5 text-h5 align-center">Löschen?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="deleteItemConfirm">Ja</v-btn>
              <v-btn color="green darken-1" text @click="closeDelete">nein</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "createForm.vue",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [],
    items: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.items = [ { "id": 1, "name": "Miete", "descr": "Monatliche Miete", "value": -750, "rotation": 1, "payday": 1, "activeStart": "2022-03-21T06:50:55.948Z", "activeEnd": null, "active": true } ]
      for (const [key, value] of Object.entries(this.items[0])) {
        this.headers.push({ text: key, value: key })
        if (key !== 'id') {
          this.defaultItem[`${key}`] = this.defaultValueforType(typeof value)
        }
      }
      this.editedItem = this.defaultItem
    },

    defaultValueforType (type) {
      if (type === 'number') return  0;
      if (type === 'string') return  '';
      if (type === 'object') return  null;
      return null
    },

    editItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.items.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.items.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem)
      } else {
        this.items.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>

<style scoped>

</style>
