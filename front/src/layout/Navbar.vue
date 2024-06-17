<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="/">Liste des tâches</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/createtask">Créer une tâche</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/affecttask">Affecter une tâche</a>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    <br>
</template>
 <script>
export default {
  name: 'NavbarComponent'
};
</script>