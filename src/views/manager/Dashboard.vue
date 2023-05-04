<template>
  <div class="container-scroller">
    <navbar />
    <div class="container-fluid page-body-wrapper">
      <sidebar />
      <div class="main-panel">
        <div class="content-wrapper">
          <div class="row">
            <div class="col-sm-2 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-12 col-lg-6 col-lg-12 grid-margin stretch-card">
                  <div class="card bg-success card-rounded">
                    <div class="card-body">
                      <h4 class="card-title card-title-dash text-white mb-4">
                        Total Pendapatan
                      </h4>
                      <h2 class="text-white">Rp {{ jumlah.pendapatan }}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-6 col-lg-12 grid-margin stretch-card">
                  <div class="card bg-primary card-rounded">
                    <div class="card-body">
                      <h4 class="card-title card-title-dash text-white mb-4">
                        Jumlah Menu
                      </h4>
                      <h2 class="text-white">{{ jumlah.menu }}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-6 col-lg-12 grid-margin stretch-card">
                  <div class="card bg-primary card-rounded">
                    <div class="card-body">
                      <h4
                        class="d-flex card-title card-title-dash text-white mb-4"
                      >
                        Total Pegawai
                      </h4>
                      <h2 class="text-white">{{ jumlah.kasir }}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-6 col-lg-12 grid-margin stretch-card">
                  <div class="card bg-danger card-rounded">
                    <div class="card-body">
                      <h4 class="card-title card-title-dash text-white mb-4">
                        Meja Terpakai
                      </h4>
                      <h2 class="text-white">
                        {{ jumlah.mejaTerpakai }}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-2 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-6 col-lg-12 grid-margin stretch-card">
                  <div class="card bg-success card-rounded">
                    <div class="card-body">
                      <h4 class="card-title card-title-dash text-white mb-4">
                        Meja Tersedia
                      </h4>
                      <h2 class="text-white">
                        {{ jumlah.mejaTersedia }}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-12 col-lg-4 col-lg-12 grid-margin stretch-card">
                  <div class="card card-rounded">
                    <div class="card-body">
                      <div>
                        <canvas id="Penjualan"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 d-flex flex-column">
              <div class="row flex-grow">
                <div class="col-md-6 col-lg-12 grid-margin stretch-card">
                  <div class="card card-rounded">
                    <div class="card-body pb-0">
                      <div>
                        <canvas id="Terlaris"></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "../../components/navbar.vue";
import sidebar from "../../components/sidebar.vue";
import Footer from "../../components/footer.vue";
import axios from "axios";
import Chart from "chart.js/auto";
export default {
  name: "HomeView",
  components: {
    navbar,
    sidebar,
    Footer,
  },
  data() {
    return {
      jumlah: {},
      chartInstance: null,
    };
  },
  methods: {
    GetPendapatan() {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/get/pendapatan")
        .then((res) => {
          let data = res.data;
          let labels = [];
          let values = [];
          data.forEach((item) => {
            labels.push(item.bulan_tahun);
            values.push(item.total_pendapatan);
          });
          this.ChartPendapatan(labels, values);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetTerlaris() {
      axios
        .get("http://127.0.0.1:8000/api/dashboard/MenuTerlaris")
        .then((res) => {
          let data = res.data;
          let labels = [];
          let values = [];
          data.forEach((item) => {
            labels.push(item.nama_menu);
            values.push(item.total_jumlah);
          });
          this.ChartTerlaris(labels, values);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ChartTerlaris(labels, values) {
      new Chart(document.getElementById("Terlaris"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Menu Terlaris",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Menu Terlaris",
            },
          },
          maintainAspectRatio: false,
        },
      });
    },
    ChartPendapatan(labels, values) {
      new Chart(document.getElementById("Penjualan"), {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Pedapatan Perbulan",
              data: values,
              backgroundColor: [
                "rgba(255, 99, 132, 0.5)",
                "rgba(54, 162, 235, 0.5)",
                "rgba(255, 206, 86, 0.5)",
                "rgba(75, 192, 192, 0.5)",
                "rgba(153, 102, 255, 0.5)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Pendapatan Perbulan",
            },
          },
          maintainAspectRatio: false,
        },
      });
    },
    Bearer() {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    JumlahAll() {
      this.Bearer();
      axios
        .get("http://127.0.0.1:8000/api/dashboard/CountAll")
        .then((response) => {
          this.jumlah.kasir = response.data.Kasir;
          this.jumlah.mejaTersedia = response.data.MejaTersedia;
          this.jumlah.mejaTerpakai = response.data.MejaTerpakai;
          this.jumlah.menu = response.data.Menu;
          if(response.data.total_pendapatan > 0) {
            this.jumlah.pendapatan = response.data.total_pendapatan;
          }else{
            this.jumlah.pendapatan = 0
          }
        });
    },
  },
  mounted() {
    this.JumlahAll();
    this.GetTerlaris();
    this.GetPendapatan();
  },
};
</script>
