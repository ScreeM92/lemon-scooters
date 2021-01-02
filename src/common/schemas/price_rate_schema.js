export default {
    title: 'rate',
    type: 'array',
    items: {
        type: 'object',
        properties: {
            zone: {
                type: 'string',
                pattern: '[ABC]{1}'
            },
            price: {
                type: 'number',
                minimum: 0.01
            },
            currency: {
                type: 'string',
                enum: ['USD', 'EUR', 'GBP']
            }
        },
        required: ['zone', 'price', 'currency']
    }
}