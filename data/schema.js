module.exports = {
    account: {
        required: ['description', 'date']
    },
    expense: {

    },
    income: {},
    transfer: {},
    loan: {},
    tag: {},
    tag_rule: {},
    contact: {},


    getTables: function() {
        let tables = []
        for (var key in this) {
            if (typeof this[key] !== 'function') {
                tables.push(key)
            }
        }
        return tables;
    }

}