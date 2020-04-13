<template>
  <div class="alert alert-danger alert-dismissible fade show" role="alert">
    <h4 class="alert-heading">
      <slot name="header" />
    </h4>
    <slot name="body" />
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
</template>
