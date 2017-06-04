module.exports = {
    db: null,
    init: function(database) {
        this.db = database;
        this.initCounter();
    },
    initCounter: function() {
        let obj = {};
        obj['meta_push_counter'] = [{
            id_count: 1,
            item: 'counter'
        }];
        this.db.defaults(obj).write()
    },
    incrementCounter: function() {
        var val = this.getCounterObject();
        val.assign({
            id_count: val.value()['id_count']++
        });
    },
    getCounterObject: function() {
        return db.get('meta_push_counter')
            .find({
                item: 'counter'
            });
    },
    getNextCount: function() {
        return this.getCounterObject().value()['id_count'];
    },
    isMetaTable: function(name) {
        return name.search('meta_') > -1;
    },
    pushRow: function(table, row) {
        this.incrementCounter();
        return this.db.get(table)
            .push(row)
            .last()
            .write()
    },
    assignId: function(row, IdStr = 'id') {
        row[IdStr] = this.getNextCount();
        return row;
    },
    isBlankObject: function(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }

}