<template>
  <div>
    <nav v-if="role == 'admin'" class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/dashboard`)}">
          <router-link class="nav-link " to="/admin">
            <i class="menu-icon mdi mdi-menu"></i>
            <span class="menu-title">Dashboard</span></router-link>
        </li>
        <li class="nav-item nav-category">Data</li>
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/pegawai`)}">
          <router-link class="nav-link" to="/admin/pegawai">
            <i class="menu-icon mdi mdi-account-circle-outline"></i>
            <span class="menu-title">Data Pegawai</span>
          </router-link>
        </li>
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/menu`)}">
          <router-link class="nav-link" to="/admin/menu" active-class="active">
            <i class="menu-icon mdi mdi-food"></i>
            <span class="menu-title">Data Menu</span>
          </router-link>
        </li>
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/meja`)}">
          <router-link class="nav-link" to="/admin/meja">
            <i class="menu-icon mdi mdi-chair-school"></i>
            <span class="menu-title">Data Meja</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <nav v-if="role == 'kasir'" class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/dashboard`)}">
          <router-link class="nav-link " to="/kasir">
            <i class="menu-icon mdi mdi-menu"></i>
            <span class="menu-title">Dashboard</span></router-link>
        </li> 
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/riwayat`)}">
          <router-link class="nav-link" to="/kasir/riwayat" active-class="active">
            <i class="menu-icon mdi mdi-bookmark-plus"></i>
            <span class="menu-title">Tagihan Pelanggan</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <nav v-if="role == 'manager'" class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/dashboard`)}">
          <router-link class="nav-link " to="/manager">
            <i class="menu-icon mdi mdi-menu"></i>
            <span class="menu-title">Dashboard</span></router-link>
        </li> 
        <li :class="{'nav-item': true, 'active': isActive(`/${role}/penjualan`)}">
          <router-link class="nav-link" to="/manager/penjualan">
            <i class="menu-icon mdi mdi-chart-line"></i>
            <span class="menu-title">Data Penjualan</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: "App",
  data(){
    return{
      role:''
    }
  },
  computed: {
    isActive() {
      return (routePath) => {
        return this.$route.path === routePath;
      }
    }
  },
  methods: {
    me() {
      this.role = store.state.user.role
    },
  },
  mounted(){
    this.me()
  }
};
</script>

<style>
</style>
