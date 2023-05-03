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
                                  Data Pegawai
                                </h4>
                              </div>

                              <div>
                                <input
                                  type="text"
                                  v-model="cari"
                                  class="form-control-sm mx-1"
                                  placeholder="Cari Nama Pegawai"
                                  @change="Cari"
                                />
                                <select
                                  v-model="role"
                                  @change="Role"
                                  class="form-control-sm mx-1"
                                >
                                  <option value="" disabled selected>
                                    Role Pegawai
                                  </option>
                                  <option value="manager">Manager</option>
                                  <option value="kasir">Kasir</option>
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
                                  data-toggle="modal"
                                  data-target="#tambah"
                                  class="btn btn-primary btn-lg text-white mb-0 me-0"
                                  type="button"
                                >
                                  <i class="mdi mdi-account-plus"></i>
                                </button>
                              </div>
                            </div>
                            <div class="table-responsive mt-1">
                              <div class="table-responsive">
                                <table class="table table-hover">
                                  <thead>
                                    <tr>
                                      <th>ID Pegawai</th>
                                      <th>Nama Pegawai</th>
                                      <th>Email</th>
                                      <th>Tanggal Masuk</th>
                                      <th>Role Pegawai</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr v-for="(s, index) in pegawai.data" :key="index">
                                      <td>{{ s.id }}</td>
                                      <td>{{ s.name }}</td>
                                      <td>{{ s.email }}</td>
                                      <td>{{ s.created_at }}</td>
                                      <td>{{ s.role }}</td>
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
                                          @click="Hapus(s.id)"
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
                        <div class="pt-3 float-right pr-5" style="float:right">
                          <Bootstrap4Pagination
                            :data="pegawai"
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
        <!-- Modal Tambah -->
        <div
          class="modal fade"
          id="tambah"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Tambah Pegawai</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="forms-sample" @submit.prevent="add">
                  <div class="form-group">
                    <label for="namaPegawai">Nama Pegawai</label>
                    <input
                      v-model="form.name"
                      type="text"
                      class="form-control"
                      id="namaPegawai"
                      placeholder="WiCa"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="emailPegawai">Email Pegawai</label>
                    <input
                      v-model="form.email"
                      type="email"
                      class="form-control"
                      id="emailPegawai}"
                      placeholder="WiCa@gmail.com"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control"
                      id="password"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="rolePegawai">Role Pegawai</label>
                    <select
                      id="rolePegawai"
                      v-model="form.role"
                      class="form-control"
                      required
                    >
                      <option value="manager">Manager</option>
                      <option value="kasir">Kasir</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
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
                <h5 class="modal-title" id="exampleModalLabel">Ubah Pegawai</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form class="forms-sample" @submit.prevent="Edit(this.edit.id)">
                  <div class="form-group">
                    <label for="namaPegawai">Nama Pegawai</label>
                    <input
                      v-model="edit.name"
                      type="text"
                      class="form-control"
                      id="namaPegawai"
                      placeholder="WiCa"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="emailPegawai">Email Pegawai</label>
                    <input
                      v-model="edit.email"
                      type="email"
                      class="form-control"
                      id="emailPegawai"
                      placeholder="WiCa@gmail.com"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password</label>
                    <input
                      v-model="edit.password"
                      type="password"
                      class="form-control"
                      id="password"
                    />
                  </div>
                  <div class="form-group">
                    <label for="rolePegawai">Role Pegawai</label>
                    <select
                      id="rolePegawai"
                      v-model="edit.role"
                      class="form-control"
                      required
                    >
                      <option value="manager">Manager</option>
                      <option value="kasir">Kasir</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
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

<script >
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
      pegawai: {},
      role: "",
      form: {},
      id_pegawai: "",
      edit: {},
      semua: {},
      cari: ''
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
        .post(`http://127.0.0.1:8000/api/pegawai/update/${id}`, this.edit)
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
        .get("http://127.0.0.1:8000/api/pegawai/get?page=" + page)
        .then((response) => {
          this.pegawai = response.data;
        });
    },
    add() {
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/pegawai/register`, this.form)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            this.form = []
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
        .get(`http://127.0.0.1:8000/api/pegawai/get?cari=${this.cari}`)
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response)
          } else {
            this.pegawai = response;
          }
        });
    },
    Role() {
      axios
        .get(`http://127.0.0.1:8000/api/pegawai/role/${this.role}`)
        .then((response) => {
          this.pegawai = response;
        });
    },
    Hapus(id) {
      axios
        .delete(`http://127.0.0.1:8000/api/pegawai/delete/${id}`)
        .then((response) => {
          this.Alert(response);
        });
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.semua);
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataPegawai");
      XLSX.writeFile(workbook, "Data-Menu.xlsx");
    },
    Semua() {
      this.Bearer();
      axios.get("http://127.0.0.1:8000/api/pegawai/semua").then((response) => {
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
