<template>
<form @submit.prevent="onSubmit" novalidate>
    <h2>Add product</h2>
    <div v-if="errors.length" class="errorMessage">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" :key="error">{{ error }}</li>
      </ul>
    </div>
    <div>
      <label for="productName">Name:</label>
      <input type="text" v-model.trim="product.name" class="form-control" id="productName" autofocus autocomplete="off">
    </div>
    <div>
      <label for="productDescription">Description:<small class="text-muted">(optional)</small></label>
      <textarea class="form-control" v-model.trim="product.description" id="productDescription"></textarea>
    </div>
    <div>
      <label for="price">Price: (max 100000)</label>
      <input type="number" v-model.number="product.price" class="form-control" id="price" max="100000" oninput="validity.valid||(value='');">
    </div>
    <div>
      <label for="imageUrl">Image url:</label>
      <input type="text" v-model="product.imageUrl" class="form-control" id="imageUrl">
    </div>
    <div>
      <label for="discontinued">Discontinued?</label>
      <input type="checkbox" v-model="product.discontinued" class="form-control" id="discontinued">
    </div>
    <div>
      <label for="fixedPrice">Fixed price?</label>
      <input type="checkbox" v-model="product.fixedPrice" class="form-control" id="fixedPrice">
    </div>

    <div style="margin:10px">
         <button type="submit">Save product</button>
    </div>

    <img :src="product.imageUrl" width="200" />

  </form>
</template>

<script setup>
import { ref } from 'vue'
import ProductService from '@/services/ProductService.js'
import { useRouter } from 'vue-router'

const product = ref({});
const errors = ref([]);

const router = useRouter()

function onSubmit() {
    if (product.value.name && product.value.price) {
        let newProduct = {
            name: product.value.name,
            price: product.value.price,
            description: product.value.description || '',
            imageUrl: product.value.imageUrl || '',
            discontinued: product.value.discontinued || false,
            fixedPrice: product.value.fixedPrice || false,
            modifiedDate: new Date()
        };
        ProductService.insertProduct(newProduct)
            .then(() => {
                router.push({ name: "products" });
            })
            .catch(error => {
                console.error("There was an error creating a new product, ", error);
            });
    } else {
        errors.value = [];
        if (!product.value.name) errors.value.push("Name required.")
        if (!product.value.price) errors.value.push("Price required.")
    }
}
</script>

<style lang="css" scoped>
input:active,
input:focus,
input:hover,
textarea:active,
textarea:focus,
textarea:hover {
  background-color: lightyellow;
  border-color: yellow;
}

label {
    clear: both;
    float:left;
    width: 120px;
}
</style>