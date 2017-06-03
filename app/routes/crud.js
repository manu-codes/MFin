module.exports = function(app) {
    low = require("lowdb")
    fileAsync = require("lowdb/lib/storages/file-async")
    DATA_PATH = "data/"
    DB_NAME = "mfin"
    dbSchema = require("../../data/schema");
    Validator = require('jsonschema').Validator;
    v = new Validator();

    db = low(DATA_PATH + DB_NAME + ".json", {
        storage: fileAsync
    })
    tables = dbSchema.getTables();

    



    const init = function() {
        forAllTables(function(table) {
            let obj = {};
            obj[table] = [];
            db.defaults(obj).write()
        })

    }
    const handleGetTableRequest = function() {
        forAllTables(function(table) {
            console.log("Handling GET table request - " + table);
            app.get("/" + table + "/:id", (req, res) => {
                let tdata = db.get(table)
                    .find({
                        id: req.params.id
                    })
                    .value()

                res.send(tdata)
            })
        });
    }
    const handlePostTableRequest = function() {
        forAllTables(function(table) {
            app.post("/" + table, (req, res) => {
                console.log(dbSchema)
                let validated = v.validate(req.body, dbSchema[table]).errors;
                if (validated.length > 0) {
                    res.status(422).send(validated);
                } else {
                    db.get(table)
                        .push(req.body)
                        .last()
                        .assign({
                            id: Date.now()
                        })
                        .write()
                        .then(tdata => res.send(tdata))
                }
            })
        });
    }
    const validateTableInsert = function(table, payload) {
        //TODO - add validation for insert

        return payload;
    }
    const forAllTables = function(cb, specifiedTables) {
        specifiedTables = specifiedTables || tables;
        for (var i = tables.length - 1; i >= 0; i--) {
            cb(tables[i]);
        }
    }

    init();
    handleGetTableRequest();
    handlePostTableRequest();

};