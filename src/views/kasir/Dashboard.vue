<template>
  <div class="container-scroller">
    <navbar />
    <div class="container-fluid page-body-wrapper">
      <sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-lg-6 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                  <div class="d-lg-flex card card-rounded">
                    <div class="card-body">
                      <div
                        class="d-sm-flex justify-content-between align-items-start"
                      >
                        <div>
                          <h4 class="card-title card-title-dash">Data Menu</h4>
                        </div>

                        <div>
                          <input
                            type="text"
                            v-model="id_menu"
                            class="form-control-sm mx-1"
                            placeholder="Cari Nama Menu"
                            @change="CariMenu"
                          />
                          <select
                            v-model="jenisMenu"
                            @change="JenisMenu"
                            class="form-control-sm mx-1"
                          >
                            <option value="" selected>Jenis Menu</option>
                            <option value="makanan">Makanan</option>
                            <option value="minuman">Minuman</option>
                          </select>
                          <button
                            @click="GetMenu"
                            class="btn btn-primary btn-sm text-white mb-0 me-0"
                            type="button"
                          >
                            <i class="mdi mdi-refresh"></i>
                          </button>
                        </div>
                      </div>
                      <div class="table-responsive mt-1">
                        <div class="table-responsive">
                          <table class="table table-hover">
                            <thead>
                              <tr>
                                <th>ID MENU</th>
                                <th>Nama Menu</th>
                                <th>Deskripsi</th>
                                <th>Gambar</th>
                                <th>Harga</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="(s, index) in menu.data" :key="index">
                                <td>{{ s.id_menu }}</td>
                                <td>{{ s.nama_menu }}</td>
                                <td>{{ s.desc }}</td>
                                <td>
                                  <img
                                    :src="s.image_url"
                                    class="img-xs"
                                    :alt="s.gambar"
                                  />
                                </td>
                                <td>Rp {{ s.harga }}</td>
                                <td>
                                  <button
                                    @click="MasukKeranjang(s)"
                                    class="btn-sm btn-primary"
                                  >
                                    <i class="mdi mdi-cart-plus"></i>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div class="pt-3 float-right pr-5" style="float: right">
                        <Bootstrap4Pagination
                          :data="menu"
                          @pagination-change-page="GetMenu"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="printable" class="col-lg-6 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-12 col-lg-12 grid-margin stretch-card">
                  <div class="card card-rounded">
                    <div class="card-body pb-0">
                      <h4 class="card-title card-title-dash mb-4">
                        Form Pemesanan
                      </h4>
                      <div class="col-sm-12">
                        <p>
                          Nama Pelanggan :
                          <input
                            type="text"
                            class="form-control-sm"
                            v-model="Transaksi.pelanggan"
                          />
                        </p>
                        <p class="status-summary-ight-white mb-1">
                          Tanggal : {{ new Date().toLocaleDateString() }}
                        </p>
                        <p>
                          Meja :
                          <span class="text-danger">{{
                            Transaksi.id_meja
                          }}</span>
                        </p>
                        <div class="table-responsive mt-1 col-12">
                          <div class="table-responsive">
                            <table id="print" class="table table-hover">
                              <thead>
                                <tr>
                                  <th>Nama Menu</th>
                                  <th>Qty</th>
                                  <th>Harga</th>
                                  <th>Total</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-for="(s, index) in MenuChart"
                                  :key="index"
                                >
                                  <td>{{ s.nama_menu }}</td>
                                  <td>
                                    <input
                                      type="number"
                                      @input="updateHarga(index)"
                                      v-model="MenuChart[index].qty"
                                    />
                                  </td>
                                  <td>{{ s.harga }}</td>
                                  <td>{{ s.total }}</td>
                                  <td>
                                    <button
                                      @click="HapusKeranjang(index)"
                                      class="btn-sm btn-danger"
                                    >
                                      <i class="mdi mdi-delete"></i>
                                    </button>
                                  </td>
                                </tr>
                                <tr v-if="MenuChart[0]">
                                  <td></td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    Total Transaksi : Rp {{ totalTransaksi }}
                                  </td>
                                  <td><button
                                      @click="Checkout"
                                      class="btn-sm btn-success"
                                    >
                                      <i class="mdi mdi-cash"></i>
                                    </button></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                  <div class="d-lg-flex card card-rounded">
                    <div class="card-body">
                      <h4 class="card-title card-title-dash mb-4">
                        Meja Tersedia
                      </h4>
                      <div
                        class="d-sm-flex justify-content-between align-items-start"
                      >
                        <div class="col-sm-12">
                          <div class="d-flex col-12">
                            <div class="row">
                              <button
                                v-for="(s, index) in meja.data"
                                :key="index"
                                class="card btn-success card-rounded mb-4 mx-4 col-sm-1"
                                @click="pilihMeja(s.id_meja)"
                              >
                                <div class="card-body">
                                  <p
                                    class="card-title card-title-dash text-white"
                                  >
                                    {{ s.nama_meja }}
                                  </p>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <!-- partial -->
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
  name: "HomeView",
  components: {
    navbar,
    sidebar,
    Footer,
  },
  data() {
    return {
      MenuChart: [],
      menu: {},
      jumlah: {},
      meja: {},
      jenisMenu: "",
      id_menu: "",
      Transaksi: {
        id_meja: "",
        pelanggan: "Wikca Customer",
        total: null,
      },
    };
  },
  methods: {
    MasukKeranjang(data) {
      let addData = {
        nama_menu: data.nama_menu,
        id_menu: data.id_menu,
        harga: data.harga,
        total: data.harga,
        qty: "1",
      };
      this.MenuChart.push(addData);
      this.Transaksi.total = this.totalTransaksi;
    },
    updateHarga(index) {
      this.MenuChart[index].total = this.MenuChart[index].qty * this.MenuChart[index].harga;
      this.Transaksi.total = this.totalTransaksi;
    },
    HapusKeranjang(index) {
      this.MenuChart.splice(index, 1);
      this.Transaksi.total = this.totalTransaksi;
    },
    pilihMeja(id) {
      this.Transaksi.id_meja = id;
    },
    tambah() {
      this.Menus.push({ ...this.Menu });
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message,
      });
    },
    Bearer() {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    GetMenu(page = 1) {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/menu/get?page=" + page)
        .then((response) => {
          this.menu = response.data;
        });
    },
    GetMeja() {
      this.Bearer();
      axios.get("http://127.0.0.1:8000/api/meja/tersedia").then((response) => {
        this.meja = response;
      });
    },
    CariMenu() {
      this.Bearer();
      axios
        .get(`http://127.0.0.1:8000/api/menu/get?cari=${this.id_menu}`)
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response);
          } else {
            this.menu = response.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    JenisMenu() {
      this.Bearer();
      axios
        .get(`http://127.0.0.1:8000/api/menu/${this.jenisMenu}`)
        .then((response) => {
          this.menu = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    Checkout() {
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/transaksi/baru`, this.Transaksi)
        .then((response) => {
          if (response.data.status == "success") {
            this.CheckoutDetail(); 
          } else {
            this.message = response.data;
            this.$swal({
              icon: this.message.status,
              title: this.message.message.id_meja[0],
            });
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    CheckoutDetail() {
      this.Bearer();
      const dataPembelian = this.MenuChart;
      axios
        .post("http://127.0.0.1:8000/api/transaksi/detail", { dataPembelian })
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            console.log(response.data)
            this.$router.go(0)
          } else {
            this.Alert(response);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  computed: {
    totalTransaksi() {
      let sum = 0;
      for (let i = 0; i < this.MenuChart.length; i++) {
        sum += this.MenuChart[i].total;
      }
      return sum;
    },
    totalKembalian() {
      let uang = this.bayar;
      let total = this.totalTransaksi;
      let kembalian = uang - total;
      return kembalian;
    },
  },
  mounted() {
    this.GetMenu();
    this.GetMeja();
  },
};
</script>
<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
