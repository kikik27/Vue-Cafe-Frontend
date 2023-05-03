<template>
  <div class="container-scroller">
    <navbar />
    <div class="container-fluid page-body-wrapper">
      <sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-sm-12">
              <div class="home-tab">
                <div class="tab-content tab-content-basic">
                  <div
                    class="tab-pane fade show active"
                    id="overview"
                    role="tabpanel"
                    aria-labelledby="overview"
                  >
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="card card-rounded">
                          <div class="card-body">
                            <div
                              class="d-sm-flex justify-content-between align-items-start"
                            >
                              <div>
                                <h4 class="card-title card-title-dash">
                                  Data Menu
                                </h4>
                              </div>

                              <div>
                                <input
                                  type="text"
                                  v-model="filter.id_transaksi"
                                  class="form-control-sm mx-1"
                                  placeholder="Cari Berdasarkan ID Transaksi"
                                  @change="Cari"
                                />
                                <select
                                  v-model="filter.id_kasir"
                                  @change="GetByKasir"
                                  class="form-control-sm mx-1"
                                >
                                  <option value="" selected>Pilih Kasir</option>
                                  <option
                                    v-for="(s, index) in kasir"
                                    :key="index"
                                    :value="s.id"
                                  >
                                    {{ s.name }}
                                  </option>
                                </select>
                                <label for="start-date">Start Date:</label>
                                <input
                                  type="date"
                                  class="form-control-sm"
                                  id="start-date"
                                  @change="getTanggal"
                                  v-model="date.start"
                                />

                                <label for="end-date">End Date:</label>
                                <input
                                  type="date"
                                  class="form-control-sm"
                                  id="end-date"
                                  @change="getTanggal"
                                  v-model="date.end"
                                />
                                <button
                                  @click="Get"
                                  class="btn btn-primary btn-lg text-white mb-0 me-0"
                                  type="button"
                                >
                                  <i class="mdi mdi-refresh"></i>
                                </button>
                                <button
                                  @click="ExportExcel"
                                  class="btn btn-primary btn-lg text-white mb-0 me-0"
                                  type="button"
                                >
                                  <i class="mdi mdi-download"></i>
                                </button>
                              </div>
                            </div>
                            <div class="table-responsive mt-1">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>ID Transaksi</th>
                                      <th>Tanggal</th>
                                      <th>Kasir</th>
                                      <th>Meja</th>
                                      <th>Nama Pelanggan</th>
                                      <th>Total</th>
                                      <th>Status</th>
                                      <th>Detail</th>
                                    </tr>
                                  </thead>
                                  <tbody
                                    v-for="(s, index) in transaksi.data"
                                    :key="index"
                                  >
                                    <tr class="table-success" v-if="s.status != 'belum_bayar'">
                                      <td>{{ s.id_transaksi }}</td>
                                      <td>{{ s.tanggal }}</td>
                                      <td>{{ s.name }}</td>
                                      <td>{{ s.id_meja }}</td>
                                      <td>{{ s.pelanggan }}</td>
                                      <td>{{ s.total }}</td>
                                      <td>{{ s.status }}</td>
                                      <td>
                                        <button
                                          class="btn btn-secondary mdi mdi-eye"
                                          data-toggle="modal"
                                          data-target="#detail"
                                          @click="GetDetail(s.id_transaksi)"
                                        ></button>
                                      </td>
                                    </tr>
                                    <tr v-else class="table-danger">
                                      <td>{{ s.id_transaksi }}</td>
                                      <td>{{ s.tanggal }}</td>
                                      <td>{{ s.kasir }}</td>
                                      <td>{{ s.id_meja }}</td>
                                      <td>{{ s.pelanggan }}</td>
                                      <td>{{ s.total }}</td>
                                      <td>{{ s.status }}</td>
                                      <td>
                                        <button
                                          class="btn btn-secondary mdi mdi-eye"
                                          data-toggle="modal"
                                          data-target="#detail"
                                          @click="GetDetail(s.id_transaksi)"
                                        ></button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          v-if="filter.id_kasir"
                          class="pt-3 float-right pr-5"
                          style="float: right"
                        >
                          <Bootstrap4Pagination
                            :data="transaksi"
                            @pagination-change-page="GetByKasir"
                          />
                        </div>
                        <div
                          v-else
                          class="pt-3 float-right pr-5"
                          style="float: right"
                        >
                          <Bootstrap4Pagination
                            :data="transaksi"
                            @pagination-change-page="Get"
                          />
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
        <div
          class="modal fade"
          id="detail"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-body">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>Nama Menu</th>
                        <th>Qty</th>
                        <th>Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(s, index) in detail" :key="index">
                        <td>{{ s.nama_menu }}</td>
                        <td>{{ s.qty }}</td>
                        <td>{{ s.harga }}</td>
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
</template>

<script>
import navbar from "../../components/navbar.vue";
import sidebar from "../../components/sidebar.vue";
import Footer from "../../components/footer.vue";
import axios from "axios";
import xlsx from "xlsx/dist/xlsx.full.min";

export default {
  name: "App",
  components: {
    navbar,
    sidebar,
    Footer,
  },
  data() {
    return {
      transaksi: {},
      filter: {
        id_transaksi: "",
        id_kasir: "",
      },
      date:{},
      data: {},
      detail: {},
      kasir: {},
    };
  },
  methods: {
    getTanggal(){
      this.Bearer();
      axios
        .get(`http://127.0.0.1:8000/api/transaksi/get?start=${this.date.start}&end=${this.date.end}`)
        .then((response) => {
          this.transaksi = response.data;
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
    get(s) {
      this.edit = s;
    },
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message,
      });
      this.Get();
    },
    Bearer() {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    Get(page = 1) {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/transaksi/get?page=" + page)
        .then((response) => {
          this.transaksi = response.data;
        });
    },
    GetKasir() {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/pegawai/role/kasir")
        .then((response) => {
          this.kasir = response.data;
        });
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.transaksi.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataTransaksi");
      XLSX.writeFile(workbook, "Data-Transaksi.xlsx");
    },
    Cari() {
      this.Bearer();
      axios
        .get(
          `http://127.0.0.1:8000/api/transaksi/get?cari=${this.filter.id_transaksi}`
        )
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response);
          } else {
            this.transaksi = response;
          }
        });
    },
    GetByKasir() {
      this.Bearer();
      axios
        .get(
          `http://127.0.0.1:8000/api/transaksi/get?kasir=${this.filter.id_kasir}`
        )
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response);
          } else {
            this.transaksi = response;
          }
        });
    },
  },
  mounted() {
    this.Get();
    this.GetKasir();
  },
};
</script>
<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
