<template>
  <div class="container-scroller">
    <navbar />
    <div class="container-fluid page-body-wrapper">
      <sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="col-sm-12">
            <div class="card card-rounded">
              <div class="card-body">
                <div>
                  <h4 class="card-title card-title-dash">Data Tagihan</h4>
                </div>
              </div>
              <div class="mx-4 mt-1">
                <div class="row">
                  <button
                    v-for="(s, index) in bill.data"
                    :key="index"
                    data-toggle="modal"
                    data-target="#struk"
                    @click="Putdata(s)"
                    class="card btn-primary mb-4 mx-2 col-sm-1"
                  >
                    <div class="card-body text-white col-sm-12">
                      <h5>Meja {{ s.id_meja }}</h5>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="pt-3 float-right pr-5" style="float: right">
            <Bootstrap4Pagination :data="bill" @pagination-change-page="Get" />
          </div>
        </div>
        <Footer />
        <!-- partial -->
        <div
          class="modal fade"
          id="struk"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div id="form">
                  <div>
                    <div class="d-flex justify-content-center">
                      <h2>Wikusama Cafe</h2>
                    </div>
                    <div class="d-flex justify-content-center align-item-start">
                      <h4>Jl. Danau Ranau, Sawojajar, Kota Malang, 65139</h4>
                    </div>
                    <hr />
                    <div
                      class="d-flex my-2 justify-content-center"
                    >
                    <h5>{{ data.pelanggan }} | {{ data.tanggal }} | MEJA {{ data.id_meja }} | Kasir:{{ data.name }}</h5>
                    </div>
                    <hr />
                  </div>
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Nama Menu</th>
                            <th>Qty</th>
                            <th>Harga</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(s, index) in detail" :key="index">
                            <td>{{ s.nama_menu }}</td>
                            <td>{{ s.qty }}</td>
                            <td>{{ s.harga }}</td>
                            <td>{{ s.total }}</td>
                          </tr>
                          <tr>
                            <td></td>
                            <td></td>
                            <td>Total :</td>
                            <td>{{ data.total }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <hr>
                      <div class="d-flex justify-content-center align-item-start">
                      <h5>Terimakasih</h5>
                    </div>
                </div>
                <div class="modal-footer">
                  <button
                    class="btn btn-success"
                    @click="Bayar(data.id_transaksi)"
                  >
                    Bayar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- partial -->
        <div
          class="modal fade"
          id="bayar"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                <div
                  class="d-flex my-2 justify-content-between align-items-start"
                >
                  <h5>{{ data.pelanggan }}</h5>
                  <h5>{{ data.tanggal }}</h5>
                  <h5>MEJA {{ data.id_meja }}</h5>
                </div>
                <hr />
                <div class="d-flex justify-content-center align-item-start">
                  <h4>Total Tagihan = {{ data.total }}</h4>
                </div>
                <div class="d-flex justify-content-center align-item-start">
                  <button class="btn btn-success">Lunas</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../../components/navbar.vue";
import sidebar from "../../components/sidebar.vue";
import Footer from "../../components/footer.vue";
import axios from "axios";

export default {
  name: "App",
  components: {
    navbar,
    sidebar,
    Footer,
  },
  data() {
    return {
      bill: [],
      detail: [],
      data: [],
    };
  },
  methods: {
    print() {
      // membuka window baru
      const newWindow = window.open("Print", "_blank");

      // mendapatkan konten yang akan dicetak
      const elementToPrint = document.getElementById("form");

      // menempatkan konten ke dalam window baru
      newWindow.document.write(elementToPrint.outerHTML);

      // mencetak window baru
      newWindow.print();

      // menutup window baru
      newWindow.close();
    },
    Putdata(s) {
      this.data = s;
      this.GetDetail(s.id_transaksi);
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message,
      });
      this.$router.go(0)
    },
    Bearer() {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    Get(page = 1) {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/transaksi/get/bill?page=" + page)
        .then((response) => {
          this.bill = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    GetDetail(id) {
      this.Bearer();
      axios
        .get(`http://127.0.0.1:8000/api/transaksi/get/detail/${id}`)
        .then((response) => {
          this.detail = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    Bayar(id) {
      axios
        .post(`http://127.0.0.1:8000/api/transaksi/bayar/${id}`)
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response);
          } else {
            this.print();
            this.Alert(response);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  computed: {
    totalKembalian() {
      let uang = this.bayar;
      let total = this.data.total;
      let kembalian = uang - total;
      return kembalian;
    },
  },
  mounted() {
    this.Get();
  },
};
</script>
<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
<style>
hr {
  border: none;
  border-top: 1px solid #000;
  margin: 10px 0;
}
</style>
