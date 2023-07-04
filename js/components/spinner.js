export function Spinner (){
    return `  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    <span class="visually-hidden">Loading...</span>`
}

export function SpinnerWithText(text){
    return `
    <div id="spinner" class="spinner-container">
          <div>Cargando ${text}...</div>
          <span class="spinner-border" role="status" aria-hidden="true"></span>
          <span class="visually-hidden">Loading...</span>
      </div>
    `
}