<template>
  <header class="navbar">
    <h3>Notes App</h3>

    <ul class="navbar-menu">
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/note">Note</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </header>
  <div class="container with-nav">
    <router-view />
  </div>
</template>
