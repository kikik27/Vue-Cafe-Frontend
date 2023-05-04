import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import ManagerDashboard from '../views/manager/Dashboard.vue'
import Signin from '../views/Login.vue'
import AdminMenu from '../views/admin/Menu.vue'
import AdminMeja from '../views/admin/Meja.vue'
import AdminPegawai from '../views/admin/Pegawai.vue'
import ManagerPenjualan from '../views/manager/Penjualan.vue'
import KasirDashboard from '../views/kasir/Dashboard.vue'
import RiwayatTransaksi from '../views/kasir/RiwayatTransaksi.vue'
import Unauthorized from '../views/401.vue'
import NotFound from '../views/404.vue'
import AdminDashboard from '../views/admin/Dashboard.vue'

const routes = [
  {
    path : '/',
    redirect: '/login',
    meta: {
      title: 'login',
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Signin,
    meta: {
      title: 'login',
    }
  },
  {
    path: '/admin/',
    redirect: '/admin/dashboard',
    meta: {
      AuthAdmin: true,
    }
  },
  {
    path: '/manager/',
    redirect: '/manager/dashboard',
    meta: {
      AuthManager: true,
    }
  },
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: AdminDashboard,
    meta: {
      AuthAdmin: true,
      title : 'Dashboard',
    }
  },
  {
    path: '/manager/dashboard',
    name: 'Manager Dashboard',
    component: ManagerDashboard,
    meta: {
      AuthManager: true,
      title : 'Dashboard',
    }
  },
  {
    path: '/admin/menu',
    name: 'Admin Menu',
    component: AdminMenu,
    meta: {
      AuthAdmin: true,
      title : 'Menu',
    }
  },
  {
    path: '/admin/meja',
    name: 'Admin Meja',
    component: AdminMeja,
    meta: {
      AuthAdmin: true,
      title : 'Meja',
    }
  },
  {
    path: '/admin/pegawai',
    name: 'Admin Pegawai',
    component: AdminPegawai,
    meta: {
      AuthAdmin: true,
      title : 'Pegawai',
    }
  },
  {
    path: '/manager/penjualan',
    name: 'Manager Penjualan',
    component: ManagerPenjualan,
    meta: {
      AuthManager: true,
      title : 'Penjualan',
    }
  },
  {
    path: '/kasir',
    redirect: '/kasir/dashboard',
    meta: {
      AuthKasir: true,
    }
  },
  {
    path: '/kasir/dashboard',
    name: 'Kasir Dashboard',
    component: KasirDashboard,
    meta: {
      AuthKasir: true,
      title : 'Dashboard',
    }
  },
  {
    path: '/kasir/riwayat',
    name: 'Riwayat Transaksi',
    component: RiwayatTransaksi,
    meta: {
      AuthKasir: true,
      title : 'Riwayat Transaksi',
    }
  },
  {
    path: '/401',
    name: '401 Page',
    component: Unauthorized,
    meta : {
      title: 'Unauthorized'
    }
  },
  {
    path: '/404',
    name: '404 Page',
    component: NotFound,
    meta : {
      title: 'NotFound'
    }
  },
  {
    path: '/401',
    name: '401 Page',
    component: Unauthorized,
    meta : {
      title: 'Unauthorized'
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title
  document.title = 'WikCa | ' + title
  if (to.matched.some(record => record.meta.AuthAdmin)) {
    store.dispatch('checkAuth').then(() => {
      if (!store.state.isAuthenticated) {
        next({
          path: '/login',
        });
      } else {
        if (store.state.user.role !== 'admin') {
          next({
            path: '/401',
          });
        }else{
          next();
        }
      }
    });
  }
  else if (to.matched.some(record => record.meta.AuthKasir)) {
    store.dispatch('checkAuth').then(() => {
      if (!store.state.isAuthenticated) {
        next({
          path: '/login',
        });
      } else {
        if (store.state.user.role !== 'kasir') {
          next({
            path: '/401',
          });
        }else{
          next();
        }
      }
    });
  }
  else if (to.matched.some(record => record.meta.AuthManager)) {
    store.dispatch('checkAuth').then(() => {
      if (!store.state.isAuthenticated) {
        next({
          path: '/login',
        });
      } else {
        if (store.state.user.role !== 'manager') {
          next({
            path: '/401',
          });
        }else{
          next();
        }
      }
    });
  }
  else if(to.matched.length === 0){
    next('/404');
  }
  else{
    next();
  }
});

export default router
