<template>
<div id="app">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>


<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: "App",
  components: {
    Header, Footer
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  background-color: white;
  max-width: 800px;
  height: auto;
  margin: auto;
  background: rgb(195, 226, 255);
  background: linear-gradient(135deg, rgb(195, 226, 255) 18%, rgb(253, 226, 255) 20%, rgb(195, 226, 255) 50%);
  box-sizing: border-box;
display: flex;
height: 100vh;
flex-direction: column;
box-shadow: 0 0 10px 10px rgba(130, 162, 192, 0.2);
}

</style>
