<template>
  <div>
    <md-table v-model="users" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Producto">{{ item.name }}</md-table-cell>
        <md-table-cell md-label="Cantidad">{{ item.salary }}</md-table-cell>
        <md-table-cell md-label="Estado">{{ item.country }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      selected: [],
      users: [
        {
          id: 1,
          name: "Papa",
          salary: "5",
          country: "Enviado"
        },
        {
          id: 2,
          name: "Papa",
          salary: "15",
          country: "Enviado"
        },
        {
          id: 3,
          name: "Papa",
          salary: "20",
          country: "Enviado"
        },
        {
          id: 4,
          name: "Papa",
          salary: "30",
          country: "Enviado"
        }
      ]
    };
  }
};
</script>
