const {Database} = require('./db')

const sql = `
    INSERT IGNORE INTO Payment
        (
            SELECT hash, text, text2, date, type, oppositeIban, value  FROM
                (
                    (
                        SELECT
                            hash,
                            oppositeName as text,
                            text as text2,
                            valuta as date,
                             type,
                             oppositeIban,
                             value
                        FROM transactions_giro
                        WHERE
                            income = false AND
                            oppositeIban not like '%9900484255'
                    )
                    UNION
                    (
                        SELECT
                            hash,
                            text,
                            text2,
                            valuta as date,
                            'Kreditkartenzahlung' as type,
                            NULL as oppositeIban,
                            value
                        FROM transactions_creditcard
                        WHERE
                            income = false
                    )
                    ORDER BY date)as Payments
        )
`

const insertPayments = async function () {
    let db = new Database();
    await db.query(sql, false, function(err, result) {
        }).then(result => console.log("[DB] Payment - Number of records inserted: " + result.affectedRows))
        .then(c => db.close());
}
module.exports = {
    insertPayments
}
