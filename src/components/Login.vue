<script setup>
import { ref } from "vue";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import router from "../router";
const provider = new GoogleAuthProvider();

const Email = ref("");
const Pass = ref("");

function Login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, Email.value, Pass.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("User online : " + user);
      router.push("home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("User asdasdas : " + errorCode + errorMessage);
      // ..
    });
}

function gotoregister() {
  router.push("register");
}

function googlelogin() {
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log("success");
      router.push("home");
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}
</script>

<template>
  <div style="width: 70%; height: auto; margin-top: 10%; margin-left: 15%" class="d-flex">
    <div class="m-5">
      <img
        alt="Vue logo"
        class="logo"
        src="../assets/pngtree-3d-dollars-and-gold-coins-money-sacks-png-image_8402114.png"
        width="350"
        height="350"
      />
    </div>
    <div class="container" style="width: 100%; height: 100%; margin-top: 5%">
      <div class="row">
        <div class="col m-3 form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label for="floatingInput" style="margin-left: 2%">Email address</label>
        </div>
      </div>

      <div class="row">
        <div class="col m-3 form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword" style="margin-left: 2%">Password</label>
        </div>
      </div>
      <div class="row">
        <div class="col" style="margin-left: 45%">
          <button @click="($event) => Login()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="30"
              fill="currentColor"
              class="bi bi-box-arrow-in-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
              />
              <path
                fill-rule="evenodd"
                d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
          </button>
        </div>
        <div class="row">
          <div class="col mt-3" style="margin-left: 45%">
            <button @click="($event) => gotoregister()"><h6>Register</h6></button>
          </div>
        </div>

        <div class="row">
          <div class="col mt-3" style="margin-left: 46%">
            <button
              @click="($event) => googlelogin()"
              class="btn btn-outline-light"
              style="border: none"
            >
              <img src="../assets/Google__G__Logo.svg.png" width="50" height="50" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
