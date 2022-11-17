const { writeDb, readDbs } = require("../../utils/sqlCommands");

async function createCustomer(data) {
  const {
    house_id,
    customer_name,
    mobile_no,
    address,
    zone,
    area,
    location,
    latitude,
    longitude,
  } = data;

  try {
    const check = await readDbs("metadata_customer", {
      field: "house_id",
      value: house_id,
    });

    if (!check.flag) {
      const fields = [
        " house_id",
        "customer_name",
        "mobile_no",
        "address",
        "zone",
        "area",
        "location",
        "latitude",
        "longitude",
      ];
      const values = [
        house_id,
        customer_name,
        mobile_no,
        address,
        zone,
        area,
        location,
        latitude,
        longitude,
      ];
      const createCus = await writeDb("metadata_customer", fields, values);
      if (createCus.flag) {
        console.log(
          "new customer created " + customer_name + "\nHouse Id : " + house_id
        );
        return {
          flag: true,
          message: `New Customer Created ${customer_name}`,
          data: { house_id: house_id },
        };
      }
    } else {
      console.log(`Customer already exists ${customer_name}`);
      return {
        flag: true,
        message: `Customer already exists ${customer_name}`,
        data: { house_id: house_id },
      };
    }
  } catch (e) {
    console.log("create customer Error : " + e);
    return {
      flag: false,
      message: `Error : ${e.message}`,
    };
  }
}

module.exports = createCustomer;
