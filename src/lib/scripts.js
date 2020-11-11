// MASCARA PARA MOEDA   


const  Mask  = {
    apply(input, formatAOA){
        setTimeout(function(){
        input.value = Mask.formatAOA(input.value)
        //input.value = Mask[formatAOA](input.value)
        },-1)
    },
    formatAOA(value){
         value = value.replace(/\D/g, "")
        return new Intl.NumberFormat('AOA', {
            style:'currency', 
            currency : 'AKZ'
        }).format(value / 100)
    }


}