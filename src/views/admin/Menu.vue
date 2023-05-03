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
                                  v-model="id_menu"
                                  class="form-control-sm mx-1"
                                  placeholder="Cari Nama Menu"
                                  @change="Cari"
                                />
                                <select
                                  v-model="jenis"
                                  @change="Jenis"
                                  class="form-control-sm mx-1"
                                  name=""
                                  id=""
                                >
                                  <option value="" disabled selected>
                                    Jenis Menu
                                  </option>
                                  <option value="makanan">Makanan</option>
                                  <option value="minuman">Minuman</option>
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
                                  <i class="mdi mdi-food"></i>Tambah Menu
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
                                          @click="Hapus(s.id_menu)"
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
                            :data="menu"
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
                <h5 class="modal-title" id="exampleModalLabel">Tambah Menu</h5>
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
                    <label for="namaMenu">Nama Menu</label>
                    <input
                      v-model="form.nama_menu"
                      type="text"
                      class="form-control"
                      id="namaMenu"
                      placeholder="Nasi Goreng Korean"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="jenisMenu">Jenis Menu</label>
                    <select
                      id="jenisMenu"
                      v-model="form.jenis"
                      class="form-control"
                      required
                    >
                      <option value="makanan">Makanan</option>
                      <option value="minuman">Minuman</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="descMenu">Deskripsi Menu</label>
                    <textarea
                      v-model="form.desc"
                      class="form-control"
                      id="descMenu"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      ref="fileInput"
                      @change="onFileSelected"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="hargaMenu">Harga Menu</label>
                    <input
                      v-model="form.harga"
                      type="number"
                      class="form-control"
                      id="hargaMenu"
                      placeholder="10.000"
                      required
                    />
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
                <h5 class="modal-title" id="exampleModalLabel">Ubah Menu</h5>
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
                <form
                  class="forms-sample"
                  @submit.prevent="Edit(this.edit.id_menu)"
                >
                  <div class="form-group">
                    <label for="namaMenu">Nama Menu</label>
                    <input
                      v-model="edit.nama_menu"
                      type="text"
                      class="form-control"
                      id="namaMenu"
                      placeholder="Nasi Goreng Korean"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="jenisMenu">Jenis Menu</label>
                    <select
                      id="jenisMenu"
                      v-model="edit.jenis"
                      class="form-control"
                      required
                    >
                      <option value="makanan">Makanan</option>
                      <option value="minuman">Minuman</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="descMenu">Deskripsi Menu</label>
                    <textarea
                      v-model="edit.desc"
                      class="form-control"
                      id="descMenu"
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <img
                      :src="edit.image_url"
                      id="gambarMenu"
                      class="img-fluid"
                      :alt="edit.gambar"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      type="file"
                      class="form-control"
                      ref="fileInput"
                      @change="onFileSelected"
                    />
                  </div>
                  <div class="form-group">
                    <label for="hargaMenu">Harga Menu</label>
                    <input
                      v-model="edit.harga"
                      type="number"
                      class="form-control"
                      id="hargaMenu"
                      placeholder="10.000"
                      required
                    />
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
      menu: {},
      jenis: "",
      form: {},
      file: null,
      id_menu: "",
      edit: {
        id_menu: "",
      },
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
      let addData = new FormData();
      addData.append("nama_menu", this.edit.nama_menu);
      addData.append("jenis", this.edit.jenis);
      addData.append("desc", this.edit.desc);
      addData.append("gambar", this.file);
      addData.append("harga", this.edit.harga);
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/menu/update/${id}`, addData)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            this.edit = [];
            this.file = null;
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
        .get("http://127.0.0.1:8000/api/menu/get?page=" + page)
        .then((response) => {
          this.menu = response.data;
        });
    },
    add() {
      let addData = new FormData();
      addData.append("nama_menu", this.form.nama_menu);
      addData.append("jenis", this.form.jenis);
      addData.append("desc", this.form.desc);
      addData.append("gambar", this.file);
      addData.append("harga", this.form.harga);
      this.Bearer();
      axios
        .post(`http://127.0.0.1:8000/api/menu/add`, addData)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            this.form = [];
            this.file = null;
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
        .get(`http://127.0.0.1:8000/api/menu/get?cari=${this.id_menu}`)
        .then((response) => {
          if (response.data.status == "error") {
            this.Alert(response)
          } else {
            this.menu = response.data;
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    Jenis() {
      axios
        .get(`http://127.0.0.1:8000/api/menu/${this.jenis}`)
        .then((response) => {
          this.menu = response.data;
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    onFileSelected(event) {
      this.file = event.target.files[0];
    },
    Hapus(id_menu) {
      axios
        .delete(`http://127.0.0.1:8000/api/menu/delete/${id_menu}`, this.file)
        .then((response) => {
          this.Alert(response);
        });
    },
    ExportExcel() {
      const XLSX = xlsx;
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(this.semua.data);
      XLSX.utils.book_append_sheet(workbook, worksheet, "DataMenu");
      XLSX.writeFile(workbook, "Data-Menu.xlsx");
    },
    Semua() {
      this.Bearer();
      axios.get("http://127.0.0.1:8000/api/menu/semua").then((response) => {
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
