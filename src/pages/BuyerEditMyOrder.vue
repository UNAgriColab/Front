<template>
    <div class="content">
        <div class="md-layout">
            <div
                    class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-60"
            >
                <md-card>
                    <md-card-header data-background-color="green">
                        <h1>Ingresa La orden a ver</h1>
                    </md-card-header>
                    <md-card-content>
                        <md-field>
                            <label for="path">Id de la orden a ver:</label><br>
                            <md-input v-model="product.path" placeholder="path"></md-input>
                        </md-field>
                        <md-button
                                v-on:click="leerAPI"
                                type="submit"
                                class="md-raised md-success">
                            Ingresar
                        </md-button>
                    </md-card-content>
                </md-card>
                <md-card>
                    <md-card-header data-background-color="green">
                        <h1 class="title">{{ product.name }}</h1>
                        <p class="category">De: {{ product.user }}</p>
                    </md-card-header>
                    <md-card-content>
                        <div id="product">
                            <div class="product">
                                <div class="md-layout-item md-size-100 md-size-33">
                                    <h3 class="title">
                                        {{ product.numberOfUnits }}
                                        <span v-if="product.presentation ===1 ">
                      Gramos pedidos.
                    </span>
                                        <span v-if="product.presentation ===2 ">
                      Libras pedidas.
                    </span>
                                        <span v-if="product.presentation ===3 ">
                      Kilogramos pedidos.
                    </span>
                                        <span v-if="product.presentation ===4 ">
                      Arrobas pedidas.
                    </span>
                                        <span v-if="product.presentation ===5 ">
                      Bultos pedidos.
                    </span>
                                    </h3>
                                    <h4 class="title">Precio por unidad: {{ product.price }}</h4>
                                    <h4 class="title">Precio total final: {{ product.totalPrice }}</h4>
                                </div>
                            </div>
                        </div>
                        <h2 class="title">Descripción</h2>
                        <div class="md-layout-item md-size-100 md-size-33">
                            <p class="category">
                                {{ product.description }}
                            </p>
                        </div>
                        <div class="md-layout-item md-size-100 md-size-33">
                            <p class="category">
                                Estado actual de la orden: {{ product.state }}
                            </p>
                        </div>
                        <div class="md-layout-item md-size-100 text-right">
                            <md-button
                                    class="md-raised md-success"
                                    v-on:click="cancelOrder"
                            >
                                cancelar producto
                            </md-button>
                        </div>
                    </md-card-content>
                </md-card>
            </div>
        </div>
    </div>
</template>

<script>
    import http from "../http-common";

    export default {
        name: "product",
        data() {
            return {

                product: {
                    //orden
                    offerReference: "",
                    user: "",
                    quantity: 0,
                    numberOfUnits: 0,
                    totalPrice: 0,
                    description: "",
                    id: "",
                    presentation: "",

                    state: 0,
                    canceled: false,

                    //oferta
                    price: 0,
                    name: "",
                    //unused
                    path: '',
                }
            };
        },
        mounted() {
            this.storage();
        },
        methods: {
            storage() {
                if (localStorage.getItem("userSession")) {
                    this.aux = JSON.parse(localStorage.getItem("userSession"));
                    this.token = this.aux.token;
                    this.product.userEmail = this.aux.email;
                }
            },
            leerAPI() {
                http.get('/v1/order/' + this.product.path, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    },
                    withCredentials: false
                })
                    .then(response => {
                        this.product.offerReference = response.data.offerReference;
                        this.product.id = response.data.id;
                        this.product.user = response.data.userEmail;
                        this.product.presentation = response.data.unit;
                        this.product.numberOfUnits = response.data.numberOfUnits;
                        this.product.totalPrice = response.data.totalPrice;
                        this.product.description = response.data.description;
                        this.product.state = response.data.state;
                        http.get('/v1/offer/' + response.data.offerReference, {
                            headers: {
                                Authorization: `Bearer ${this.token}`
                            },
                            withCredentials: false
                        })
                            .then(response => {
                                this.product.name = response.data.productName;
                                this.product.price = response.data.pricePresentation;

                            })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            cancelOrder() {
                const data = {
                    canceled: this.product.canceled,
                    orderId: this.product.id
                };

                http
                    .put("/v1/order/buyer", data, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        },
                        withCredentials: false
                    })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });

                this.submitted = true;
            },
            /* eslint-enable no-console */
        }
    };
</script>

<style lang="scss" scoped>
    .md-steppers {

    }
</style>
