<template>
  <div>
    <nav
      class="navbar default-layout col-lg-12 col-12 p-0 fixed-top d-flex align-items-top flex-row"
    >
      <div
        class="text-center navbar-brand-wrapper pr-3 d-flex align-items-center justify-content-start"
      >
        <div>
          <a class="navbar-brand brand-logo">
            <img src="../assets/images/logo.svg" alt="logo" />
          </a>
          <a class="navbar-brand brand-logo-mini">
            <img src="../assets/images/logo-mini.svg" alt="logo" />
          </a>
        </div>
      </div>
      <div
        class="collapse navbar-collapse justify-content-center"
        id="navbarNav"
      >
        <ul v-if="role == 'kasir'" class="navbar-nav">
          <li
            :class="{
              'nav-item': true,
              active: isActive(`/${role}/dashboard`),
            }"
          >
            <router-link class="nav-link" to="/kasir">
              <i class="menu-icon mdi mdi-menu"></i>
              <span class="menu-title">Dashboard</span></router-link
            >
          </li>
          <li
            :class="{ 'nav-item': true, active: isActive(`/${role}/riwayat`) }"
          >
            <router-link
              class="nav-link"
              to="/kasir/riwayat"
              active-class="active"
            >
              <i class="menu-icon mdi mdi-bookmark-plus"></i>
              <span class="menu-title">Tagihan Pelanggan</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
                <i
                  class="menu-icon mdi mdi-power text-primary"
                ></i
                >Sign Out
              </a>
          </li>
        </ul>
        <ul v-if="role == 'admin'" class="navbar-nav">
          <li
            :class="{
              'nav-item': true,
              active: isActive(`/${role}/dashboard`),
            }"
          >
            <router-link class="nav-link" to="/admin">
              <i class="menu-icon mdi mdi-menu"></i>
              <span class="menu-title">Dashboard</span></router-link
            >
          </li>
          <li
            :class="{ 'nav-item': true, active: isActive(`/${role}/pegawai`) }"
          >
            <router-link class="nav-link" to="/admin/pegawai">
              <i class="menu-icon mdi mdi-account-circle-outline"></i>
              <span class="menu-title">Data Pegawai</span>
            </router-link>
          </li>
          <li :class="{ 'nav-item': true, active: isActive(`/${role}/menu`) }">
            <router-link
              class="nav-link"
              to="/admin/menu"
              active-class="active"
            >
              <i class="menu-icon mdi mdi-food"></i>
              <span class="menu-title">Data Menu</span>
            </router-link>
          </li>
          <li :class="{ 'nav-item': true, active: isActive(`/${role}/meja`) }">
            <router-link class="nav-link" to="/admin/meja">
              <i class="menu-icon mdi mdi-chair-school"></i>
              <span class="menu-title">Data Meja</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
                <i
                  class="menu-icon mdi mdi-power text-primary"
                ></i
                >Sign Out
              </a>
          </li>
        </ul>
        <ul v-if="role == 'manager'" class="navbar-nav">
          <li
            :class="{
              'nav-item': true,
              active: isActive(`/${role}/dashboard`),
            }"
          >
            <router-link class="nav-link" to="/manager">
              <i class="menu-icon mdi mdi-menu"></i>
              <span class="menu-title">Dashboard</span></router-link
            >
          </li>
          <li :class="{'nav-item': true, 'active': isActive(`/${role}/penjualan`)}">
          <router-link class="nav-link" to="/manager/penjualan">
            <i class="menu-icon mdi mdi-chart-line"></i>
            <span class="menu-title">Data Penjualan</span>
          </router-link>
        </li>
          <li class="nav-item">
            <a class="nav-link" @click="logout()">
                <i
                  class="menu-icon mdi mdi-power text-primary"
                ></i
                >Sign Out
              </a>
          </li>
        </ul>
      </div>
      <div class="navbar-menu-wrapper d-flex align-items-top">
        <ul class="navbar-nav">
          <li class="nav-item font-weight-semibold d-none d-lg-block ms-0">
            <h1 class="welcome-text">
              <span class="text-primary fw-bold"
                >Selamat Datang, {{ user.name }}</span
              >
            </h1>
            <h3 class="welcome-sub-text">Wukasama Cafe</h3>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown d-none d-lg-block user-dropdown">
            <a
              class="nav-link"
              id="UserDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                class="img-xs rounded-circle"
                src="../assets/images/faces/face8.jpg"
                alt="Profile image"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-right navbar-dropdown"
              aria-labelledby="UserDropdown"
            >
              <div class="dropdown-header text-center">
                <img
                  class="img-md rounded-circle"
                  src="../assets/images/faces/face8.jpg"
                  alt="Profile image"
                />
                <p class="mb-1 mt-3 font-weight-semibold">{{ user.name }}</p>
                <p class="fw-light text-muted mb-0">{{ user.email }}</p>
              </div>
              <a
                v-if="role != 'kasir'"
                class="dropdown-item"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                <i
                  class="dropdown-item-icon mdi mdi-pencil text-primary me-2"
                ></i
                >Edit Profile
              </a>
              <a class="dropdown-item" @click="logout()">
                <i
                  class="dropdown-item-icon mdi mdi-power text-primary me-2"
                ></i
                >Sign Out
              </a>
            </div>
          </li>
        </ul>
        <button
          class="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
    <!-- Modal -->
    <div
      v-if="role != 'kasir'"
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Form Ubah Profile
            </h5>
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
            <form method="post" @submit.prevent="UbahProfile">
              <label for="user">Username</label>
              <input
                id="user"
                type="text"
                class="form-control"
                v-model="profile.name"
              />
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      user: {},
      role: "",
      profile: {
        name: "",
      },
    };
  },
  computed: {
    isActive() {
      return (routePath) => {
        return this.$route.path === routePath;
      };
    },
  },
  methods: {
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
    logout() {
      this.$swal({
        icon: "success",
        title: "Sukses Logout",
      });
      store.dispatch("logout");
      this.$router.push("/login");
    },
    UbahProfile() {
      this.Bearer();
      axios
        .post("http://127.0.0.1:8000/api/ubah/profile", this.profile)
        .then((response) => {
          this.Alert(response);
          if (response.data.status == "success") {
            this.$router.go(0);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    User() {
      this.user.email = store.state.user.email;
      this.user.role = store.state.user.role;
      this.user.name = store.state.user.name;
      this.role = store.state.user.role;
      this.profile.name = this.user.name;
    },
  },
  mounted() {
    this.User();
  },
};
</script>
