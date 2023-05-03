<template>
  <div>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth px-0">
          <div class="row w-100 mx-0">
            <div class="col-lg-4 mx-auto">
              <div class="auth-form-light text-left py-5 px-4 px-sm-5">
                <div class="brand-logo">
                  <img src="images/logo.svg" alt="logo" />
                </div>
                <h4>Hallo Dulur!</h4>
                <h6 class="fw-light">Login Teng Mriki</h6>
                <form @submit.prevent="login" class="pt-3">
                  <div class="form-group">
                    <input
                      v-model="data.email"
                      type="email"
                      class="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="data.password"
                      type="password"
                      class="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <div class="mt-3">
                    <button
                      name="submit"
                      class="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    >
                      Monggo
                    </button>
                  </div>
                  <div class="text-center mt-4 fw-light">
                    By: Kikik pengen sukses
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      data: {},
    };
  },
  methods: {
    Alert(response) {
      this.message = response.data;
      this.$swal({
        icon: this.message.status,
        title: this.message.message,
      });
    },
    login() {
      axios
        .post("http://127.0.0.1:8000/api/login", this.data)
        .then((response) => {
          if (response.data.status == "success") {
            this.Alert(response);
            localStorage.setItem("Token", response.data.token);
            this.me();
          } else {
            this.Alert(response);
            localStorage.removeItem("Token");
            localStorage.removeItem("Role");
          }
        })
        .catch((error) => {
          this.$swal({
            icon: error,
            title: error.message,
          });
        });
    },
    me() {
      const token = localStorage.getItem("Token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .post("http://127.0.0.1:8000/api/me")
        .then((response) => {
          if (response.data.status == "success") {
            const role = response.data.user.role;
            if (role == "admin") {
              this.$router.push("/admin");
            } else if (role == "kasir") {
              this.$router.push("/kasir");
            } else {
              this.$router.push("/manager");
            }
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  mounted() {},
};
</script>

<style></style>
