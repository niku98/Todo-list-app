<script setup>
import { useAppStore } from "@/stores";
import { computed } from "vue";

const appStore = useAppStore();
const authInfo = computed(() => {
  return appStore.state.auth;
});

function signIn() {
  appStore.dispatch("auth/signIn");
}

function signOut() {
  appStore.dispatch("auth/signOut");
}
</script>

<template>
  <BNavbar toggleable="lg" variant="dark" data-bs-theme="dark">
    <BNavbarBrand href="#">Stark</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <RouterLink to="/" class="nav-link" active-class="active"> Todo </RouterLink>
        <RouterLink to="/in-progress" class="nav-link" active-class="active"
          >In Progress</RouterLink
        >
        <RouterLink to="/completed" class="nav-link" active-class="active">Completed</RouterLink>
      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <template v-if="authInfo.isSignedIn">
          <BNavItem> {{ authInfo.profile?.name }} </BNavItem>
          <BNavItem @click="signOut"> Sign out </BNavItem>
        </template>

        <BNavItem v-else @click="signIn"> Sign in </BNavItem>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>
