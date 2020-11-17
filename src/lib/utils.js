module.exports = {
    formatPrice(price){
        return new Intl.NumberFormat('AOA',{
            style: 'currency',
            currency : 'AKZ'
        }).format(price / 100)
    }
} 