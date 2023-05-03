<template>
  <div id="printable">
    <table>
      <thead>
        <tr>
          <th>Nama Produk</th>
          <th>Harga</th>
          <th>Jumlah</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <h1>{{ item }}</h1>
    </table>
  </div>
</template>

<script>
export default {
  props: ['item'],
  name: 'App'
};
</script>

<style></style>
