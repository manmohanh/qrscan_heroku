const { readDbs, writeDb } = require("../../utils/sqlCommands");

async function transaction(data) {
  const { house, QnA_id, marks, entry_by_token, event_id } = data;
  let house_id, entry_date, entry_by;

  try {
    const customer = await readDbs("metadata_customer", {
      field: "house_id",
      value: house,
    });
    house_id = customer.data[0].id;

    const user = await readDbs("metadata_users", {
      field: "token",
      value: entry_by_token,
    });
    entry_by = user.data[0].id;
    entry_date = new Date().toISOString().slice(0, 19).replace("T", " ");

    //recording transaction
    console.log("recording transactions");
    const fields = [
      "event_id",
      "house_id",
      "QnA_id",
      "marks",
      "entry_by",
      "entry_date",
    ];
    const values = [event_id, house_id, QnA_id, marks, entry_by, entry_date];
    const transaction = await writeDb("transaction_survey", fields, values);
    if (transaction.flag) {
      return {
        flag: true,
        message: "New Transaction created",
        details: transaction,
      };
    } else {
      return {
        flag: false,
        message: `Some error occured`,
        details: transaction,
      };
    }
  } catch (e) {
    return {
      flag: false,
      message: `Error occured ${e.message}`,
    };
  }
}

module.exports = transaction;
