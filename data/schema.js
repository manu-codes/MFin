module.exports = {
    account: {
        required: ['id', 'name', 'type', 'owner']
    },
    expense: {
        required: ['id', 'desc', 'date', 'amount', 'tag_ids', 'account_id', 'owner']
    },
    income: {
        required: ['id', 'desc', 'date', 'amount', 'tag_ids', 'account_id', 'owner']

    },
    transfer: {
        required: ['id', 'desc', 'date', 'amount', 'tag_ids', 'frm_account_id', 'to_account_id', 'owner']

    },
    loan: {
        required: ['id', 'desc', 'date', 'amount', 'tag_ids', 'contact_id', 'owner']

    },
    tag: {
        required: ['id', 'name', 'owner']
    },
    tag_rule: {
        required: ['id', 'match_text', 'tag_id', 'owner']
    },
    contact: {
        required: ['id', 'name', 'email', 'owner']
    },
    meta_push_counter :{

    },


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