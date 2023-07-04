const comanda = JSON.parse(localStorage.getItem("comanda"))

export function protectedFinalizarPedidoRoute() {
       if (!comanda || comanda?.length == 0) {
        window.location = "/"
       }
}

