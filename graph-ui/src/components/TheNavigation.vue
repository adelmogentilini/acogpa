<template>
   <nav id="nav">
     <ul class="nav-links">
         <li class="titolo">
            {{titolo}}
         </li>
        <li class="links">
           <router-link to="/">
              Home
           </router-link>
        </li>
         <li class="links">
             <router-link to="/about">
                 ?
             </router-link>
         </li>
     </ul>
    </nav>
</template>
<script>
   export default {
       props:['titolo']
   }

</script>
<style scoped>
   #nav {
      display: flex;
       align-items: center;
       position: sticky;
       top: 0;
       background-color: #112261;
        color: white;
       border-bottom: 1px solid darkgrey;
       z-index: 1;
   }

   a:-webkit-any-link {
     color: white;
     cursor: grabbing;
     text-decoration: underline;
   }
   .nav-links {
      display: flex;
   }

   .links {
      padding-right: 20px;
      list-style: none;
   }

   .titolo {
      padding: 0 10px;
       font-weight: bold;
       list-style: none;
   }

   .links:hover
   #nav a {
      font-weight: bold;
     text-decoration: none;
      font-weight: bold;
     color: yellow;
   }

   #nav a.router-link-exact-active {
      color: #d2d829;
     font-weight: bold;
   }
</style>
