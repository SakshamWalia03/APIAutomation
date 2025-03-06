import { test, expect } from "@playwright/test";
import { log } from "console";
import { faker } from "@faker-js/faker";
import { DateTime } from "luxon";

// write test
test("Create Post req testing using dynamic req body", async ({ request }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const totalPrice = faker.number.int(1000);

  const checkInDate = DateTime.now().toFormat("yyyy-MM-dd");
  const checkOutDate = DateTime.now().plus({days:10}).toFormat("yyyy-MM-dd");

  const postAPIResponse = await request.post(`/booking`, {
    data: {
      "firstname": firstName,
      "lastname": lastName,
      "totalprice": totalPrice,
      "depositpaid": true,
      "bookingdates": {
        "checkin": checkInDate,
        "checkout": checkOutDate
      },
      "additionalneeds": "super bowls"
    },
  });

  const postAPIResponseBody = await postAPIResponse.json();
  log(postAPIResponseBody);

  // validate status code
  expect(postAPIResponse.ok).toBeTruthy();
  expect(postAPIResponse.status()).toBe(200);
  // validate json api response
  expect(postAPIResponseBody.booking).toHaveProperty("firstname", firstName);
  expect(postAPIResponseBody.booking).toHaveProperty("lastname", lastName);
  // validate nested json objects
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkin",
    checkInDate
  );
  expect(postAPIResponseBody.booking.bookingdates).toHaveProperty(
    "checkout",
    checkOutDate
  );
});

// create post api req
