import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '@/Home'
import AboutComponent from '@/About'
import NoteComponent from "@/Note";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', component: HomeComponent },
    { path: '/note', component: NoteComponent },
    { path: '/about', component: AboutComponent },
  ],
  linkActiveClass: 'active'
})