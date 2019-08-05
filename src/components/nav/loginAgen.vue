<template>
  <div>
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>build</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notification_important</v-icon>
      </v-btn>
    </template>
  </div>
</template>
<script>
  export default {
    name: 'loginAgen'
  }
</script>