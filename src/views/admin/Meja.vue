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
                                  v-model="cari"
                                  class="form-control-sm mx-1"
                                  placeholder="Cari Nama Meja"
                                  @change="Cari"
                                />
                                <select
                                  v-model="status"
                                  @change="Status"
                                  class="form-control-sm mx-1"
                                  name=""
                                  id=""
                                >
                                  <option value="" disabled selected>
                                    Status Meja
                                  </option>
                                  <option value="terpakai">Terpakai</option>
                                  <option value="tersedia">Tersedia</option>
                                </select>
                                <button
                                  @click="All"
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
                                <button
                                  @click="add"
                                  class="btn btn-primary btn-lg text-white mb-0 me-0"
                                  type="button"
                                >
                                  <i class="mdi mdi-chair-school"></i>Tambah Meja
                                </button>
                              </div>
                            </div>
                            <div class="table-responsive mt-1">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>ID MEJA</th>
                                      <th>Nama Meja</th>
                                      <th>Status</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(s, index) in meja.data"
                                      :key="index"
                                    >
                                      <td>{{ s.id_meja }}</td>
                                      <td>{{ s.nama_meja }}</td>
                                      <td v-if="s.status == 'terpakai'">
                                        <span class="alert alert-danger">Terpakai {{ s.pelanggan }}</span>
                                      </td>
                                      <td v-else>
                                        <span class="alert alert-success">Tersedia</span>
                                      </td>
                                      <td>
                                        <button
                                          data-toggle="modal"
                                          data-target="#edit"
                                          class="btn btn-warning btn-lg text-white mb-0 me-0"
                                          type="button"
                                          @click="get(s)"
                                        >
                                          <i class="mdi mdi-lead-pencil"></i>
                                        </button>
                                        |
                                        <button
                                          class="btn btn-danger btn-lg text-white mb-0 me-0"
                                          type="button"
                                          @click="Hapus(s.id_meja)"
                                        >
                                          <i class="mdi mdi-eraser"></i>
                                        </button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="pt-3 float-right pr-5" style="float: right">
                          <Bootstrap4Pagination
                            :data="meja"
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
        <!-- Modal Edit -->
        <div
          class="modal fade"
          id="edit"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Ubah Meja</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  @click="Get"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form
                  class="forms-sample"
                  @submit.prevent="Edit(this.edit.id_menu)"
                >
                  <div class="form-group">
                    <label for="namaMeja">Nama Meja</label>
                    <input
                      v-model="edit.nama_meja"
                      type="text"
                      class="form-control"
                      id="namaMenu"
                      placeholder="Nasi Goreng Korean"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                    @click="Get"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save changes
                  </button>
                </form>
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
      meja: {},
      status: "",
      cari: "",
      edit: {},
      semua: {},
    };
  },
  methods: {
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
    Edit(id) {
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/meja/update/${id}`, this.edit)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            this.edit = [];
          } else {
            this.Alert(response);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    Get(page = 1) {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/meja/get?page=" + page)
        .then((response) => {
          this.meja = response.data;
        });
    },
    add() {
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/meja/add`)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
          } else {
            this.Alert(response);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    Cari() {
      this.Bearer();
      axios
        .get(`http://127.0.0.1:8000/api/meja/get?cari=${this.cari}`)
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response);
          } else {
            this.meja = response.data;
          }
        });
    },
    Status() {
      axios
        .get(`http://127.0.0.1:8000/api/meja/${this.status}`)
        .then((response) => {
          this.meja = response;
        });
    },
    Hapus(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/meja/delete/${id}`)
        .then((response) => {
          this.Alert(response);
        });
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.semua);
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataMeja");
      XLSX.writeFile(workbook, "Data-Meja.xlsx");
    },
    Semua() {
      this.Bearer();
      axios.get("http://127.0.0.1:8000/api/meja/semua").then((response) => {
        this.semua = response.data;
      });
    },
  },
  mounted() {
    this.Get();
    this.Semua();
  },
};
</script>
<script setup>
import { Bootstrap4Pagination } from "laravel-vue-pagination";
</script>
